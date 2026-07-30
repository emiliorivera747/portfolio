"use client";
import { ReactNode } from "react";
import { CldImage } from "next-cloudinary";

export interface ProjectGalleryItem {
  title: string;
  imageUrl: string;
  paragraph?: ReactNode;
}

export default function ProjectGallery({ items }: { items: ProjectGalleryItem[] }) {
  return (
    <div className="bg-white w-screen relative min-h-screen h-auto overflow-auto">
      {items.map((item, index) => (
        <div className="flex flex-col p-10 mx-[6%]" key={index}>
          <div className="h-1/6 w-full flex items-top justify-center pt-10 pb-10 text-primary-1000">
            <h1 className="text-2xl text-black font-bold">{item.title}</h1>
          </div>
          <div className="p-10 relative w-full sm:h-[87vh] h-[20vh] rounded-[12px] overflow-hidden shadow-md hover:shadow-xl">
            <CldImage
              alt={item.title}
              src={item.imageUrl}
              fill
              className="rounded-[12px] sm:object-cover object-contain"
            />
          </div>
        </div>
      ))}
    </div>
  );
}
