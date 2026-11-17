import { site, type Locale } from "@/lib/content";
import { ui } from "@/lib/i18n";

export function Footer({ lang }: { lang: Locale }) {
  const t = ui[lang];
  return (
    <footer>
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
