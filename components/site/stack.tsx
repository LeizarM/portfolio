"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { lines, type Locale } from "@/lib/content";
import { ui } from "@/lib/i18n";
import { lineClass } from "@/lib/lines";
import { cn } from "@/lib/utils";
import { Section } from "./section";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** Cada línea del mapa, desplegada: sus tecnologías son las paradas. */
export function Stack({ lang }: { lang: Locale }) {
  const root = useRef<HTMLDivElement>(null);
  const t = ui[lang].stack;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference) and (min-width: 768px)", () => {
        gsap.utils.toArray<HTMLElement>(".stack-row").forEach((row) => {
          const st = { trigger: row, start: "top 82%", once: true };
          gsap.from(row.querySelector(".stack-track"), {
            scaleX: 0,
            transformOrigin: "left center",
            duration: 1.1,
            ease: "power3.inOut",
            scrollTrigger: st,
          });
          gsap.from(row.querySelectorAll(".stack-dot"), {
            scale: 0,
            duration: 0.45,
            ease: "back.out(2.4)",
            stagger: 0.12,
            delay: 0.25,
            scrollTrigger: st,
          });
          gsap.from(row.querySelectorAll(".stack-item"), {
            y: 18,
            autoAlpha: 0,
            duration: 0.6,
            ease: "power3.out",
            stagger: 0.12,
            delay: 0.35,
            scrollTrigger: st,
          });
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <Section id="stack" title={t.title} intro={t.intro}>
      <div ref={root} className="space-y-14">
        {lines.map((line) => (
          <div key={line.id} id={`linea-${line.id}`} className="scroll-mt-24">
            <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:gap-5">
              <h3 className="type-wide text-[clamp(1.5rem,2.6vw,2.1rem)] font-extrabold tracking-tight">{line.name[lang]}</h3>
              <p className="text-muted-foreground">{line.summary[lang]}</p>
            </div>

            <div className="stack-row relative mt-7">
              <span
                aria-hidden
                className={cn(
                  "stack-track absolute left-[7px] top-0 h-full w-1.5 rounded-full md:left-0 md:top-[7px] md:h-1.5 md:w-full",
                  lineClass[line.id].bg,
                )}
              />
              <ul className="relative grid gap-6 md:grid-cols-5 md:gap-5">
                {line.tech.map((tech) => (
                  <li key={tech.name} className="relative pl-9 md:pl-0 md:pt-9">
                    <span
                      aria-hidden
                      className="stack-dot absolute left-0 top-1 size-5 rounded-full border-4 border-foreground bg-background md:top-0"
                    />
                    <div className="stack-item">
                      <p className="font-bold leading-snug">{tech.name}</p>
                      <p className="mt-1 text-[0.95rem] leading-snug text-muted-foreground">
                        <span className="sr-only">{t.usedIn}: </span>
                        {tech.usedIn[lang]}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
