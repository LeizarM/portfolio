import { ArrowUpRight } from "lucide-react";
import { site, type Locale } from "@/lib/content";
import { ui } from "@/lib/i18n";
import { CopyEmail } from "./copy-email";
import { Magnetic } from "./magnetic";
import { RevealText } from "./reveal-text";

export function Contact({ lang }: { lang: Locale }) {
  const t = ui[lang].contact;
  const links = [
    { label: "LinkedIn", href: site.linkedin },
    { label: "GitHub", href: site.github },
  ];

  return (
    <section
      id="contacto"
      aria-labelledby="contacto-titulo"
      className="bg-primary py-28 text-primary-foreground sm:py-40"
    >
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <RevealText
          id="contacto-titulo"
          className="type-wide max-w-[16ch] text-[clamp(2.3rem,7.4vw,6.4rem)] font-extrabold leading-[0.92] tracking-[-0.035em]"
        >
          {t.title}
        </RevealText>
        <p className="mt-8 max-w-[52ch] text-[1.2rem] opacity-85">{t.body}</p>
        <a
          href={`mailto:${site.email}`}
          data-cursor={lang === "es" ? "Escribir" : "Write"}
          className="type-semiwide mt-10 inline-block break-all text-[clamp(1.2rem,3.6vw,2.8rem)] font-extrabold underline decoration-2 underline-offset-[0.25em]"
        >
          {site.email}
        </a>
        <div className="mt-8 flex flex-wrap gap-3">
          <Magnetic>
            <CopyEmail email={site.email} label={t.copy} done={t.copied} />
          </Magnetic>
        </div>
        <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-2">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex min-h-11 items-center gap-1.5 text-[1.1rem] font-semibold underline decoration-current/40 decoration-2 underline-offset-[6px] hover:decoration-current"
              >
                {link.label}
                <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
