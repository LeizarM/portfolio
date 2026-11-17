import type { MetadataRoute } from "next";
import { locales, projects, site } from "@/lib/content";
import { paths } from "@/lib/i18n";

export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const pages = locales.flatMap((lang) => [
    paths.home(lang),
    ...projects.map((p) => paths.project(lang, p.slug)),
  ]);
  return pages.map((path) => ({ url: `${site.url}${path}`, changeFrequency: "monthly" }));
}
