import Link from "next/link";
import { hero, projects, site, type Locale } from "@/lib/content";
import { ui } from "@/lib/i18n";
import { asset } from "@/lib/utils";
import { Blueprint } from "./blueprint";

const copy = {
  es: { place: "Backend y móvil. La Paz, Bolivia.", scroll: "Desliza para continuar", tab: "Proyectos" },
  en: { place: "Backend and mobile. La Paz, Bolivia.", scroll: "Scroll to continue", tab: "Projects" },
} satisfies Record<Locale, unknown>;

/**
 * Inicio como una mesa de trabajo: tablero de corte sobre madera, el nombre en grande
 * y el plano del sistema principal dibujado encima. La escena mantiene sus colores en
 * ambos temas, igual que una fotografía.
 */
export function Hero({ lang }: { lang: Locale }) {
  const t = ui[lang];
  const c = copy[lang];
  const [first = site.shortName, ...rest] = site.shortName.split(" ");
  const flow = projects[0]?.flow ?? [];

  return (
    <section aria-label={site.name} className="hero-desk relative isolate min-h-svh overflow-hidden text-[#ffedd7]">
      <div aria-hidden className="hero-mat">
        <Blueprint nodes={flow} className="hero-blueprint" />
      </div>
      <div aria-hidden className="hero-shade" />

      <div className="relative flex min-h-svh flex-col px-[3.125vw] pb-8 pt-24 sm:pt-28">
        <p className="label-caps hero-in sm:pl-[22%]">{c.place}</p>
        <h1 className="hero-in font-display text-[clamp(4.2rem,17vw,15rem)] font-bold uppercase leading-[0.82] tracking-[-0.045em]">
          {first}
          <span className="sr-only"> {rest.join(" ")}</span>
        </h1>

        <p className="hero-in mt-auto max-w-[19ch] self-end pt-16 font-display text-[clamp(1.35rem,2.5vw,2.25rem)] font-medium leading-[1.12] tracking-[-0.02em] sm:mr-[4vw]">
          {hero.headline[lang].join(" ")}
        </p>

        <div className="hero-in mt-auto flex flex-col gap-6 pt-12 sm:flex-row sm:items-end sm:justify-between">
          <div className="hero-card max-w-[21rem] p-5">
            <p className="font-display text-[1.05rem] font-bold uppercase leading-[1.1] tracking-[-0.01em]">
              {hero.role[lang]}
            </p>
            <p className="mt-6 text-[0.85rem] leading-snug text-[#ffedd7]/80">{hero.pitch[lang]}</p>
          </div>

          <a href="#proyectos" className="label-caps hidden items-center gap-3 self-center sm:inline-flex">
            <span aria-hidden className="hero-cue" />
            {c.scroll}
          </a>

          <div className="flex flex-wrap gap-3">
            <Link
              href="#proyectos"
              className="label-caps inline-flex h-12 items-center rounded-full bg-[#ffedd7] px-6 text-[#100904] transition-colors hover:bg-white active:bg-[#f6e0c6]"
            >
              {t.hero.seeProjects}
            </Link>
            <Link
              href="#contacto"
              className="label-caps inline-flex h-12 items-center rounded-full border border-[#ffedd7]/60 px-6 transition-colors hover:bg-[#ffedd7]/10 active:bg-[#ffedd7]/20"
            >
              {t.hero.write}
            </Link>
            {site.cv ? (
              <a
                href={asset(site.cv)}
                download
                className="label-caps inline-flex h-12 items-center rounded-full px-4 underline underline-offset-4"
              >
                {t.hero.cv}
              </a>
            ) : null}
          </div>
        </div>
      </div>

      <a href="#proyectos" className="hero-tab label-caps">
        <span aria-hidden className="size-1.5 rounded-full bg-[#dc5000]" />
        {c.tab}
      </a>
    </section>
  );
}
