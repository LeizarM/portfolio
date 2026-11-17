import { ArrowUpRight } from "lucide-react";
import { site, type Locale } from "@/lib/content";
import { ui } from "@/lib/i18n";
import { Button } from "@/components/ui/button";
import { CopyEmail } from "./copy-email";

export function Contact({ lang }: { lang: Locale }) {
  const t = ui[lang].contact;
  const links = [
    { label: "LinkedIn", href: site.linkedin },
    { label: "GitHub", href: site.github },
  ];

  return (
    <section id="contacto" aria-labelledby="contacto-titulo" className="border-t py-24 sm:py-32">
      <div className="mx-auto max-w-6xl px-5 sm:px-8">
        <h2
          id="contacto-titulo"
          className="type-wide max-w-[18ch] text-[clamp(2rem,5.4vw,3.6rem)] font-extrabold leading-[1.02] tracking-[-0.02em]"
        >
          {t.title}
        </h2>
        <p className="mt-6 max-w-[52ch] text-[1.15rem] text-muted-foreground">{t.body}</p>
        <p className="mt-8 break-all text-[1.25rem] font-semibold">{site.email}</p>
        <div className="mt-5 flex flex-wrap gap-3">
          <CopyEmail email={site.email} label={t.copy} done={t.copied} />
          <Button asChild size="lg" variant="outline" className="h-12 px-6 text-base font-semibold">
            <a href={`mailto:${site.email}`}>{t.send}</a>
          </Button>
        </div>
        <ul className="mt-10 flex flex-wrap gap-x-8 gap-y-2">
          {links.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                target="_blank"
                rel="noreferrer"
                className="group inline-flex min-h-11 items-center gap-1.5 text-[1.1rem] font-semibold underline decoration-border decoration-2 underline-offset-[6px] hover:decoration-foreground"
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
