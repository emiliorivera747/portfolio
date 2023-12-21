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
  // const { scrollYProgress } = useScroll({
  //   target: ref,
  //   offset: ["end end", "end start"],
  // });

  // const [typeEffect] = useTypewriter({
  //   words: [
  //     "Full Stack Developer",
  //     "Front End Developer",
  //     "Back End Developer",
  //   ],
  //   loop: {},
  //   typeSpeed: 100,
  //   deleteSpeed: 40,
  // });

  const backgroundImageUrl =
    "url(https://res.cloudinary.com/dcss55nem/image/upload/v1702766909/Website_Header_Picture_jem7z3.png)";
 
  
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
          <motion.div className="flex h-1/3 p-4 ">
            <h1
              onMouseEnter={textEnter}
              onMouseLeave={textLeave}
              className="font-semibold from-red-700 to-red-600 bg-gradient-to-r bg-clip-text text-transparent text-4xl lg:text-6xl"
            >

              {/* <span className="font-semibold from-red-700 to-red-600 bg-gradient-to-r bg-clip-text text-transparent text-4xl lg:text-6xl"> */}
                {"Full Stack Engineer"}
              {/* </span> */}
            </h1>
          </motion.div>
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
              className=" text-white text-8xl sm:text-[12rem]  lg:text-[9rem] font-semibold  tracking-widest lg:tracking-wide text-center "
            >
              {"Emilio"}
            </h1>
          </div>
          <div className="">
            <h1
              onMouseEnter={textEnter}
              onMouseLeave={textLeave}
              className=" text-white text-8xl sm:text-[11rem]  lg:text-[9rem] font-semibold tracking-widest lg:tracking-wide text-center "
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
