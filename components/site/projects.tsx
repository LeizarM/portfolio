"use client";

import { useRef } from "react";
import Link from "next/link";
import { ArrowUpRight, Lock } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";
import { getLine, projects, type Locale, type Project } from "@/lib/content";
import { paths, ui } from "@/lib/i18n";
import { blockClass } from "@/lib/lines";
import { cn } from "@/lib/utils";
import { RevealText } from "./reveal-text";

gsap.registerPlugin(useGSAP, ScrollTrigger);

function ProjectCard({ project, lang }: { project: Project; lang: Locale }) {
  const t = ui[lang];
  return (
    <li className="shrink-0">
      <Link
        href={paths.project(lang, project.slug)}
        data-cursor={t.cursor}
        className={cn(
          "group flex h-full min-h-[26rem] flex-col justify-between rounded-3xl p-7 sm:p-10 lg:h-[62vh] lg:min-h-[27rem] lg:w-[min(62vw,58rem)]",
          blockClass[project.accent],
        )}
      >
        <div>
          <p className="type-narrow flex flex-wrap items-center gap-x-3 text-[1.05rem] font-semibold opacity-80">
            {project.kind[lang]}
            {project.confidential ? (
              <span className="inline-flex items-center gap-1">
                <Lock aria-hidden className="size-3.5" />
                {t.projects.confidential}
              </span>
            ) : null}
          </p>
          <h3 className="type-wide mt-4 max-w-[16ch] text-[clamp(1.9rem,4.4vw,4rem)] font-extrabold leading-[0.95] tracking-[-0.03em]">
            {project.title[lang]}
          </h3>
          <p className="mt-5 max-w-[48ch] text-[1.1rem] leading-relaxed opacity-90">{project.summary[lang]}</p>
        </div>

        <div className="mt-8 flex items-end justify-between gap-6">
          <ul className="flex flex-wrap gap-1.5">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-full border border-current/40 px-3 py-1 text-[0.85rem] font-semibold"
              >
                {tech}
              </li>
            ))}
          </ul>
          <span
            aria-hidden
            className="flex size-14 shrink-0 items-center justify-center rounded-full border-2 border-current transition-transform duration-500 ease-out group-hover:rotate-45 sm:size-16"
          >
            <ArrowUpRight className="size-6" />
          </span>
        </div>
        <span className="sr-only">
          {t.projects.open}. {project.lines.map((id) => getLine(id).name[lang]).join(", ")}.
        </span>
      </Link>
    </li>
  );
}

/** En escritorio la sección se fija y los proyectos pasan en horizontal con el scroll. */
export function Projects({ lang }: { lang: Locale }) {
  const root = useRef<HTMLElement>(null);
  const t = ui[lang].projects;

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add("(min-width: 1024px) and (prefers-reduced-motion: no-preference)", () => {
        const track = root.current?.querySelector<HTMLElement>(".hs-track");
        const pin = root.current?.querySelector<HTMLElement>(".hs-pin");
        if (!track || !pin) return;
        const distance = () => Math.max(0, track.scrollWidth - window.innerWidth);
        const st = {
          trigger: pin,
          start: "top top",
          end: () => `+=${distance()}`,
          scrub: 0.6,
          invalidateOnRefresh: true,
        };
        gsap.to(track, { x: () => -distance(), ease: "none", scrollTrigger: { ...st, pin: true } });
        gsap.fromTo(".hs-progress", { scaleX: 0 }, { scaleX: 1, ease: "none", scrollTrigger: st });
      });
      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section ref={root} id="proyectos" aria-labelledby="proyectos-titulo" className="overflow-hidden">
      <div className="hs-pin flex flex-col justify-center py-24 lg:h-screen lg:py-0">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <RevealText
              id="proyectos-titulo"
              className="type-wide text-[clamp(2.4rem,6vw,4.6rem)] font-extrabold leading-[0.95] tracking-[-0.03em]"
            >
              {t.title}
            </RevealText>
            <p className="max-w-[46ch] text-muted-foreground lg:text-right">{t.intro}</p>
          </div>
        </div>

        <ul className="hs-track mt-10 flex flex-col gap-5 px-5 sm:px-8 lg:w-max lg:flex-row lg:gap-6 lg:px-[max(2rem,calc((100vw-80rem)/2+2rem))]">
          {projects.map((project) => (
            <ProjectCard key={project.slug} project={project} lang={lang} />
          ))}
        </ul>

        <div aria-hidden className="mx-auto mt-8 hidden w-full max-w-7xl px-8 lg:block">
          <div className="h-1 overflow-hidden rounded-full bg-border">
            <div className="hs-progress h-full origin-left bg-foreground" />
          </div>
        </div>
      </div>
    </section>
  );
}
