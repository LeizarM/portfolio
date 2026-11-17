import { ArrowUpRight } from "lucide-react";
import { site, type Locale } from "@/lib/content";
import { ui } from "@/lib/i18n";
import { BorderBeam } from "@/components/magicui/border-beam";
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
    <section id="contacto" aria-labelledby="contacto-titulo" className="px-5 pb-24 pt-10 sm:px-8 sm:pb-32">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-[2.25rem] border bg-card-solid px-6 py-20 text-center sm:px-12 sm:py-28">
        <div
          aria-hidden
          className="animate-aurora absolute left-1/2 top-[-40%] -z-0 h-[32rem] w-[min(110%,60rem)] -translate-x-1/2 rounded-full bg-[conic-gradient(from_200deg,var(--glow-a),var(--glow-c),var(--glow-b),var(--glow-a))] opacity-30 blur-[100px]"
        />
        <div className="relative flex flex-col items-center">
          <RevealText
            id="contacto-titulo"
            className="text-glow max-w-[17ch] pb-2 text-[clamp(2.2rem,6vw,4.6rem)] font-semibold leading-[1.02] tracking-[-0.045em]"
          >
            {t.title}
          </RevealText>
          <p className="mt-5 max-w-[48ch] text-[1.12rem] text-muted-foreground">{t.body}</p>
          <a
            href={`mailto:${site.email}`}
            className="mt-9 break-all font-mono text-[clamp(1rem,2.4vw,1.5rem)] underline decoration-border underline-offset-[0.4em] hover:decoration-foreground"
          >
            {site.email}
          </a>
          <div className="mt-7">
            <Magnetic>
              <CopyEmail email={site.email} label={t.copy} done={t.copied} />
            </Magnetic>
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
                  <ArrowUpRight aria-hidden className="size-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <BorderBeam size={260} duration={12} borderWidth={1.5} colorFrom="var(--glow-a)" colorTo="var(--glow-c)" />
      </div>
    </section>
  );
}
