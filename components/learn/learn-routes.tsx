"use client";

import { TopBar } from "@/components/shell/top-bar";
import { useSavedLessons } from "@/lib/use-saved-lessons";
import type { HistoryLesson, HistoryRoute, LearnLevel } from "@/lib/learn/types";
import { useGSAP } from "@gsap/react";
import { cn } from "cn";
import gsap from "gsap";
import { Check } from "lucide-react";
import Link from "next/link";
import { useRef, useState } from "react";

const labels: Record<LearnLevel, string> = {
  principiante: "Principiante",
  intermedio: "Intermedio",
  avanzado: "Avanzado",
};

const filters = ["Todas", "En progreso", "Completadas"] as const;
const shifts = ["translate-x-0", "translate-x-16", "translate-x-0", "-translate-x-16"];

export function LearnRoutes({ routes, saved }: { routes: HistoryRoute[]; saved: string[] }) {
  const root = useRef<HTMLElement>(null);
  const done = new Set(useSavedLessons(saved));
  const [filter, setFilter] = useState<(typeof filters)[number]>("Todas");
  const ordered = routes.flatMap((route) => route.lessons);
  const current = ordered.find((lesson) => !done.has(lesson.id)) ?? null;

  function unlocked(lesson: HistoryLesson) {
    const place = ordered.findIndex((item) => item.id === lesson.id);
    if (place <= 0) return true;
    return ordered.slice(0, place).every((item) => done.has(item.id));
  }

  function routeState(route: HistoryRoute) {
    const finished = route.lessons.filter((lesson) => done.has(lesson.id)).length;
    if (finished === 0) return "nueva";
    if (finished === route.lessons.length) return "completa";
    return "curso";
  }

  function visibleLesson(lesson: HistoryLesson) {
    if (filter === "Completadas") return done.has(lesson.id);
    if (filter === "En progreso") {
      const route = routes.find((item) => item.slug === lesson.routeSlug);
      return route ? routeState(route) === "curso" : false;
    }
    return true;
  }

  const anyVisible = ordered.some(visibleLesson);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.to(".learn-current", {
        y: -8,
        duration: 0.7,
        repeat: -1,
        yoyo: true,
        ease: "sine.inOut",
      });
    },
    { scope: root, dependencies: [filter, current?.id] },
  );

  return (
    <>
      <TopBar title="Rutas de aprendizaje" backHref="/aprende" />
      <main ref={root} className="px-5 pt-4 pb-10 md:px-8">
        <div className="flex gap-2">
          {filters.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setFilter(item)}
              className={cn(
                "h-9 rounded-full px-3 text-sm font-semibold",
                filter === item ? "bg-brand text-white" : "bg-[#f4f1ff] text-navy",
              )}
            >
              {item}
            </button>
          ))}
        </div>
        {(["principiante", "intermedio", "avanzado"] as LearnLevel[]).map((level) => {
          const lessons = routes
            .filter((route) => route.level === level)
            .flatMap((route) => route.lessons)
            .filter(visibleLesson);
          if (!lessons.length) return null;
          return (
            <section key={level} className="mt-8">
              <h2 className="rounded-2xl bg-[#efeaff] px-4 py-3 text-center text-sm font-extrabold tracking-wide text-brand uppercase">
                {labels[level]}
              </h2>
              <div className="relative mx-auto mt-2 max-w-sm">
                <span className="absolute top-6 bottom-6 left-1/2 w-1 -translate-x-1/2 rounded-full bg-brand/20" />
                <ol className="relative grid gap-2 py-4">
                  {lessons.map((lesson, index) => {
                    const state = done.has(lesson.id) ? "hecha" : lesson.id === current?.id ? "actual" : "cerrada";
                    const open = state !== "cerrada" && unlocked(lesson);
                    const circle = (
                      <span
                        className={cn(
                          "grid place-items-center rounded-full border-4 border-white shadow-[0_8px_0_rgb(27_37_89/8%)]",
                          state === "actual" && "learn-current size-20 bg-brand text-white",
                          state === "hecha" && "size-16 bg-brand text-white",
                          state === "cerrada" && "size-16 bg-slate-200 text-slate-400",
                        )}
                      >
                        {state === "hecha" ? <Check className="size-6" /> : <span className="text-sm font-bold">{index + 1}</span>}
                      </span>
                    );
                    return (
                      <li key={lesson.id} className={cn("flex justify-center", shifts[index % shifts.length])}>
                        {open ? (
                          <Link href={`/aprende/${lesson.id}`} className="flex flex-col items-center">
                            {circle}
                            {state === "actual" ? (
                              <span className="mt-2 max-w-36 text-center text-sm font-bold text-navy">{lesson.title}</span>
                            ) : null}
                          </Link>
                        ) : (
                          <span className="flex flex-col items-center">{circle}</span>
                        )}
                      </li>
                    );
                  })}
                </ol>
              </div>
            </section>
          );
        })}
        {anyVisible ? null : <p className="mt-8 text-sm text-slate-500">Todavía no hay lecciones en este filtro.</p>}
      </main>
    </>
  );
}
