import React from "react";
import { motion } from "framer-motion";
import Link from 'next/link'
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
  return (
    <section className={`relative h-screen w-screen ${bgColor}`}>
      <motion.div className="flex flex-col items-center justify-start h-screen">
        <h1
          onMouseEnter={textEnter}
          onMouseLeave={textLeave}
          className={`absolute ${titleFont} text-4xl ${titleColor} pt-3`}
        >
          {title}
        </h1>
        <video
          className={ `h-full w-full ${videoCover}`}
          src={videoUrl}
          autoPlay={true}
          loop
          muted
          playsInline
        ></video>
        <div className="flex items-end justify-center ">
          {" "}
          <Link href={"/project1"} className={`absolute rounded-md border-2 ${buttonBorderColor} bg-transparent ${buttonTextColor} w-60 h-12 font-semibold self-center justify-center text-center p-2 bottom-0 ${buttonBgColor} ${buttonHoverTextColor} mb-6`}>
            {buttonLabel}
          </Link>
        </div>
      </motion.div>
    </section>
  );
}

export default ProjectSection;
