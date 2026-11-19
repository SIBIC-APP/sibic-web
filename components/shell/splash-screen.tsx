"use client";

import { useEffect, useState } from "react";

const SEEN_KEY = "sibic-splash-seen";

export function SplashScreen() {
  const [phase, setPhase] = useState<"in" | "out" | "gone">("in");

  useEffect(() => {
    try {
      if (sessionStorage.getItem(SEEN_KEY) === "1") {
        setPhase("gone");
        return;
      }
    } catch {
      // sessionStorage can be blocked; the splash still runs.
    }

    const finish = () => {
      try {
        sessionStorage.setItem(SEEN_KEY, "1");
      } catch {
        // sessionStorage can be blocked; the splash still dismisses.
      }
    };

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      finish();
      setPhase("gone");
      return;
    }

    const hold = window.setTimeout(() => setPhase("out"), 2000);
    const done = window.setTimeout(() => {
      finish();
      setPhase("gone");
    }, 2300);
    return () => {
      window.clearTimeout(hold);
      window.clearTimeout(done);
    };
  }, []);

  if (phase === "gone") return null;

  return (
    <div
      data-splash-screen
      aria-hidden
      className={`fixed inset-0 z-50 flex items-center justify-center bg-white transition-opacity duration-300 ${
        phase === "out" ? "pointer-events-none opacity-0" : "opacity-100"
      }`}
    >
      <img src="/assets/sibic-logo.png" alt="" className="h-auto w-[min(78vw,28rem)]" />
    </div>
  );
}
