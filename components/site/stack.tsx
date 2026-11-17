import Link from "next/link";
import { lines, projects, projectShort, type Locale } from "@/lib/content";
import { paths, ui } from "@/lib/i18n";
import { lineVar } from "@/lib/lines";
import { Section } from "./section";

/**
 * Matriz de tecnologías por proyecto. En pantallas anchas es una tabla: una fila por tecnología,
 * una columna por proyecto y un punto donde se usó. En móvil, la misma información como lista.
 */
export function Stack({ lang }: { lang: Locale }) {
  const t = ui[lang].stack;

  return (
    <Section id="stack" title={t.title} intro={t.intro}>
      <div className="hidden md:block">
        <table className="w-full table-fixed border-collapse text-left">
          <thead>
            <tr className="border-b">
              <th scope="col" className="label-mono w-[26%] pb-4 font-normal">
                {t.tech}
              </th>
              {projects.map((project) => (
                <th key={project.slug} scope="col" className="pb-4 text-center font-normal">
                  <Link
                    href={paths.project(lang, project.slug)}
                    className="label-mono underline decoration-transparent underline-offset-4 transition-colors hover:text-foreground hover:decoration-current"
                  >
                    {project.short[lang]}
                  </Link>
                </th>
              ))}
              <th scope="col" className="label-mono w-[20%] pb-4 text-right font-normal">
                {t.other}
              </th>
            </tr>
          </thead>
          {lines.map((line) => (
            <tbody key={line.id} id={`linea-${line.id}`} className="scroll-mt-28">
              <tr>
                <th scope="colgroup" colSpan={projects.length + 2} className="pb-3 pt-10 text-left">
                  <span className="flex items-baseline gap-4">
                    <span className="flex items-center gap-3 text-[1.5rem] font-semibold tracking-[-0.035em]">
                      <span
                        aria-hidden
                        className="size-2.5 rounded-full"
                        style={{ background: lineVar[line.id], boxShadow: `0 0 14px ${lineVar[line.id]}` }}
                      />
                      {line.name[lang]}
                    </span>
                    <span className="font-normal text-muted-foreground">{line.summary[lang]}</span>
                  </span>
                </th>
              </tr>
              {line.tech.map((tech) => (
                <tr key={tech.name} className="group border-t transition-colors hover:bg-accent">
                  <th scope="row" className="py-3.5 pl-3 text-[1.08rem] font-medium">
                    {tech.name}
                  </th>
                  {projects.map((project) => (
                    <td key={project.slug} className="py-3.5 text-center">
                      {tech.in.includes(project.slug) ? (
                        <span
                          role="img"
                          aria-label={t.yes}
                          className="inline-block size-3.5 rounded-full transition-transform duration-300 group-hover:scale-125"
                          style={{ background: lineVar[line.id], boxShadow: `0 0 12px ${lineVar[line.id]}` }}
                        />
                      ) : (
                        <span aria-hidden className="inline-block size-1 rounded-full bg-border" />
                      )}
                    </td>
                  ))}
                  <td className="label-mono py-3.5 pr-3 text-right">{tech.other?.[lang] ?? ""}</td>
                </tr>
              ))}
            </tbody>
          ))}
        </table>
      </div>

      <div className="space-y-10 md:hidden">
        {lines.map((line) => (
          <div key={line.id}>
            <h3 className="flex items-center gap-3 text-[1.4rem] font-semibold tracking-[-0.035em]">
              <span
                aria-hidden
                className="size-2.5 rounded-full"
                style={{ background: lineVar[line.id], boxShadow: `0 0 14px ${lineVar[line.id]}` }}
              />
              {line.name[lang]}
            </h3>
            <p className="mt-1 text-muted-foreground">{line.summary[lang]}</p>
            <ul className="mt-4 divide-y border-y">
              {line.tech.map((tech) => (
                <li key={tech.name} className="py-3">
                  <p className="font-medium">{tech.name}</p>
                  <p className="label-mono mt-1">
                    <span className="sr-only">{t.usedIn}: </span>
                    {[...tech.in.map((slug) => projectShort(slug, lang)), ...(tech.other ? [tech.other[lang]] : [])].join(
                      ", ",
                    )}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </Section>
  );
}
