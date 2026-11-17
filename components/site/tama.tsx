"use client";

import { useEffect, useState } from "react";
import { PawPrint } from "lucide-react";
import type { Locale } from "@/lib/content";

const EVENT = "tama:miau";
const LINES: Record<Locale, string[]> = {
  es: [
    "Tama, jefa de QA: todo en orden. Miau.",
    "Tama revisó este despliegue. Encontró cero bugs y una caja vacía.",
    "Tama aprueba el sitio. Exige atún como pago.",
  ],
  en: [
    "Tama, head of QA: all clear. Meow.",
    "Tama reviewed this deploy. Found zero bugs and one empty box.",
    "Tama approves the site. Payment in tuna only.",
  ],
};

/** Botón discreto del pie que llama a Tama. */
export function TamaTrigger() {
  return (
    <button
      type="button"
      aria-label="Tama"
      title="?"
      onClick={() => window.dispatchEvent(new Event(EVENT))}
      className="inline-flex size-9 cursor-pointer items-center justify-center rounded-full opacity-30 transition-opacity hover:opacity-100"
    >
      <PawPrint aria-hidden className="size-4" />
    </button>
  );
}

/**
 * Huevo de pascua: Tama, la gata de Marcelo, cruza la pantalla.
 * Aparece al escribir "tama" en el teclado o al tocar la huella del pie de página.
 */
export function Tama({ lang }: { lang: Locale }) {
  const [run, setRun] = useState(0);
  const [line, setLine] = useState("");

  useEffect(() => {
    let typed = "";
    let timer = 0;
    const show = () => {
      const options = LINES[lang];
      setLine(options[Math.floor(Math.random() * options.length)] ?? "");
      setRun((n) => n + 1);
      window.clearTimeout(timer);
      timer = window.setTimeout(() => setLine(""), 9000);
    };
    const onKey = (e: KeyboardEvent) => {
      const target = e.target as HTMLElement | null;
      if (target?.closest("input, textarea, [contenteditable]")) return;
      typed = (typed + e.key.toLowerCase()).slice(-4);
      if (typed === "tama") show();
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener(EVENT, show);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener(EVENT, show);
      window.clearTimeout(timer);
    };
  }, [lang]);

  if (!line) return null;

  return (
    <div
      key={run}
      role="status"
      className="tama pointer-events-none fixed bottom-3 left-0 z-50 flex items-end gap-2"
    >
      <svg viewBox="0 0 120 80" className="h-16 w-24 text-foreground" fill="currentColor" aria-hidden>
        <path className="tama-tail" d="M22 44Q4 40 8 20" fill="none" stroke="currentColor" strokeWidth={6} strokeLinecap="round" />
        <rect x={20} y={34} width={62} height={26} rx={13} />
        <circle cx={88} cy={34} r={15} />
        <path d="M76 26L78 8L90 21ZM90 21L100 8L102 26Z" />
        <g className="tama-legs-a">
          <rect x={28} y={54} width={7} height={20} rx={3.5} />
          <rect x={68} y={54} width={7} height={20} rx={3.5} />
        </g>
        <g className="tama-legs-b">
          <rect x={40} y={54} width={7} height={20} rx={3.5} />
          <rect x={56} y={54} width={7} height={20} rx={3.5} />
        </g>
        <circle cx={93} cy={32} r={2.2} className="fill-background" />
        <path d="M100 37l12 -2M100 40l12 2" stroke="currentColor" strokeWidth={1.2} fill="none" />
      </svg>
      <p className="glass mb-10 max-w-[16rem] rounded-2xl rounded-bl-sm px-4 py-2 text-[0.9rem] font-medium">{line}</p>
    </div>
  );
}
