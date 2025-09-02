'use client'
import React, { useEffect, useRef } from "react";

// External Libraries
import { motion } from "framer-motion";

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
function PrimaryLandingPageSection({ videoUrl }: { videoUrl?: string }) {
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
        <div className="w-[50%] landing-page-section-containter">
          <PrimaryHeader />
          <MissionStatement />
          <CalendlyPopupButton />
        </div>
      </motion.div>

      {/* OVERLAY */}
      <BackgroundOverlay />

      {/* VIDEO */}
      <video
        ref={videoRef}
        className={`object-cover w-full h-full`}
        src={
          videoUrl ||
          "https://res.cloudinary.com/dcss55nem/video/upload/v1724550161/Untitled_design_20_pg1n4r.mp4"
        }
        loop
        preload="none"
        muted
        playsInline
      />
    </section>
  );
}

export default PrimaryLandingPageSection;
