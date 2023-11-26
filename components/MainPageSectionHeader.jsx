import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

function MainPageSectionHeader({ title, textColor, textSizeLg, textSizeSm }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["end end", "end start"]
  });

  const x = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      ref={ref}
      className="items-center w-screen bg-black"
      style={{ overflow: "hidden" }}
    >
      <motion.div style={{ x }} className={`${textColor} mb-8 ${textSizeSm} ${textSizeLg} font-semibold`}>
        {title}
      </motion.div>
    </section>
  );
}

export default MainPageSectionHeader;
