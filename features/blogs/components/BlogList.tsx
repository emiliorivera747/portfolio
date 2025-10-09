import React from "react";
import { Post, PostListProps } from "@/features/blogs/types/post";
import { CldImage } from "next-cloudinary";

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
      {posts.map(({ image_url, title, description }: Post) => {
        return (
          <div key={title} className="border-y py-8 flex gap-10">
            <CldImage
              src={
                image_url
                  ? image_url
                  : "https://res.cloudinary.com/dcss55nem/image/upload/v1700596192/Untitled_design_2_udsazb.png"
              }
              height={400}
              width={400}
              alt={title || "Default alt text"}
              className="rounded-[12px]"
            />
            <div className="w-[20rem] flex flex-col gap-4">
              <h1 className="font-semibold text-primary-1000 text-2xl">{title}</h1>
              <span className="text-primary-700 font-light">{description ? description: "No description provided for the blog"}</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default BlogList;
