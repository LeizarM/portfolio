import { site, type Locale } from "@/lib/content";
import { ui } from "@/lib/i18n";
import ScrollVelocity from "@/components/reactbits/ScrollVelocity";

export function Footer({ lang }: { lang: Locale }) {
  const t = ui[lang];
  return (
    <footer>
      <div aria-hidden className="overflow-hidden pb-10">
        <ScrollVelocity
          texts={[site.name, "Backend  Mobile  ERP  Infra"]}
          velocity={55}
          fadeEdges
          outlineAlternate
          className="text-[clamp(3rem,10vw,8rem)] font-semibold tracking-[-0.05em] text-foreground/90"
        />
      </div>
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-8 label-mono sm:flex-row sm:items-center sm:justify-between sm:px-8">
        <p>
          {site.name}, {new Date().getFullYear()}. {t.footer.built}
        </p>
        <a href={`${site.github}/portfolio`} className="underline underline-offset-4 hover:text-foreground">
          {t.footer.source}
        </a>
      </div>
    </footer>
  );
}
