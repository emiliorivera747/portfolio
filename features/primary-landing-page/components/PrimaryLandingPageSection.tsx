import React, { useEffect, useRef } from "react";

// External Libraries
import { motion } from "framer-motion";

// Components
import MissionStatement from "@/features/primary-landing-page/components/MissionStatement";
import Role from "@/features/primary-landing-page/components/Role";
import FullName from "@/features/primary-landing-page/components/FullName";
import CalendlyPopupButton from "@/features/calendly/CalendlyPopupButton";
import BackgroundOverlay from "@/components/BackgroundOverlay";

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
          variants: variants,
          className:
            "absolute h-full z-20 flex items-center justify-center w-full",
        } as any)}
      >
        <motion.div
          {...{
            className:
              "flex flex-col md:flex-col lg:flex-col w-full h-1/2 items-start justify-center sm:mx-16 mx-4 sm:gap-2 z-10 gap-1 mt-[40%] ",
          }}
        >
          <FullName firstName={"Emilio"} lastName={"Rivera"} />
          <Role role={"Software Consultant"} />
          <MissionStatement />
          <CalendlyPopupButton />
        </motion.div>
      </motion.div>

      {/* OVERLAY */}
      <BackgroundOverlay />

      {/* VIDEO */}
      <video
        ref={videoRef}
        className={`object-cover w-full h-full`}
        src={
          videoUrl ||
          "https://res.cloudinary.com/dcss55nem/video/upload/v1724616795/Untitled_design_22_q63p4f.mp4"
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
