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
  const [blocks, setBlocks] = useState<ContentBlock[]>([]);

  const { onSubmit } = useSubmitPost({ contentBlocks: [] });

  const handleEnterEditMode = (id: string) => {
    setCurrentBlockId(id);
  };

  const addBlock = (block: ContentBlock) => {
    setBlocks((prevBlocks) => [...prevBlocks, block]);
  };

  const handleBlockId = (id: string) => {
    setCurrentBlockId(id);
  };

  return (
    <section className="w-full max-h-screen overflow-y-scroll">
      {/* Form to show editor */}
      <div className="h-auto flex items-center justify-center mb-10 mx-[6%] flex-col">
        <PostForm
          onSubmit={onSubmit}
          contentBlocks={blocks}
          currentBlockId={currentBlockId?.toString()}
          handleEnterEditMode={handleEnterEditMode}
          addBlock={addBlock}
          setBlockId={handleBlockId}
        />
      </div>

      {/* Preview of the Post Content */}
      {/* {blogContent && <PostContent blogContent={blogContent} />} */}
    </section>
  );
};

export default Page;
