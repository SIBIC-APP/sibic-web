"use client";

import { useCatalog } from "@/components/catalog/use-catalog";
import { TopBar } from "@/components/shell/top-bar";
import { themeVisual } from "@/components/theme-visual";
import { Input } from "@/components/ui/input";
import { sortedThemes } from "@/lib/catalog-model";
import { includesFold } from "@/lib/text";
import { useUiStore } from "@/lib/ui-store";
import type { Catalog } from "@/lib/types";
import { ChevronRight, Search } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { cn } from "cn";

export function CompareView({ catalog }: { catalog: Catalog }) {
  const data = useCatalog(catalog);
  const [query, setQuery] = useState("");
  const lastTheme = useUiStore((state) => state.lastTheme);
  const themes = useMemo(
    () => sortedThemes(data).filter((theme) => includesFold(theme.name, query)),
    [data, query],
  );

  return (
    <>
      <TopBar title="Compara por tema" backHref="/" searchId="theme-search" />
      <main className="animate-in fade-in slide-in-from-bottom-2 px-5 pt-2 duration-500 fill-mode-both motion-reduce:animate-none md:px-8 xl:px-12">
        <div className="relative lg:mx-auto lg:max-w-6xl">
          <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-slate-400" />
          <Input
            id="theme-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Buscar tema"
            className="h-11 w-full rounded-full bg-slate-50 pr-4 pl-10 md:max-w-xl lg:max-w-none"
          />
        </div>
        <ul className="mt-4 grid gap-2 md:grid-cols-2 lg:mx-auto lg:max-w-6xl lg:grid-cols-4">
          {themes.map((theme, index) => {
            const visual = themeVisual(theme.color);
            const Icon = visual.icon;
            const selected = theme.slug === lastTheme;
            return (
              <li key={theme.id}>
                <Link
                  href={`/compara/${theme.slug}`}
                  style={{ animationDelay: `${index * 60}ms` }}
                  className={cn(
                    "animate-in fade-in slide-in-from-bottom-2 flex items-center gap-3 rounded-2xl px-3 py-3 duration-500 fill-mode-both motion-reduce:animate-none",
                    selected ? "bg-[#efeaff] text-brand" : "surface-card",
                  )}
                >
                  <span className={cn("grid size-10 place-items-center rounded-xl", visual.iconWrap)}>
                    <Icon className="size-5" />
                  </span>
                  <span className={cn("flex-1 font-semibold", selected ? "text-brand" : "text-navy")}>
                    {theme.name}
                  </span>
                  <ChevronRight className={cn("size-4", selected ? "text-brand" : "text-slate-300")} />
                </Link>
              </li>
            );
          })}
        </ul>
        {themes.length === 0 ? (
          <p className="mt-8 text-center text-sm text-slate-500">Ningún tema coincide con tu búsqueda.</p>
        ) : null}
      </main>
    </>
  );
}
