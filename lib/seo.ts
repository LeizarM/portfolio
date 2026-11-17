import type { Metadata } from "next";
import { site, type Locale } from "./content";

interface PageSeo {
  lang: Locale;
  title: string;
  description: string;
  /** Ruta de esta página en cada idioma, con barra inicial y final. */
  path: Record<Locale, string>;
}

export function buildMetadata({ lang, title, description, path }: PageSeo): Metadata {
  const url = (p: string) => `${site.url}${p}`;
  return {
    title,
    description,
    authors: [{ name: site.name, url: site.url }],
    alternates: {
      canonical: url(path[lang]),
      languages: { es: url(path.es), en: url(path.en), "x-default": url(path.es) },
    },
    openGraph: {
      type: "website",
      url: url(path[lang]),
      title,
      description,
      siteName: site.name,
      locale: lang === "es" ? "es_BO" : "en_US",
      images: [{ url: url("/og.png"), width: 1200, height: 630, alt: site.name }],
    },
    twitter: { card: "summary_large_image", title, description, images: [url("/og.png")] },
  };
}

export function personJsonLd(lang: Locale) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: site.name,
    url: site.url,
    email: `mailto:${site.email}`,
    jobTitle: lang === "es" ? "Desarrollador backend y móvil" : "Backend and mobile developer",
    address: { "@type": "PostalAddress", addressLocality: "La Paz", addressCountry: "BO" },
    sameAs: [site.linkedin, site.github],
    knowsAbout: ["Java", "Spring Boot", "Quarkus", "Flutter", "SQL Server", "SAP Business One"],
  };
}
