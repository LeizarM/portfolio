import Link from "next/link";
import { getLine, projects, type Locale, type Project } from "@/lib/content";
import { paths, ui } from "@/lib/i18n";
import { lineVar } from "@/lib/lines";
import { Blueprint } from "./blueprint";
import { Chapter } from "./chapter";
import { RevealText } from "./reveal-text";

function ProjectChapter({ project, index, lang }: { project: Project; index: number; lang: Locale }) {
  const t = ui[lang].projects;
  const color = lineVar[project.accent];
  const count = `${String(index + 1).padStart(2, "0")} / ${String(projects.length).padStart(2, "0")}`;

  return (
    <Chapter className="chapter lg:h-[230svh]">
      <div className="chapter-stage lg:sticky lg:top-0 lg:h-svh" style={{ "--bp-accent": color } as React.CSSProperties}>
        <div className="mx-auto grid h-full max-w-[100rem] gap-10 px-[3.125vw] py-20 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:items-center lg:gap-16 lg:py-24">
          <div className="chapter-copy">
            <p className="label-mono flex items-center gap-3">
              <span aria-hidden className="size-2 rounded-full" style={{ background: color }} />
              <span className="tabular-nums">{count}</span>
              <span>{project.kind[lang]}</span>
            </p>
            <h3 className="mt-6 font-display text-[clamp(2.5rem,5.6vw,5.5rem)] font-bold uppercase leading-[0.9] tracking-[-0.04em]">
              {project.title[lang]}
            </h3>
            <p className="mt-7 max-w-[46ch] text-[1.12rem] leading-relaxed">{project.summary[lang]}</p>
            <p className="label-mono mt-7 flex flex-wrap items-center gap-x-4 gap-y-1">
              {project.lines.map((id) => (
                <span key={id} className="inline-flex items-center gap-1.5">
                  <span aria-hidden className="size-1.5 rounded-full" style={{ background: lineVar[id] }} />
                  {getLine(id).name[lang]}
                </span>
              ))}
              {project.confidential ? <span>{t.confidential}</span> : null}
            </p>
            <Link
              href={paths.project(lang, project.slug)}
              className="label-caps mt-9 inline-flex h-12 items-center rounded-full bg-primary px-6 text-primary-foreground transition-opacity hover:opacity-85 active:opacity-70"
            >
              {t.open}
            </Link>
          </div>

          <div className="chapter-plan">
            <p className="label-mono">{t.flow}</p>
            <Blueprint nodes={project.flow} scrub className="mt-4 w-full" />
            <ul className="mt-6 flex flex-wrap gap-1.5 border-t border-dotted pt-6">
              {project.stack.map((tech) => (
                <li key={tech} className="rounded-full border px-3 py-1 font-mono text-[0.78rem] text-muted-foreground">
                  {tech}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </Chapter>
  );
}

/** Proyectos como capítulos: cada uno ocupa la pantalla y su plano se dibuja al avanzar. */
export function Projects({ lang }: { lang: Locale }) {
  const t = ui[lang].projects;

  return (
    <section id="proyectos" aria-labelledby="proyectos-titulo" className="relative pt-24 sm:pt-32">
      <div className="flex flex-col gap-5 px-[3.125vw] pb-10 lg:flex-row lg:items-end lg:justify-between">
        <RevealText
          id="proyectos-titulo"
          className="font-display text-[clamp(3rem,11vw,10rem)] font-bold uppercase leading-[0.85] tracking-[-0.045em]"
        >
          {t.title}
        </RevealText>
        <p className="max-w-[46ch] text-[1.05rem] text-muted-foreground lg:pb-3 lg:text-right">{t.intro}</p>
      </div>
      {projects.map((project, index) => (
        <ProjectChapter key={project.slug} project={project} index={index} lang={lang} />
      ))}
    </section>
  );
}
