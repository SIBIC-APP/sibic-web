"use client";

import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useRef } from "react";

const ticks = [
  { x1: 60, y1: 16, x2: 60, y2: 26, major: true },
  { x1: 104, y1: 60, x2: 94, y2: 60, major: true },
  { x1: 60, y1: 104, x2: 60, y2: 94, major: true },
  { x1: 16, y1: 60, x2: 26, y2: 60, major: true },
  { x1: 91, y1: 29, x2: 85, y2: 35, major: false },
  { x1: 91, y1: 91, x2: 85, y2: 85, major: false },
  { x1: 29, y1: 91, x2: 35, y2: 85, major: false },
  { x1: 29, y1: 29, x2: 35, y2: 35, major: false },
];

export function CompassMark({ className, face = true }: { className?: string; face?: boolean }) {
  const root = useRef<SVGSVGElement>(null);

  useGSAP(
    () => {
      if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
      const origin = "60 60";
      gsap.from(".compass-ring", {
        scale: 0.84,
        opacity: 0,
        duration: 0.65,
        ease: "power2.out",
        svgOrigin: origin,
      });
      gsap.from(".compass-needle", {
        rotation: -150,
        duration: 1.15,
        ease: "back.out(1.7)",
        svgOrigin: origin,
      });
    },
    { scope: root },
  );

  return (
    <svg ref={root} viewBox="0 0 120 120" className={className} aria-hidden>
      <g className="compass-ring">
        {face ? <circle cx="60" cy="60" r="54" fill="#f4f1ff" /> : null}
        <circle cx="60" cy="60" r="46" fill="none" stroke="#6d5efc" strokeWidth="3" />
        <circle cx="60" cy="60" r="36" fill="none" stroke="#ddd6fe" strokeWidth="1.5" />
        {ticks.map((tick) => (
          <line
            key={`${tick.x1}-${tick.y1}`}
            x1={tick.x1}
            y1={tick.y1}
            x2={tick.x2}
            y2={tick.y2}
            stroke={tick.major ? "#1b2559" : "#a78bfa"}
            strokeWidth={tick.major ? 3 : 1.5}
            strokeLinecap="round"
          />
        ))}
      </g>
      <g className="compass-needle">
        <path d="M60 24 L68 62 L60 54 L52 62 Z" fill="#6d5efc" />
        <path d="M60 96 L52 62 L60 70 L68 62 Z" fill="#c4b8ff" />
      </g>
      <circle cx="60" cy="60" r="6" fill="#1b2559" />
      <circle cx="60" cy="60" r="2.5" fill="white" />
    </svg>
  );
}
