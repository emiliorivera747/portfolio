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
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "end start"],
  });

  const [typeEffect] = useTypewriter({
    words: [
      "Full Stack Developer",
      "Front End Developer",
      "Back End Developer",
    ],
    loop: {},
    typeSpeed: 100,
    deleteSpeed: 40,
  });

  const backgroundImageUrl =
    "url(https://res.cloudinary.com/dcss55nem/image/upload/v1700934047/Copy_of_Space_and_Astronomy_Film_Video_Intro_11_tjnkdq.png)";
 
  
  return (
    <section ref={ref} className="h-screen w-screen bg-black ">
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
        <div className="h-full flex flex-row items-end justify-center">
          <div className="flex h-1/3 p-4 ">
            <h1
              onMouseEnter={textEnter}
              onMouseLeave={textLeave}
              className=" text-zinc-700 font-semibold mb-4 text-4xl lg:text-5xl pl-2"
            >
              {"I'm a"}{" "}
              <span className="font-semibold from-orange-400 to-red-700 bg-gradient-to-r bg-clip-text text-transparent text-4xl lg:text-5xl">
                {typeEffect}
              </span>
            </h1>
          </div>
        </div>
      </motion.div>
      <motion.div
        initial="initial"
        whileInView="animate"
        variants={variants}
        className="lg:relative flex h-3/4 items-center justify-center"
      >
        <motion.div className="flex flex-col md:flex-col lg:flex-row justify-evenly w-full lg:gap-56">
          <div className="">
            <h1
              onMouseEnter={textEnter}
              onMouseLeave={textLeave}
              className=" text-white text-8xl md:text-[12rem]  lg:text-[9rem] font-semibold  tracking-widest lg:tracking-wide text-center "
            >
              {"Emilio"}
            </h1>
          </div>
          <div className="">
            <h1
              onMouseEnter={textEnter}
              onMouseLeave={textLeave}
              className=" text-white text-8xl md:text-[12rem] lg:text-[9rem] font-semibold tracking-widest lg:tracking-wide text-center "
            >
              {"Rivera"}
            </h1>
          </div>
        </motion.div>
      </motion.div>
    </section>
  );
}

export default HeaderSection;
