"use client";

import { Bell, Menu, Search } from "lucide-react";
import { useUiStore } from "@/lib/ui-store";

export function HomeActions() {
  const setMenuOpen = useUiStore((state) => state.setMenuOpen);
  const setNotificationsOpen = useUiStore((state) => state.setNotificationsOpen);

  return (
    <div className="flex items-center">
      <button
        type="button"
        aria-label="Notificaciones"
        className="grid size-10 place-items-center rounded-full text-navy hover:bg-slate-50"
        onClick={() => setNotificationsOpen(true)}
      >
        <Bell className="size-5" />
      </button>
      <button
        type="button"
        aria-label="Menú"
        className="grid size-10 place-items-center rounded-full text-navy hover:bg-slate-50"
        onClick={() => setMenuOpen(true)}
      >
        <Menu className="size-5" />
      </button>
    </div>
  );
}

export function SearchFocus({ searchId }: { searchId: string }) {
  return (
    <button
      type="button"
      aria-label="Buscar"
      className="grid size-10 place-items-center rounded-full text-navy hover:bg-slate-50"
      onClick={() => document.getElementById(searchId)?.focus()}
    >
      <Search className="size-5" />
    </button>
  );
}
