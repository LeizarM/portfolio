import Link from "next/link";
import { ArrowUpRight, Lock } from "lucide-react";
import { projects, type Locale, type Project } from "@/lib/content";
import { paths, ui } from "@/lib/i18n";
import { lineClass } from "@/lib/lines";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { BorderBeam } from "@/components/magicui/border-beam";
import { Section } from "./section";

function ProjectCard({
  project,
  lang,
  featured,
  last,
}: {
  project: Project;
  lang: Locale;
  featured?: boolean;
  last?: boolean;
}) {
  const t = ui[lang].projects;
  return (
    <li className={cn(featured && "col-span-full", last && "md:max-lg:col-span-2")}>
      <Link
        href={paths.project(lang, project.slug)}
        className="group relative flex h-full flex-col rounded-lg border bg-card p-6 transition-colors hover:border-foreground sm:p-8"
      >
        <div aria-hidden className="flex gap-1.5">
          {project.lines.map((id) => (
            <span
              key={id}
              className={cn(
                "h-1.5 w-7 rounded-full transition-[width] duration-300 ease-out group-hover:w-12",
                lineClass[id].bg,
              )}
            />
          ))}
        </div>

        <div className={cn(featured && "lg:grid lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-14")}>
          <div>
            <p className="type-narrow mt-6 flex items-center gap-2 text-[0.95rem] font-semibold text-muted-foreground">
              {project.kind[lang]}
              {project.confidential ? (
                <span className="inline-flex items-center gap-1">
                  <Lock aria-hidden className="size-3.5" />
                  {t.confidential}
                </span>
              ) : null}
            </p>
            <h3
              className={cn(
                "type-semiwide mt-2 font-extrabold leading-tight tracking-tight",
                featured ? "text-[clamp(1.6rem,3vw,2.2rem)]" : "text-[1.45rem]",
              )}
            >
              {project.title[lang]}
            </h3>
            <p className={cn("mt-3 text-muted-foreground", featured ? "max-w-[60ch]" : "max-w-[46ch]")}>
              {project.summary[lang]}
            </p>

            <ul className="mt-6 flex flex-wrap gap-1.5">
              {project.stack.map((tech) => (
                <li key={tech}>
                  <Badge variant="outline" className="rounded-md px-2 py-1 text-[0.8rem] font-medium">
                    {tech}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>
          {featured ? (
            <ul className="mt-8 hidden space-y-3 border-l pl-8 lg:mt-6 lg:block">
              {project.build[lang].slice(1, 4).map((item) => (
                <li key={item} className="relative pl-7 text-[0.98rem] text-muted-foreground">
                  <span
                    aria-hidden
                    className="absolute left-0 top-[0.5em] size-3 rounded-full border-[3px] border-foreground"
                  />
                  {item}
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <span className="mt-8 inline-flex items-center gap-1.5 pt-2 font-semibold">
          {t.open}
          <ArrowUpRight
            aria-hidden
            className="size-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
          />
        </span>

        {featured ? (
          <BorderBeam
            size={140}
            duration={9}
            borderWidth={2}
            colorFrom="var(--line-backend)"
            colorTo="var(--line-mobile)"
          />
        ) : null}
      </Link>
    </li>
  );
}

export function Projects({ lang }: { lang: Locale }) {
  const t = ui[lang].projects;
  return (
    <Section id="proyectos" title={t.title} intro={t.intro}>
      <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
        {projects.map((project, i) => (
          <ProjectCard key={project.slug} project={project} lang={lang} featured={i === 0} last={i === projects.length - 1} />
        ))}
      </ul>
    </Section>
  );
}
