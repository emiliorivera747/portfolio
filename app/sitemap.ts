import type { MetadataRoute } from "next";
import { blogsServices } from "@/features/blogs/services/blogsServices";

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL!;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  let postEntries: MetadataRoute.Sitemap = [];

  try {
    const res = await blogsServices.fetchPosts();
    const posts = res?.data ?? [];
    postEntries = posts.map((post: { id: string | number; updatedAt?: string; createdAt?: string }) => ({
      url: `${BASE_URL}/posts/${post.id}`,
      lastModified: post.updatedAt ?? post.createdAt,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));
  } catch {
    // If the API is down at build time, skip post entries rather than failing the build
  }

  return [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${BASE_URL}/projects`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/casa-chirilagua`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/my-portfolio`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/posts`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 0.9,
    },
    ...postEntries,
  ];
}
