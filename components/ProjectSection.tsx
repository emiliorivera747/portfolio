import React, { useRef } from "react";
import { motion } from "framer-motion";
import { useVideoIntersectionObserver } from "@/hooks/useVideoIntersectionObserver";
import { useIsMobile } from "@/hooks/useIsMobile";
import { useNearViewport } from "@/hooks/useNearViewport";
import { getMobileVideoUrl } from "@/utils/cloudinary";
import ProjectButton from "@/components/ui/ProjectButton";

interface ProjectSectionProps {
  title: string;
  videoUrl: string;
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
  buttonLabel,
  titleColor,
  titleFont,
  bgColor,
  videoCover,
  titleSize,
  url,
}: ProjectSectionProps) {
  const isMobile = useIsMobile();
  const { ref: sectionRef, isNear } = useNearViewport();
  const videoRef = useRef<HTMLVideoElement>(null!);
  useVideoIntersectionObserver(videoRef);

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

export default React.memo(ProjectSection);
