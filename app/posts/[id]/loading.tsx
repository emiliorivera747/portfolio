import React from "react";
import BlogPostSkeleton from "@/features/blogs/components/skeletons/BlogPostSkeleton";

/**
 *
 * Loading skeleton for individual blog post page
 *
 * @returns blog post skeleton
 */
const loading = () => {
  return <BlogPostSkeleton />;
};

export default loading;
