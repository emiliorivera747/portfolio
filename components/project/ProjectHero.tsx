"use client";
import { motion } from "framer-motion";

const variants = {
  initial: {
    y: 400,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
};

export default function ProjectHero({ title }: { title: string }) {
  return (
    <motion.div {...{ className: "relative h-screen w-full" }}>
      <motion.div
        initial="initial"
        whileInView="animate"
        variants={variants}
        {...{
          className:
            "absolute inset-0 flex items-center p-40 justify-center h-full w-full",
        }}
      >
        <h6 className="text-primary-900 text-4xl md:text-8xl font-bold text-center">
          {title}
        </h6>
      </motion.div>
    </motion.div>
  );
}
