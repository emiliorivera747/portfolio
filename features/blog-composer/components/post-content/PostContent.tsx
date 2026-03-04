import React from "react";
import PrimaryHeader from "@/components/titles/PrimaryHeader";

/**
 * Dispalys the blog content
 *
 * @param param0
 * @returns
 */
const PostContent = ({ blogContent }: { blogContent: string }) => {
  return (
    <div className="h-screen flex  w-full flex-col mx-20">
      <PrimaryHeader title="Blog Preview" className="text-2xl" />
      <div
        className="blog-content"
        dangerouslySetInnerHTML={{ __html: blogContent || "" }}
      />
    </div>
  );
};

export default PostContent;
