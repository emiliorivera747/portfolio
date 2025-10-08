"use client";
import React from "react";
import useFetchBlogs from "@/features/blogs/hooks/useFetchBlogs";

const Page = () => {
  const { postResponse, isLoadingPosts, isErrorPosts } = useFetchBlogs();
  console.log(postResponse)
  return (
    <section className="w-screen min-h-screen flex items-center justify-center font-bold text-2xl">
      {postResponse?.data.map(({ title }: { title: string }) => (
        <div key={title} className="text-priamry-900">{title}</div>
      ))}
    </section>
  );
};

export default Page;
