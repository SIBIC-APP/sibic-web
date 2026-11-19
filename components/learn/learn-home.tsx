"use client";

import { LearnMark } from "@/components/learn/learn-mark";
import { TopBar } from "@/components/shell/top-bar";
import { useSavedLessons } from "@/lib/use-saved-lessons";
import type { HistoryLesson, HistoryRoute } from "@/lib/learn/types";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { Landmark, Scale, ScrollText } from "lucide-react";
import Link from "next/link";
import { useRef } from "react";

const icons = {
  origenes: Landmark,
  reforma: ScrollText,
  paz: Scale,
} as const;

const tones = ["bg-[#e4e9ff]", "bg-[#eadcff]", "bg-[#fde7f1]"];

export function LearnHome({
  lessons,
  routes,
  saved,
}: {
  lessons: HistoryLesson[];
  routes: HistoryRoute[];
  saved: string[];
}) {
  const root = useRef<HTMLElement>(null);
  const done = useSavedLessons(saved);
  const next = lessons.find((lesson) => !done.includes(lesson.id)) ?? null;
  const route = next ? routes.find((item) => item.slug === next.routeSlug) : null;
  const place = route ? route.lessons.findIndex((lesson) => lesson.id === next?.id) + 1 : 0;
  const earned = lessons.filter((lesson) => done.includes(lesson.id)).reduce((sum, lesson) => sum + lesson.xp, 0);
  const total = lessons.reduce((sum, lesson) => sum + lesson.xp, 0) || 1;
  const percent = Math.round((earned / total) * 100);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".learn-card", { y: 22, opacity: 0, stagger: 0.08, duration: 0.55, ease: "power2.out" });
      gsap.from(".learn-bar", { scaleX: 0, transformOrigin: "left center", duration: 0.8, ease: "power2.out", delay: 0.2 });
    },
    { scope: root },
  );

  return (
    <>
      <TopBar home />
      <main ref={root} className="px-5 pt-4 pb-8 md:px-8 lg:mx-auto lg:max-w-6xl lg:px-10 lg:pt-8">
        <div className="learn-card flex items-start justify-between gap-3">
          <div>
            <h1 className="text-[2.4rem] leading-none font-extrabold tracking-tight text-navy">Aprende</h1>
            <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-slate-500">
              Historia de Guatemala, en lecciones cortas.
            </p>
          </div>
          <LearnMark className="size-28 shrink-0" />
        </div>

        <div className="mt-4 lg:grid lg:grid-cols-3 lg:items-stretch lg:gap-3">
        <section className="learn-card rounded-[28px] bg-[#f4f1ff] px-4 py-4 lg:mt-0">
          <p className="text-sm font-semibold text-brand">Tu misión de hoy</p>
          <p className="mt-2 text-lg font-bold text-navy">{next ? next.title : "Ruta completa"}</p>
          <p className="mt-1 text-sm text-slate-500">
            {next && route ? `${place} / ${route.lessons.length} lecciones` : "Ya recorriste todas las lecciones."}
          </p>
        </section>

        <section className="learn-card mt-3 rounded-[28px] bg-white px-4 py-4 shadow-[0_10px_30px_rgb(27_37_89/6%)] lg:mt-0">
          <p className="text-sm font-semibold text-navy">Tu progreso</p>
          <p className="mt-1 text-sm text-slate-500">
            {percent}% · {earned} / {total} XP
          </p>
          <div className="mt-3 h-2 overflow-hidden rounded-full bg-[#efeaff]">
            <div className="learn-bar h-full rounded-full bg-brand" style={{ width: `${percent}%` }} />
          </div>
        </section>

        {next ? (
          <section className="learn-card mt-3 flex items-center justify-between gap-3 rounded-[28px] bg-white px-4 py-4 shadow-[0_10px_30px_rgb(27_37_89/6%)] lg:mt-0">
            <div>
              <p className="text-sm text-slate-500">Continúa aprendiendo</p>
              <p className="font-bold text-navy">{next.title}</p>
            </div>
            <Link href={`/aprende/${next.id}`} className="rounded-2xl bg-brand px-4 py-2 text-sm font-semibold text-white">
              Continuar
            </Link>
          </section>
        ) : null}
        </div>

        <div className="mt-6 flex items-center justify-between">
          <h2 className="font-bold text-navy">Explora rutas</h2>
          <Link href="/aprende/rutas" className="text-sm font-semibold text-brand">
            Ver todas
          </Link>
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2 lg:gap-4">
          {routes.map((item, index) => {
            const Icon = icons[item.slug as keyof typeof icons] ?? Landmark;
            return (
              <Link
                key={item.slug}
                href="/aprende/rutas"
                className={`learn-card rounded-[22px] px-3 py-3 lg:min-h-32 lg:px-5 lg:py-5 ${tones[index % tones.length]}`}
              >
                <Icon className="size-5 text-brand" />
                <p className="mt-2 text-sm leading-tight font-bold text-navy">{item.title}</p>
              </Link>
            );
          })}
        </div>
      </main>
    </>
  );
}
