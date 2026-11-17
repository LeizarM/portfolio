"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { lines, type LineId, type Locale, type Localized } from "@/lib/content";
import { paths, ui } from "@/lib/i18n";
import { lineClass } from "@/lib/lines";
import { cn } from "@/lib/utils";

gsap.registerPlugin(useGSAP);

/** Recorrido de cada línea. Solo tramos horizontales, verticales y a 45°. */
const ROUTES: Record<LineId, string> = {
  backend: "M30 60H150L300 210L410 320H470V40",
  mobile: "M30 360H150L300 210L410 100H560L610 150V270L560 320H470",
  data: "M30 210H390",
  infra: "M300 30V330L360 390H400L530 260",
};

interface Station {
  slug: string;
  label: Localized;
  x: number;
  y: number;
  r: number;
  lines: LineId[];
  text: { x: number; y: number; anchor: "start" | "middle" };
}

const STATIONS: Station[] = [
  {
    slug: "erp-distribucion",
    label: { es: "ERP distribución", en: "Distribution ERP" },
    x: 300,
    y: 210,
    r: 16,
    lines: ["backend", "mobile", "data", "infra"],
    text: { x: 323, y: 197, anchor: "start" },
  },
  {
    slug: "yahveh",
    label: { es: "Yahveh", en: "Yahveh" },
    x: 470,
    y: 100,
    r: 11,
    lines: ["backend", "mobile"],
    text: { x: 486, y: 82, anchor: "start" },
  },
  {
    slug: "mundial-2026",
    label: { es: "Mundial 2026", en: "Mundial 2026" },
    x: 470,
    y: 320,
    r: 11,
    lines: ["backend", "mobile", "infra"],
    text: { x: 488, y: 350, anchor: "start" },
  },
  {
    slug: "sap-b1-integridad",
    label: { es: "Reglas SAP B1", en: "SAP B1 rules" },
    x: 130,
    y: 210,
    r: 11,
    lines: ["data"],
    text: { x: 130, y: 244, anchor: "middle" },
  },
];

export function LineMap({ lang }: { lang: Locale }) {
  const root = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState<LineId[] | null>(null);
  const t = ui[lang].map;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const paths = gsap.utils.toArray<SVGPathElement>(".map-line");
        paths.forEach((p) => {
          const len = p.getTotalLength();
          gsap.set(p, { strokeDasharray: len, strokeDashoffset: len });
        });
        gsap
          .timeline({ defaults: { ease: "power2.inOut" } })
          .to(paths, { strokeDashoffset: 0, duration: 1.4, stagger: 0.18 })
          .from(
            ".map-station",
            { scale: 0, transformOrigin: "50% 50%", duration: 0.45, ease: "back.out(2.2)", stagger: 0.08 },
            "-=0.9",
          )
          .from(".map-label", { autoAlpha: 0, duration: 0.4, stagger: 0.04 }, "-=0.4")
          .set(paths, { clearProps: "strokeDasharray,strokeDashoffset" });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  const dimmed = (ids: LineId[]) => active !== null && !ids.some((id) => active.includes(id));

  return (
    <div ref={root}>
      <svg
        viewBox="0 0 640 410"
        role="img"
        aria-labelledby="mapa-titulo mapa-desc"
        className="h-auto w-full overflow-visible"
      >
        <title id="mapa-titulo">{t.title}</title>
        <desc id="mapa-desc">{t.desc}</desc>

        {lines.map((line) => (
          <path
            key={line.id}
            d={ROUTES[line.id]}
            fill="none"
            strokeWidth={9}
            strokeLinecap="round"
            strokeLinejoin="round"
            className={cn(
              "map-line transition-opacity duration-300",
              lineClass[line.id].stroke,
              dimmed([line.id]) && "opacity-20",
            )}
          />
        ))}

        {STATIONS.map((s) => (
          <Link
            key={s.slug}
            href={paths.project(lang, s.slug)}
            aria-label={s.label[lang]}
            onMouseEnter={() => setActive(s.lines)}
            onMouseLeave={() => setActive(null)}
            onFocus={() => setActive(s.lines)}
            onBlur={() => setActive(null)}
            className={cn("group/station outline-none transition-opacity duration-300", dimmed(s.lines) && "opacity-30")}
          >
            <circle cx={s.x} cy={s.y} r={s.r + 14} fill="transparent" />
            <circle
              cx={s.x}
              cy={s.y}
              r={s.r}
              strokeWidth={4}
              className="map-station fill-background stroke-foreground transition-[fill] duration-200 group-hover/station:fill-foreground group-focus-visible/station:fill-foreground"
            />
            <text
              x={s.text.x}
              y={s.text.y}
              textAnchor={s.text.anchor}
              className="map-label type-semiwide hidden fill-foreground text-[15px] font-bold underline-offset-4 group-hover/station:underline sm:block"
            >
              {s.label[lang]}
            </text>
          </Link>
        ))}
      </svg>

      <ul className="mt-5 flex flex-wrap gap-x-5 gap-y-2">
        {lines.map((line) => (
          <li key={line.id}>
            <a
              href={`#linea-${line.id}`}
              onMouseEnter={() => setActive([line.id])}
              onMouseLeave={() => setActive(null)}
              onFocus={() => setActive([line.id])}
              onBlur={() => setActive(null)}
              className="type-narrow inline-flex min-h-8 items-center gap-2 text-[0.95rem] font-semibold text-muted-foreground hover:text-foreground"
            >
              <span aria-hidden className={cn("h-1.5 w-6 rounded-full", lineClass[line.id].bg)} />
              {line.name[lang]}
            </a>
          </li>
        ))}
      </ul>

      <ul aria-label={t.stations} className="mt-4 grid grid-cols-2 gap-x-4 gap-y-1 sm:hidden">
        {STATIONS.map((s) => (
          <li key={s.slug}>
            <Link href={paths.project(lang, s.slug)} className="inline-flex min-h-11 items-center gap-2 font-semibold">
              <span aria-hidden className="size-3 rounded-full border-[3px] border-foreground" />
              {s.label[lang]}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
