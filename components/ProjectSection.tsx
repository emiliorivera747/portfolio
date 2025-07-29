
import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface ProjectSectionProps {
  title: string;
  videoUrl: string;
  buttonLabel: string;
  titleColor: string;
  titleFont: string;
  buttonTextColor: string;
  buttonBgColor: string;
  buttonBorderColor: string;
  buttonHoverTextColor: string;
  bgColor: string;
  videoCover: string;
  titleSize: string;
  url: string;
}

const variants = {
  initial: {
    y: 200,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
};

/**
 *
 * Displays different projects on the main landing page
 *
 * @param param0
 * @returns
 */
function ProjectSection({
  title,
  videoUrl,
  buttonLabel,
  titleColor,
  titleFont,
  buttonTextColor,
  buttonBgColor,
  buttonBorderColor,
  buttonHoverTextColor,
  bgColor,
  videoCover,
  titleSize,
  url,
}: ProjectSectionProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting) {
          // Video is in the viewport, play it
          videoRef.current?.play();
        } else {
          // Video is outside the viewport, pause it
          videoRef.current?.pause();
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);
    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section className={`relative h-screen w-screen ${bgColor}`}>
      <motion.div
        {...({
          className: "flex flex-col items-center justify-start h-full w-full",
        } as any)}
      >
        <motion.div
          className="absolute h-[7rem] flex items-center"
          {...({ initial: "initial", whileInView: "animate", variants } as any)}
        >
          <h1 className={`${titleFont} ${titleSize} ${titleColor}`}>{title}</h1>
        </motion.div>
        <video
          ref={videoRef}
          className={`h-full w-full ${videoCover}`}
          src={videoUrl}
          preload="none"
          loop
          muted
          playsInline
        />
        <div className="flex items-end justify-center">
          {" "}
          <Link
            href={url}
            className={`flex items-center absolute rounded-[12px] border-2 ${buttonBorderColor} bg-transparent ${buttonTextColor} w-60 h-[3.6rem] font-semibold self-center justify-center text-center p-2 bottom-0 ${buttonBgColor} ${buttonHoverTextColor} mb-6 rounded-[12px]`}
            aria-label={`Learn more about ${title}`}
          >
            {buttonLabel} <span className="text-transparent">.</span>
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

export default ProjectSection;
