import { about, type Locale } from "@/lib/content";
import { ui } from "@/lib/i18n";
import { RevealText } from "./reveal-text";
import { Section } from "./section";

export function About({ lang }: { lang: Locale }) {
  const [lead = "", ...rest] = about.paragraphs[lang];
  return (
    <Section id="sobre-mi" title={ui[lang].about.title}>
      <RevealText
        as="p"
        mode="words"
        className="type-semiwide max-w-[26ch] text-[clamp(1.6rem,4.2vw,3.4rem)] font-bold leading-[1.12] tracking-[-0.015em]"
      >
        {lead}
      </RevealText>
      <div className="mt-14 grid max-w-5xl gap-8 text-[1.1rem] text-muted-foreground md:grid-cols-2 md:gap-14">
        {rest.map((p) => (
          <p key={p}>{p}</p>
        ))}
      </div>
    </Section>
  );
}
