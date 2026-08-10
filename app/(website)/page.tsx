import { getPayload } from "payload";
import config from "@/payload.config";
import HomeClient from "./HomeClient";
import { groupToolsByProject } from "@/lib/tools";
import { getNavBarData } from "@/lib/navbar";
import { PersonJsonLd, WebSiteJsonLd } from "@/components/seo/JsonLd";
import { resolveImageUrl } from "@/lib/images";
import {
  homeProjectSections,
  type HomeProjectSection,
} from "@/utils/data/home/projectSectionsData";

export const revalidate = 3600;

export default async function Page() {
  const payload = await getPayload({ config });
  const { docs: testimonials } = await payload.find({
    collection: "testimonials",
    depth: 1,
    sort: "order",
    limit: 50,
  });

  const siteSettings = await payload.findGlobal({
    slug: "site-settings",
    depth: 1,
  });
  const heroVideo = siteSettings?.heroVideo;
  const heroVideoUrl =
    typeof heroVideo === "object" && heroVideo?.url ? heroVideo.url : undefined;

  // Project bands come from the CMS, falling back to the checked-in list when
  // the global hasn't been filled in — the homepage should never render with
  // no projects on it.
  const cmsSections = siteSettings?.projectSections ?? [];
  const projectSections: HomeProjectSection[] = cmsSections.length
    ? cmsSections.map((section) => ({
        title: section.title,
        subtitle: section.subtitle ?? undefined,
        url: section.url,
        buttonLabel: section.buttonLabel,
        headerStyle: section.headerStyle,
        mediaType: section.mediaType,
        // Only the media matching `mediaType` is passed down. Switching a
        // section between video and image in the CMS leaves the other URL
        // behind, and shipping that to the client would put a dead asset URL
        // in the page payload.
        videoUrl:
          section.mediaType === "image"
            ? undefined
            : section.videoUrl ?? undefined,
        // resolveImageUrl handles both halves of the URL-or-upload picker.
        imageUrl:
          section.mediaType === "image"
            ? resolveImageUrl(section) || undefined
            : undefined,
        imageAlt: section.imageAlt ?? undefined,
        // Only meaningful alongside a video — a section already showing an
        // image shows it at every width.
        mobileImageUrl:
          section.mediaType === "image"
            ? undefined
            : resolveImageUrl(section.mobileImage ?? {}) || undefined,
        mobileImageAlt: section.mobileImage?.alt ?? undefined,
        toolsSlug:
          typeof section.toolsFromProject === "object" &&
          section.toolsFromProject
            ? section.toolsFromProject.slug
            : undefined,
        showDividerBefore: section.showDividerBefore ?? true,
      }))
    : homeProjectSections;

  const { docs: projects } = await payload.find({
    collection: "projects",
    depth: 1,
    limit: 200,
  });
  const toolsByProject = groupToolsByProject(projects);

  const menuItems = await getNavBarData();

  return (
    <>
      <PersonJsonLd />
      <WebSiteJsonLd />
      <HomeClient
        testimonials={testimonials}
        heroVideoUrl={heroVideoUrl}
        toolsByProject={toolsByProject}
        menuItems={menuItems}
        projectSections={projectSections}
      />
    </>
  );
}
