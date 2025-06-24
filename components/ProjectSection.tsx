import React, { useRef, useEffect, Suspense } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface ProjectSectionProps {
  title: string;
  videoUrl: string;
  buttonLabel: string;
  textEnter?: () => void;
  textLeave?: () => void;
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

function ProjectSection({
  title,
  videoUrl,
  buttonLabel,
  textEnter,
  textLeave,
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
      threshold: 0.5, // Adjust this threshold based on your requirement
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

    // Cleanup the observer when component unmounts
    return () => observer.disconnect();
  }, []);

  return (
    <section className={`relative h-screen w-screen ${bgColor}`}>
      <motion.div {...({ className: "flex flex-col items-center justify-start h-full w-full " } as any)}>
        <div className="absolute h-20 flex items-center ">
          <h1
            onMouseEnter={textEnter}
            onMouseLeave={textLeave}
            className={`${titleFont} ${titleSize} ${titleColor}`}
          >
            {title}
          </h1>
        </div>
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
            className={`absolute rounded-md border-2 ${buttonBorderColor} bg-transparent ${buttonTextColor} w-60 h-12 font-semibold self-center justify-center text-center p-2 bottom-0 ${buttonBgColor} ${buttonHoverTextColor} mb-6`}
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
