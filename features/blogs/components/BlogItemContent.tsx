import React from "react";
import Link from "next/link";

interface BlogItemContent {
  title?: string;
  description?: string;
  id?: string | number;
}

const BlogItemContent = ({
  title = "No title provided",
  description = "No description provided for the post",
  id = "#",
}: BlogItemContent) => {
  return (
    <div className="w-[20rem] flex flex-col gap-4">
      <Link
        href={`posts/${id}`}
        className="font-semibold text-primary-1000 text-2xl hover:underline"
      >
        {title}
      </Link>
      <span className="text-primary-700 font-extralight text-md">
        {description ? description : "No description provided for the post"}
      </span>
    </div>
  );
};

export default BlogItemContent;
