import React from "react";

/**
 * Skeleton component for individual blog post page
 * Matches the structure of PostClient component
 */
const BlogPostSkeleton = () => {
  return (
    <article className="min-h-screen sm:mx-[1%] md:mx-[4%] lg:mx-[24%] font-normal pb-10 h-auto animate-pulse">
      <div className="pt-[7rem] mx-[8%]">
        {/* Title skeleton */}
        <div className="mb-4">
          <div className="h-10 w-3/4 bg-gray-300 rounded mb-2"></div>
          <div className="h-10 w-1/2 bg-gray-300 rounded mb-4"></div>
        </div>

        {/* Date and reading time skeleton */}
        <div className="flex flex-row gap-4 items-center mb-4 sm:mb-8">
          <div className="h-4 w-24 bg-gray-300 rounded"></div>
          <div className="h-4 w-32 bg-gray-300 rounded"></div>
        </div>

        {/* Content blocks skeleton - paragraphs without assuming a featured image */}
        <div className="space-y-4">
          {/* Paragraph skeleton */}
          <div className="space-y-2">
            <div className="h-4 w-full bg-gray-300 rounded"></div>
            <div className="h-4 w-full bg-gray-300 rounded"></div>
            <div className="h-4 w-5/6 bg-gray-300 rounded"></div>
          </div>

          {/* Another paragraph */}
          <div className="space-y-2 mt-6">
            <div className="h-4 w-full bg-gray-300 rounded"></div>
            <div className="h-4 w-full bg-gray-300 rounded"></div>
            <div className="h-4 w-4/5 bg-gray-300 rounded"></div>
          </div>

          {/* Another paragraph */}
          <div className="space-y-2 mt-6">
            <div className="h-4 w-full bg-gray-300 rounded"></div>
            <div className="h-4 w-full bg-gray-300 rounded"></div>
            <div className="h-4 w-3/4 bg-gray-300 rounded"></div>
          </div>
        </div>
      </div>
    </article>
  );
};

export default BlogPostSkeleton;