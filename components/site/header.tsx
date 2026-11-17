import Link from "next/link";
import { site, type Locale } from "@/lib/content";
import { paths, ui } from "@/lib/i18n";
import { ThemeToggle } from "./theme-toggle";

export function Header({ lang, altHref }: { lang: Locale; altHref: string }) {
  const t = ui[lang];
  const home = paths.home(lang);
  const nav = [
    { href: `${home}#proyectos`, label: t.nav.projects },
    { href: `${home}#stack`, label: t.nav.stack },
    { href: `${home}#experiencia`, label: t.nav.experience },
    { href: `${home}#contacto`, label: t.nav.contact },
  ];

  return (
    <header className="pointer-events-none fixed inset-x-0 top-4 z-40 px-4">
      <div className="glass pointer-events-auto mx-auto flex h-14 max-w-4xl items-center gap-4 rounded-full pl-5 pr-2">
        <Link href={home} className="flex items-center gap-2.5 font-semibold tracking-tight">
          <span
            aria-hidden
            className="size-2.5 rounded-full bg-linear-to-br from-glow-a via-glow-b to-glow-c shadow-[0_0_12px_var(--glow-a)]"
          />
          {site.shortName}
        </Link>
        <nav aria-label={lang === "es" ? "Secciones" : "Sections"} className="ml-auto hidden md:block">
          <ul className="flex items-center gap-1 text-[0.92rem]">
            {nav.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className="rounded-full px-3 py-2 text-muted-foreground transition-colors hover:bg-accent hover:text-foreground"
                >
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="ml-auto flex items-center md:ml-0">
          <Link
            href={altHref}
            hrefLang={lang === "es" ? "en" : "es"}
            aria-label={t.switchLangLabel}
            className="inline-flex h-10 items-center rounded-full px-3 font-mono text-[0.8rem] text-muted-foreground hover:bg-accent hover:text-foreground"
          >
            {lang === "es" ? "EN" : "ES"}
          </Link>
          <ThemeToggle toLight={t.themeToLight} toDark={t.themeToDark} />
        </div>
      </div>
    </header>
  );
}
