import { type Locale } from "@/lib/content";
import { paths } from "@/lib/i18n";
import { About } from "./about";
import { Contact } from "./contact";
import { Experience } from "./experience";
import { Footer } from "./footer";
import { Header } from "./header";
import { Hero } from "./hero";
import { Lab } from "./lab";
import { Projects } from "./projects";
import { Stack } from "./stack";

export function HomePage({ lang }: { lang: Locale }) {
  return (
    <>
      <Header lang={lang} altHref={paths.home(lang === "es" ? "en" : "es")} />
      <main id="contenido">
        <Hero lang={lang} />
        <About lang={lang} />
        <Projects lang={lang} />
        <Stack lang={lang} />
        <Experience lang={lang} />
        <Lab lang={lang} />
        <Contact lang={lang} />
      </main>
      <Footer lang={lang} />
    </>
  );
}
