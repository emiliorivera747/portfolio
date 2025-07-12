import React, { useEffect, useRef } from "react";

// External Libraries
import { motion } from "framer-motion";

// Component
import MissionStatement from "@/features/primary-landing-page/components/MissionStatement";
import CalendlyPopupButton from "@/features/calendly/CalendlyPopupButton";
import BackgroundOverlay from "@/components/BackgroundOverlay";
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
    <section className="relative h-screen w-screen">
      <motion.div
        {...({
          initial: "initial",
          whileInView: "animate",
          variants,
          className:
            "absolute h-full w-full flex flex-col items- justify-center z-30",
        } as any)}
      >
        <div style={{ width: " 50vw", paddingLeft: '4rem' }} className="w-[50%]">
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
