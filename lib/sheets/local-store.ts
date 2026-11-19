import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { TABLES, type TableName } from "@/lib/sheets/schema";
import type { SheetRecord } from "@/lib/sheets/table";

export type LocalStatus = "created" | "kept";

type LocalStore = Record<TableName, string[][]>;

const storePath = path.join(process.cwd(), "data", "store.json");

let queue: Promise<unknown> = Promise.resolve();

function withLock<T>(task: () => T): Promise<T> {
  const run = queue.then(task, task);
  queue = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

function emptyStore(): LocalStore {
  return {
    candidates: [[...TABLES.candidates]],
    themes: [[...TABLES.themes]],
    proposals: [[...TABLES.proposals]],
    users: [[...TABLES.users]],
    account: [[...TABLES.account]],
    session: [[...TABLES.session]],
    verification: [[...TABLES.verification]],
    compass_questions: [[...TABLES.compass_questions]],
    compass_responses: [[...TABLES.compass_responses]],
    history_questions: [[...TABLES.history_questions]],
    history_responses: [[...TABLES.history_responses]],
    history_sections: [[...TABLES.history_sections]],
  };
}

function readStore(): LocalStore {
  try {
    return JSON.parse(readFileSync(storePath, "utf8")) as LocalStore;
  } catch {
    return emptyStore();
  }
}

function writeStore(store: LocalStore) {
  mkdirSync(path.dirname(storePath), { recursive: true });
  writeFileSync(storePath, JSON.stringify(store, null, 2));
}

export function ensureLocalStore() {
  return withLock(() => {
    const store = readStore();
    const result = {} as Record<TableName, LocalStatus>;
    let dirty = false;

    for (const title of Object.keys(TABLES) as TableName[]) {
      if (store[title]?.length) {
        result[title] = "kept";
        continue;
      }
      store[title] = [[...TABLES[title]]];
      result[title] = "created";
      dirty = true;
    }

    if (dirty) writeStore(store);
    return result;
  });
}

export function readLocalTable(title: TableName): SheetRecord[] {
  const store = readStore();
  const rows = store[title] ?? [];
  if (rows.length === 0) return [];
  const headers = rows[0];
  return rows.slice(1).flatMap((row, index) => {
    if (row.every((cell) => cell.trim() === "")) return [];
    const record = { rowNumber: index + 2 } as SheetRecord;
    headers.forEach((header, cellIndex) => {
      record[header] = row[cellIndex] ?? "";
    });
    return [record];
  });
}

export function appendLocalRow(title: TableName, cells: string[]) {
  return withLock(() => {
    const store = readStore();
    const rows = store[title]?.length ? store[title] : [[...TABLES[title]]];
    rows.push(cells);
    store[title] = rows;
    writeStore(store);
  });
}

export function updateLocalRow(title: TableName, rowNumber: number, cells: string[]) {
  return withLock(() => {
    const store = readStore();
    const rows = store[title]?.length ? store[title] : [[...TABLES[title]]];
    rows[rowNumber - 1] = cells;
    store[title] = rows;
    writeStore(store);
  });
}
