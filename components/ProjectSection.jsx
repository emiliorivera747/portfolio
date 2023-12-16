import React, { useRef, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

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
}) {
   
  const videoRef = useRef(null);
  useEffect(() => {
    const options = {
      root: null,
      rootMargin: "0px",
      threshold: 0.5, // Adjust this threshold based on your requirement
    };

    const callback = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Video is in the viewport, play it
          videoRef.current.play();
        } else {
          // Video is outside the viewport, pause it
          videoRef.current.pause();
        }
      });
    };

    const observer = new IntersectionObserver(callback, options);
    observer.observe(videoRef.current);

    // Cleanup the observer when component unmounts
    return () => observer.disconnect();
  }, []);

  return (
    <section className={`relative h-screen w-screen ${bgColor}`}>
      <motion.div className="flex flex-col items-center justify-start h-screen">
        <h1
          onMouseEnter={textEnter}
          onMouseLeave={textLeave}
          className={`absolute ${titleFont} text-4xl ${titleColor} pt-6`}
        >
          {title}
        </h1>
        <video
          ref={videoRef}
          className={`h-full w-full ${videoCover}`}
          src={videoUrl}
          autoPlay={true}
          loop
          muted
          playsInline
        ></video>
        <div className="flex items-end justify-center ">
          {" "}
          <Link
            href={"/project1"}
            className={`absolute rounded-md border-2 ${buttonBorderColor} bg-transparent ${buttonTextColor} w-60 h-12 font-semibold self-center justify-center text-center p-2 bottom-0 ${buttonBgColor} ${buttonHoverTextColor} mb-6`}
          >
            {buttonLabel}
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

export default ProjectSection;
