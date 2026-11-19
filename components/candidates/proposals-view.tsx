"use client";

import { useCatalog } from "@/components/catalog/use-catalog";
import { CandidateTabs } from "@/components/candidates/candidate-tabs";
import { PersonAvatar } from "@/components/person-avatar";
import { TopBar } from "@/components/shell/top-bar";
import { themeVisual } from "@/components/theme-visual";
import { Input } from "@/components/ui/input";
import { ABSENCE_NOTE } from "@/lib/copy";
import { candidateProposals, findCandidate } from "@/lib/catalog-model";
import { includesFold } from "@/lib/text";
import type { Catalog } from "@/lib/types";
import { ChevronRight, Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";

export function ProposalsView({ catalog, slug }: { catalog: Catalog; slug: string }) {
  const data = useCatalog(catalog);
  const candidate = findCandidate(data, slug);
  const [query, setQuery] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const rows = useMemo(() => {
    if (!candidate) return [];
    return candidateProposals(data, candidate).filter((row) =>
      includesFold(`${row.theme.name} ${row.proposal?.title ?? ""}`, query),
    );
  }, [candidate, data, query]);

  if (!candidate) return null;

  return (
    <>
      <TopBar title="Propuestas" backHref={`/candidatos/${candidate.slug}`} />
      <main className="px-5 md:px-8 xl:px-12">
        <div className="flex justify-end">
          <button
            type="button"
            className="grid size-10 place-items-center rounded-full text-navy"
            aria-expanded={searchOpen}
            aria-label="Buscar propuesta"
            onClick={() => setSearchOpen((open) => !open)}
          >
            <Search className="size-5" />
          </button>
        </div>
        {searchOpen ? (
          <Input
            autoFocus
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar por tema"
            className="mb-3 h-11 rounded-full"
          />
        ) : null}
        <div className="flex items-center gap-3">
          <PersonAvatar name={candidate.name} src={candidate.photoUrl} className="size-11" />
          <div>
            <p className="font-semibold text-navy">{candidate.name}</p>
            <p className="text-sm text-slate-500">{candidate.party}</p>
            <p className="text-xs text-slate-400">{candidate.office}</p>
          </div>
        </div>
        <div className="mt-4">
          <CandidateTabs slug={candidate.slug} />
        </div>
        <ul className="mt-2 divide-y divide-slate-100">
          {rows.map(({ theme, proposal }) => {
            const visual = themeVisual(theme.color);
            const Icon = visual.icon;
            const content = (
              <>
                <span className={`grid size-11 place-items-center rounded-2xl ${visual.iconWrap}`}>
                  <Icon className="size-5" />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-navy">{theme.name}</span>
                  <span className="block text-sm text-slate-500">
                    {proposal ? proposal.summary : "Sin información registrada"}
                  </span>
                </span>
                {proposal ? <ChevronRight className="size-4 text-slate-300" /> : null}
              </>
            );

            return (
              <li key={theme.id}>
                {proposal ? (
                  <Link href={`/propuestas/${proposal.id}`} className="flex items-center gap-3 py-3">
                    {content}
                  </Link>
                ) : (
                  <div className="flex items-center gap-3 py-3">{content}</div>
                )}
              </li>
            );
          })}
        </ul>
        <p className="mt-4 text-xs leading-relaxed text-slate-400">{ABSENCE_NOTE}</p>
      </main>
    </>
  );
}
