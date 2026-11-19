"use client";

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useUiStore } from "@/lib/ui-store";

export function NotificationsSheet() {
  const open = useUiStore((state) => state.notificationsOpen);
  const setOpen = useUiStore((state) => state.setNotificationsOpen);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent side="right" className="w-full max-w-md">
        <SheetHeader>
          <SheetTitle className="text-navy">Notificaciones</SheetTitle>
          <SheetDescription>Sin notificaciones.</SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
