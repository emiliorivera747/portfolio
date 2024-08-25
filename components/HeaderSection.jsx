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
  const ref = useRef(null);
  const backgroundImageUrl =
    "url(https://res.cloudinary.com/dcss55nem/image/upload/v1702766909/Website_Header_Picture_jem7z3.png)";

  return (
    <section
      className="relative min-h-screen h-auto w-screen  bg-black"
    >
      <motion.div
        initial="initial"
        whileInView="animate"
        variants={variants}
        className="flex flex-row w-full h-full absolute sm:self-center sm:items-center sm:justify-center justify-end items-end self-end "
      >
        <motion.div className="flex flex-col md:flex-col lg:flex-col w-full h-1/2 items-start justify-center sm:mx-16 mx-4 sm:gap-2 z-10 gap-1">
          <div className="flex lg:flex-row flex-row gap-2 2xl:flex-col md:gap-4 text-4xl  md:text-7xl 2xl:text-[14rem] mb-4 sm:mb-8 ">
            <h1
              onMouseEnter={textEnter}
              onMouseLeave={textLeave}
              className="text-white font-bold"
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
            className="font-bold from-zinc-400 to-zinc-200 bg-gradient-to-r bg-clip-text text-transparent sm:text-2xl text-xl z-50  sm:mx-1 2xl:text-[3rem] pl-1 sm:pl-0"
          >
            {"Full Stack Engineer"}
          </h1>
          <p className="text-zinc-200 sm:w-1/2 pl-1"> Develop minimalist web and front-end applications using modern frameworks, tailored for small businesses and non-profit organizations. </p>
        </motion.div>
      </motion.div>
      {/* VIDEO */}
      <div className="">
        <div
          className="absolute top-0 left-0 w-full h-full bg-black opacity-30"
        ></div>
      </div>
      <video
        ref={videoRef}
        className={`h-screen w-screen object-cover`}
        src={"https://res.cloudinary.com/dcss55nem/video/upload/v1724197548/Casa_Website_Video_-_Made_with_Clipchamp_t2atbx.mp4"}
        // autoPlay={true}
        loop
        muted
        playsInline
      ></video>

      {/* NAME */}

    </section>
  );
}

export default HeaderSection;
