"use client";

import { useCatalog } from "@/components/catalog/use-catalog";
import { CandidateTabs } from "@/components/candidates/candidate-tabs";
import { partyGradient, partyInitials } from "@/lib/candidates/party-color";
import { findCandidate } from "@/lib/catalog-model";
import type { Catalog } from "@/lib/types";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";

export function ProfileView({ catalog, slug }: { catalog: Catalog; slug: string }) {
  const data = useCatalog(catalog);
  const candidate = findCandidate(data, slug);
  if (!candidate) return null;

  return (
    <>
      <header className="text-white" style={{ background: partyGradient(candidate.partyColor) }}>
        <div className="mx-auto flex max-w-3xl items-center px-3 pt-2">
          <Link
            href="/elecciones"
            aria-label="Volver"
            className="grid size-10 place-items-center rounded-full text-white hover:bg-white/10"
          >
            <ArrowLeft className="size-5" />
          </Link>
          <p className="min-w-0 flex-1 truncate text-center text-[17px] font-semibold">{candidate.name}</p>
          <span className="size-10" />
        </div>
        <div className="mx-auto flex max-w-3xl items-end justify-between gap-4 px-5 pt-4 pb-8">
          <div className="min-w-0">
            <h1 className="text-[2rem] leading-tight font-extrabold tracking-tight">{candidate.name}</h1>
            <p className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/20 py-1 pr-3 pl-1 text-sm font-medium">
              <span className="grid size-7 place-items-center rounded-lg bg-white/25 text-xs font-bold">
                {partyInitials(candidate.party)}
              </span>
              {" "}
              <span>{candidate.party}</span>
            </p>
            <p className="mt-2 text-sm text-white/80">Candidatura a la {candidate.office}</p>
          </div>
          {candidate.photoUrl ? (
            <img
              src={candidate.photoUrl}
              alt=""
              className="size-28 shrink-0 rounded-[24px] border-4 border-white/30 object-cover object-top"
            />
          ) : (
            <span className="grid size-28 shrink-0 place-items-center rounded-[24px] border-4 border-white/30 bg-white/20 text-3xl font-bold">
              {candidate.name
                .split(" ")
                .slice(0, 2)
                .map((part) => part[0])
                .join("")
                .toUpperCase()}
            </span>
          )}
        </div>
      </header>
      <main className="animate-in fade-in slide-in-from-bottom-2 px-5 pb-8 duration-500 fill-mode-both motion-reduce:animate-none md:px-8">
        <div className="mx-auto max-w-3xl">
          <CandidateTabs slug={candidate.slug} />
          <section className="max-w-2xl pt-5">
            {candidate.age ? <p className="text-sm font-medium text-slate-500">{candidate.age} años</p> : null}
            <h2 className="mt-4 text-base font-semibold text-navy">Sobre la candidatura</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{candidate.bio}</p>
          </section>
        </div>
      </main>
    </>
  );
}
