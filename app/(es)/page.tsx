import type { Metadata } from "next";
import { HomePage } from "@/components/site/home-page";
import { hero, site } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  lang: "es",
  title: `${site.name}, desarrollador backend y móvil en La Paz`,
  description: hero.pitch.es,
  path: { es: "/", en: "/en/" },
});

export default function Page() {
  return <HomePage lang="es" />;
}
