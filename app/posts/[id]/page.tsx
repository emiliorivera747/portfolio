import type { Metadata, ResolvingMetadata } from "next";
import PostClient from "@/app/posts/[id]/PostClient";
import { blogsServices } from "@/features/blogs/services/blogsServices";
import { notFound } from "next/navigation";
interface Props {
  params: Promise<{ id: string }>;
}

/**
 * Generates metadata
 *
 */
export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const { id } = await params;

  try {
    const post = await blogsServices.fetchPostById(id);

    return {
      title: post.data.title || "Post Not Found",
      description: post.data.description || "Read this post on Emilio Rivera's portfolio.",
    };
  } catch (error: any) {
    if (error.message.includes("404")) {
      return {
        title: "Post Not Found",
        description: "The blog post you are looking for does not exist.",
      };
    }
    throw error; // re-throw other errors
  }
}
export default async function Page({ params }: Props) {
  const { id } = await params;

  let post;
  try {
    post = await blogsServices.fetchPostById(id);
  } catch (error: any) {
    if (error.message.includes("Status: 404")) {
      notFound(); // This triggers Next.js 404 page properly
    }
    throw error; // other errors (500, network, etc.)
  }

  // If we get here, post exists — pass data down if needed
  // Or just let the client fetch it (your current approach is fine)
  return <PostClient id={id} />;
}
