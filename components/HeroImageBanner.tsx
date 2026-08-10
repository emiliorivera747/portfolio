"use client";
import Image from "next/image";
import { motion } from "framer-motion";

const variants = {
  initial: { y: 40, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, staggerChildren: 0.1 },
  },
};

interface HeroImageBannerProps {
  src?: string;
  alt?: string;
  title: string;
  caption?: React.ReactNode;
  overlayOpacity?: string;
  type?: "image" | "video";
  className?: string;
  titleColor?: string;
  captionColor?: string;
}

export default function HeroImageBanner({
  src,
  alt,
  title,
  caption,
  overlayOpacity = "bg-black/30",
  type = "image",
  className,
  titleColor = "text-white",
  captionColor = "text-white/60",
}: HeroImageBannerProps) {
  return (
    // The dark base matters: the overlay below is a translucent black, so until
    // the media paints there is nothing behind it but the white page — and 30%
    // black over white is a flash of grey. Starting dark means the gap reads as
    // the image arriving rather than a colour change. Only applied when there
    // is media to wait for; the blog banner passes its own background instead.
    <div
      className={`h-screen flex flex-col items-center justify-center relative overflow-hidden ${
        src ? "bg-primary-1000" : ""
      } ${className ?? ""}`}
    >
      {src && type === "video" && (
        <video
          src={src}
          aria-label={alt}
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        />
      )}
      {src && type === "image" && (
        // next/image rather than a bare <img>: this is the page's LCP element,
        // and `priority` preloads it from the document head instead of leaving
        // the browser to discover it. It also serves AVIF/WebP at the right
        // width, which matters a great deal here — the source PNG is 8MB.
        <Image
          src={src}
          alt={alt ?? ""}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      )}
      {src && <div className={`absolute inset-0 ${overlayOpacity}`} />}
      <motion.h1
        {...({
          initial: "initial",
          animate: "animate",
          variants,
          className: `relative z-10 ${titleColor} text-4xl md:text-8xl font-bold text-center`,
        } as any)}
      >
        {title}
      </motion.h1>
      {caption && (
        <motion.p
          {...({
            initial: "initial",
            animate: "animate",
            variants,
            className: `relative z-10 mt-4 ${captionColor} text-[0.3rem] text-center px-4`,
          } as any)}
        >
          {caption}
        </motion.p>
      )}
    </div>
  );
}
