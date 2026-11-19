import { CompassMark } from "@/components/compass/compass-mark";
import { TopBar } from "@/components/shell/top-bar";
import { BookOpen, ChartColumn, Compass, ArrowRight } from "lucide-react";
import Link from "next/link";

const steps = [
  {
    icon: ChartColumn,
    title: "Responde preguntas",
    text: "sobre temas de la vida pública.",
  },
  {
    icon: Compass,
    title: "Descubre tu posición",
    text: "en el mapa político.",
  },
  {
    icon: BookOpen,
    title: "Lee explicaciones",
    text: "para entender diferentes posturas.",
  },
];

export function CompassLanding({ themes }: { themes: string[] }) {
  return (
    <>
      <TopBar home />
      <main className="animate-in fade-in px-5 pt-2 pb-8 duration-500 motion-reduce:animate-none md:px-8 lg:mx-auto lg:grid lg:max-w-6xl lg:grid-cols-2 lg:items-start lg:gap-x-10 lg:px-10 lg:pt-8">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-[2.4rem] leading-none font-extrabold tracking-tight text-navy">Mi Brújula</h1>
            <p className="mt-3 max-w-xs text-[15px] leading-relaxed text-slate-500">
              Explora tus ideas y comprende las diferentes posturas políticas.
            </p>
          </div>
          <CompassMark className="size-28 shrink-0" />
        </div>

        <section className="surface-card mt-6 rounded-[28px] px-4 py-4 lg:col-start-2 lg:row-start-1 lg:mt-0">
          <h2 className="text-base font-semibold text-navy">¿Cómo funciona?</h2>
          <ul className="mt-3 grid gap-3">
            {steps.map((step) => (
              <li key={step.title} className="flex items-center gap-3">
                <span className="grid size-11 place-items-center rounded-2xl bg-[#efeaff] text-brand">
                  <step.icon className="size-5" />
                </span>
                <p className="text-sm leading-snug text-slate-600">
                  <span className="font-semibold text-navy">{step.title}</span> {step.text}
                </p>
              </li>
            ))}
          </ul>
        </section>

        <Link
          href="/brujula/cuestionario"
          className="mt-5 flex h-12 w-full items-center justify-center gap-2 rounded-2xl bg-brand text-base font-semibold text-white lg:col-start-1 lg:w-fit lg:px-8"
        >
          Comenzar
          <ArrowRight className="size-4" />
        </Link>

        <section className="mt-8 lg:col-start-2 lg:mt-6">
          <h2 className="text-base font-semibold text-navy">Temas que exploramos</h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {themes.map((theme) => (
              <li key={theme} className="rounded-full bg-[#efeaff] px-3 py-1.5 text-sm font-medium text-brand">
                {theme}
              </li>
            ))}
          </ul>
        </section>
      </main>
    </>
  );
}
