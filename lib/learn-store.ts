"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type LearnState = {
  completed: string[];
  complete: (id: string) => void;
  absorb: (ids: string[]) => void;
};

export const useLearnStore = create<LearnState>()(
  persist(
    (set) => ({
      completed: [],
      complete: (id) =>
        set((state) => ({
          completed: state.completed.includes(id) ? state.completed : [...state.completed, id],
        })),
      absorb: (ids) =>
        set((state) => {
          const extra = ids.filter((id) => !state.completed.includes(id));
          if (extra.length === 0) return state;
          return { completed: [...state.completed, ...extra] };
        }),
    }),
    { name: "sibic-learn", partialize: (state) => ({ completed: state.completed }) },
  ),
);
