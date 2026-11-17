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
    <header className="sticky top-0 z-40 border-b bg-background/85 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center gap-6 px-5 sm:px-8">
        <Link href={home} className="type-wide text-[0.95rem] font-extrabold tracking-tight">
          {site.shortName}
        </Link>
        <nav aria-label={lang === "es" ? "Secciones" : "Sections"} className="ml-auto hidden md:block">
          <ul className="flex items-center gap-7 text-[0.95rem]">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="text-muted-foreground transition-colors hover:text-foreground">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="ml-auto flex items-center gap-1 md:ml-0">
          <Link
            href={altHref}
            hrefLang={lang === "es" ? "en" : "es"}
            aria-label={t.switchLangLabel}
            className="type-narrow inline-flex h-10 items-center rounded-md px-3 text-[0.95rem] font-semibold hover:bg-accent"
          >
            {t.switchLang}
          </Link>
          <ThemeToggle toLight={t.themeToLight} toDark={t.themeToDark} />
        </div>
      </div>
    </header>
  );
}
