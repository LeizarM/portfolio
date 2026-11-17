import { Database, Network, Server, Smartphone, type LucideIcon } from "lucide-react";
import { lines, type LineId, type Locale } from "@/lib/content";
import { ui } from "@/lib/i18n";
import { lineVar } from "@/lib/lines";
import { MagicCard } from "@/components/magicui/magic-card";
import { Section } from "./section";

const ICONS: Record<LineId, LucideIcon> = {
  backend: Server,
  mobile: Smartphone,
  data: Database,
  infra: Network,
};

/** Las cuatro áreas de trabajo. Cada tarjeta se ilumina bajo el puntero con el color de su área. */
export function Stack({ lang }: { lang: Locale }) {
  const t = ui[lang].stack;
  return (
    <Section id="stack" title={t.title} intro={t.intro}>
      <ul className="grid gap-4 md:grid-cols-2">
        {lines.map((line) => {
          const Icon = ICONS[line.id];
          return (
            <li key={line.id} id={`linea-${line.id}`} className="scroll-mt-28">
              <MagicCard
                className="h-full rounded-3xl"
                gradientSize={320}
                gradientFrom={lineVar[line.id]}
                gradientTo="var(--glow-b)"
                gradientColor={lineVar[line.id]}
                gradientOpacity={0.14}
              >
                <div className="p-7 sm:p-9">
                  <div className="flex items-center gap-4">
                    <span
                      className="flex size-12 items-center justify-center rounded-2xl border"
                      style={{
                        color: lineVar[line.id],
                        background: `color-mix(in srgb, ${lineVar[line.id]} 12%, transparent)`,
                        boxShadow: `0 0 28px -6px ${lineVar[line.id]}`,
                      }}
                    >
                      <Icon aria-hidden className="size-6" />
                    </span>
                    <div>
                      <h3 className="text-[1.45rem] font-semibold tracking-[-0.03em]">{line.name[lang]}</h3>
                      <p className="text-[0.98rem] text-muted-foreground">{line.summary[lang]}</p>
                    </div>
                  </div>
                  <ul className="mt-7 divide-y">
                    {line.tech.map((tech) => (
                      <li key={tech.name} className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-0.5 py-3">
                        <span className="font-medium">{tech.name}</span>
                        <span className="label-mono text-right">
                          <span className="sr-only">{t.usedIn}: </span>
                          {tech.usedIn[lang]}
                        </span>
                      </li>
                    ))}
                  </ul>
                </div>
              </MagicCard>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
