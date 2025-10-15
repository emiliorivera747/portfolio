"use client";
import React from "react";
import useFetchBlogs from "@/features/blogs/hooks/useFetchBlogs";

//Components
import BlogList from "@/features/blogs/components/BlogList";
import LoadingPage from "@/components/loading/LoadingPage";

const Page = () => {
  const { postsResponse, isLoadingPosts, isErrorPosts } = useFetchBlogs();
  if (isLoadingPosts) return <LoadingPage theme={"white"} />;
  return (
    <section className="w-screen min-h-screen">
      <div className="mx-[5%]">
        <div className=" text-4xl sm:text-6xl pt-[10rem] pb-8 font-semibold  text-transparent bg-clip-text bg-gradient-to-r from-primary-900 to-primary-800">
          Latest Posts
        </div>
        <BlogList posts={postsResponse?.data} />
      </div>
    </section>
  );
};

export default Page;
