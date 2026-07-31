import { notFound } from "next/navigation";
import { getPayload } from "payload";
import type { Metadata } from "next";
import config from "@/payload.config";
import ProjectHero from "@/components/project/ProjectHero";
import ProjectOverview from "@/components/project/ProjectOverview";
import ProjectGallery from "@/components/project/ProjectGallery";
import RichText from "@/components/payload/RichText";
import ToolsSection from "@/components/ToolsSection";
import { groupToolsByCategory } from "@/lib/tools";

export const revalidate = 3600;

async function getProject(slug: string) {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "projects",
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
  if (!project) return {};

  return {
    title: `${project.title} | Emilio Rivera's Portfolio`,
    description: project.cardDescription,
  };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await getProject(slug);
  if (!project) notFound();

  const payload = await getPayload({ config });
  const { docs: tools } = await payload.find({
    collection: "tools",
    depth: 1,
    sort: "order",
    where: { project: { equals: project.id } },
    limit: 200,
  });
  const toolsByCategory = groupToolsByCategory(tools);
  const hasTools = tools.length > 0;

  return (
    <section className="h-screen w-screen overflow-x-hidden bg-white">
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
        items={(project.gallery ?? []).map((item) => ({
          title: item.title,
          imageUrl: item.imageUrl,
          paragraph: item.caption ? <RichText data={item.caption} /> : undefined,
        }))}
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
