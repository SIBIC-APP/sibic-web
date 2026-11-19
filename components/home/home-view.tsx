"use client";

import { CompassMark } from "@/components/compass/compass-mark";
import { CatMascot } from "@/components/mascot/cat-mascot";
import { TopBar } from "@/components/shell/top-bar";
import { useCatalog } from "@/components/catalog/use-catalog";
import { BookOpen, ChartColumn, ChevronRight, Users } from "lucide-react";
import Link from "next/link";
import type { Catalog } from "@/lib/types";

const cards = [
  {
    href: "/elecciones",
    label: "Elecciones\n2027",
    background: "bg-[#e4e9ff]",
    well: "bg-[#d3dbff]",
    kind: "users",
  },
  {
    href: "/compara",
    label: "Compara\npor tema",
    background: "bg-[#eadcff]",
    well: "bg-[#dcc6ff]",
    kind: "chart",
  },
  {
    href: "/aprende",
    label: "Aprende",
    background: "bg-[#e3f7f4]",
    well: "bg-[#c9efe8]",
    kind: "learn",
  },
  {
    href: "/brujula",
    label: "Mi\nBrújula",
    background: "bg-[#fde7f1]",
    well: "bg-[#f8d0e4]",
    kind: "compass",
  },
] as const;

export function HomeView({ catalog }: { catalog: Catalog }) {
  const data = useCatalog(catalog);

  return (
    <>
      <TopBar home />
      <main className="animate-in fade-in slide-in-from-bottom-2 px-5 pt-6 duration-500 fill-mode-both motion-reduce:animate-none md:px-8 xl:px-12 lg:mx-auto lg:grid lg:max-w-6xl lg:grid-cols-2 lg:items-center lg:gap-12 lg:py-10">
        <div className="relative max-w-xl lg:max-w-none">
          <div className="pr-36 md:pr-52">
            <h1 className="text-[2.65rem] leading-[1.02] font-extrabold tracking-[-0.04em] text-navy">
              Conoce.
              <br />
              Compara.
              <br />
              Decide.
            </h1>
            <p className="mt-4 max-w-md text-[15px] leading-relaxed text-slate-500 md:text-lg">
              Información clara para conocer candidaturas y comparar propuestas.
            </p>
          </div>
          <CatMascot className="pointer-events-none absolute right-0 bottom-0 h-24 w-36 md:h-32 md:w-48" />
        </div>
        {data.candidates.length === 0 ? (
          <p className="mt-6 rounded-2xl bg-amber-50 px-4 py-3 text-sm text-amber-800">
            Todavía no hay candidaturas cargadas.
          </p>
        ) : null}
        <div className="mt-8 grid max-w-xl gap-3 lg:mt-0 lg:max-w-none lg:grid-cols-2">
          {cards.map((card, index) => (
            <Link
              key={card.href}
              href={card.href}
              className={`animate-in fade-in slide-in-from-bottom-2 flex items-center gap-3.5 rounded-[22px] px-3.5 py-3.5 shadow-[0_8px_24px_rgb(109_94_252/7%)] duration-500 fill-mode-both motion-reduce:animate-none ${card.background}`}
              style={{ animationDelay: `${(index + 1) * 100}ms` }}
            >
              <span className={`grid size-12 shrink-0 place-items-center rounded-[16px] text-brand ${card.well}`}>
                {card.kind === "users" ? <Users className="size-6" strokeWidth={2.4} /> : null}
                {card.kind === "chart" ? <ChartColumn className="size-6" strokeWidth={2.4} /> : null}
                {card.kind === "learn" ? <BookOpen className="size-6" strokeWidth={2.4} /> : null}
                {card.kind === "compass" ? <CompassMark face={false} className="size-8" /> : null}
              </span>
              <span className="flex-1 text-[17px] leading-tight font-bold whitespace-pre-line text-brand">
                {card.label}
              </span>
              <ChevronRight className="size-5 shrink-0 text-brand/45" />
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}
