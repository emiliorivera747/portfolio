import React from "react";
import { Post, PostListProps } from "@/features/blogs/types/post";
import { CldImage } from "next-cloudinary";
import Link from "next/link";

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
      {posts.map(({ image_url, title, description, id }: Post) => {
        return (
          <div
            key={title}
            className="border-y py-8 flex gap-10 border-primary-200"
          >
            <div
              className="group relative overflow-hidden rounded-[12px]"
              style={{ position: "relative" }}
            >
              <Link href={`posts/${id}`}>
                <CldImage
                  src={
                    image_url
                      ? image_url
                      : "https://res.cloudinary.com/dcss55nem/image/upload/v1700596192/Untitled_design_2_udsazb.png"
                  }
                  height={300}
                  width={300}
                  alt={title || "Default alt text"}
                  className="w-full duration-200 md-block group-hover:scale-110"
                />
              </Link>
            </div>

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
    </div>
  );
};

export default BlogList;
