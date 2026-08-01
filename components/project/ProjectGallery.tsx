"use client";
import { ReactNode } from "react";
import Image from "next/image";
import { CldImage } from "next-cloudinary";
import { cloudinaryPublicId, isCloudinaryUrl } from "@/lib/images";

export interface ProjectGalleryItem {
  title: string;
  imageUrl: string;
  paragraph?: ReactNode;
}

// Full width on phones, and never wider than the capped container above it —
// without this next/image assumes 100vw at every breakpoint and ships a
// desktop-sized file to phones. Safe to keep as a constant: it's a `sizes`
// attribute, not Tailwind classes, so nothing has to scan it.
const IMAGE_SIZES = "(max-width: 640px) 100vw, (max-width: 1280px) 90vw, 1200px";

export default function ProjectGallery({ items }: { items: ProjectGalleryItem[] }) {
  return (
    <div className="bg-white w-full relative min-h-screen h-auto overflow-auto">
      {items.map((item, index) => (
        <div
          // Keep this gutter identical to the one in ProjectOverview so the
          // page has one measure top to bottom.
          className="mx-auto w-full max-w-[1280px] px-6 md:px-10 flex flex-col py-10"
          key={index}
        >
          <div className="w-full flex items-top justify-center pt-10 pb-10 text-primary-1000">
            <h2 className="text-xl md:text-2xl text-primary-1000 font-semibold tracking-tight leading-tight">
              {item.title}
            </h2>
          </div>
          {/* Phones size the frame from the viewport width (~16:10 once the
              px-6 gutters are taken off) so the image scales with the screen;
              from `sm` up it fills most of the viewport height. The previous
              fixed h-[20vh] was ~170px on a phone, squashing every screenshot
              into an unreadable strip.

              Deliberately not `aspect-[16/10]`: tailwind.config.cjs sets
              corePlugins.aspectRatio to false in favour of the legacy
              @tailwindcss/aspect-ratio plugin, so modern aspect-* classes
              compile to nothing and the frame collapses to zero height. */}
          <div className="relative w-full h-[58vw] sm:h-[87vh] rounded-[12px] overflow-hidden shadow-md hover:shadow-xl">
            {/* Gallery images can be a pasted Cloudinary URL or a Payload
                upload, which now also lands on Cloudinary. CldImage needs a
                public ID rather than a URL, and the two sources produce
                different URL shapes — cloudinaryPublicId normalises both. */}
            {isCloudinaryUrl(item.imageUrl) ? (
              <CldImage
                alt={item.title}
                src={cloudinaryPublicId(item.imageUrl)}
                fill
                sizes={IMAGE_SIZES}
                className="rounded-[12px] object-contain sm:object-cover"
              />
            ) : (
              <Image
                alt={item.title}
                src={item.imageUrl}
                fill
                sizes={IMAGE_SIZES}
                className="rounded-[12px] object-contain sm:object-cover"
              />
            )}
          </div>
          {item.paragraph && (
            // max-w-3xl caps the line at a readable measure — run across the
            // full 1280px container, a caption is far too wide to track from
            // one line to the next. leading-relaxed rather than leading-loose,
            // and no extra letter-spacing, so the lines group as paragraphs
            // instead of drifting apart.
            <div className="pt-8 w-full max-w-3xl text-primary-800 text-base leading-relaxed">
              {item.paragraph}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
