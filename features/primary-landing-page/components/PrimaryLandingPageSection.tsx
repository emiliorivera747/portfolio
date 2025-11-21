"use client";
import React, { useEffect, useRef, useState } from "react";

// External Libraries
import { motion } from "framer-motion";

// Hooks
import { useVideoIntersectionObserver } from "@/hooks/useVideoIntersectionObserver";

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
  
  // Use the custom hook for video intersection observer
  useVideoIntersectionObserver(videoRef);

  useEffect(() => {
    const handleLoadedData = () => {
      setIsLoading(false);
    };

    const videoElement = videoRef.current;
    if (videoElement) {
      // Check if video is already loaded
      if (videoElement.readyState >= 2) {
        setIsLoading(false);
      } else {
        // Add the event listener to detect when the video is ready
        videoElement.addEventListener("loadeddata", handleLoadedData);
      }

      // Clean up the event listener when the component unmounts
      return () => {
        videoElement.removeEventListener("loadeddata", handleLoadedData);
      };
    }
  }, [videoUrl]);

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
        preload="metadata"
        loop
        muted
        playsInline
      />
    </section>
  );
};

export default React.memo(PrimaryLandingPageSection);
