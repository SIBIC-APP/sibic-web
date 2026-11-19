"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { authClient } from "@/lib/auth-client";
import { useUiStore } from "@/lib/ui-store";
import { cn } from "cn";
import Link from "next/link";
import { useRouter } from "next/navigation";

const upcoming = ["Historia", "Comunidad"];

export function MenuSheet() {
  const router = useRouter();
  const open = useUiStore((state) => state.menuOpen);
  const setOpen = useUiStore((state) => state.setMenuOpen);
  const { data } = authClient.useSession();

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="w-full max-w-md">
        <SheetHeader>
          <SheetTitle className="text-navy">SIBIC</SheetTitle>
          <SheetDescription>La exploración de candidaturas no requiere cuenta.</SheetDescription>
        </SheetHeader>
        <div className="flex flex-col gap-4 px-4">
          {data?.user ? (
            <div className="rounded-2xl bg-[#f6f7fb] p-4">
              <p className="font-semibold text-navy">{data.user.name}</p>
              <p className="text-sm text-slate-500">{data.user.email}</p>
              <button
                type="button"
                className={cn(buttonVariants({ variant: "outline" }), "mt-3 h-10 w-full rounded-xl")}
                onClick={async () => {
                  await authClient.signOut();
                  setOpen(false);
                  router.push("/");
                  router.refresh();
                }}
              >
                Cerrar sesión
              </button>
            </div>
          ) : (
            <div className="grid gap-2">
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className={cn(buttonVariants(), "h-11 rounded-xl")}
              >
                Iniciar sesión
              </Link>
              <Link
                href="/registro"
                onClick={() => setOpen(false)}
                className={cn(buttonVariants({ variant: "outline" }), "h-11 rounded-xl")}
              >
                Crear cuenta
              </Link>
            </div>
          )}
          <Link
            href="/aprende"
            onClick={() => setOpen(false)}
            className="border-t border-slate-100 py-3 text-sm font-semibold text-navy"
          >
            Aprende
          </Link>
          <Link
            href="/brujula"
            onClick={() => setOpen(false)}
            className="py-3 text-sm font-semibold text-navy"
          >
            Mi Brújula
          </Link>
          <ul className="divide-y divide-slate-100">
            {upcoming.map((item) => (
              <li key={item} className="flex items-center justify-between py-3 text-sm">
                <span className="text-slate-400">{item}</span>
                <span className="rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-500">
                  Próximamente
                </span>
              </li>
            ))}
          </ul>
        </div>
      </SheetContent>
    </Sheet>
  );
}
