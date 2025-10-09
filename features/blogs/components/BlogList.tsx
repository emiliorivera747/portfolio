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
          <div key={title} className="mx-14 border-y py-8 flex gap-10">
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
            <span>{description}</span>
          </div>
        );
      })}
    </div>
  );
};

export default BlogList;
