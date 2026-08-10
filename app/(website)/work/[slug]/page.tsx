import { notFound } from "next/navigation";
import { getPayload } from "payload";
import type { Metadata } from "next";
import config from "@/payload.config";
import ProjectHero from "@/components/project/ProjectHero";
import ProjectOverview from "@/components/project/ProjectOverview";
import ProjectGallery from "@/components/project/ProjectGallery";
import RichText from "@/components/payload/RichText";
import ToolsSection from "@/components/ToolsSection";
import { getProjectTools } from "@/lib/tools";
import { resolveImageUrl } from "@/lib/images";
import { pageMetadata } from "@/lib/seo";
import { BreadcrumbJsonLd, ProjectJsonLd } from "@/components/seo/JsonLd";

export const revalidate = 3600;

async function getProject(slug: string) {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "projects",
    depth: 1,
    where: { slug: { equals: slug } },
    limit: 1,
  });
  return docs[0] ?? null;
}

export async function generateStaticParams() {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "projects",
    limit: 0,
    select: { slug: true },
  });
  return docs.map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = await getProject(slug);
  // No canonical for a slug that doesn't resolve — the page 404s.
  if (!project) return {};

  return pageMetadata({
    title: project.title,
    description: project.cardDescription,
    path: `/work/${project.slug}`,
    // cardImage is the screenshot already used on the grid, so a shared link
    // previews as the project rather than the generic site card.
    image: project.cardImage || undefined,
  });
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const toolsByCategory = getProjectTools(project);
  const hasTools =
    toolsByCategory.frontEnd.length > 0 ||
    toolsByCategory.backEnd.length > 0 ||
    toolsByCategory.both.length > 0;

  return (
    // w-full rather than w-screen: 100vw includes the vertical scrollbar, so
    // w-screen made every section a scrollbar's width wider than the page and
    // needed overflow-x-hidden to paper over it.
    <section className="min-h-screen w-full overflow-x-hidden bg-white">
      <ProjectJsonLd
        title={project.title}
        description={project.cardDescription}
        path={`/work/${project.slug}`}
        image={project.cardImage || undefined}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
          { name: project.title, path: `/work/${project.slug}` },
        ]}
      />
      <ProjectHero title={project.title} />

      <ProjectOverview
        description={<RichText data={project.overviewDescription} />}
        role={project.role}
        responsibility={<RichText data={project.responsibility} />}
        learnMoreLabel={project.learnMoreLabel}
        learnMoreHref={project.learnMoreHref}
        learnMoreLinkText={project.learnMoreLinkText ?? undefined}
      />

      <ProjectGallery
        items={(project.gallery ?? [])
          .map((item) => ({
            title: item.title,
            imageUrl: resolveImageUrl(item),
            paragraph: item.caption ? (
              <RichText data={item.caption} />
            ) : undefined,
          }))
          // An entry whose image never resolved would render an empty frame,
          // so drop it rather than show a broken slot.
          .filter((item) => item.imageUrl !== "")}
      />

      {hasTools && (
        <ToolsSection
          bgColor="bg-white"
          frontEndData={toolsByCategory.frontEnd}
          backEndData={toolsByCategory.backEnd}
          bothData={toolsByCategory.both}
          checkWhatDataToShow={{
            frontEndData: toolsByCategory.frontEnd.length > 0,
            backEndData: toolsByCategory.backEnd.length > 0,
            bothData: toolsByCategory.both.length > 0,
          }}
        />
      )}
    </section>
  );
}
