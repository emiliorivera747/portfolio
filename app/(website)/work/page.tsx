import { getPayload } from "payload";
import config from "@/payload.config";
import ProjectsGridClient from "./ProjectsGridClient";
import { BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const revalidate = 3600;

export default async function ProjectsPage() {
  const payload = await getPayload({ config });
  const { docs: projects } = await payload.find({
    collection: "projects",
    sort: "order",
    limit: 100,
  });

  return (
    <>
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Work", path: "/work" },
        ]}
      />
      <ProjectsGridClient projects={projects} />
    </>
  );
}
