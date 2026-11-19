import "server-only";

import { cacheLife, cacheTag } from "next/cache";
import { connection } from "next/server";
import { loadCatalogUncached } from "@/lib/sheets/catalog";
import type { Catalog } from "@/lib/types";

export async function getCatalog(): Promise<Catalog> {
  "use cache";
  cacheLife("minutes");
  cacheTag("catalog");
  return loadCatalogUncached();
}

export async function loadRequestCatalog() {
  await connection();
  return getCatalog();
}
