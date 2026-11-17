import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Lock } from "lucide-react";
import { getLine, projects, type Locale, type Project } from "@/lib/content";
import { paths, ui } from "@/lib/i18n";
import { lineClass } from "@/lib/lines";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { BlurFade } from "@/components/magicui/blur-fade";
import { Footer } from "./footer";
import { Header } from "./header";

export function ProjectPage({ project, lang }: { project: Project; lang: Locale }) {
  const t = ui[lang].project;
  const other: Locale = lang === "es" ? "en" : "es";
  const index = projects.findIndex((p) => p.slug === project.slug);
  const next = projects[(index + 1) % projects.length] ?? project;

  return (
    <>
      <Header lang={lang} altHref={paths.project(other, project.slug)} />
      <main id="contenido" className="mx-auto max-w-6xl px-5 pb-24 pt-28 sm:px-8 sm:pt-32">
        <Link
          href={`${paths.home(lang)}#proyectos`}
          className="inline-flex min-h-11 items-center gap-2 font-semibold text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft aria-hidden className="size-4" />
          {t.back}
        </Link>

        <BlurFade duration={0.5} offset={10} direction="up">
          <header className="mt-8 max-w-4xl">
            <p className="label-mono flex flex-wrap items-center gap-x-3 gap-y-1">
              {project.kind[lang]}
              {project.confidential ? (
                <span className="inline-flex items-center gap-1">
                  <Lock aria-hidden className="size-3.5" />
                  {ui[lang].projects.confidential}
                </span>
              ) : null}
            </p>
            <h1 className="text-glow mt-3 pb-2 text-[clamp(2.2rem,6vw,4.4rem)] font-semibold leading-[1] tracking-[-0.045em]">
              {project.title[lang]}
            </h1>
            <p className="mt-6 max-w-[58ch] text-[1.2rem] leading-relaxed">{project.summary[lang]}</p>
            <ul aria-label={t.lines} className="mt-7 flex flex-wrap gap-x-5 gap-y-2">
              {project.lines.map((id) => (
                <li key={id} className="inline-flex items-center gap-2 font-mono text-[0.85rem]">
                  <span aria-hidden className={cn("h-1.5 w-7 rounded-full", lineClass[id].bg)} />
                  {getLine(id).name[lang]}
                </li>
              ))}
            </ul>
          </header>
        </BlurFade>

        <div className="glass mt-14 grid gap-x-16 gap-y-12 rounded-3xl p-7 sm:p-10 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="max-w-[66ch] space-y-12">
            <section aria-labelledby="caso-problema">
              <h2 id="caso-problema" className="text-[1.5rem] font-semibold tracking-[-0.03em]">
                {t.problem}
              </h2>
              <p className="mt-3 text-muted-foreground">{project.problem[lang]}</p>
            </section>
            <section aria-labelledby="caso-rol">
              <h2 id="caso-rol" className="text-[1.5rem] font-semibold tracking-[-0.03em]">
                {t.role}
              </h2>
              <p className="mt-3 text-muted-foreground">{project.role[lang]}</p>
            </section>
            <section aria-labelledby="caso-construccion">
              <h2 id="caso-construccion" className="text-[1.5rem] font-semibold tracking-[-0.03em]">
                {t.build}
              </h2>
              <ul className="mt-4 space-y-3">
                {project.build[lang].map((item) => (
                  <li key={item} className="relative pl-5 text-muted-foreground">
                    <span
                      aria-hidden
                      className="absolute left-0 top-[0.62em] size-1.5 rounded-full bg-glow-b"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
            <section aria-labelledby="caso-estado">
              <h2 id="caso-estado" className="text-[1.5rem] font-semibold tracking-[-0.03em]">
                {t.status}
              </h2>
              <p className="mt-3 text-muted-foreground">{project.status[lang]}</p>
            </section>
          </div>

          <aside className="space-y-10">
            <div>
              <h2 className="label-mono">{t.stack}</h2>
              <ul className="mt-3 flex flex-wrap gap-1.5">
                {project.stack.map((tech) => (
                  <li key={tech}>
                    <Badge variant="outline" className="rounded-md px-2 py-1 text-[0.85rem] font-medium">
                      {tech}
                    </Badge>
                  </li>
                ))}
              </ul>
            </div>
            {project.links.length > 0 ? (
              <div>
                <h2 className="label-mono">{t.links}</h2>
                <ul className="mt-2">
                  {project.links.map((link) => (
                    <li key={link.href}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex min-h-11 items-center gap-1.5 font-semibold underline decoration-border decoration-2 underline-offset-[6px] hover:decoration-foreground"
                      >
                        {link.label[lang]}
                        <ArrowUpRight aria-hidden className="size-4" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </aside>
        </div>

        <Link
          href={paths.project(lang, next.slug)}
          className="glass group mt-6 flex items-center justify-between gap-6 rounded-3xl p-7 hover:bg-accent sm:p-10"
        >
          <span>
            <span className="label-mono block">{t.next}</span>
            <span className="mt-1 block text-[clamp(1.5rem,3vw,2.2rem)] font-semibold leading-tight tracking-[-0.035em]">
              {next.title[lang]}
            </span>
          </span>
          <ArrowRight aria-hidden className="size-7 shrink-0 transition-transform group-hover:translate-x-1" />
        </Link>
      </main>
      <Footer lang={lang} />
    </>
  );
}
