import { type Locale } from "@/lib/content";
import { ui } from "@/lib/i18n";
import { personJsonLd } from "@/lib/seo";
import ClickSpark from "@/components/reactbits/ClickSpark";
import { MotionProvider } from "./motion-provider";
import { Tama } from "./tama";
import { ThemeProvider } from "./theme-provider";

/** Documento raíz compartido por los dos idiomas. */
export function SiteShell({ lang, children }: { lang: Locale; children: React.ReactNode }) {
  return (
    <html lang={lang} className="dark" suppressHydrationWarning>
      <body>
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-50 focus:rounded-md focus:bg-primary focus:px-4 focus:py-2 focus:text-primary-foreground"
        >
          {ui[lang].skip}
        </a>
        <ThemeProvider>
          <MotionProvider>
            <ClickSpark sparkColor="#3ddcff" sparkCount={10} sparkRadius={22}>
              {children}
            </ClickSpark>
          </MotionProvider>
          <Tama lang={lang} />
        </ThemeProvider>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(personJsonLd(lang)) }}
        />
      </body>
    </html>
  );
}
