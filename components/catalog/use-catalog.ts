"use client";

import { useQuery } from "@tanstack/react-query";
import { catalogQuery } from "@/lib/query/catalog";
import type { Catalog } from "@/lib/types";

export function useCatalog(initialData: Catalog) {
  const { data } = useQuery({
    ...catalogQuery,
    initialData,
  });
  return data;
}
