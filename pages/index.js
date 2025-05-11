import { useEffect, useState, useRef } from "react";
import Head from "next/head";
import HeaderSection from "@/components/HeaderSection";
import ProjectSection from "@/components/ProjectSection";
import ToolsSection from "@/components/ToolsSection";
import { motion, useScroll } from "framer-motion";
import Page from "@/components/page";
import Contact from "@/components/Contact";

//Components
import Testimonial from "@/components/Testimonial";

//Data 
import {toolsData} from "@/utils/data/tools/allToolsData";

// Meta Data
export const metadata = {
  title: "Home | Emilio Rivera Portfolio",
  description:
    "Welcome to Emilio Rivera Portfolio, a Full Stack Engineer based in San Jose, CA. specializing in React.js, Next.js, and Node.js.",
};

export default function Home() {
  const { scrollY } = useScroll();

  const [scrollDirection, setScrollDirection] = useState(null);

  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const direction = currentScrollY > lastScrollY ? "down" : "up";
      setScrollDirection(direction);
      lastScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });
  const [cursorVariant, setCursorVariant] = useState("default");

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };
    window.addEventListener("mousemove", mouseMove);
    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  //Test
  const variants = {
    default: {
      height: 20,
      width: 20,
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      backgroundColor: "white",
    },
    none: {
      height: 0,
      width: 0,
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      // backgroundColor: "white",
    },
    default2: {
      height: 20,
      width: 20,
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      backgroundColor: "white",
    },
    text: {
      height: 150,
      width: 150,
      x: mousePosition.x - 75,
      y: mousePosition.y - 75,
      backgroundColor: "white",
      mixBlendMode: "difference",
    },
  };


  return (
    <Page>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} key="desc" />
      </Head>
      <HeaderSection
        videoUrl={
          "https://res.cloudinary.com/dcss55nem/video/upload/v1723761408/njth0ximkbqfobcqtzov.mp4"
        }
      />
      <ProjectSection
        url={"/casa-chirilagua"}
        titleSize={"text-4xl"}
        title={"Casa Chirilagua"}
        videoUrl={
          "https://res.cloudinary.com/dxxdfgpdh/video/upload/v1746936846/Untitled_design_23_gbdkes.mp4"
        }
        buttonLabel={"Learn More"}
        titleColor={"text-primary-1000"}
        titleFont={"font-semibold"}
        buttonTextColor={"text-[#495057]"}
        buttonBorderColor={"border-[#495057]"}
        buttonBgColor={"hover:bg-white"}
        buttonHoverTextColor={"hover:text-zinc-800"}
        bgColor={"bg-white"}
        videoCover={"sm:object-cover"}
      />
      <ToolsSection
        frontEndData={toolsData["casa-chirilagua"].frontEnd}
        backEndData={toolsData["casa-chirilagua"].backEnd}
        bothData={toolsData["casa-chirilagua"].both}
        checkWhatDataToShow={{
          frontEndData: true,
          backEndData: true,
          bothData: true,
        }}
        bgColor={"bg-white"}
        textColor={"text-primary-1000"}
      />
      <Testimonial />
      <ProjectSection
        url={"/my-portfolio"}
        titleSize={"text-4xl"}
        title={"My Portfolio Website"}
        videoUrl={
          "https://res.cloudinary.com/dcss55nem/video/upload/v1724616795/Untitled_design_22_q63p4f.mp4"
        }
        buttonLabel={"Learn More"}
        titleColor={"text-primary-1000"}
        titleFont={"font-bold"}
        buttonTextColor={"text-zinc-800 md:text-zinc-800"}
        buttonBorderColor={"border-black md:border-black"}
        buttonBgColor={"hover:bg-black md:hover:bg-black"}
        buttonHoverTextColor={"hover:text-white md:hover:text-white"}
        videoCover={"sm:object-cover"}
      />
      <ProjectSection
        url={"/my-portfolio"}
        title={"Responsive Design"}
        titleSize={"text-3xl"}
        titleColor={"text-primary-1000"}
        titleFont={"font-bold"}
        videoUrl={
          "https://res.cloudinary.com/dcss55nem/video/upload/v1724550161/Untitled_design_20_pg1n4r.mp4"
        }
        buttonLabel={"Learn More"}
        buttonTextColor={"text-zinc-800 "}
        buttonBorderColor={"border-zinc-800 hover:border-zinc-800"}
        buttonBgColor={"hover:bg-zinc-800"}
        buttonHoverTextColor={"hover:text-white"}
        videoCover={"object-cover"}
      />
      <ToolsSection
        frontEndData={toolsData["my-portfolio"].frontEnd}
        checkWhatDataToShow={{
          frontEndData: true,
          backEndData: false,
          bothData: false,
        }}
        bgColor={"bg-white"}
        textColor={"text-primary-1000"}
      ></ToolsSection>
      <Contact/>
      <motion.div
        className="cursor"
        variants={variants}
        animate={cursorVariant}
      />
    </Page>
  );
}
