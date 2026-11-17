"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Lock, Plus } from "lucide-react";
import { getLine, projects, type Locale, type Project } from "@/lib/content";
import { paths, ui } from "@/lib/i18n";
import { lineVar } from "@/lib/lines";
import { cn } from "@/lib/utils";
import { RevealText } from "./reveal-text";

/** Recorrido de un dato por el sistema, en una sola fila, con una luz que lo atraviesa. */
function Flow({ project, label }: { project: Project; label: string }) {
  const color = lineVar[project.accent];
  return (
    <div>
      <p className="label-mono">{label}</p>
      <ol className="relative mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-0">
        <span aria-hidden className="absolute inset-x-0 top-1/2 hidden h-px bg-border sm:block" />
        <span
          aria-hidden
          className="animate-flow absolute top-1/2 hidden h-[5px] w-16 -translate-y-1/2 rounded-full blur-[2px] sm:block"
          style={{ background: `linear-gradient(to right, transparent, ${color})` }}
        />
        {project.flow.map((node, i) => (
          <li key={node} className={cn("relative flex items-center", i > 0 && "sm:ml-auto")}>
            <span
              className="rounded-full border bg-card-solid px-4 py-2 font-mono text-[0.85rem]"
              style={{ boxShadow: `inset 0 0 0 1px color-mix(in srgb, ${color} 35%, transparent)` }}
            >
              {node}
            </span>
          </li>
        ))}
      </ol>
    </div>
  );
}

function ProjectRow({
  project,
  lang,
  open,
  onToggle,
}: {
  project: Project;
  lang: Locale;
  open: boolean;
  onToggle: () => void;
}) {
  const t = ui[lang].projects;
  const color = lineVar[project.accent];
  const panelId = `proyecto-${project.slug}`;

  return (
    <li className="group/row border-t last:border-b">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex w-full cursor-pointer items-center gap-5 py-7 text-left sm:gap-8 sm:py-9"
        >
          <span
            aria-hidden
            className="size-3 shrink-0 rounded-full transition-transform duration-300 group-hover/row:scale-150"
            style={{ background: color, boxShadow: `0 0 16px ${color}` }}
          />
          <span
            className={cn(
              "flex-1 text-[clamp(1.7rem,5.2vw,4.6rem)] font-medium leading-[1] tracking-[-0.05em] transition-[color,opacity,translate] duration-300",
              open ? "opacity-100" : "opacity-55 group-hover/row:translate-x-2 group-hover/row:opacity-100",
            )}
          >
            {project.title[lang]}
          </span>
          <span className="label-mono hidden max-w-[16rem] text-right lg:block">{project.kind[lang]}</span>
          <span
            className={cn(
              "flex size-11 shrink-0 items-center justify-center rounded-full border transition-all duration-300 sm:size-14",
              open ? "rotate-45 bg-foreground text-background" : "group-hover/row:bg-accent",
            )}
          >
            <Plus aria-hidden className="size-5" />
            <span className="sr-only">{t.expand}</span>
          </span>
        </button>
      </h3>

      <div
        id={panelId}
        className={cn(
          "grid transition-[grid-template-rows] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)]",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
      >
        <div className={cn("overflow-hidden", !open && "invisible")}>
          <div className="grid gap-10 pb-10 pl-8 sm:pl-11 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-16">
            <div>
              <p className="label-mono flex flex-wrap items-center gap-x-3 lg:hidden">
                <span style={{ color }}>{project.kind[lang]}</span>
              </p>
              <p className="mt-3 max-w-[52ch] text-[1.15rem] leading-relaxed lg:mt-0">{project.summary[lang]}</p>
              <p className="label-mono mt-5 flex flex-wrap items-center gap-x-4 gap-y-1">
                {project.lines.map((id) => (
                  <span key={id} className="inline-flex items-center gap-1.5">
                    <span aria-hidden className="size-1.5 rounded-full" style={{ background: lineVar[id] }} />
                    {getLine(id).name[lang]}
                  </span>
                ))}
                {project.confidential ? (
                  <span className="inline-flex items-center gap-1">
                    <Lock aria-hidden className="size-3" />
                    {t.confidential}
                  </span>
                ) : null}
              </p>
              <Link
                href={paths.project(lang, project.slug)}
                tabIndex={open ? 0 : -1}
                className="group/link mt-8 inline-flex h-12 items-center gap-2 rounded-full bg-primary px-6 font-semibold text-primary-foreground"
              >
                {t.open}
                <ArrowUpRight
                  aria-hidden
                  className="size-4 transition-transform duration-300 group-hover/link:rotate-45"
                />
              </Link>
            </div>

            <div className="space-y-8">
              <Flow project={project} label={t.flow} />
              <ul className="flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-full border bg-card px-3 py-1 font-mono text-[0.78rem] text-muted-foreground"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
}

/** Índice de proyectos: una fila grande por proyecto que se despliega al tocarla. */
export function Projects({ lang }: { lang: Locale }) {
  const t = ui[lang].projects;
  const [open, setOpen] = useState<string | null>(projects[0]?.slug ?? null);

  return (
    <section id="proyectos" aria-labelledby="proyectos-titulo" className="relative py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
          <RevealText
            id="proyectos-titulo"
            className="text-[clamp(2.2rem,5.4vw,3.9rem)] font-semibold leading-[1.02] tracking-[-0.04em]"
          >
            {t.title}
          </RevealText>
          <p className="max-w-[52ch] text-[1.05rem] text-muted-foreground lg:text-right">{t.intro}</p>
        </div>
        <ul className="mt-12">
          {projects.map((project) => (
            <ProjectRow
              key={project.slug}
              project={project}
              lang={lang}
              open={open === project.slug}
              onToggle={() => setOpen((current) => (current === project.slug ? null : project.slug))}
            />
          ))}
        </ul>
      </div>
    </section>
  );
}
