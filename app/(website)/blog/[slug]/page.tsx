import { notFound } from "next/navigation";
import { getPayload } from "payload";
import type { Metadata } from "next";
import config from "@/payload.config";
import BlogPostClient from "./BlogPostClient";
import { getNavBarData } from "@/lib/navbar";
import { pageMetadata } from "@/lib/seo";
import { ArticleJsonLd, BreadcrumbJsonLd } from "@/components/seo/JsonLd";

export const revalidate = 3600;

async function getPost(slug: string) {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "posts",
    depth: 1,
    where: { slug: { equals: slug } },
    limit: 1,
  });
  return docs[0] ?? null;
}

export async function generateStaticParams() {
  const payload = await getPayload({ config });
  const { docs } = await payload.find({
    collection: "posts",
    limit: 0,
    select: { slug: true },
  });
  return docs.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) return {};

  const cover = typeof post.coverImage === "object" ? post.coverImage : null;

  return pageMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
    image: cover?.url || undefined,
    // `article` rather than `website` so shares carry the byline and date.
    type: "article",
    publishedTime: post.createdAt,
  });
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPost(slug);
  if (!post) notFound();

  const menuItems = await getNavBarData();

  const cover = typeof post.coverImage === "object" ? post.coverImage : null;

  return (
    <>
      <ArticleJsonLd
        title={post.title}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        image={cover?.url || undefined}
        datePublished={post.createdAt}
        dateModified={post.updatedAt}
      />
      <BreadcrumbJsonLd
        items={[
          { name: "Home", path: "/" },
          { name: "Blog", path: "/blog" },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      />
      <BlogPostClient post={post} menuItems={menuItems} />
    </>
  );
}
