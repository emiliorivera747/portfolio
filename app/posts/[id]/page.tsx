"use client";

import React from "react";
import useFetchPostById from "@/features/blogs/hooks/useFetchPostById";
import { useParams } from "next/navigation";
import { renderTipTapJSON } from "@/utils/tiptap-helpers/tiptapRenderer";

const Page = () => {
  const { id } = useParams();
  const { postResponse } = useFetchPostById({
    id: id ? (Array.isArray(id) ? id[0] : id) : "",
  });

  return (
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
  );
};

export default Page;
