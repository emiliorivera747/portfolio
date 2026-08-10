import type { MetadataRoute } from "next";
import { getPayload } from "payload";
import config from "@/payload.config";
import { absoluteUrl } from "@/lib/seo";

// Regenerated on the same cadence as the pages themselves, so a project or
// post published in the admin shows up without a redeploy.
export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = [
    {
      url: absoluteUrl("/"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: absoluteUrl("/work"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: absoluteUrl("/about"),
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: absoluteUrl("/blog"),
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ];

  // Built from the CMS rather than hardcoded — the previous list had gone
  // stale, missing two projects and every blog post, and pointed at flat
  // routes that now redirect.
  try {
    const payload = await getPayload({ config });

    const [{ docs: projects }, { docs: posts }] = await Promise.all([
      payload.find({
        collection: "projects",
        limit: 200,
        sort: "order",
        select: { slug: true, updatedAt: true },
      }),
      payload.find({
        collection: "posts",
        limit: 500,
        sort: "-createdAt",
        select: { slug: true, updatedAt: true },
      }),
    ]);

    return [
      ...staticEntries,
      ...projects.map((project) => ({
        url: absoluteUrl(`/work/${project.slug}`),
        lastModified: project.updatedAt ? new Date(project.updatedAt) : new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.7,
      })),
      ...posts.map((post) => ({
        url: absoluteUrl(`/blog/${post.slug}`),
        lastModified: post.updatedAt ? new Date(post.updatedAt) : new Date(),
        changeFrequency: "monthly" as const,
        priority: 0.6,
      })),
    ];
  } catch (error) {
    // A sitemap missing its dynamic entries still beats a build failure or an
    // empty file, so fall back to the pages that always exist.
    console.warn(
      "Sitemap falling back to static entries:",
      error instanceof Error ? error.message : error
    );
    return staticEntries;
  }
}
