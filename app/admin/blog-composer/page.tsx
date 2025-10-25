"use client";
import React, { useState } from "react";

// Components
import PostForm from "@/features/blog-composer/components/post-form/PostForm";
import TextEditorBlock from "@/components/tiptap/TextEditorBlock";

// Hooks
import useSubmitPost from "@/features/blog-composer/hooks/useSubmitPost";
import useBlogEditor from "@/features/blog-composer/hooks/useBlogEditor";
import { ContentBlock } from "@/features/blogs/types/post";

/**
 *
 * The dashboard page will display a post composer which will allow the user
 * to create posts.
 *
 */
const Page = () => {
  const [currentBlockId, setCurrentBlockId] = useState<number | string>(0);

  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([
    {
      id: 0,
      content_order: 1,
      content_type: "doc",
      content_data: {
        type: "doc",
        content: [
          {
            type: "paragraph",
            attrs: { textAlign: null },
            content: [
              {
                type: "text",
                text: "Hello, World! This is my first post, but more content is in the works!",
              },
            ],
          },
        ],
      },
    },
    {
      id: 1,
      content_order: 2,
      content_type: "doc",
      content_data: {
        type: "doc",
        content: [
          {
            type: "paragraph",
            content: [
              { type: "text", text: "Another example of a text block." },
            ],
          },
        ],
      },
    },
  ]);

  const { onSubmit } = useSubmitPost({ contentBlocks: [] });

  const handleEnterEditMode = (id: number | string) => {
    setCurrentBlockId(id);
  };

  return (
    <section className="w-full max-h-screen overflow-y-scroll">
      {/* Form to show editor */}
      <div className="h-auto flex items-center justify-center mb-10 mx-[6%] flex-col">
        <PostForm
          onSubmit={onSubmit}
          contentBlocks={contentBlocks}
          currentBlockId={currentBlockId?.toString()}
          handleEnterEditMode={handleEnterEditMode}
        />
      </div>

      {/* Preview of the Post Content */}
      {/* {blogContent && <PostContent blogContent={blogContent} />} */}
    </section>
  );
};

export default Page;
