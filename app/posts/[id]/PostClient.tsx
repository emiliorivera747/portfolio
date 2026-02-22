"use client";
import useFetchPostById from "@/features/blogs/hooks/useFetchPostById";
import { renderTipTapJSON } from "@/utils/tiptap-helpers/tiptapRenderer";
import Image from "next/image";
import BlogPostSkeleton from "@/features/blogs/components/skeletons/BlogPostSkeleton";
import { PostResponse } from "@/features/blogs/types/post";
import CommentSection from "@/features/blogs/components/comments/CommentSection";

interface PostClientProps {
  id: string;
  initialPost?: PostResponse;
}

/**
 * Displays the post with id
 */
const PostClient = ({ id, initialPost }: PostClientProps) => {
  const isValidId = id && id.trim() !== "";
  const { postResponse, isLoadingPost, isErrorPost, postError } =
    useFetchPostById({
      id,
      initialData: initialPost,
    });

  if (!isValidId) {
    return (
      <div className="text-center py-20 text-red-600">
        <h2>Invalid Post ID</h2>
        <p>Please check the URL and try again.</p>
      </div>
    );
  }

  if (isLoadingPost) return <BlogPostSkeleton />;
  if (isErrorPost) return <div>Opps</div>;

  return (
    <div className="flex items-center justify-center">
      <article
        style={{
          fontFamily: `Georgia, 'Nimbus Roman No9 L', 'Century Schoolbook L', serif`,
        }}
        className="min-h-screen sm:mx-[1%] md:mx-[4%] lg:mx-[24%] font-normal pb-10 h-auto lg:w-[60rem] "
      >
        <div className="pt-[7rem] mx-[8%] text-4xl">
          <h1 className="text-primary-900 font-semibold times-header upper mb-1">
            {postResponse?.data?.title}
          </h1>
          <div className="flex flex-row gap-4 items-center text-[0.9rem] mb-4 text-primary-700 font-light justify-between px-2">
            <div className="flex items-center justify-between  w-full">
              <div className="flex items-center gap-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={1.5}
                  stroke="currentColor"
                  className="size-6"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                  />
                </svg>
                <span>5 min read</span>
                {new Date(postResponse?.data?.created_at).toLocaleDateString(
                  "en-US",
                  {
                    month: "short",
                    day: "2-digit",
                    year: "numeric",
                  }
                )}
              </div>
              {/* Summarize button temporarily disabled */}
            </div>
          </div>

          {/* --- Go through the content blocks */}
          {postResponse?.data?.content_block?.map(
            ({
              id,
              content_data,
              content_order,
              content_type,
              media,
            }: {
              id: number;
              content_data: any;
              content_order: number;
              content_type: string;
              media: any;
            }) => {
              if (content_type === "image")
                return (
                  <Image
                    key={id}
                    src={
                      media?.url
                        ? media?.url
                        : "https://res.cloudinary.com/dcss55nem/image/upload/v1700595590/Untitled_design_1_nwce2n.png"
                    }
                    alt={media?.alt || "Image"}
                    height={675}
                    width={1200}
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 80rem"
                    className="w-full rounded-[12px] mb-4 sm:mb-10  h-[16rem] sm:h-full"
                  />
                );
              return (
                <div
                  key={id}
                  className="blog-content font-extralight pb-4"
                  dangerouslySetInnerHTML={{
                    __html: renderTipTapJSON(content_data) || "",
                  }}
                />
              );
            }
          )}
          <CommentSection postId={id} />
        </div>
      </article>
    </div>
  );
};

export default PostClient;
