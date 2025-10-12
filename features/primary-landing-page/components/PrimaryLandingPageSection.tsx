"use client";
import React, { useEffect, useRef, useState } from "react";

// External Libraries
import { motion } from "framer-motion";

// Component
import MissionStatement from "@/features/primary-landing-page/components/MissionStatement";
import CalendlyPopupButton from "@/features/calendly/CalendlyPopupButton";
import BackgroundOverlay from "@/components/overlays/BackgroundOverlay";
import PrimaryHeader from "@/features/primary-landing-page/components/PrimaryHeader";
import LoadingPage from "@/components/loading/LoadingPage";

const variants = {
  initial: {
    y: 500,
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
 *  Primary section
 *
 * @returns
 */
const PrimaryLandingPageSection: React.FC<{ videoUrl?: string }> = ({
  videoUrl,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const handleLoadedData = () => {
      setIsLoading(false);
    };

    const videoElement = videoRef.current;
    if (videoElement) {
      // Add the event listener to detect when the video is ready
      videoElement.addEventListener("loadeddata", handleLoadedData);

      // Clean up the event listener when the component unmounts
      return () => {
        videoElement.removeEventListener("loadeddata", handleLoadedData);
      };
    }
  }, [videoUrl]);

  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5,
    };

    const callback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry: IntersectionObserverEntry) => {
        if (entry.isIntersecting) {
          if (videoRef.current?.paused) {
            videoRef.current.play();
          }
        } else {
          if (videoRef.current && !videoRef.current.paused) {
            videoRef.current.pause();
          }
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
    <section className="relative h-screen w-screen">
      <motion.div
        style={{ zIndex: 50 }}
        {...{
          initial: "initial",
          whileInView: "animate",
          variants,
          className:
            "absolute h-full w-full flex flex-col justify-center landing-page-primary-section",
        }}
      >
        <div className="sm:w-[60%] pl-[4%] w-full pt-[18rem] sm:pt-0">
          <PrimaryHeader />
          <MissionStatement />
          <CalendlyPopupButton />
        </div>
      </motion.div>

      {!isLoading && <BackgroundOverlay />}
      <video
        ref={videoRef}
        className={`object-cover w-full h-full`}
        src={
          videoUrl ||
          "https://res.cloudinary.com/davx3yyob/video/upload/v1760238501/Portfolio_Video_t0y4tc_ykkaej.mp4"
        }
        loop
        muted
        playsInline
      />
    </section>
  );
};

export default PrimaryLandingPageSection;
