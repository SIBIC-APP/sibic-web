"use client";

import { useCatalog } from "@/components/catalog/use-catalog";
import { PersonAvatar } from "@/components/person-avatar";
import { TopBar } from "@/components/shell/top-bar";
import { themeVisual } from "@/components/theme-visual";
import { ABSENCE_NOTE, NEUTRALITY_NOTE } from "@/lib/copy";
import { findTheme, themeComparison } from "@/lib/catalog-model";
import { useUiStore } from "@/lib/ui-store";
import type { Catalog } from "@/lib/types";
import Link from "next/link";
import { useEffect } from "react";

export function CompareResults({ catalog, slug }: { catalog: Catalog; slug: string }) {
  const data = useCatalog(catalog);
  const theme = findTheme(data, slug);
  const setLastTheme = useUiStore((state) => state.setLastTheme);

  useEffect(() => {
    if (theme) setLastTheme(theme.slug);
  }, [setLastTheme, theme]);

  if (!theme) return null;

  const visual = themeVisual(theme.color);
  const Icon = visual.icon;
  const rows = themeComparison(data, theme);

  return (
    <>
      <TopBar title="Resultados de comparación" backHref="/compara" />
      <main className="animate-in fade-in slide-in-from-bottom-2 px-5 pt-2 duration-500 fill-mode-both motion-reduce:animate-none md:px-8 xl:px-12">
        <div className="flex items-center gap-3">
          <span className={`grid size-11 place-items-center rounded-2xl ${visual.iconWrap}`}>
            <Icon className="size-5" />
          </span>
          <div>
            <h2 className="text-xl font-bold text-navy">{theme.name}</h2>
            <p className="text-sm text-slate-500">Propuestas de todos los candidatos en el tema seleccionado.</p>
          </div>
        </div>
        <ul className="mt-5 grid gap-3 lg:grid-cols-3">
          {rows.map(({ candidate, proposal }, index) => {
            const body = (
              <>
                <PersonAvatar name={candidate.name} src={candidate.photoUrl} className="size-12" />
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-navy">{candidate.name}</span>
                  <span className="block text-sm text-slate-500">{candidate.party}</span>
                </span>
                <span className="max-w-[42%] text-right text-sm leading-snug text-slate-600">
                  {proposal ? proposal.summary : "Sin información registrada"}
                </span>
              </>
            );

            return (
              <li key={candidate.id}>
                {proposal ? (
                  <Link
                    href={`/propuestas/${proposal.id}`}
                    style={{ animationDelay: `${index * 60}ms` }}
                    className="surface-card animate-in fade-in slide-in-from-bottom-2 flex items-center gap-3 rounded-[24px] px-3 py-3 duration-500 fill-mode-both motion-reduce:animate-none"
                  >
                    {body}
                  </Link>
                ) : (
                  <div className="surface-card flex items-center gap-3 rounded-[24px] px-3 py-3">
                    {body}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
        <p className="mt-5 text-xs leading-relaxed text-slate-400">
          {ABSENCE_NOTE} {NEUTRALITY_NOTE}
        </p>
      </main>
    </>
  );
}
