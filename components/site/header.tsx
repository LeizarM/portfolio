import Link from "next/link";
import { site, type Locale } from "@/lib/content";
import { paths, ui } from "@/lib/i18n";
import { ThemeToggle } from "./theme-toggle";

/** Cabecera sin caja: nombre a la izquierda y secciones a la derecha, legible sobre cualquier fondo. */
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
    <header className="fixed inset-x-0 top-0 z-40 text-[#ffedd7] mix-blend-difference">
      <div className="flex h-16 items-center gap-4 px-[3.125vw]">
        <Link href={home} className="font-display text-[1.15rem] font-bold uppercase tracking-[-0.02em]">
          {site.shortName}
        </Link>
        <nav aria-label={lang === "es" ? "Secciones" : "Sections"} className="ml-auto hidden md:block">
          <ul className="flex items-center gap-1">
            {nav.map((item) => (
              <li key={item.href}>
                <Link href={item.href} className="label-caps px-3 py-2 opacity-80 transition-opacity hover:opacity-100">
                  {item.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="ml-auto flex items-center md:ml-2">
          <Link
            href={altHref}
            hrefLang={lang === "es" ? "en" : "es"}
            aria-label={t.switchLangLabel}
            className="label-caps inline-flex h-10 items-center px-3 opacity-80 transition-opacity hover:opacity-100"
          >
            {lang === "es" ? "EN" : "ES"}
          </Link>
          <ThemeToggle toLight={t.themeToLight} toDark={t.themeToDark} />
        </div>
      </div>
    </header>
  );
}
