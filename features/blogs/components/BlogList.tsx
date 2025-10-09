import React from "react";
import { Post, PostListProps } from "@/features/blogs/types/post";
import { CldImage } from "next-cloudinary";
import Link from "next/link";

// Components
import BlogListImageSection from "@/features/blogs/components/BlogListImageSection";

/**
 *
 * Displays a blog list
 *
 * @param param0
 * @returns
 */
const BlogList = ({ posts }: PostListProps) => {
  return (
    <div>
      {Array.isArray(posts) &&
        posts?.map(({ image_url, title, description, id }: Post) => {
          return (
            <div
              key={title}
              className="border-y py-8 flex gap-10 border-primary-200"
            >
              <BlogListImageSection
                image_url={image_url}
                title={title}
                id={id}
              />

              <div className="w-[20rem] flex flex-col gap-4">
                <Link
                  href={`posts/${id}`}
                  className="font-semibold text-primary-1000 text-2xl hover:underline"
                >
                  {title}
                </Link>
                <span className="text-primary-700 font-extralight text-md">
                  {description
                    ? description
                    : "No description provided for the post"}
                </span>
              </div>
            </div>
          );
        })}

      {!posts && <div>No posts found</div>}
    </div>
  );
};

export default BlogList;
