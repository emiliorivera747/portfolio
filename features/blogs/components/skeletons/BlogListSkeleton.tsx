import React from "react";
import BlogItemSkeleton from "./BlogItemSkeleton";

/**
 * Skeleton component for the blog list page
 * Shows multiple blog item skeletons during loading
 */
const BlogListSkeleton = () => {
  return (
    <section className="w-screen min-h-screen">
      <div className="mx-[5%]">
        {/* Header skeleton */}
        <div className="pt-[10rem] pb-8 animate-pulse">
          <div className="h-14 w-64 sm:w-96 bg-gray-300 rounded"></div>
        </div>

        {/* Blog items skeleton - show 3 items */}
        <div>
          <BlogItemSkeleton />
          <BlogItemSkeleton />
          <BlogItemSkeleton />
        </div>
      </div>
    </section>
  );
};

export default BlogListSkeleton;