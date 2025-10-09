"use client";
import React from "react";
import useFetchBlogs from "@/features/blogs/hooks/useFetchBlogs";

const Page = () => {
  const { postResponse, isLoadingPosts, isErrorPosts } = useFetchBlogs();
  console.log(postResponse);
  return (
    <section className="w-screen min-h-screen">
      <div className='text-primary-1000 text-4xl pt-[12rem] px-14 pb-4 font-semibold'>In the works...</div>
      {postResponse?.data.map(({ title }: { title: string }) => (
        <div key={title} className="text-primary-900 px-14">
          {title}
        </div>
      ))}
    </section>
  );
};

export default Page;
