import { getPayload } from "payload";
import config from "@/payload.config";
import HomeClient from "./HomeClient";

export const revalidate = 3600;

export default async function Page() {
  const payload = await getPayload({ config });
  const { docs: testimonials } = await payload.find({
    collection: "testimonials",
    depth: 1,
    sort: "order",
    limit: 50,
  });

  const siteSettings = await payload.findGlobal({ slug: "site-settings" });

  return (
    <HomeClient
      testimonials={testimonials}
      heroVideoUrl={siteSettings?.heroVideoUrl}
    />
  );
}
