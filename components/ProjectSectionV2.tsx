"use client";
import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useVideoIntersectionObserver } from "@/hooks/useVideoIntersectionObserver";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useNearViewport } from "@/hooks/useNearViewport";
import { getMobileVideoUrl } from "@/utils/cloudinary";

import { PrimaryHeader, SecondaryHeader } from "@/components/marketing/headers/Headers";
import ProjectButton from "@/components/ui/ProjectButton";

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
        <div className="absolute bottom-6 flex justify-center w-full">
          <ProjectButton href={url} label={buttonLabel} />
        </div>
      </motion.div>
    </section>
  );
}

export default React.memo(ProjectSectionV2);
