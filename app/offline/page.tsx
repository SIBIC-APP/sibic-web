import { TopBar } from "@/components/shell/top-bar";

export const metadata = { title: "Sin conexión" };

export default function OfflinePage() {
  return (
    <>
      <TopBar title="Sin conexión" home={false} />
      <main className="px-5 pt-8">
        <h1 className="text-2xl font-extrabold text-navy">No hay conexión</h1>
        <p className="mt-2 text-sm leading-relaxed text-slate-500">
          SIBIC necesita la red para leer las candidaturas. Vuelve a intentar cuando tengas conexión.
        </p>
      </main>
    </>
  );
}
