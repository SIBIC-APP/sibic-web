import { getSheetsClient, spreadsheetId } from "@/lib/sheets/client";
import { ensureLocalStore } from "@/lib/sheets/local-store";
import { TABLES, type TableName } from "@/lib/sheets/schema";
import { getBackend } from "@/lib/sheets/table";

export type BootstrapStatus = "created" | "kept";

async function existingTitles() {
  const sheets = getSheetsClient();
  const meta = await sheets.spreadsheets.get({ spreadsheetId: spreadsheetId() });
  return new Set(
    (meta.data.sheets ?? [])
      .map((sheet) => sheet.properties?.title)
      .filter((title): title is string => Boolean(title)),
  );
}

async function writeValues(range: string, values: string[][]) {
  const sheets = getSheetsClient();
  await sheets.spreadsheets.values.update({
    spreadsheetId: spreadsheetId(),
    range,
    valueInputOption: "RAW",
    requestBody: { values },
  });
}

const AUTH_TABLES = ["users", "account", "session", "verification"] as const satisfies readonly TableName[];

const ensured = new Set<TableName>();

async function syncSheetTables(requested: TableName[]) {
  const pending = requested.filter((title) => !ensured.has(title));
  const result = {} as Record<TableName, BootstrapStatus>;
  for (const title of requested) {
    if (!pending.includes(title)) result[title] = "kept";
  }
  if (pending.length === 0) return result;

  const sheets = getSheetsClient();
  const titles = await existingTitles();
  const missing = pending.filter((title) => !titles.has(title));

  if (missing.length > 0) {
    await sheets.spreadsheets.batchUpdate({
      spreadsheetId: spreadsheetId(),
      requestBody: {
        requests: missing.map((title) => ({ addSheet: { properties: { title } } })),
      },
    });
  }

  for (const title of missing) {
    await writeValues(`${title}!A1`, [[...TABLES[title]]]);
    result[title] = "created";
    ensured.add(title);
  }

  for (const title of pending) {
    if (ensured.has(title)) continue;
    result[title] = "kept";
    ensured.add(title);
  }

  return result;
}

export async function ensureHistorySections() {
  const resolved = await getBackend();
  if (resolved === "file") {
    await ensureLocalStore();
    return;
  }
  await syncSheetTables(["history_sections"]);
}

export async function ensureCompassResponses() {
  const resolved = await getBackend();
  if (resolved === "file") {
    await ensureLocalStore();
    return;
  }
  await syncSheetTables(["compass_responses"]);
}

export async function ensureHistoryResponses() {
  const resolved = await getBackend();
  if (resolved === "file") {
    await ensureLocalStore();
    return;
  }
  await syncSheetTables(["history_responses"]);
}

export async function ensureCompassQuestions() {
  const resolved = await getBackend();
  if (resolved === "file") {
    await ensureLocalStore();
    return;
  }
  await syncSheetTables(["compass_questions"]);
}

export async function ensureHistoryQuestions() {
  const resolved = await getBackend();
  if (resolved === "file") {
    await ensureLocalStore();
    return;
  }
  await syncSheetTables(["history_sections", "history_questions"]);
}

export async function ensureAuthTables() {
  const resolved = await getBackend();
  if (resolved === "file") {
    await ensureLocalStore();
    return;
  }
  await syncSheetTables([...AUTH_TABLES]);
}

export async function bootstrapSheets() {
  const resolved = await getBackend();
  if (resolved === "file") {
    return ensureLocalStore();
  }
  return syncSheetTables(Object.keys(TABLES) as TableName[]);
}
