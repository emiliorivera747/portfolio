import { useEffect, useState } from "react";
import HeaderSection from "@/components/HeaderSection";
import ProjectSection from "@/components/ProjectSection";
import ToolsSection from "@/components/ToolsSection";
import { motion } from "framer-motion";

import MainPageSectionHeader from "@/components/MainPageSectionHeader";
import Contact from "@/components/Contact";


export default function Home() {
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
  const variants = {
    default: {
      height: 20,
      width: 20,
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      backgroundColor: "black",
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
  const textEnter = () => setCursorVariant("text");

  const textLeave = () => setCursorVariant("default");
  const textLeaveWhiteBg = () => setCursorVariant("default2");

  return (
    <div className={"flex min-h-screen flex-col bg-white container"}>
      <HeaderSection
        textEnter={textEnter}
        textLeave={textLeave}
        videoUrl={
          "https://res.cloudinary.com/dcss55nem/video/upload/v1700334609/Space_and_Astronomy_Film_Video_Intro_2_flwyd5.mp4"
        }
      />
      {/* <div className="p-12 flex justify-center">
        {" "}
        <h1 className="text-6xl">Projects</h1>
      </div> */}
      {/* <MainPageSectionHeader
        textSizeLg="lg:text-8xl"
        textSizeSm="text-4xl"
        textColor="text-zinc-200"
        title={"Projects"}
      /> */}
      <ProjectSection
        title={"Casa Chirilagua"}
        videoUrl={
          "https://res.cloudinary.com/dcss55nem/video/upload/v1700334609/Space_and_Astronomy_Film_Video_Intro_2_flwyd5.mp4"
        }
        buttonLabel={"Learn About Project"}
        textEnter={textEnter}
        textLeave={textLeave}
      />
      {/* <MainPageSectionHeader
        textSizeLg="lg:text-8xl"
        textSizeSm="text-4xl"
        textColor="text-zinc-200"
        title={"Tools"}
      /> */}
      <ToolsSection></ToolsSection>
      <ProjectSection
        title={"My Portfolio"}
        videoUrl={
          "https://res.cloudinary.com/dcss55nem/video/upload/v1700334609/Space_and_Astronomy_Film_Video_Intro_2_flwyd5.mp4"
        }
        buttonLabel={"Learn About Project"}
      />
      {/* <MainPageSectionHeader
        textSizeLg="lg:text-7xl"
        textSizeSm="text-4xl"
        textColor="text-zinc-200"
        title={"Tools"}
      /> */}
      <ToolsSection></ToolsSection>
      <Contact textEnter={textEnter} textLeave={textLeaveWhiteBg}></Contact>
      <motion.div
        className="cursor"
        variants={variants}
        animate={cursorVariant}
      />
    </div>
  );
}
