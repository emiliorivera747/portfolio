"use client";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useVideoIntersectionObserver } from "@/hooks/useVideoIntersectionObserver";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useNearViewport } from "@/hooks/useNearViewport";
import { getMobileVideoUrl } from "@/utils/cloudinary";

import { PrimaryHeader, SecondaryHeader } from "@/components/marketing/headers/Headers";

interface ProjectSectionProps {
  title: string;
  videoUrl: string;
  buttonLabel: string;
  url: string;
  subtitle?: string;
  bgColor?: string;
  videoCover?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  buttonClassName?: string;
  className?: string;
}

const variants = {
  initial: {
    y: 100,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.8,
      staggerChildren: 0.1,
    },
  },
};

const DEFAULT_BUTTON_CLASS =
  "flex items-center absolute rounded-[12px] border-2 border-zinc-800 bg-transparent text-zinc-700 w-60 h-[3.6rem] font-semibold self-center justify-center text-center p-2 bottom-6";

/**
 * Displays a full-screen project section with a background video, animated
 * title/subtitle, and a CTA button. All styling is overridable via className props.
 */
function ProjectSectionV2({
  title,
  videoUrl,
  buttonLabel,
  url,
  subtitle,
  bgColor = "bg-white",
  videoCover = "object-cover",
  titleClassName,
  subtitleClassName,
  buttonClassName = DEFAULT_BUTTON_CLASS,
  className,
}: ProjectSectionProps) {
  const isMobile = useIsMobile();
  const { ref: sectionRef, isNear } = useNearViewport();
  const videoRef = useRef<HTMLVideoElement>(null!);
  useVideoIntersectionObserver(videoRef);

  return (
    <section
      ref={sectionRef as React.RefObject<HTMLElement>}
      className={`relative h-screen w-screen ${bgColor} ${className ?? ""}`}
    >
      <motion.div {...({ className: "flex flex-col items-center justify-start h-full w-full" } as any)}>
        <motion.div
          {...({
            className: "absolute w-full flex justify-center items-center flex-col ",
            initial: "initial",
            whileInView: "animate",
            variants,
          } as any)}
        >
          <div>
            {" "}
            <PrimaryHeader label={title} className={titleClassName} />
            {subtitle && (
              <SecondaryHeader label={subtitle} className={subtitleClassName} />
            )}
          </div>
        </motion.div>
        {isNear && (
          <video
            ref={videoRef}
            className={`h-full w-full ${videoCover}`}
            src={isMobile ? getMobileVideoUrl(videoUrl) : videoUrl}
            preload="metadata"
            autoPlay
            loop
            muted
            playsInline
          />
        )}
        <div className="flex items-end justify-center">
          <Link
            href={url}
            className={buttonClassName}
            aria-label={`Learn more about ${title}`}
          >
            {buttonLabel}
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

export default React.memo(ProjectSectionV2);
