import Link from "next/link";
import { hero, site, type Locale } from "@/lib/content";
import { ui } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { LineMap } from "./line-map";

export function Hero({ lang }: { lang: Locale }) {
  const t = ui[lang];
  return (
    <section aria-labelledby="hero-titulo" className="mx-auto max-w-6xl px-5 pb-20 pt-14 sm:px-8 sm:pb-28 sm:pt-20">
      <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)] lg:gap-10">
        <div>
          <p className="type-narrow text-[1.05rem] font-semibold text-muted-foreground">
            {hero.role[lang]}, {site.location[lang]}
          </p>
          <h1
            id="hero-titulo"
            className="type-wide mt-4 text-[clamp(2.6rem,7.2vw,4.6rem)] font-extrabold leading-[0.95] tracking-[-0.025em]"
          >
            Marcelo
            <br />
            Javier
            <br />
            Jaimes
          </h1>
          <p className="mt-7 max-w-[46ch] text-[1.15rem] leading-relaxed">{hero.pitch[lang]}</p>
          <div className="mt-9 flex flex-wrap gap-3">
            <Button asChild size="lg" className="h-12 px-6 text-base font-semibold">
              <Link href="#proyectos">{t.hero.seeProjects}</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="h-12 px-6 text-base font-semibold">
              <Link href="#contacto">{t.hero.write}</Link>
            </Button>
            {site.cv ? (
              <Button asChild size="lg" variant="ghost" className="h-12 px-6 text-base font-semibold">
                <a href={site.cv} download>
                  {t.hero.cv}
                </a>
              </Button>
            ) : null}
          </div>
        </div>
        <div>
          <LineMap lang={lang} />
          <p className="mt-3 text-[0.95rem] text-muted-foreground">{t.map.hint}</p>
        </div>
      </div>
    </section>
  );
}
