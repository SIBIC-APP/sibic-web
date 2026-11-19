"use client";

import { BookOpen, ChartColumn, Compass, House, Users } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "cn";

const items = [
  { href: "/", label: "Inicio", icon: House, match: (path: string) => path === "/" },
  {
    href: "/elecciones",
    label: "Elecciones",
    icon: Users,
    match: (path: string) =>
      path.startsWith("/elecciones") || path.startsWith("/candidatos") || path.startsWith("/propuestas"),
  },
  {
    href: "/compara",
    label: "Compara",
    icon: ChartColumn,
    match: (path: string) => path.startsWith("/compara"),
  },
  {
    href: "/aprende",
    label: "Aprende",
    icon: BookOpen,
    match: (path: string) => path.startsWith("/aprende"),
  },
  {
    href: "/brujula",
    label: "Mi Brújula",
    icon: Compass,
    match: (path: string) => path.startsWith("/brujula"),
  },
];

export function BottomNav() {
  const pathname = usePathname();

  return (
    <nav className="z-30 shrink-0 border-t border-slate-100 bg-white pb-[env(safe-area-inset-bottom)] lg:order-1 lg:w-60 lg:border-t-0 lg:border-r lg:pb-0">
      <ul className="grid h-16 grid-cols-5 lg:flex lg:h-auto lg:flex-col lg:gap-1 lg:p-4 lg:pt-6">
        {items.map((item) => {
          const active = item.match(pathname);
          const Icon = item.icon;
          return (
            <li key={item.href}>
              <Link
                href={item.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "flex h-full flex-col items-center justify-center gap-1 px-1 text-center text-[11px] leading-tight font-medium transition-colors motion-reduce:transition-none lg:h-12 lg:flex-row lg:justify-start lg:gap-3 lg:rounded-2xl lg:px-3 lg:text-sm",
                  active ? "text-brand lg:bg-[#efeaff]" : "text-slate-400",
                )}
              >
                <Icon className="size-5" strokeWidth={active ? 2.4 : 2} />
                {item.label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
