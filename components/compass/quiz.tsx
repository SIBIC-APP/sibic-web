"use client";

import { TopBar } from "@/components/shell/top-bar";
import { authClient } from "@/lib/auth-client";
import { saveCompassResponseAction } from "@/lib/compass-actions";
import type { CompassQuestion } from "@/lib/compass/questions";
import { useCompassStore } from "@/lib/compass-store";
import { cn } from "cn";
import { Check } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function Quiz({
  initialAnswers,
  questions,
}: {
  initialAnswers: Record<string, string>;
  questions: CompassQuestion[];
}) {
  const router = useRouter();
  const answers = useCompassStore((state) => state.answers);
  const setAnswer = useCompassStore((state) => state.setAnswer);
  const mergeAnswers = useCompassStore((state) => state.mergeAnswers);
  const { data: session } = authClient.useSession();
  const [index, setIndex] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const place = () => {
      mergeAnswers(initialAnswers);
      const start = questions.findIndex((item) => !useCompassStore.getState().answers[item.id]);
      setIndex(start === -1 ? Math.max(questions.length - 1, 0) : start);
      setReady(true);
    };
    if (useCompassStore.persist.hasHydrated()) place();
    return useCompassStore.persist.onFinishHydration(place);
  }, [initialAnswers, mergeAnswers, questions]);

  const question = questions[index];
  if (!question) {
    return (
      <>
        <TopBar title="Cuestionario" backHref="/brujula" />
        <main className="px-5 pt-4">
          <p className="text-sm text-slate-500">Todavía no hay preguntas en la hoja.</p>
        </main>
      </>
    );
  }
  const selected = answers[question.id];
  const last = index === questions.length - 1;

  async function choose(optionId: string) {
    setAnswer(question.id, optionId);
    if (!session?.user) return;
    try {
      await saveCompassResponseAction({ questionId: question.id, value: optionId });
    } catch {
      toast.error("No se pudo guardar la respuesta.");
    }
  }

  function next() {
    if (!selected) return;
    if (last) {
      router.push("/brujula/resultado");
      return;
    }
    setIndex((current) => current + 1);
  }

  return (
    <>
      <TopBar title="Cuestionario" backHref="/brujula" />
      <main className="flex flex-col px-5 pt-4 pb-6 md:px-8">
        <p className="text-sm font-medium text-brand">
          Pregunta {index + 1} de {questions.length}
        </p>
        <h2 className="mt-3 text-[1.65rem] leading-tight font-extrabold tracking-tight text-navy">
          {question.prompt}
        </h2>
        <fieldset className="mt-5 grid gap-3" disabled={!ready}>
          <legend className="sr-only">{question.prompt}</legend>
          {question.options.map((option) => {
            const active = selected === option.id;
            return (
              <label
                key={option.id}
                className={cn(
                  "flex cursor-pointer items-start gap-3 rounded-2xl border px-4 py-3 text-sm leading-snug text-navy",
                  active ? "border-brand bg-[#f7f5ff]" : "border-slate-200 bg-white",
                )}
              >
                <input
                  type="radio"
                  name={question.id}
                  value={option.id}
                  checked={active}
                  onChange={() => choose(option.id)}
                  className="sr-only"
                />
                <span
                  className={cn(
                    "mt-0.5 grid size-5 shrink-0 place-items-center rounded-md border",
                    active ? "border-brand bg-brand text-white" : "border-slate-300",
                  )}
                >
                  {active ? <Check className="size-3.5" /> : null}
                </span>
                {option.label}
              </label>
            );
          })}
        </fieldset>
        <div className="mt-6 grid grid-cols-2 gap-3">
          <button
            type="button"
            disabled={index === 0}
            onClick={() => setIndex((current) => current - 1)}
            className="h-12 rounded-2xl border border-slate-200 font-semibold text-navy disabled:opacity-40"
          >
            Anterior
          </button>
          <button
            type="button"
            disabled={!selected}
            onClick={next}
            className="h-12 rounded-2xl bg-brand font-semibold text-white disabled:opacity-40"
          >
            {last ? "Ver resultado" : "Siguiente"}
          </button>
        </div>
      </main>
    </>
  );
}
