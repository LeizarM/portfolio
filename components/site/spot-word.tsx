"use client";

import { useEffect, useRef } from "react";

/** Palabra gigante a oscuras que se ilumina donde pasa el puntero. Es decorativa. */
export function SpotWord({ children }: { children: string }) {
  const ref = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const onMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      el.style.setProperty("--mx", `${e.clientX - rect.left}px`);
      el.style.setProperty("--my", `${e.clientY - rect.top}px`);
    };
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, []);

  return (
    <p ref={ref} aria-hidden className="spot-word">
      {children}
    </p>
  );
}
