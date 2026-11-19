"use client";

import { TopBar } from "@/components/shell/top-bar";
import type { CompassQuestion } from "@/lib/compass/questions";
import { isComplete, scoreAnswers } from "@/lib/compass/score";
import { useCompassStore } from "@/lib/compass-store";
import { Share2 } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export function ResultView({
  initialAnswers,
  questions,
}: {
  initialAnswers: Record<string, string>;
  questions: CompassQuestion[];
}) {
  const answers = useCompassStore((state) => state.answers);
  const mergeAnswers = useCompassStore((state) => state.mergeAnswers);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const apply = () => {
      mergeAnswers(initialAnswers);
      setHydrated(true);
    };
    if (useCompassStore.persist.hasHydrated()) apply();
    return useCompassStore.persist.onFinishHydration(apply);
  }, [initialAnswers, mergeAnswers]);

  const score = scoreAnswers(questions, answers);
  const complete = isComplete(questions, answers);

  async function share() {
    if (!score) return;
    const text = `Mi Brújula en SIBIC: ${score.label}. Es un punto de partida para explorar ideas, no una afiliación política.`;
    const params = new URLSearchParams({
      e: score.economic.toFixed(3),
      a: score.authority.toFixed(3),
    });
    const url = `${window.location.origin}/brujula/resultado?${params}`;
    try {
      if (navigator.share) {
        await navigator.share({ title: "Mi Brújula", text, url });
        return;
      }
      await navigator.clipboard.writeText(`${text} ${url}`);
      toast.success("Texto copiado");
    } catch {
      toast.error("No se pudo compartir.");
    }
  }

  return (
    <>
      <TopBar title="Tu Brújula" backHref="/brujula" />
      <main className="px-5 pt-4 pb-8 md:px-8">
        {!hydrated || !score || !complete ? (
          <div className="rounded-[28px] bg-[#f6f7fb] px-4 py-5">
            <p className="font-semibold text-navy">Todavía faltan respuestas</p>
            <p className="mt-2 text-sm text-slate-500">
              {hydrated
                ? `Llevas ${score?.answered ?? 0} de ${questions.length}.`
                : "Cargando tus respuestas."}
            </p>
            <Link href="/brujula/cuestionario" className="mt-4 inline-flex font-semibold text-brand">
              Continuar cuestionario
            </Link>
          </div>
        ) : (
          <>
            <p className="text-[15px] leading-relaxed text-slate-500">
              ¡Gracias por completar el cuestionario! Este es tu resultado:
            </p>
            <CompassChart economic={score.economic} authority={score.authority} />
            <p className="mt-5 text-sm text-slate-400">Tu posición</p>
            <h2 className="text-2xl font-extrabold tracking-tight text-navy">{score.label}</h2>
            <p className="mt-2 text-[15px] leading-relaxed text-slate-600">{score.explanation}</p>
            <button
              type="button"
              onClick={share}
              className="mt-6 flex h-12 w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 font-semibold text-navy"
            >
              <Share2 className="size-4" />
              Comparte tu brújula
            </button>
          </>
        )}
      </main>
    </>
  );
}

function CompassChart({ economic, authority }: { economic: number; authority: number }) {
  const left = ((economic + 1) / 2) * 100;
  const top = ((1 - authority) / 2) * 100;

  return (
    <div className="relative mt-5 aspect-square w-full overflow-hidden rounded-[28px] border border-slate-100">
      <div className="absolute inset-0 grid grid-cols-2 grid-rows-2">
        <span className="bg-[#e5f6d8]" />
        <span className="bg-[#fff1c2]" />
        <span className="bg-[#f8d4d0]" />
        <span className="bg-[#d9e6ff]" />
      </div>
      <span className="absolute top-3 left-1/2 -translate-x-1/2 text-xs font-semibold text-navy/70">Autoritario</span>
      <span className="absolute bottom-3 left-1/2 -translate-x-1/2 text-xs font-semibold text-navy/70">Libertario</span>
      <span className="absolute top-1/2 left-3 max-w-16 -translate-y-1/2 text-xs leading-tight font-semibold text-navy/70">
        Izquierda económica
      </span>
      <span className="absolute top-1/2 right-3 max-w-16 -translate-y-1/2 text-right text-xs leading-tight font-semibold text-navy/70">
        Derecha económica
      </span>
      <span
        className="absolute size-4 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-white bg-brand shadow"
        style={{ left: `${left}%`, top: `${top}%` }}
      />
    </div>
  );
}
