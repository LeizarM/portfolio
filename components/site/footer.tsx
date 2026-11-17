import { site, type Locale } from "@/lib/content";
import { ui } from "@/lib/i18n";
import ScrollVelocity from "@/components/reactbits/ScrollVelocity";
import { TamaTrigger } from "./tama";

export function Footer({ lang }: { lang: Locale }) {
  const t = ui[lang];
  const areas =
    lang === "es"
      ? ["Backend", "Móvil", "Datos", "Infraestructura"]
      : ["Backend", "Mobile", "Data", "Infrastructure"];
  return (
    <footer>
      <div aria-hidden className="overflow-hidden pb-12 pt-4">
        <ScrollVelocity
          texts={[
            <span key="name" className="px-[0.18em]">
              {site.name}
            </span>,
            <span key="areas" className="inline-flex gap-[0.45em] px-[0.22em]">
              {areas.map((area) => (
                <span key={area}>{area}</span>
              ))}
            </span>,
          ]}
          velocity={55}
          fadeEdges
          outlineAlternate
          className="text-foreground/90"
          scrollerClassName="!text-[clamp(2.6rem,9vw,7.5rem)] !font-semibold !leading-[1.14] !tracking-[-0.05em] md:!leading-[1.14]"
        />
      </div>
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 label-mono sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          {site.name}, {new Date().getFullYear()}. {t.footer.built}
        </p>
        <TamaTrigger />
        <a href={`${site.github}/portfolio`} className="underline underline-offset-4 hover:text-foreground">
          {t.footer.source}
        </a>
      </div>
    </footer>
  );
}
