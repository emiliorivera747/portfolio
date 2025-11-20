import type { Metadata } from "next";
import PostClient from "@/app/posts/[id]/PostClient";
import { blogsServices } from "@/features/blogs/services/blogsServices";

interface Props {
  params: Promise<{ id: string }>;
}

/**
 * Generates metadata
 *
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const post = await blogsServices.fetchPostById(id);

  return {
    title: post.data.title || "Post Not Found",
    description:
      post.data.description || "Read this post on Emilio Rivera's portfolio.",
  };
}
export default async function Page({ params }: Props) {
  const { id } = await params;
  return <PostClient id={id} />;
}
