"use client";
import { ReactNode } from "react";
import Image from "next/image";
import { CldImage } from "next-cloudinary";
import { PROJECT_CONTAINER } from "@/components/project/layout";
import { isCloudinaryUrl } from "@/lib/images";

export interface ProjectGalleryItem {
  title: string;
  imageUrl: string;
  paragraph?: ReactNode;
}

export default function ProjectGallery({ items }: { items: ProjectGalleryItem[] }) {
  return (
    <div className="bg-white w-full relative min-h-screen h-auto overflow-auto">
      {items.map((item, index) => (
        <div className={`${PROJECT_CONTAINER} flex flex-col py-10`} key={index}>
          <div className="w-full flex items-top justify-center pt-10 pb-10 text-primary-1000">
            <h1 className="text-2xl text-black font-bold">{item.title}</h1>
          </div>
          <div className="relative w-full sm:h-[87vh] h-[20vh] rounded-[12px] overflow-hidden shadow-md hover:shadow-xl">
            {/* Gallery images can now be a pasted Cloudinary URL or a Payload
                upload served from S3 — CldImage only builds Cloudinary
                delivery URLs, so uploads go through plain next/image. */}
            {isCloudinaryUrl(item.imageUrl) ? (
              <CldImage
                alt={item.title}
                src={item.imageUrl}
                fill
                className="rounded-[12px] sm:object-cover object-contain"
              />
            ) : (
              <Image
                alt={item.title}
                src={item.imageUrl}
                fill
                className="rounded-[12px] sm:object-cover object-contain"
              />
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
