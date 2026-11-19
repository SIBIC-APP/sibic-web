import { queryOptions } from "@tanstack/react-query";
import { catalogKeys } from "@/lib/query/keys";
import type { Catalog } from "@/lib/types";

export async function fetchCatalog(): Promise<Catalog> {
  const response = await fetch("/api/catalog");
  if (!response.ok) {
    throw new Error("No se pudo cargar el catálogo.");
  }
  return response.json();
}

export const catalogQuery = queryOptions({
  queryKey: catalogKeys.all,
  queryFn: fetchCatalog,
  staleTime: 5 * 60 * 1000,
});
