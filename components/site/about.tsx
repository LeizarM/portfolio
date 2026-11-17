import { MapPin } from "lucide-react";
import { about, site, type Locale } from "@/lib/content";
import { ui } from "@/lib/i18n";
import { DotPattern } from "@/components/magicui/dot-pattern";
import { LocalTime } from "./local-time";
import ScrollReveal from "@/components/reactbits/ScrollReveal";
import { Section } from "./section";

export function About({ lang }: { lang: Locale }) {
  const t = ui[lang].about;
  const [lead = "", ...rest] = about.paragraphs[lang];
  return (
    <Section id="sobre-mi" title={t.title}>
      <div className="grid gap-4 lg:grid-cols-3">
        <div className="glass rounded-3xl p-7 sm:p-10 lg:col-span-2">
          <ScrollReveal
            baseOpacity={0.12}
            baseRotation={2}
            blurStrength={6}
            containerClassName="!my-0"
            textClassName="!text-[clamp(1.45rem,2.9vw,2.2rem)] !font-medium !leading-[1.2] tracking-[-0.025em]"
          >
            {lead}
          </ScrollReveal>
          <div className="mt-8 grid gap-6 text-muted-foreground sm:grid-cols-2">
            {rest.map((p) => (
              <p key={p}>{p}</p>
            ))}
          </div>
        </div>
        <div className="glass relative flex min-h-[20rem] flex-col overflow-hidden rounded-3xl p-7">
          <DotPattern
            width={18}
            height={18}
            cr={1}
            className="fill-foreground/20 [mask-image:radial-gradient(70%_60%_at_70%_100%,black,transparent)]"
          />
          <span
            aria-hidden
            className="absolute -bottom-24 -right-16 size-72 rounded-full bg-glow-a opacity-30 blur-[80px]"
          />
          <p className="label-mono relative">{t.where}</p>
          <p className="relative mt-2 flex items-center gap-2 text-[1.35rem] font-semibold tracking-tight">
            <MapPin aria-hidden className="size-5 text-glow-c" />
            {site.location[lang]}
          </p>
          <div className="relative mt-auto pt-10">
            <p className="label-mono">{t.time}</p>
            <LocalTime />
            <p className="mt-1 text-muted-foreground">{t.zone}</p>
          </div>
        </div>
      </div>
    </Section>
  );
}
