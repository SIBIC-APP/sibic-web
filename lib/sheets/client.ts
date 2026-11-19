import { google, type sheets_v4 } from "googleapis";

let sheetsClient: sheets_v4.Sheets | null = null;

export function spreadsheetId() {
  const id = process.env.GOOGLE_SHEET_ID;
  if (!id) {
    throw new Error("Falta GOOGLE_SHEET_ID.");
  }
  return id;
}

export function serviceAccountCredentials() {
  const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL?.trim();
  const key = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.replace(/\\n/g, "\n").trim();
  if (!email || !key) return null;
  return { email, key };
}

export function getSheetsClient() {
  if (sheetsClient) return sheetsClient;

  const credentials = serviceAccountCredentials();
  if (!credentials) {
    throw new Error("Faltan GOOGLE_SERVICE_ACCOUNT_EMAIL o GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY.");
  }

  const auth = new google.auth.JWT({
    email: credentials.email,
    key: credentials.key,
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
  });

  sheetsClient = google.sheets({
    version: "v4",
    auth,
    retryConfig: {
      statusCodesToRetry: [
        [100, 199],
        [408, 408],
        [500, 599],
      ],
    },
  });
  return sheetsClient;
}
