import { ArrowUpRight } from "lucide-react";
import { site, type Locale } from "@/lib/content";
import { ui } from "@/lib/i18n";
import { BorderBeam } from "@/components/magicui/border-beam";
import { CopyEmail } from "./copy-email";
import Threads from "@/components/reactbits/Threads";
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
      className="px-5 pb-24 pt-10 sm:px-8 sm:pb-32"
    >
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.25rem] border bg-card-solid px-6 py-20 text-center sm:px-12 sm:py-28">
        <div aria-hidden className="absolute inset-0 opacity-70">
          <Threads
            color="#f0641e"
            accentColor="#dc5000"
            amplitude={1.1}
            lineCount={34}
            enableMouseInteraction
          />
        </div>
        <span
          aria-hidden
          className="absolute inset-0 bg-[radial-gradient(60%_60%_at_50%_45%,var(--card-solid),transparent)]"
        />
        <div className="relative flex flex-col items-center">
          <RevealText
            id="contacto-titulo"
            className="text-glow max-w-[17ch] pb-2 font-display text-[clamp(2.2rem,6vw,4.6rem)] font-bold uppercase leading-[0.98] tracking-[-0.035em]"
          >
            {t.title}
          </RevealText>
          <p className="mt-5 max-w-[48ch] text-[1.12rem] text-muted-foreground">
            {t.body}
          </p>
          <a
            href={`mailto:${site.email}`}
            className="mt-9 break-all font-mono text-[clamp(1rem,2.4vw,1.5rem)] underline decoration-border underline-offset-[0.4em] hover:decoration-foreground"
          >
            {site.email}
          </a>
          <div className="mt-7">
              <CopyEmail email={site.email} label={t.copy} done={t.copied} />
          </div>
          <ul className="mt-9 flex flex-wrap justify-center gap-2">
            {links.map((link) => (
              <li key={link.label}>
                <a
                  href={link.href}
                  target="_blank"
                  rel="noreferrer"
                  className="glass group inline-flex h-11 items-center gap-1.5 rounded-full px-5 font-medium hover:bg-accent"
                >
                  {link.label}
                  <ArrowUpRight
                    aria-hidden
                    className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <BorderBeam
          size={260}
          duration={12}
          borderWidth={1.5}
          colorFrom="var(--glow-a)"
          colorTo="var(--glow-c)"
        />
      </div>
    </section>
  );
}
