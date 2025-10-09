"use client";

import React, { useEffect, useState } from "react";
import useFetchPostById from "@/features/blogs/hooks/useFetchPostById";
import { useParams } from "next/navigation";

const Page = () => {
  const { id } = useParams();
  const { postResponse, isLoadingPost, isErrorPost } = useFetchPostById({
    id: id ? (Array.isArray(id) ? id[0] : id) : "",
  });

  console.log(postResponse)

  return (
    <section className="h-screen w-screen flex flex-col items-center justify-center text-xl font-bold">
      <h1>Page is in the works!</h1>
      <span className="text-primary-700 font-light">post id: {id}</span>
    </section>
  );
};

export default Page;
