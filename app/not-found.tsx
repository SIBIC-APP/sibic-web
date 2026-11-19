import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "cn";

export default function NotFound() {
  return (
    <main className="px-5 py-16">
      <h1 className="text-2xl font-extrabold text-navy">No encontramos esa página</h1>
      <p className="mt-2 text-sm text-slate-500">La candidatura, el tema o la propuesta no está en la hoja.</p>
      <Link href="/" className={cn(buttonVariants(), "mt-6 h-11 rounded-xl")}>
        Volver al inicio
      </Link>
    </main>
  );
}
