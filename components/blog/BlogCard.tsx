import Link from "next/link";
import Image from "next/image";
import type { Post } from "@/payload-types";

const FALLBACK_IMAGE =
  "https://res.cloudinary.com/dcss55nem/image/upload/v1700596192/Untitled_design_2_udsazb.png";

export default function BlogCard({ post }: { post: Post }) {
  const cover = typeof post.coverImage === "object" ? post.coverImage : null;

  return (
    <div className="rounded-[12px] py-8 flex gap-4 border-primary-300 flex-col sm:flex-col sm:h-[40rem]">
      <Link
        href={`/blog/${post.slug}`}
        className="group relative overflow-hidden rounded-[12px] block"
      >
        <Image
          src={cover?.url || FALLBACK_IMAGE}
          alt={cover?.alt || post.title}
          height={150}
          width={300}
          className="w-full duration-200 md-block group-hover:scale-110"
        />
      </Link>
      <div className="w-full flex flex-col gap-1">
        <Link
          href={`/blog/${post.slug}`}
          className="font-bold text-primary-1000 text-2xl hover:underline"
        >
          {post.title}
        </Link>
        <span className="text-primary-800 font-extralight text-[1rem] mb-2">
          {post.excerpt}
        </span>
        <div className="font-light text-primary-700 flex flex-col text-md gap-1">
          <span className="flex flex-row gap-3 items-center text-[0.85rem]">
            {new Date(post.createdAt).toLocaleDateString("en-US", {
              month: "short",
              day: "2-digit",
              year: "numeric",
            })}
          </span>
        </div>
      </div>
    </div>
  );
}
