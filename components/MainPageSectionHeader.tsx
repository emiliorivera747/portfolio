import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface MainPageSectionHeaderProps {
  title: string;
  textColor: string;
  textSizeLg: string;
  textSizeSm: string;
}


/**
 * 
 * Shows the main page section header
 * 
 * @param 
 * @returns 
 */
function MainPageSectionHeader({ title, textColor, textSizeLg, textSizeSm }: MainPageSectionHeaderProps) {
  const ref = useRef<HTMLElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: ref as React.RefObject<HTMLElement>,
    offset: ["end end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={ref}
      className="items-center w-screen bg-black"
      style={{ overflow: "hidden" }}
    >
      <motion.div {...({ style: { x }, className: `${textColor} mb-8 ${textSizeSm} ${textSizeLg} font-semibold` } as any)}>
        {title}
      </motion.div>
    </section>
  );
}

export default MainPageSectionHeader;
