"use client";
import React, { useRef } from "react";

// External Libraries
import { motion } from "framer-motion";

// Hooks
import { useVideoIntersectionObserver } from "@/hooks/useVideoIntersectionObserver";

// Component
import MissionStatement from "@/features/primary-landing-page/components/MissionStatement";
import CalendlyPopupButton from "@/features/calendly/CalendlyPopupButton";
import BackgroundOverlay from "@/components/overlays/BackgroundOverlay";
import PrimaryHeader from "@/features/primary-landing-page/components/PrimaryHeader";
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
  const videoRef = useRef<HTMLVideoElement>(null!);

  useVideoIntersectionObserver(videoRef);

  return (
    <section className="relative h-screen w-screen bg-black">
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

      <BackgroundOverlay />
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
