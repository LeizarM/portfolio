import { Bot, Boxes, Palette, ServerCog, type LucideIcon } from "lucide-react";
import { lab, type Locale } from "@/lib/content";
import { ui } from "@/lib/i18n";
import { Section } from "./section";

const ICONS: LucideIcon[] = [ServerCog, Bot, Boxes, Palette];

export function Lab({ lang }: { lang: Locale }) {
  return (
    <Section id="laboratorio" title={ui[lang].lab.title}>
      <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {lab.map((item, i) => {
          const Icon = ICONS[i] ?? Boxes;
          return (
            <li
              key={item.title.es}
              className="glass group rounded-3xl p-6 transition-transform duration-300 hover:-translate-y-1"
            >
              <Icon aria-hidden className="size-6 text-glow-b transition-colors group-hover:text-glow-c" />
              <h3 className="mt-5 text-[1.15rem] font-semibold tracking-[-0.02em]">{item.title[lang]}</h3>
              <p className="mt-2 text-[0.98rem] text-muted-foreground">{item.body[lang]}</p>
            </li>
          );
        })}
      </ul>
    </Section>
  );
}
