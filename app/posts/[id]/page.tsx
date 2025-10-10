"use client";

import React from "react";
import useFetchPostById from "@/features/blogs/hooks/useFetchPostById";
import { useParams } from "next/navigation";
import { renderTipTapJSON } from "@/utils/tiptap-helpers/tiptapRenderer";
import Head from "next/head";

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
      <article className="h-screen w-screen">
        <div className="pt-[10rem] mx-[8%] text-4xl">
          <h1 className="text-primary-1000 font-semibold mb-4">
            {postResponse?.data?.title}
          </h1>
          {postResponse?.data?.content_block?.map(
            ({
              content_data,
              content_order,
            }: {
              content_data: any;
              content_order: any;
            }) => {
              return (
                <div
                  key={content_order}
                  className="blog-content"
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
