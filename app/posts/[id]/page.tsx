import useFetchPostById from "@/features/blogs/hooks/useFetchPostById";
import type { Metadata } from "next";
import PostClient from "@/app/posts/[id]/PostClient";
import { blogsServices } from "@/features/blogs/services/blogsServices";

interface Props {
  params: { id: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post = await blogsServices.fetchPostById(params.id);

  return {
    title: post.data.title || "Post Not Found",
    description:
      post.data.description || "Read this post on Emilio Rivera's portfolio.",
  };
}

export default async function PostPage({ params }: Props) {
  const { id } = await params;
  return <PostClient id={id} />;
}
