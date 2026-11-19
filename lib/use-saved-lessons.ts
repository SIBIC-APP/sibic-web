"use client";

import { useLearnStore } from "@/lib/learn-store";
import { useEffect, useState } from "react";

export function useSavedLessons(saved: string[]) {
  const completed = useLearnStore((state) => state.completed);
  const absorb = useLearnStore((state) => state.absorb);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const finish = () => {
      absorb(saved);
      setReady(true);
    };
    if (useLearnStore.persist.hasHydrated()) finish();
    return useLearnStore.persist.onFinishHydration(finish);
  }, [absorb, saved]);

  return ready ? completed : saved;
}
