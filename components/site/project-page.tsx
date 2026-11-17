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
      <main id="contenido" className="mx-auto max-w-7xl px-5 pb-24 pt-10 sm:px-8 sm:pt-14">
        <Link
          href={`${paths.home(lang)}#proyectos`}
          className="inline-flex min-h-11 items-center gap-2 font-semibold text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft aria-hidden className="size-4" />
          {t.back}
        </Link>

        <BlurFade duration={0.5} offset={10} direction="up">
          <header className="mt-8 max-w-4xl">
            <p className="type-narrow flex flex-wrap items-center gap-x-3 gap-y-1 text-[1.05rem] font-semibold text-muted-foreground">
              {project.kind[lang]}
              {project.confidential ? (
                <span className="inline-flex items-center gap-1">
                  <Lock aria-hidden className="size-3.5" />
                  {ui[lang].projects.confidential}
                </span>
              ) : null}
            </p>
            <h1 className="type-wide mt-3 text-[clamp(2.1rem,6vw,4rem)] font-extrabold leading-[0.98] tracking-[-0.025em]">
              {project.title[lang]}
            </h1>
            <p className="mt-6 max-w-[58ch] text-[1.2rem] leading-relaxed">{project.summary[lang]}</p>
            <ul aria-label={t.lines} className="mt-7 flex flex-wrap gap-x-5 gap-y-2">
              {project.lines.map((id) => (
                <li key={id} className="type-narrow inline-flex items-center gap-2 font-semibold">
                  <span aria-hidden className={cn("h-1.5 w-7 rounded-full", lineClass[id].bg)} />
                  {getLine(id).name[lang]}
                </li>
              ))}
            </ul>
          </header>
        </BlurFade>

        <div className="mt-16 grid gap-x-16 gap-y-12 border-t pt-12 lg:grid-cols-[minmax(0,1fr)_18rem]">
          <div className="max-w-[66ch] space-y-12">
            <section aria-labelledby="caso-problema">
              <h2 id="caso-problema" className="type-semiwide text-[1.5rem] font-extrabold">
                {t.problem}
              </h2>
              <p className="mt-3 text-muted-foreground">{project.problem[lang]}</p>
            </section>
            <section aria-labelledby="caso-rol">
              <h2 id="caso-rol" className="type-semiwide text-[1.5rem] font-extrabold">
                {t.role}
              </h2>
              <p className="mt-3 text-muted-foreground">{project.role[lang]}</p>
            </section>
            <section aria-labelledby="caso-construccion">
              <h2 id="caso-construccion" className="type-semiwide text-[1.5rem] font-extrabold">
                {t.build}
              </h2>
              <ul className="mt-4 space-y-3">
                {project.build[lang].map((item) => (
                  <li key={item} className="relative pl-7 text-muted-foreground">
                    <span
                      aria-hidden
                      className="absolute left-0 top-[0.55em] size-3 rounded-full border-[3px] border-foreground"
                    />
                    {item}
                  </li>
                ))}
              </ul>
            </section>
            <section aria-labelledby="caso-estado">
              <h2 id="caso-estado" className="type-semiwide text-[1.5rem] font-extrabold">
                {t.status}
              </h2>
              <p className="mt-3 text-muted-foreground">{project.status[lang]}</p>
            </section>
          </div>

          <aside className="space-y-10">
            <div>
              <h2 className="type-narrow text-[1.05rem] font-semibold text-muted-foreground">{t.stack}</h2>
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
                <h2 className="type-narrow text-[1.05rem] font-semibold text-muted-foreground">{t.links}</h2>
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
          className="group mt-20 flex items-center justify-between gap-6 border-y py-8 hover:border-foreground"
        >
          <span>
            <span className="type-narrow block font-semibold text-muted-foreground">{t.next}</span>
            <span className="type-semiwide mt-1 block text-[clamp(1.4rem,3vw,2rem)] font-extrabold leading-tight">
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
