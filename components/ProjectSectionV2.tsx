"use client";
import React from "react";
import { motion } from "framer-motion";
import { useNearViewport } from "@/hooks/useNearViewport";

import { PrimaryHeader, SecondaryHeader } from "@/components/marketing/headers/Headers";
import ProjectButton from "@/components/ui/ProjectButton";
import ProjectSectionMedia from "@/components/ProjectSectionMedia";

interface ProjectSectionProps {
  title: string;
  /** Either a video or an image backs the section — see ProjectSectionMedia. */
  videoUrl?: string;
  imageUrl?: string;
  imageAlt?: string;
  mobileImageUrl?: string;
  mobileImageAlt?: string;
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
  imageUrl,
  imageAlt,
  mobileImageUrl,
  mobileImageAlt,
  buttonLabel,
  url,
  subtitle,
  bgColor = "bg-white",
  videoCover = "object-cover",
  titleClassName,
  subtitleClassName,
  className,
}: ProjectSectionProps) {
  const { ref: sectionRef, isNear } = useNearViewport();

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
          <ProjectSectionMedia
            videoUrl={videoUrl}
            imageUrl={imageUrl}
            alt={imageAlt ?? title}
            mobileImageUrl={mobileImageUrl}
            mobileImageAlt={mobileImageAlt}
            cover={videoCover}
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
