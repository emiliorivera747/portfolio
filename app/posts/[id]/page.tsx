"use client";

import React from "react";
import useFetchPostById from "@/features/blogs/hooks/useFetchPostById";
import { useParams } from "next/navigation";
import { renderTipTapJSON } from "@/utils/tiptap-helpers/tiptapRenderer";
import Head from "next/head";
import Image from "next/image";

const Page = () => {
  const { id } = useParams();
  const { postResponse } = useFetchPostById({
    id: id ? (Array.isArray(id) ? id[0] : id) : "",
  });

  const title = postResponse?.data?.title || "Default Title";
  const description = postResponse?.data?.description || "Default Description";


  return (
    <>
      <Head>
        <title>{title}</title>
        <meta name="description" content={description} />
      </Head>
      <article className="h-screen  sm:mx-[8%] md:mx-[16%] font-normal">
        <div className="pt-[10rem] mx-[8%] text-4xl">
          <h1 className="text-primary-1000 font-semibold mb-4 times-header">
            {postResponse?.data?.title}
          </h1>

          <span className="flex flex-row gap-4 items-center text-sm mb-4 text-primary-700 font-light pb-8">
            <div className="flex items-center gap-1">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="size-5 "
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                />
              </svg>
              <span>1 min read</span>
            </div>

            {new Date(postResponse?.data?.created_at).toLocaleDateString(
              "en-US",
              {
                month: "short",
                day: "2-digit",
                year: "numeric",
              }
            )}
          </span>

          {/* --- Go through the content blocks */}
          {postResponse?.data?.content_block?.map(
            ({
              content_data,
              content_order,
              content_type,
              media,
            }: {
              content_data: any;
              content_order: number;
              content_type: string;
              media: any;
            }) => {
              if (content_type === "image")
                return (
                  <Image
                    key={content_order}
                    src={media.url}
                    alt={media?.alt || "Image"}
                    height={400}
                    width={400}
                    className="w-full rounded-[12px] "
                  />
                );
              return (
                <div
                  key={content_order}
                  className="blog-content font-extralight"
                  dangerouslySetInnerHTML={{
                    __html: renderTipTapJSON(content_data) || "",
                  }}
                />
              );
            }
          )}
        </div>
      </article>
    </>
  );
};

export default Page;
