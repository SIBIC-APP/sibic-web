"use client";

import { useCatalog } from "@/components/catalog/use-catalog";
import { themeVisual } from "@/components/theme-visual";
import { Badge } from "@/components/ui/badge";
import { TopBar } from "@/components/shell/top-bar";
import { findProposal, sourceLine } from "@/lib/catalog-model";
import type { Catalog } from "@/lib/types";

export function ProposalDetail({ catalog, id }: { catalog: Catalog; id: string }) {
  const data = useCatalog(catalog);
  const proposal = findProposal(data, id);
  if (!proposal) return null;

  const candidate = data.candidates.find((item) => item.id === proposal.candidateId);
  const theme = data.themes.find((item) => item.id === proposal.themeId);
  const visual = themeVisual(theme?.color ?? "blue");
  const Icon = visual.icon;

  return (
    <>
      <TopBar
        backHref={candidate ? `/candidatos/${candidate.slug}/propuestas` : "/elecciones"}
        title={candidate?.name}
      />
      <main className="animate-in fade-in slide-in-from-bottom-2 mx-auto max-w-2xl px-5 pt-4 duration-500 fill-mode-both motion-reduce:animate-none md:px-8 xl:px-12">
        {theme ? (
          <Badge className={`h-7 rounded-full px-2.5 ${visual.chip}`}>
            <Icon className="size-3.5" />
            {theme.name}
          </Badge>
        ) : null}
        <h1 className="mt-4 text-[1.7rem] leading-tight font-extrabold tracking-tight text-navy md:text-4xl xl:text-5xl">
          {proposal.title}
        </h1>
        <p className="mt-4 text-[15px] leading-relaxed text-slate-600">{proposal.body}</p>
        <section className="mt-6 rounded-[24px] bg-[#f7f8fb] p-4">
          <p className="text-sm font-medium text-navy">{sourceLine(proposal, candidate?.party ?? "")}</p>
        </section>
      </main>
    </>
  );
}
