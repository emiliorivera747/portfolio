import Link from "next/link";
import { BlogItemContentProps } from "@/features/blogs/types/post";

const BlogItemContent = ({
  title = "No title provided",
  description = "No description provided for the post",
  id = "#",
  createdAt = new Date(),
}: BlogItemContentProps) => {
  return (
    <div className="w-full flex flex-col gap-1">
      <Link
        href={`posts/${id}`}
        className="font-bold text-primary-1000 text-2xl hover:underline"
      >
        {title}
      </Link>
      <span className="text-primary-800 font-extralight text-[1rem] mb-2">
        {description ? description : "No description provided for the post"}
      </span>
      <div className="font-light text-primary-700 flex flex-col text-md gap-1">
        {/* <span className="text-primary-800 text-sm">
          <i>By Emilio Rivera</i>
        </span> */}
        <span className="flex flex-row gap-3 items-center text-[0.85rem]">
          <div className="flex items-center gap-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-4"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
            <span>5 min read</span>
          </div>

          {new Date(createdAt).toLocaleDateString("en-US", {
            month: "short",
            day: "2-digit",
            year: "numeric",
          })}
        </span>
      </div>
    </div>
  );
};

export default BlogItemContent;
