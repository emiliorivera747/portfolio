import React from "react";
import { motion } from "framer-motion";
import { useNearViewport } from "@/hooks/useNearViewport";
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
  titleColor: string;
  titleFont: string;
  bgColor: string;
  videoCover: string;
  titleSize: string;
  url: string;
}

const variants = {
  initial: { y: 100, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, staggerChildren: 0.1 },
  },
};

function ProjectSection({
  title,
  videoUrl,
  imageUrl,
  imageAlt,
  mobileImageUrl,
  mobileImageAlt,
  buttonLabel,
  titleColor,
  titleFont,
  bgColor,
  videoCover,
  titleSize,
  url,
}: ProjectSectionProps) {
  const { ref: sectionRef, isNear } = useNearViewport();

  return (
    <section ref={sectionRef as React.RefObject<HTMLElement>} className={`relative h-screen w-screen ${bgColor}`}>
      <motion.div
        {...({ className: "flex flex-col items-center justify-start h-full w-full" } as any)}
      >
        <motion.div
          className="absolute h-[7rem] flex items-center"
          {...({ initial: "initial", whileInView: "animate", variants } as any)}
        >
          <h2 className={`${titleFont} ${titleSize} ${titleColor}`}>{title}</h2>
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

export default React.memo(ProjectSection);
