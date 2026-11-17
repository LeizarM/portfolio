import { lab, labTicker, type Locale } from "@/lib/content";
import { ui } from "@/lib/i18n";
import { Marquee } from "@/components/magicui/marquee";
import { Section } from "./section";

export function Lab({ lang }: { lang: Locale }) {
  return (
    <Section id="laboratorio" title={ui[lang].lab.title}>
      <ul className="grid gap-x-10 gap-y-8 sm:grid-cols-2 lg:grid-cols-4">
        {lab.map((item) => (
          <li key={item.title.es} className="border-t pt-4">
            <h3 className="type-semiwide text-[1.15rem] font-extrabold">{item.title[lang]}</h3>
            <p className="mt-2 text-muted-foreground">{item.body[lang]}</p>
          </li>
        ))}
      </ul>
      <div aria-hidden className="mt-14 border-y py-1">
        <Marquee pauseOnHover className="[--duration:45s] [--gap:3rem]">
          {labTicker.map((item) => (
            <span key={item} className="type-wide text-[1.05rem] font-bold text-muted-foreground">
              {item}
            </span>
          ))}
        </Marquee>
      </div>
    </Section>
  );
}
