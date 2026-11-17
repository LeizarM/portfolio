import { about, type Locale } from "@/lib/content";
import { ui } from "@/lib/i18n";
import { Section } from "./section";

export function About({ lang }: { lang: Locale }) {
  const [lead, ...rest] = about.paragraphs[lang];
  return (
    <Section id="sobre-mi" title={ui[lang].about.title}>
      <div className="grid gap-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
        <p className="type-semiwide max-w-[34ch] text-[clamp(1.35rem,2.4vw,1.75rem)] font-semibold leading-snug">
          {lead}
        </p>
        <div className="max-w-[58ch] space-y-5 text-muted-foreground">
          {rest.map((p) => (
            <p key={p}>{p}</p>
          ))}
        </div>
      </div>
    </Section>
  );
}
