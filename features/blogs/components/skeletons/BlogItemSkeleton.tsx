import React from "react";

/**
 * Skeleton component for a single blog item
 * Matches the structure of BlogList items with image and content sections
 */
const BlogItemSkeleton = () => {
  return (
    <div className="border-y py-8 flex gap-10 border-primary-200 flex-col sm:flex-row animate-pulse">
      {/* Image section skeleton */}
      <div className="relative overflow-hidden rounded-[12px]">
        <div className="w-full h-[300px] sm:w-[300px] bg-gray-300 rounded-[12px]"></div>
      </div>

      {/* Content section skeleton */}
      <div className="w-[20rem] flex flex-col gap-1">
        {/* Title skeleton */}
        <div className="h-9 w-3/4 bg-gray-300 rounded mb-2"></div>
        
        {/* Description skeleton - multiple lines */}
        <div className="space-y-2 mb-4">
          <div className="h-4 w-full bg-gray-300 rounded"></div>
          <div className="h-4 w-5/6 bg-gray-300 rounded"></div>
        </div>

        {/* Author and date skeleton */}
        <div className="flex flex-col gap-2">
          <div className="h-4 w-32 bg-gray-300 rounded"></div>
          <div className="h-4 w-40 bg-gray-300 rounded"></div>
        </div>
      </div>
    </div>
  );
};

export default BlogItemSkeleton;