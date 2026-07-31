import { getPayload } from "payload";
import config from "@/payload.config";
import HomeClient from "./HomeClient";
import { groupToolsByProject } from "@/lib/tools";

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

  const { docs: tools } = await payload.find({
    collection: "tools",
    depth: 1,
    sort: "order",
    limit: 200,
  });
  const toolsByProject = groupToolsByProject(tools);

  return (
    <HomeClient
      testimonials={testimonials}
      heroVideoUrl={heroVideoUrl}
      toolsByProject={toolsByProject}
    />
  );
}
