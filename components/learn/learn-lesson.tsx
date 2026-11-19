"use client";

import { TopBar } from "@/components/shell/top-bar";
import { saveLearnAnswerAction } from "@/lib/learn-actions";
import { useLearnStore } from "@/lib/learn-store";
import type { HistoryLesson } from "@/lib/learn/types";
import { useSavedLessons } from "@/lib/use-saved-lessons";
import { useGSAP } from "@gsap/react";
import { cn } from "cn";
import gsap from "gsap";
import Link from "next/link";
import { useRef, useState } from "react";
import { toast } from "sonner";

const keys = ["a", "b", "c"] as const;

export function LearnLesson({
  lesson,
  index,
  total,
  previousId,
  nextId,
  saved,
  signedIn,
}: {
  lesson: HistoryLesson;
  index: number;
  total: number;
  previousId: string | null;
  nextId: string | null;
  saved: string[];
  signedIn: boolean;
}) {
  const root = useRef<HTMLElement>(null);
  const complete = useLearnStore((state) => state.complete);
  const done = useSavedLessons(saved);
  const already = done.includes(lesson.id);
  const [step, setStep] = useState(0);
  const [choice, setChoice] = useState<string | null>(null);
  const questions = lesson.questions;
  const question = questions[step] ?? null;
  const lastQuestion = !question || step >= questions.length - 1;
  const finished = already || (( !question || choice === question.correct) && lastQuestion);

  useGSAP(
    () => {
      if (!finished) return;
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      gsap.from(".learn-success", { scale: 0.92, opacity: 0, duration: 0.35, ease: "back.out(1.6)" });
    },
    { scope: root, dependencies: [finished, step] },
  );

  function persist(questionId: string, value: string) {
    if (!signedIn) return;
    void saveLearnAnswerAction({ sectionId: lesson.id, questionId, value }).catch(() => {
      toast.error("No se pudo guardar la respuesta.");
    });
  }

  function choose(key: string) {
    if (!question || choice === question.correct) return;
    setChoice(key);
    persist(question.id, key);
    if (key !== question.correct) return;
    if (step >= questions.length - 1) {
      complete(lesson.id);
      return;
    }
    window.setTimeout(() => {
      setStep((current) => current + 1);
      setChoice(null);
    }, 350);
  }

  return (
    <>
      <TopBar title="Lección" backHref="/aprende/rutas" />
      <main ref={root} className="px-5 pt-4 pb-8 md:px-8">
        <p className="text-sm font-semibold text-brand">
          Lección {index} de {total} · {lesson.xp} XP
        </p>
        <h1 className="mt-3 text-[1.7rem] leading-tight font-extrabold tracking-tight text-navy">{lesson.title}</h1>
        <p className="mt-3 text-[15px] leading-relaxed text-slate-600">{lesson.body}</p>
        {question ? (
          <>
            <p className="mt-6 text-sm font-semibold text-brand">
              Pregunta {step + 1} de {questions.length}
            </p>
            <h2 className="mt-2 text-lg font-bold text-navy">{question.prompt}</h2>
            <div className="mt-4 grid gap-3">
              {question.options.map((option, optionIndex) => {
                const key = keys[optionIndex];
                const selected = choice === key;
                const good = selected && key === question.correct;
                const bad = selected && key !== question.correct;
                return (
                  <button
                    key={key}
                    type="button"
                    onClick={() => choose(key)}
                    className={cn(
                      "rounded-2xl border px-4 py-3 text-left text-sm font-medium text-navy",
                      good && "border-emerald-500 bg-emerald-50",
                      bad && "border-rose-300 bg-rose-50",
                      !selected && "border-slate-200 bg-white",
                    )}
                  >
                    {option}
                  </button>
                );
              })}
            </div>
          </>
        ) : (
          <p className="mt-6 text-sm text-slate-500">Esta lección no tiene preguntas.</p>
        )}
        <div className="mt-6 grid grid-cols-2 gap-3">
          {previousId ? (
            <Link
              href={`/aprende/${previousId}`}
              className="grid h-12 place-items-center rounded-2xl border border-slate-200 font-semibold text-navy"
            >
              Anterior
            </Link>
          ) : (
            <span className="grid h-12 place-items-center rounded-2xl border border-slate-200 font-semibold text-slate-300">
              Anterior
            </span>
          )}
          {finished ? (
            <Link
              href={nextId ? `/aprende/${nextId}` : "/aprende/rutas"}
              onClick={() => {
                if (questions.length > 0) return;
                complete(lesson.id);
                persist("", "done");
              }}
              className="learn-success grid h-12 place-items-center rounded-2xl bg-brand font-semibold text-white"
            >
              {nextId ? "Siguiente" : "Terminar"}
            </Link>
          ) : (
            <span className="grid h-12 place-items-center rounded-2xl bg-slate-200 font-semibold text-slate-400">
              Siguiente
            </span>
          )}
        </div>
      </main>
    </>
  );
}
