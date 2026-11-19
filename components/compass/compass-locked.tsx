import { TopBar } from "@/components/shell/top-bar";
import Link from "next/link";

export function CompassLocked() {
  return (
    <>
      <TopBar title="Mi Brújula" backHref="/" />
      <main className="px-5 pt-4 md:px-8">
        <div className="rounded-[28px] bg-white px-4 py-5 shadow-[0_10px_30px_rgb(27_37_89/6%)]">
          <p className="text-lg font-semibold text-navy">Inicia sesión para usar Mi Brújula</p>
          <p className="mt-2 text-sm leading-relaxed text-slate-500">
            Esta sección guarda tus respuestas y tu resultado en tu cuenta.
          </p>
          <Link
            href="/login"
            className="mt-4 inline-flex h-11 items-center rounded-2xl bg-brand px-4 text-sm font-semibold text-white"
          >
            Iniciar sesión
          </Link>
        </div>
      </main>
    </>
  );
}
