"use client";

import React from "react";
import useFetchPostById from "@/features/blogs/hooks/useFetchPostById";
import { useParams } from "next/navigation";
import { renderTipTapJSON } from "@/utils/tiptap-helpers/tiptapRenderer";

const Page = () => {
  const { id } = useParams();
  const { postResponse, isLoadingPost, isErrorPost } = useFetchPostById({
    id: id ? (Array.isArray(id) ? id[0] : id) : "",
  });

  return (
    <section className="h-screen w-screen flex flex-col items-center justify-center text-xl font-bold">
      <h1>Page is in the works!</h1>
      <span className="text-primary-700 font-light">post id: {id}</span>
      {/* {postResponse?.data?.content_block.map(
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
      )} */}
    </section>
  );
};

export default Page;
