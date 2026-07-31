"use client";
import { useState } from "react";
import Image from "next/image";
import { CldImage } from "next-cloudinary";
import { ToolsProps, ToolItem } from "@/types/tools";

const ToolCard = ({ item }: { item: ToolItem }) => {
  const [loaded, setLoaded] = useState(false);
  // Tool icons can either be a Cloudinary URL or a Payload upload (served
  // from S3) — CldImage only works for actual Cloudinary-hosted assets, so
  // uploaded icons need to go through plain next/image instead.
  const isCloudinary = item.imageUrl.includes("cloudinary.com");

  return (
    <div className="grid grid-rows-[3fr_3rem] backdrop-blur-md h-[10rem] w-[10rem] sm:h-[12rem] sm:w-[12rem] bg-white rounded-[12px] transition-shadow duration-300 ease-in-out border border-primary-300 shadow-sm hover:shadow-lg hover:scale-105 items-center justify-center">
      <div className="flex items-center justify-center h-full w-full">
        {!loaded && (
          <div className="h-[6rem] w-[6rem] bg-primary-200 rounded-[12px] animate-pulse" />
        )}
        {isCloudinary ? (
          <CldImage
            alt={item.name}
            src={item.imageUrl}
            width={100}
            height={100}
            className={loaded ? "opacity-100" : "opacity-0 absolute"}
            onLoad={() => setLoaded(true)}
          />
        ) : (
          <Image
            alt={item.name}
            src={item.imageUrl}
            width={100}
            height={100}
            className={loaded ? "opacity-100" : "opacity-0 absolute"}
            onLoad={() => setLoaded(true)}
          />
        )}
      </div>
      <div className="flex items-start justify-center h-full">
        {loaded ? (
          <p className="text-primary-700 font-light text-sm">{item.name}</p>
        ) : (
          <div className="h-3 w-16 bg-primary-200 rounded animate-pulse mt-2" />
        )}
      </div>
    </div>
  );
};

const Tools = ({ toolsData }: ToolsProps) => {
  return (
    <div className="h-full w-screen flex overflow-auto px-[0.4rem] sm:px-60 pb-10 items-center justify-center gap-3 sm:gap-10 flex-wrap pt-2">
      {toolsData.map((item: ToolItem, i: number) => (
        <ToolCard key={`${item.name}-${i}`} item={item} />
      ))}
    </div>
  );
};

export default Tools;
