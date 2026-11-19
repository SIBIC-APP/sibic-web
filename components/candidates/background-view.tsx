"use client";

import { useCatalog } from "@/components/catalog/use-catalog";
import { CandidateTabs } from "@/components/candidates/candidate-tabs";
import { CAREER_TIMELINES } from "@/lib/candidates/timelines";
import { TopBar } from "@/components/shell/top-bar";
import { findCandidate } from "@/lib/catalog-model";
import type { Catalog } from "@/lib/types";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useRef } from "react";

gsap.registerPlugin(ScrollTrigger);

export function BackgroundView({ catalog, slug }: { catalog: Catalog; slug: string }) {
  const data = useCatalog(catalog);
  const candidate = findCandidate(data, slug);
  const timeline = useRef<HTMLOListElement>(null);
  const events = candidate ? (CAREER_TIMELINES[candidate.id] ?? []) : [];

  useGSAP(
    () => {
      if (!events.length) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.utils.toArray<HTMLElement>(".timeline-item").forEach((item) => {
        gsap.from(item, {
          y: 28,
          opacity: 0,
          duration: 0.7,
          ease: "power2.out",
          scrollTrigger: {
            trigger: item,
            start: "top 88%",
          },
        });
      });
    },
    { scope: timeline, dependencies: [candidate?.id] },
  );

  if (!candidate) return null;

  return (
    <>
      <TopBar backHref={`/candidatos/${candidate.slug}`} title={candidate.name} />
      <main className="px-5 pb-8 md:px-8 xl:px-12">
        <CandidateTabs slug={candidate.slug} />
        <section className="max-w-2xl pt-5">
          <h2 className="text-base font-semibold text-navy">Antecedentes</h2>
          {events.length ? (
            <ol ref={timeline} className="relative mt-6 border-l border-brand/30 pl-6">
              {events.map((event) => (
                <li key={`${event.year}-${event.title}`} className="timeline-item relative pb-8 last:pb-0">
                  <span className="absolute top-1.5 -left-[31px] size-3 rounded-full border-2 border-white bg-brand" />
                  <p className="text-sm font-semibold text-brand">{event.year}</p>
                  <h3 className="mt-1 text-base font-bold text-navy">{event.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-slate-600">{event.detail}</p>
                </li>
              ))}
            </ol>
          ) : null}
          {candidate.background ? (
            <p className="mt-6 text-[15px] leading-relaxed text-slate-600">{candidate.background}</p>
          ) : null}
        </section>
      </main>
    </>
  );
}
