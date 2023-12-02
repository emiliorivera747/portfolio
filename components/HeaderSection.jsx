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

  // Use useTransform for both elements separately
  const xImA = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]); // Adjust the values here
  const xName = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]); // Adjust the values here

  const [typeEffect] = useTypewriter({
    words: ["Front End Developer", "UX/UI Designer", "Back End Developer"],
    loop: {},
    typeSpeed: 100,
    deleteSpeed: 40,
  });

  const backgroundImageUrl =
    "url(https://res.cloudinary.com/dcss55nem/image/upload/v1700934047/Copy_of_Space_and_Astronomy_Film_Video_Intro_11_tjnkdq.png)";

  return (
    <section
      ref={ref}
      className="h-screen w-screen bg-black"
      style={{
        backgroundImage: backgroundImageUrl,
        backgroundSize: "cover",
        backgroundPosition: "center",
        overflow: "hidden",
      }}
    >
      <motion.div
        initial="initial"
        whileInView="animate"
        variants={variants}
        className="h-full w-full flex flex-col"
      >
        <motion.div className="flex h-3/4 items-end justify-center">
          <motion.div className="">
            {" "}
            <h6
              onMouseEnter={textEnter}
              onMouseLeave={textLeave}
              className="text-white text-6xl lg:text-9xl font-semibold tracking-wide text-center"
            >
              Emilio Rivera
            </h6>
          </motion.div>
        </motion.div>
        <div className="h-1/5 flex flex-row items-center justify-center">
          <h1
            onMouseEnter={textEnter}
            onMouseLeave={textLeave}
            className="text-black mb-4 text-lg lg:text-4xl pl-2"
            style={{ x: xImA }}
          >
            {"I'm a"}{" "}
            <span className="text-red-500 text-lg lg:text-4xl">
              {typeEffect}
            </span>
          </h1>
        </div>
      </motion.div>
    </section>
  );
}

export default HeaderSection;
