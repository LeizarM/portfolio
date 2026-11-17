import type { Metadata } from "next";
import { HomePage } from "@/components/site/home-page";
import { hero, site } from "@/lib/content";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  lang: "en",
  title: `${site.name}, backend and mobile developer in La Paz`,
  description: hero.pitch.en,
  path: { es: "/", en: "/en/" },
});

export default function Page() {
  return <HomePage lang="en" />;
}
