import { getSheetsClient, serviceAccountCredentials, spreadsheetId } from "@/lib/sheets/client";
import { appendLocalRow, ensureLocalStore, readLocalTable, updateLocalRow } from "@/lib/sheets/local-store";
import { SERVICE_ACCOUNT_EMAIL, TABLES, type TableName } from "@/lib/sheets/schema";

export type SheetRecord = Record<string, string> & { rowNumber: number };

export type DataBackend = "sheets" | "file";

let backend: DataBackend | null = null;
let backendRequest: Promise<DataBackend> | null = null;

export function isPermissionError(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  const status = (error as { code?: number; status?: number }).code ?? (error as { status?: number }).status;
  return (
    status === 403 ||
    message.includes("403") ||
    message.toLowerCase().includes("permission") ||
    message.toLowerCase().includes("forbidden")
  );
}

function permissionMessage() {
  return `La hoja no está disponible para la cuenta de servicio. Compártela como editor con ${SERVICE_ACCOUNT_EMAIL} y activa la API de Google Sheets. Mientras tanto SIBIC usa data/store.json.`;
}

function missingCredentialsMessage() {
  return "Faltan GOOGLE_SHEET_ID, GOOGLE_SERVICE_ACCOUNT_EMAIL o GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY. SIBIC usa data/store.json.";
}

export function isMissingCredentialsError(error: unknown) {
  const message = error instanceof Error ? error.message : String(error);
  const code = (error as { code?: string }).code;
  return (
    code === "ENOENT" ||
    message.startsWith("Falta") ||
    message.includes("no such file")
  );
}

async function detectBackend(): Promise<DataBackend> {
  const forced = process.env.DATA_BACKEND;
  if (forced === "file") return "file";
  if (forced === "sheets") return "sheets";

  if (!process.env.GOOGLE_SHEET_ID || !serviceAccountCredentials()) {
    console.warn(missingCredentialsMessage());
    return "file";
  }

  try {
    const sheets = getSheetsClient();
    await sheets.spreadsheets.get({
      spreadsheetId: spreadsheetId(),
      fields: "spreadsheetId",
    });
    return "sheets";
  } catch (error) {
    if (isPermissionError(error)) {
      console.warn(permissionMessage());
      return "file";
    }
    if (isMissingCredentialsError(error)) {
      console.warn(missingCredentialsMessage());
      return "file";
    }
    throw error;
  }
}

export async function getBackend() {
  if (backend) return backend;
  if (!backendRequest) {
    backendRequest = detectBackend()
      .then((resolved) => {
        backend = resolved;
        return resolved;
      })
      .finally(() => {
        backendRequest = null;
      });
  }
  return backendRequest;
}

function explainSheetsError(error: unknown): never {
  if (isPermissionError(error)) {
    throw new Error(permissionMessage());
  }
  const message = error instanceof Error ? error.message : "Error desconocido";
  throw new Error(`No se pudo usar Google Sheets. ${message}`);
}

function rowsToRecords(values: string[][]): SheetRecord[] {
  if (values.length === 0) return [];
  const headers = values[0].map((cell) => String(cell));
  return values.slice(1).flatMap((row, index) => {
    const cells = headers.map((_, cellIndex) => String(row[cellIndex] ?? ""));
    if (cells.every((cell) => cell.trim() === "")) return [];
    const record = { rowNumber: index + 2 } as SheetRecord;
    headers.forEach((header, cellIndex) => {
      record[header] = cells[cellIndex] ?? "";
    });
    return [record];
  });
}

export function rowFromRecord(title: TableName, record: Record<string, string>) {
  return TABLES[title].map((header) => record[header] ?? "");
}

export async function readTables(titles: TableName[]) {
  const resolved = await getBackend();
  if (resolved === "file") {
    await ensureLocalStore();
    return titles.map((title) => readLocalTable(title));
  }

  try {
    const sheets = getSheetsClient();
    const response = await sheets.spreadsheets.values.batchGet({
      spreadsheetId: spreadsheetId(),
      ranges: titles,
    });
    const ranges = response.data.valueRanges ?? [];
    return titles.map((_, index) => rowsToRecords((ranges[index]?.values as string[][] | undefined) ?? []));
  } catch (error) {
    explainSheetsError(error);
  }
}

export async function readTable(title: TableName) {
  const [rows] = await readTables([title]);
  return rows;
}

export async function appendRow(title: TableName, record: Record<string, string>) {
  const cells = rowFromRecord(title, record);
  const resolved = await getBackend();
  if (resolved === "file") {
    await ensureLocalStore();
    await appendLocalRow(title, cells);
    return;
  }

  try {
    const sheets = getSheetsClient();
    await sheets.spreadsheets.values.append({
      spreadsheetId: spreadsheetId(),
      range: `${title}!A1`,
      valueInputOption: "RAW",
      insertDataOption: "INSERT_ROWS",
      requestBody: { values: [cells] },
    });
  } catch (error) {
    explainSheetsError(error);
  }
}

export async function updateRow(title: TableName, rowNumber: number, record: Record<string, string>) {
  const cells = rowFromRecord(title, record);
  const resolved = await getBackend();
  if (resolved === "file") {
    await ensureLocalStore();
    await updateLocalRow(title, rowNumber, cells);
    return;
  }

  try {
    const sheets = getSheetsClient();
    await sheets.spreadsheets.values.update({
      spreadsheetId: spreadsheetId(),
      range: `${title}!A${rowNumber}`,
      valueInputOption: "RAW",
      requestBody: { values: [cells] },
    });
  } catch (error) {
    explainSheetsError(error);
  }
}
