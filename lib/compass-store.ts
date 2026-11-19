"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type CompassState = {
  answers: Record<string, string>;
  setAnswer: (questionId: string, optionId: string) => void;
  mergeAnswers: (incoming: Record<string, string>) => void;
};

export const useCompassStore = create<CompassState>()(
  persist(
    (set) => ({
      answers: {},
      setAnswer: (questionId, optionId) =>
        set((state) => ({ answers: { ...state.answers, [questionId]: optionId } })),
      mergeAnswers: (incoming) =>
        set((state) => ({ answers: { ...incoming, ...state.answers } })),
    }),
    { name: "sibic-compass", partialize: (state) => ({ answers: state.answers }) },
  ),
);
