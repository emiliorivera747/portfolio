import React from "react";
import { Post, PostListProps } from "@/features/blogs/types/post";

// Components
import BlogListImageSection from "@/features/blogs/components/BlogListImageSection";
import BlogItemContent from "@/features/blogs/components/BlogItemContent";

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
              key={id}
              className="border-y py-8 flex gap-10 border-primary-200"
            >
              <BlogListImageSection
                image_url={image_url}
                title={title}
                id={id}
              />
              <BlogItemContent
                title={title}
                id={id}
                description={description}
              />
            </div>
          );
        })}
      {(!posts || posts?.length === 0) && <div className="text-2xl text-primary-700 font-extralight">No posts found at this time.</div>}
    </div>
  );
};

export default BlogList;
