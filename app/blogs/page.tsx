"use client";
import React from "react";
import useFetchBlogs from "@/features/blogs/hooks/useFetchBlogs";

//Components
import BlogList from "@/features/blogs/components/BlogList";

const Page = () => {
  const { postResponse, isLoadingPosts, isErrorPosts } = useFetchBlogs();
  if (isLoadingPosts) return <div>Loading...</div>;
  return (
    <section className="w-screen min-h-screen">
      <div className="mx-[5%]">
        <div className="text-primary-1000 text-6xl pt-[10rem] pb-8 font-semibold">
          Latest Posts
        </div>
        <BlogList posts={postResponse.data} />
      </div>
    </section>
  );
};

export default Page;
