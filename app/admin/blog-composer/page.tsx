"use client";
import React from "react";

// Components
import PostForm from "@/features/blog-composer/components/post-form/PostForm";
import { ComposerProvider } from "@/features/blog-composer/context/ComposerContext";

/**
 *
 * The dashboard page will display a post composer which will allow the user
 * to create posts.
 *
 */
const Page = () => {
  return (
    <section className="w-full max-h-screen overflow-y-scroll">
      <ComposerProvider>
        {/* Form to show editor */}
        <div className="h-auto flex items-center justify-center mb-10 mx-[6%] flex-col">
          <PostForm />
        </div>

        {/* Preview of the Post Content */}
        {/* {blogContent && <PostContent blogContent={blogContent} />} */}
      </ComposerProvider>
    </section>
  );
};

export default Page;
