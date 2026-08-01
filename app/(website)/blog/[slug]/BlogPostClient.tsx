"use client";
import { useState } from "react";
import Image from "next/image";
import Navbar from "@/components/navbar/Navbar";
import type { MenuItem } from "@/types/navbar";
import { ThemeToggle } from "@/components/ThemeToggle";
import RichText from "@/components/payload/RichText";
import type { Post } from "@/payload-types";

function extractText(node: any): string {
  if (!node) return "";
  if (typeof node.text === "string") return node.text;
  if (Array.isArray(node.children)) return node.children.map(extractText).join(" ");
  return "";
}

function calcReadTime(body: Post["body"]): number {
  const text = extractText(body?.root);
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

/**
 * Displays a single blog post
 */
export default function BlogPostClient({
  post,
  menuItems,
}: {
  post: Post;
  menuItems: MenuItem[];
}) {
  const [isDark, setIsDark] = useState(false);
  const cover = typeof post.coverImage === "object" ? post.coverImage : null;

  return (
    <div className={`flex flex-col min-h-screen ${isDark ? "dark bg-[#0d0d0d]" : ""}`}>
      <Navbar menuItems={menuItems} mode={isDark ? "light" : "dark"} />
      <div className="flex items-center justify-center flex-1">
        <article
          style={{
            fontFamily: `Georgia, 'Nimbus Roman No9 L', 'Century Schoolbook L', serif`,
          }}
          className="min-h-screen w-full px-4 sm:px-8 md:px-[4%] lg:mx-[24%] font-normal pb-10 h-auto lg:w-[60rem]"
        >
          <div className="pt-[7rem]">
            <div className="flex flex-row justify-between items-start gap-2">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl text-primary-900 dark:text-primary-100 font-semibold mb-1">
                {post.title}
              </h1>
              <ThemeToggle isDark={isDark} onToggle={() => setIsDark((d) => !d)} />
            </div>

            <div className="flex flex-row gap-4 items-center text-[0.9rem] mb-4 text-primary-700 dark:text-primary-400 font-light px-2">
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
              <span>{calcReadTime(post.body)} min read</span>
              <span>
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  month: "short",
                  day: "2-digit",
                  year: "numeric",
                })}
              </span>
            </div>

            {cover?.url && (
              <Image
                src={cover.url}
                alt={cover.alt || post.title}
                height={675}
                width={1200}
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 90vw, 80rem"
                className="w-full rounded-[12px] mb-8 sm:mb-10 h-[16rem] sm:h-full object-cover"
              />
            )}

            <div className="blog-content font-light pb-4">
              <RichText data={post.body} />
            </div>
          </div>
        </article>
      </div>
    </div>
  );
}
