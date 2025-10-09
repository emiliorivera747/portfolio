"use client";
import React from "react";
import useFetchBlogs from "@/features/blogs/hooks/useFetchBlogs";
import { CldImage } from "next-cloudinary";

const Page = () => {
  const { postResponse, isLoadingPosts, isErrorPosts } = useFetchBlogs();
  console.log(postResponse);
  return (
    <section className="w-screen min-h-screen">
      <div className="text-primary-1000 text-4xl pt-[12rem] px-14 pb-4 font-semibold">
        In the works...
      </div>
      {postResponse?.data.map(
        ({ title, image_url }: { title: string; image_url: string }) => (
          <div className="mx-14 border-y py-8 flex gap-10">
            <CldImage
              src={
                image_url
                  ? image_url
                  : "https://res.cloudinary.com/dcss55nem/image/upload/v1700596192/Untitled_design_2_udsazb.png"
              }
              height={400}
              width={400}
              alt={title}
              className="rounded-[12px]"
            />
            <h2 className=" pt-4 font-semibold ">{title}</h2>
          </div>
        )
      )}
    </section>
  );
};

export default Page;
