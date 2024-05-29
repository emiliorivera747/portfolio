import { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useTypewriter, Cursor } from "react-simple-typewriter";
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
function HeaderSection({ textEnter, textLeave }) {
  const ref = useRef(null);
  const backgroundImageUrl =
    "url(https://res.cloudinary.com/dcss55nem/image/upload/v1702766909/Website_Header_Picture_jem7z3.png)";

  return (
    <section
      ref={ref}
      className="bg-black relative min-h-screen h-auto w-screen"
    >
      {/* Description */}
      <motion.div
        initial="initial"
        whileInView="animate"
        variants={variants}
        className="absolute h-screen w-screen flex flex-col bg-transparent"
        style={{
          backgroundImage: backgroundImageUrl,
          backgroundSize: "cover",
          backgroundPosition: "center",
          overflow: "hidden",
        }}
      >
      </motion.div>

      {/* NAME */}
      <motion.div
        initial="initial"
        whileInView="animate"
        variants={variants}
        className="lg:relative flex flex-row h-screen items-center justify-center "
      >
        <motion.div className="flex flex-col md:flex-col lg:flex-col w-full h-1/2 items-start justify-center mx-16 gap-6">
          <div className="flex lg:flex-row flex-col 2xl:flex-col md:gap-4 text-[8rem] md:text-7xl 2xl:text-[14rem]">
            <h1
              onMouseEnter={textEnter}
              onMouseLeave={textLeave}
              className="text-white font-bold  "
            >
              {"Emilio"}
            </h1>
            <h1
              onMouseEnter={textEnter}
              onMouseLeave={textLeave}
              className="text-white font-bold"
            >
              {"Rivera"}
            </h1>
          </div>
          <h1
            onMouseEnter={textEnter}
            onMouseLeave={textLeave}
            className="font-semibold from-zinc-500 to-zinc-200 bg-gradient-to-r bg-clip-text text-transparent sm:text-2xl text-6xl z-50 mx-5 sm:mx-1 2xl:text-[3rem]"
          >
            {"Full Stack Engineer"}
          </h1>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default HeaderSection;
