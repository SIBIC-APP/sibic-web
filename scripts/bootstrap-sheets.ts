import { bootstrapSheets } from "../lib/sheets/bootstrap";

bootstrapSheets()
  .then((result) => {
    console.log(JSON.stringify(result, null, 2));
  })
  .catch((error: unknown) => {
    console.error(error instanceof Error ? error.message : error);
    process.exit(1);
  });
