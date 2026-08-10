"use client";
import React, { useRef } from "react";
import Image from "next/image";
import { CldImage } from "next-cloudinary";
import { useVideoIntersectionObserver } from "@/hooks/useVideoIntersectionObserver";
import { useIsMobile } from "@/hooks/useIsMobile";
import { getMobileVideoUrl } from "@/utils/cloudinary";
import { cloudinaryPublicId, isCloudinaryUrl } from "@/lib/images";

export type ProjectSectionMediaProps = {
  videoUrl?: string;
  imageUrl?: string;
  alt?: string;
  /** Stands in for the video on phones, where autoplaying video is costly. */
  mobileImageUrl?: string;
  mobileImageAlt?: string;
  /** object-fit class, shared by both media types. */
  cover: string;
};

/**
 * The visual for a homepage project section — either a looping muted video or
 * a still image. Both fill the section band identically, so the only thing
 * that differs is the element.
 *
 * Shared by ProjectSection and ProjectSectionV2, which render the same media
 * block under different headers.
 */
function ProjectSectionMedia({
  videoUrl,
  imageUrl,
  alt,
  mobileImageUrl,
  mobileImageAlt,
  cover,
}: ProjectSectionMediaProps) {
  const isMobile = useIsMobile();
  const videoRef = useRef<HTMLVideoElement>(null!);
  // Safe to call even when this renders an image — the hook no-ops while the
  // ref is null, and hooks can't be called conditionally.
  useVideoIntersectionObserver(videoRef);

  const className = `h-full w-full ${cover}`;

  // Explicit dimensions rather than `fill`: the section is a plain block, not
  // a positioned container, so `fill` would collapse it. 1920x1080 matches the
  // aspect of the videos these stand in for, and the object-fit class does the
  // actual framing.
  const renderImage = (src: string, altText: string) =>
    isCloudinaryUrl(src) ? (
      <CldImage
        src={cloudinaryPublicId(src)}
        alt={altText}
        width={1920}
        height={1080}
        className={className}
      />
    ) : (
      <Image
        src={src}
        alt={altText}
        width={1920}
        height={1080}
        className={className}
      />
    );

  // A mobile still replaces the video on phones. This is only ever evaluated
  // after the parent's viewport check has mounted us, by which point
  // useIsMobile has resolved — so the video is never fetched and then thrown
  // away on a phone.
  if (isMobile && mobileImageUrl) {
    return renderImage(mobileImageUrl, mobileImageAlt ?? alt ?? "");
  }

  // A section set to Image shows that image at every width.
  if (imageUrl) return renderImage(imageUrl, alt ?? "");

  if (!videoUrl) return null;

  return (
    <video
      ref={videoRef}
      className={className}
      src={isMobile ? getMobileVideoUrl(videoUrl) : videoUrl}
      preload="metadata"
      autoPlay
      loop
      muted
      playsInline
    />
  );
}

export default React.memo(ProjectSectionMedia);
