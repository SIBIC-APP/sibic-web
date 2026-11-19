"use client";

import { cn } from "cn";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect } from "react";
import { useUiStore, type ProfileTab } from "@/lib/ui-store";

const tabs: { id: ProfileTab; label: string; href: (slug: string) => string }[] = [
  { id: "resumen", label: "Resumen", href: (slug) => `/candidatos/${slug}` },
  { id: "propuestas", label: "Propuestas", href: (slug) => `/candidatos/${slug}/propuestas` },
  { id: "antecedentes", label: "Antecedentes", href: (slug) => `/candidatos/${slug}/antecedentes` },
];

export function CandidateTabs({ slug }: { slug: string }) {
  const pathname = usePathname();
  const setProfileTab = useUiStore((state) => state.setProfileTab);
  const active: ProfileTab = pathname.endsWith("/propuestas")
    ? "propuestas"
    : pathname.endsWith("/antecedentes")
      ? "antecedentes"
      : "resumen";

  useEffect(() => {
    setProfileTab(active);
  }, [active, setProfileTab]);

  return (
    <nav className="grid grid-cols-3 border-b border-slate-200" aria-label="Ficha de la candidatura">
      {tabs.map((tab) => {
        const isActive = tab.id === active;
        return (
          <Link
            key={tab.id}
            href={tab.href(slug)}
            aria-current={isActive ? "page" : undefined}
            className={cn(
              "border-b-2 py-3 text-center text-sm font-medium",
              isActive ? "border-brand text-brand" : "border-transparent text-slate-400",
            )}
          >
            {tab.label}
          </Link>
        );
      })}
    </nav>
  );
}
