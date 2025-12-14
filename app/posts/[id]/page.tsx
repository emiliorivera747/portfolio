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
    
    // Find the first image in content blocks for Open Graph
    const firstImage = post.data.content_block?.find(
      (block) => block.content_type === "image" && block.media?.url
    )?.media?.url;

    // Get the default Open Graph image from parent if no image found
    const parentMetadata = await parent;
    const defaultImage = parentMetadata.openGraph?.images?.[0];

    return {
      title: post.data.title || "Post Not Found",
      description: post.data.description || "Read this post on Emilio Rivera's portfolio.",
      openGraph: {
        title: post.data.title || "Post Not Found",
        description: post.data.description || "Read this post on Emilio Rivera's portfolio.",
        images: firstImage ? [firstImage] : defaultImage ? [defaultImage] : [],
      },
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
    // Note: This fetch is automatically deduplicated with the one in generateMetadata
    // by Next.js during the same render cycle (Request Memoization)
    post = await blogsServices.fetchPostById(id);
  } catch (error: any) {
    if (error.message.includes("Status: 404")) {
      notFound(); // This triggers Next.js 404 page properly
    }
    throw error; // other errors (500, network, etc.)
  }

  // Pass the fetched post to avoid duplicate fetching on the client
  return <PostClient id={id} initialPost={post} />;
}
