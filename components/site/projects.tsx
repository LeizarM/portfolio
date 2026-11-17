"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Lock } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { projects, type Locale, type Project } from "@/lib/content";
import { paths, ui } from "@/lib/i18n";
import { lineVar } from "@/lib/lines";
import { BorderBeam } from "@/components/magicui/border-beam";
import { RevealText } from "./reveal-text";

gsap.registerPlugin(useGSAP, ScrollTrigger);

/** Recorrido de un dato por el sistema, con una luz que baja por la línea. */
function Flow({ project, label }: { project: Project; label: string }) {
  const color = lineVar[project.accent];
  return (
    <div className="relative rounded-2xl border bg-background/60 p-5 sm:p-6">
      <p className="label-mono">{label}</p>
      <ol className="relative mt-5 space-y-3">
        <span aria-hidden className="absolute bottom-5 left-[11px] top-5 w-px bg-border" />
        <span
          aria-hidden
          className="animate-flow absolute left-[8px] h-10 w-[7px] rounded-full blur-[3px]"
          style={{ background: `linear-gradient(to bottom, transparent, ${color})` }}
        />
        {project.flow.map((node) => (
          <li key={node} className="relative flex items-center gap-4">
            <span
              aria-hidden
              className="relative z-10 size-[23px] shrink-0 rounded-full border bg-card-solid"
              style={{ boxShadow: `inset 0 0 0 5px var(--card-solid), inset 0 0 0 12px ${color}` }}
            />
            <span className="glass w-full rounded-xl px-4 py-2.5 font-mono text-[0.88rem]">{node}</span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function ProjectCard({ project, lang, index }: { project: Project; lang: Locale; index: number }) {
  const t = ui[lang].projects;
  const color = lineVar[project.accent];
  return (
    <li className="project-card sticky" style={{ top: `calc(6rem + ${index * 14}px)` }}>
      <Link
        href={paths.project(lang, project.slug)}
        className="project-inner group relative grid gap-8 overflow-hidden rounded-[2rem] border bg-card-solid p-7 sm:p-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-12 lg:p-12"
      >
        <span
          aria-hidden
          className="pointer-events-none absolute -right-24 -top-24 size-[26rem] rounded-full opacity-25 blur-[90px] transition-opacity duration-500 group-hover:opacity-45"
          style={{ background: color }}
        />
        <div className="relative flex flex-col">
          <p className="label-mono flex flex-wrap items-center gap-x-3">
            <span style={{ color }}>{project.kind[lang]}</span>
            {project.confidential ? (
              <span className="inline-flex items-center gap-1">
                <Lock aria-hidden className="size-3" />
                {t.confidential}
              </span>
            ) : null}
          </p>
          <h3 className="mt-4 max-w-[18ch] text-[clamp(1.8rem,3.6vw,3rem)] font-semibold leading-[1.02] tracking-[-0.04em]">
            {project.title[lang]}
          </h3>
          <p className="mt-4 max-w-[50ch] text-[1.05rem] text-muted-foreground">{project.summary[lang]}</p>
          <ul className="mt-6 flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <li key={tech} className="rounded-full border bg-card px-3 py-1 font-mono text-[0.78rem] text-muted-foreground">
                {tech}
              </li>
            ))}
          </ul>
          <span className="mt-8 inline-flex items-center gap-2 pt-2 font-semibold lg:mt-auto">
            {t.open}
            <span className="flex size-8 items-center justify-center rounded-full border transition-all duration-300 group-hover:bg-foreground group-hover:text-background">
              <ArrowUpRight aria-hidden className="size-4 transition-transform duration-300 group-hover:rotate-45" />
            </span>
          </span>
        </div>
        <div className="relative">
          <Flow project={project} label={t.flow} />
        </div>
        <BorderBeam size={220} duration={10} delay={index * 2} borderWidth={1.5} colorFrom={color} colorTo="var(--glow-b)" />
      </Link>
    </li>
  );
}

/** Las tarjetas se apilan al bajar: la anterior se encoge y se apaga bajo la siguiente. */
export function Projects({ lang }: { lang: Locale }) {
  const root = useRef<HTMLElement>(null);
  const t = ui[lang].projects;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(prefers-reduced-motion: no-preference)", () => {
        const cards = gsap.utils.toArray<HTMLElement>(".project-card");
        cards.forEach((card, i) => {
          const next = cards[i + 1];
          if (!next) return;
          gsap.to(card.querySelector(".project-inner"), {
            scale: 0.93,
            opacity: 0.45,
            transformOrigin: "center top",
            ease: "none",
            scrollTrigger: { trigger: next, start: "top 85%", end: "top 20%", scrub: true },
          });
        });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="proyectos" aria-labelledby="proyectos-titulo" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <RevealText
          id="proyectos-titulo"
          className="text-[clamp(2.2rem,5.4vw,3.9rem)] font-semibold leading-[1.02] tracking-[-0.04em]"
        >
          {t.title}
        </RevealText>
        <p className="mt-5 max-w-[60ch] text-[1.1rem] text-muted-foreground">{t.intro}</p>
        <ul className="mt-12 space-y-6">
          {projects.map((project, i) => (
            <ProjectCard key={project.slug} project={project} lang={lang} index={i} />
          ))}
        </ul>
      </div>
    </section>
  );
}
