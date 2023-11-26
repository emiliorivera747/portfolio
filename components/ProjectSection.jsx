import React from "react";
import { motion } from "framer-motion";

function ProjectSection({
  title,
  videoUrl,
  buttonLabel,
  textEnter,
  textLeave,
}) {
  return (
    <section className="relative h-screen w-screen">
      <motion.div className="flex flex-col items-center justify-start h-screen">
        <h1
          onMouseEnter={textEnter}
          onMouseLeave={textLeave}
          className="absolute font-bold text-4xl text-black pt-6"
        >
          {title}
        </h1>
        <video
          className="h-full w-full object-cover"
          src={videoUrl}
          autoPlay={true}
          loop
          muted
        ></video>
        <div className="flex items-end justify-center ">
          {" "}
          <button className="absolute rounded-md border-4 border-white bg-transparent text-white w-60 h-12 font-semibold self-center p-2 bottom-0 hover:bg-white hover:text-black mb-6">
            {buttonLabel}
          </button>
        </div>
      </motion.div>
    </section>
  );
}

export default ProjectSection;
