import type { CustomAdapter } from "@better-auth/core/db/adapter";
import { createAdapterFactory } from "better-auth/adapters";
import { ensureAuthTables } from "@/lib/sheets/bootstrap";
import { TABLES, type TableName } from "@/lib/sheets/schema";
import { appendRow, readTable, updateRow, type SheetRecord } from "@/lib/sheets/table";

type Clause = {
  field: string;
  value: unknown;
  operator?: string;
  connector?: "AND" | "OR";
  mode?: "sensitive" | "insensitive";
};

type FieldAttr = { type: string; fieldName?: string };

const AUTH_MODELS = new Set<TableName>(["users", "account", "session", "verification"]);

let queue: Promise<unknown> = Promise.resolve();
let ready: Promise<void> | null = null;

function serial<T>(task: () => Promise<T>) {
  const run = queue.then(task, task);
  queue = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

function asTable(model: string): TableName {
  if (AUTH_MODELS.has(model as TableName)) return model as TableName;
  throw new Error(`Tabla de auth desconocida: ${model}`);
}

function cell(value: unknown) {
  if (value === null || value === undefined) return "";
  if (value instanceof Date) return value.toISOString();
  if (typeof value === "boolean") return value ? "1" : "0";
  return String(value);
}

function textOf(value: unknown) {
  if (value instanceof Date) return value.toISOString();
  if (value === null || value === undefined) return "";
  return String(value);
}

function compareValues(left: string, right: unknown) {
  const rightText = textOf(right);
  const leftNumber = Number(left);
  const rightNumber = Number(rightText);
  if (left !== "" && rightText !== "" && Number.isFinite(leftNumber) && Number.isFinite(rightNumber)) {
    return leftNumber - rightNumber;
  }
  return left.localeCompare(rightText);
}

function matchesClause(record: SheetRecord, clause: Clause) {
  const current = record[clause.field] ?? "";
  const expected = textOf(clause.value);
  const insensitive = clause.mode === "insensitive";
  const left = insensitive ? current.toLowerCase() : current;
  const right = insensitive ? expected.toLowerCase() : expected;
  const operator = clause.operator ?? "eq";

  if (operator === "in" || operator === "not_in") {
    const values = Array.isArray(clause.value) ? clause.value.map((item) => textOf(item)) : [expected];
    const found = values.some((item) => (insensitive ? item.toLowerCase() : item) === left);
    return operator === "in" ? found : !found;
  }
  if (operator === "ne") return left !== right;
  if (operator === "contains") return left.includes(right);
  if (operator === "starts_with") return left.startsWith(right);
  if (operator === "ends_with") return left.endsWith(right);
  if (operator === "lt") return compareValues(current, clause.value) < 0;
  if (operator === "lte") return compareValues(current, clause.value) <= 0;
  if (operator === "gt") return compareValues(current, clause.value) > 0;
  if (operator === "gte") return compareValues(current, clause.value) >= 0;
  return left === right;
}

function matches(record: SheetRecord, where: Clause[] | undefined) {
  if (!where?.length) return true;
  return where.reduce((result, clause, index) => {
    const ok = matchesClause(record, clause);
    if (index === 0) return ok;
    return clause.connector === "OR" ? result || ok : result && ok;
  }, true);
}

function toOutput(record: Record<string, string>, fields: Record<string, FieldAttr>) {
  const output: Record<string, unknown> = { id: record.id };
  for (const [field, attr] of Object.entries(fields)) {
    const column = attr.fieldName || field;
    const raw = record[column] ?? "";
    if (attr.type === "boolean") output[column] = raw === "1" || raw === "true" ? 1 : 0;
    else if (attr.type === "date") output[column] = raw || null;
    else if (attr.type === "number") output[column] = raw === "" ? null : Number(raw);
    else output[column] = raw;
  }
  return output;
}

function blankRecord(table: TableName) {
  return Object.fromEntries(TABLES[table].map((header) => [header, ""])) as Record<string, string>;
}

function recordFrom(table: TableName, data: Record<string, unknown>, current?: SheetRecord) {
  const headers = TABLES[table] as readonly string[];
  const record = blankRecord(table);
  if (current) {
    for (const header of headers) record[header] = current[header] ?? "";
  }
  for (const [key, value] of Object.entries(data)) {
    if (headers.includes(key)) record[key] = cell(value);
  }
  if (!record.id) record.id = crypto.randomUUID();
  return record;
}

async function liveRows(table: TableName) {
  const rows = await readTable(table);
  return rows.filter((row) => row.id.trim() !== "");
}

async function migrateLegacyUsers() {
  const users = await liveRows("users");
  const accounts = await liveRows("account");
  const now = new Date().toISOString();

  for (const user of users) {
    const hasCredential = accounts.some(
      (account) => account.user_id === user.id && account.provider_id === "credential",
    );
    if (user.password_hash && !hasCredential) {
      await appendRow("account", {
        ...blankRecord("account"),
        id: crypto.randomUUID(),
        user_id: user.id,
        account_id: user.id,
        provider_id: "credential",
        password: user.password_hash,
        created_at: user.created_at || now,
        updated_at: now,
      });
    }

    const hasGoogle = accounts.some(
      (account) => account.user_id === user.id && account.provider_id === "google",
    );
    if (user.google_sub && !hasGoogle) {
      await appendRow("account", {
        ...blankRecord("account"),
        id: crypto.randomUUID(),
        user_id: user.id,
        account_id: user.google_sub,
        provider_id: "google",
        created_at: user.created_at || now,
        updated_at: now,
      });
    }

    if (!user.email_verified) {
      const { rowNumber, ...current } = user;
      await updateRow("users", rowNumber, {
        ...current,
        email_verified: user.provider === "google" || user.google_sub ? "1" : "0",
      });
    }
  }
}

function prepareStore() {
  ready ??= ensureAuthTables()
    .then(() => migrateLegacyUsers())
    .catch((error: unknown) => {
      ready = null;
      throw error;
    });
  return ready;
}

export const sheetsAdapter = createAdapterFactory({
  config: {
    adapterId: "sheets",
    adapterName: "Sheets Adapter",
    usePlural: false,
    supportsJSON: false,
    supportsDates: false,
    supportsBooleans: false,
    supportsNumericIds: false,
    transaction: false,
  },
  adapter: ({ schema, getDefaultModelName }) => {
    function fieldsFor(model: string) {
      const modelKey = getDefaultModelName(model);
      return (schema[modelKey]?.fields ?? {}) as Record<string, FieldAttr>;
    }

    return {
      async create({ data, model }) {
        return serial(async () => {
          await prepareStore();
          const table = asTable(model);
          const record = recordFrom(table, data as Record<string, unknown>);
          await appendRow(table, record);
          return toOutput(record, fieldsFor(model)) as typeof data;
        });
      },
      async update({ where, update, model }) {
        return serial(async () => {
          await prepareStore();
          const table = asTable(model);
          const match = (await liveRows(table)).find((row) => matches(row, where));
          if (!match) return null;
          const record = recordFrom(table, update as Record<string, unknown>, match);
          await updateRow(table, match.rowNumber, record);
          return toOutput(record, fieldsFor(model)) as typeof update;
        });
      },
      async updateMany({ where, update, model }) {
        return serial(async () => {
          await prepareStore();
          const table = asTable(model);
          const matchesRows = (await liveRows(table)).filter((row) => matches(row, where));
          for (const match of matchesRows) {
            await updateRow(table, match.rowNumber, recordFrom(table, update as Record<string, unknown>, match));
          }
          return matchesRows.length;
        });
      },
      async findOne({ model, where }) {
        return serial(async () => {
          await prepareStore();
          const table = asTable(model);
          const match = (await liveRows(table)).find((row) => matches(row, where));
          return match ? toOutput(match, fieldsFor(model)) : null;
        });
      },
      async findMany({ model, where, limit, sortBy, offset }) {
        return serial(async () => {
          await prepareStore();
          const table = asTable(model);
          let rows = (await liveRows(table)).filter((row) => matches(row, where));
          if (sortBy) {
            rows = [...rows].sort((left, right) => {
              const compared = compareValues(left[sortBy.field] ?? "", right[sortBy.field] ?? "");
              return sortBy.direction === "desc" ? -compared : compared;
            });
          }
          const start = offset ?? 0;
          return rows.slice(start, start + limit).map((row) => toOutput(row, fieldsFor(model)));
        });
      },
      async delete({ model, where }) {
        return serial(async () => {
          await prepareStore();
          const table = asTable(model);
          const match = (await liveRows(table)).find((row) => matches(row, where));
          if (!match) return;
          await updateRow(table, match.rowNumber, blankRecord(table));
        });
      },
      async deleteMany({ model, where }) {
        return serial(async () => {
          await prepareStore();
          const table = asTable(model);
          const matchesRows = (await liveRows(table)).filter((row) => matches(row, where));
          for (const match of matchesRows) {
            await updateRow(table, match.rowNumber, blankRecord(table));
          }
          return matchesRows.length;
        });
      },
      async count({ model, where }) {
        return serial(async () => {
          await prepareStore();
          const table = asTable(model);
          return (await liveRows(table)).filter((row) => matches(row, where)).length;
        });
      },
    } as CustomAdapter;
  },
});
