"use client";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";

export default function AppError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return (
    <main className="px-5 py-16">
      <h1 className="text-2xl font-extrabold text-navy">No pudimos cargar SIBIC</h1>
      <p className="mt-2 text-sm leading-relaxed text-slate-500">
        Revisa la conexión con Google Sheets e inténtalo de nuevo.
      </p>
      <button type="button" onClick={() => reset()} className={cn(buttonVariants(), "mt-6 h-11 rounded-xl")}>
        Reintentar
      </button>
    </main>
  );
}
