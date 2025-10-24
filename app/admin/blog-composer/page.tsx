"use client";
import React, { useState } from "react";

// Components
import PostForm from "@/features/blog-composer/components/post-form/PostForm";

// Hooks
import useSubmitPost from "@/features/blog-composer/hooks/useSubmitPost";
import useBlogEditor from "@/features/blog-composer/hooks/useBlogEditor";

/**
 *
 * The dashboard page will display a post composer which will allow the user
 * to create posts.
 *
 */
const Page = () => {
  const [contentBlocks, setContentBlocks] = useState([]);
  const { editor, blogContent } = useBlogEditor();
  const { onSubmit } = useSubmitPost({ editor: editor });

  if (!editor) return null;

  return (
    <section className="w-full max-h-screen overflow-y-scroll">
      {/* Form to show editor */}
      <div className="h-auto flex items-center justify-center mb-10 mx-[6%]">
        <PostForm editor={editor} onSubmit={onSubmit} />
      </div>

      {/* Preview of the Post Content */}
      {/* {blogContent && <PostContent blogContent={blogContent} />} */}
    </section>
  );
};

export default Page;
