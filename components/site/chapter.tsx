"use client";

import { useEffect, useRef } from "react";

/**
 * Capítulo a pantalla completa: ocupa más alto que la ventana y su contenido queda fijo
 * mientras se recorre. Publica el avance (0 a 1) en la variable CSS --p para que el
 * contenido lo use. Sin JavaScript o con movimiento reducido, --p vale 1.
 */
export function Chapter({ className, children }: { className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    let active = false;

    const update = () => {
      frame = 0;
      const rect = el.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      const p = travel > 40 ? -rect.top / travel : (window.innerHeight - rect.top) / (window.innerHeight * 0.9);
      el.style.setProperty("--p", Math.min(Math.max(p, 0), 1).toFixed(4));
    };
    const onScroll = () => {
      if (active && !frame) frame = requestAnimationFrame(update);
    };
    const observer = new IntersectionObserver(([entry]) => {
      active = entry?.isIntersecting ?? false;
      if (active) update();
    });
    observer.observe(el);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    update();

    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <article ref={ref} className={className}>
      {children}
    </article>
  );
}
