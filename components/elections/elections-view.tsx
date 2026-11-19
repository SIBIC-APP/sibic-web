"use client";

import { useCatalog } from "@/components/catalog/use-catalog";
import { PersonAvatar } from "@/components/person-avatar";
import { TopBar } from "@/components/shell/top-bar";
import { Input } from "@/components/ui/input";
import { sortedCandidates } from "@/lib/catalog-model";
import { includesFold } from "@/lib/text";
import type { Catalog } from "@/lib/types";
import { Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

export function ElectionsView({ catalog }: { catalog: Catalog }) {
  const data = useCatalog(catalog);
  const [query, setQuery] = useState("");
  const candidates = useMemo(
    () =>
      sortedCandidates(data).filter((candidate) =>
        includesFold(`${candidate.name} ${candidate.party}`, query),
      ),
    [data, query],
  );

  return (
    <>
      <TopBar title="Elecciones 2027" backHref="/" searchId="candidate-search" />
      <main className="animate-in fade-in slide-in-from-bottom-2 px-5 pt-2 duration-500 fill-mode-both motion-reduce:animate-none md:px-8 xl:px-12">
        <div className="relative">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
          <Input
            id="candidate-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar por nombre o partido"
            className="h-11 rounded-full bg-slate-50 pr-4 pl-10 md:max-w-xl"
          />
        </div>
        <ul className="mt-4 grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {candidates.map((candidate, index) => (
            <li key={candidate.id}>
              <Link
                href={`/candidatos/${candidate.slug}`}
                style={{ animationDelay: `${index * 60}ms` }}
                className="surface-card animate-in fade-in slide-in-from-bottom-2 flex items-center gap-3 rounded-[24px] px-3 py-3 duration-500 fill-mode-both motion-reduce:animate-none"
              >
                <PersonAvatar name={candidate.name} src={candidate.photoUrl} />
                <span>
                  <span className="block font-semibold text-navy">{candidate.name}</span>
                  <span className="block text-sm text-slate-500">{candidate.party}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
        {candidates.length === 0 ? (
          <p className="mt-8 text-center text-sm text-slate-500">
            Ninguna candidatura coincide con tu búsqueda.
          </p>
        ) : null}
      </main>
    </>
  );
}
