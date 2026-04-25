"use client";
import { motion } from "framer-motion";

const variants = {
  initial: { y: 400, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, staggerChildren: 0.1 },
  },
};

interface HeroImageBannerProps {
  src: string;
  alt: string;
  title: string;
  caption?: React.ReactNode;
  overlayOpacity?: string;
}

export default function HeroImageBanner({
  src,
  alt,
  title,
  caption,
  overlayOpacity = "bg-black/30",
}: HeroImageBannerProps) {
  return (
    <div className="h-screen flex flex-col items-center justify-center relative overflow-hidden">
      <img src={src} alt={alt} className="absolute inset-0 w-full h-full object-cover" />
      <div className={`absolute inset-0 ${overlayOpacity}`} />
      <motion.h1
        {...({
          initial: "initial",
          whileInView: "animate",
          variants,
          className: "relative z-10 text-white text-4xl md:text-8xl font-bold text-center",
        } as any)}
      >
        {title}
      </motion.h1>
      {caption && (
        <motion.p
          {...({
            initial: "initial",
            whileInView: "animate",
            variants,
            className: "relative z-10 mt-4 text-white/60 text-xs text-center px-4",
          } as any)}
        >
          {caption}
        </motion.p>
      )}
    </div>
  );
}
