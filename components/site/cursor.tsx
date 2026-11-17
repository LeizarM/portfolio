"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

/**
 * Seguidor del puntero. Solo en equipos con ratón; el cursor nativo se mantiene.
 * Los elementos con data-cursor="texto" lo agrandan y muestran ese texto.
 */
export function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ring.current;
    const text = label.current;
    if (!el || !text) return;
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    gsap.set(el, { xPercent: -50, yPercent: -50, autoAlpha: 0 });
    const xTo = gsap.quickTo(el, "x", { duration: 0.35, ease: "power3" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.35, ease: "power3" });

    const move = (e: PointerEvent) => {
      gsap.to(el, { autoAlpha: 1, duration: 0.2, overwrite: "auto" });
      xTo(e.clientX);
      yTo(e.clientY);
    };
    const over = (e: Event) => {
      const target = (e.target as Element | null)?.closest<HTMLElement>("[data-cursor]");
      if (target) {
        text.textContent = target.dataset.cursor ?? "";
        gsap.to(el, { width: 92, height: 92, duration: 0.3, ease: "power3.out", overwrite: "auto" });
        gsap.to(text, { autoAlpha: 1, duration: 0.2 });
      } else {
        gsap.to(el, { width: 14, height: 14, duration: 0.3, ease: "power3.out", overwrite: "auto" });
        gsap.to(text, { autoAlpha: 0, duration: 0.1 });
      }
    };
    const leave = () => gsap.to(el, { autoAlpha: 0, duration: 0.2 });

    window.addEventListener("pointermove", move, { passive: true });
    document.addEventListener("pointerover", over, { passive: true });
    document.documentElement.addEventListener("pointerleave", leave);
    return () => {
      window.removeEventListener("pointermove", move);
      document.removeEventListener("pointerover", over);
      document.documentElement.removeEventListener("pointerleave", leave);
    };
  }, []);

  return (
    <div
      ref={ring}
      aria-hidden
      className="type-narrow pointer-events-none invisible fixed left-0 top-0 z-[60] flex size-3.5 items-center justify-center rounded-full bg-foreground text-[0.95rem] font-bold text-background"
    >
      <span ref={label} className="invisible" />
    </div>
  );
}
