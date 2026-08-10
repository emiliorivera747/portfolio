"use client";
import { useState } from "react";
import Image from "next/image";
import { CldImage } from "next-cloudinary";
import { ToolsProps, ToolItem } from "@/types/tools";
import { cloudinaryPublicId, isCloudinaryUrl } from "@/lib/images";

const ToolCard = ({ item }: { item: ToolItem }) => {
  const [loaded, setLoaded] = useState(false);
  // Tool icons can either be a pasted Cloudinary URL or a Payload upload,
  // which now also lands on Cloudinary. CldImage needs a public ID rather
  // than a URL, and the two sources produce different URL shapes.
  const isCloudinary = isCloudinaryUrl(item.imageUrl);

  // The icon is sized by CSS rather than by the width/height props, which stay
  // at 100 so the intrinsic image is still large enough for the desktop card.
  // Without an explicit size it would render at its natural 100px and overflow
  // the smaller phone card.
  const iconSize = "h-[3.25rem] w-[3.25rem] sm:h-[6rem] sm:w-[6rem] object-contain";

  // Fluid half-width on phones rather than a fixed 7.5rem: two cards plus the
  // 0.75rem gap then fill the row exactly, so the outer cards sit flush with
  // the buttons above instead of being centred inside leftover space. Fixed
  // 12rem from `sm` up, where the row wraps at its own rhythm.
  return (
    <div className="grid grid-rows-[3fr_2.25rem] sm:grid-rows-[3fr_3rem] backdrop-blur-md h-[7.5rem] w-[calc(50%-0.375rem)] sm:h-[12rem] sm:w-[12rem] bg-white rounded-[12px] transition-shadow duration-300 ease-in-out border border-primary-300 shadow-sm hover:shadow-lg hover:scale-105 items-center justify-center">
      <div className="flex items-center justify-center h-full w-full">
        {!loaded && (
          <div className={`${iconSize} bg-primary-200 rounded-[12px] animate-pulse`} />
        )}
        {isCloudinary ? (
          <CldImage
            alt={item.name}
            src={cloudinaryPublicId(item.imageUrl)}
            width={100}
            height={100}
            className={`${iconSize} ${loaded ? "opacity-100" : "opacity-0 absolute"}`}
            onLoad={() => setLoaded(true)}
          />
        ) : (
          <Image
            alt={item.name}
            src={item.imageUrl}
            width={100}
            height={100}
            className={`${iconSize} ${loaded ? "opacity-100" : "opacity-0 absolute"}`}
            onLoad={() => setLoaded(true)}
          />
        )}
      </div>
      <div className="flex items-start justify-center h-full">
        {loaded ? (
          <p className="text-primary-700 font-light text-[0.7rem] sm:text-sm text-center px-1 leading-tight">
            {item.name}
          </p>
        ) : (
          <div className="h-3 w-12 sm:w-16 bg-primary-200 rounded animate-pulse mt-1 sm:mt-2" />
        )}
      </div>
    </div>
  );
};

const Tools = ({ toolsData }: ToolsProps) => {
  // px-10 on phones matches the Front End / Back End / Both button row in
  // ToolsSection, so the grid and the buttons share one content box and their
  // edges line up.
  return (
    <div className="h-full w-screen flex overflow-auto px-10 sm:px-60 pb-10 items-center justify-center gap-3 sm:gap-10 flex-wrap pt-2">
      {toolsData.map((item: ToolItem, i: number) => (
        <ToolCard key={`${item.name}-${i}`} item={item} />
      ))}
    </div>
  );
};

export default Tools;
