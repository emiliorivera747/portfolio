import React from "react";
import Link from "next/link";

interface BlogItemContent {
  title?: string;
  description?: string;
  id?: string | number;
  createdAt?: Date;
}

const BlogItemContent = ({
  title = "No title provided",
  description = "No description provided for the post",
  id = "#",
  createdAt = new Date(),
}: BlogItemContent) => {
  return (
    <div className="w-[20rem] flex flex-col gap-4">
      <Link
        href={`posts/${id}`}
        className="font-semibold text-primary-1000 text-2xl hover:underline"
      >
        {title}
      </Link>
      <div className="font-normal text-primary-700  flex flex-row text-md gap-1">
        <span>Emilio Rivera </span>
        <span className="">-</span>
        <span className="">
          {new Date(createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          })}
        </span>
      </div>

      <span className="text-primary-700 font-extralight text-md">
        {description ? description : "No description provided for the post"}
      </span>
    </div>
  );
};

export default BlogItemContent;
