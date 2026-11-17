import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProjectPage } from "@/components/site/project-page";
import { getProject, projects, site } from "@/lib/content";
import { paths } from "@/lib/i18n";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return buildMetadata({
    lang: "es",
    title: `${project.title.es} | ${site.shortName}`,
    description: project.summary.es,
    path: { es: paths.project("es", slug), en: paths.project("en", slug) },
  });
}

export default async function Page({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();
  return <ProjectPage project={project} lang="es" />;
}
