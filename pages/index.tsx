import { useEffect, useState } from "react";
import Head from "next/head";
import HeaderSection from "@/components/HeaderSection";
import ProjectSection from "@/components/ProjectSection";
import ToolsSection from "@/components/ToolsSection";
import { motion } from "framer-motion";
import Page from "@/components/Page";
import Contact from "@/components/Contact";

//Components
import Testimonial from "@/components/Testimonial";
import PrimaryLandingPageSection from "@/features/primary-landing-page/components/PrimaryLandingPageSection";

//Data
import { toolsData } from "@/utils/data/tools/allToolsData";

// Meta Data
export const metadata = {
  title: "Home | Emilio Rivera Portfolio",
  description:
    "Welcome to Emilio Rivera Portfolio, a Full Stack Engineer based in San Jose, CA. specializing in React.js, Next.js, and Node.js.",
};

export default function Home() {
  useEffect(() => {
    let lastScrollY = window.scrollY;
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
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
    interface MousePosition {
      x: number;
      y: number;
    }

    const mouseMove = (e: MouseEvent): void => {
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
      mixBlendMode: "difference" as const,
    },
  };

  return (
    <Page>
      <Head>
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} key="desc" />
      </Head>

      <PrimaryLandingPageSection
        videoUrl={
          "https://res.cloudinary.com/dcss55nem/video/upload/v1739681557/Portfolio_Video_t0y4tc.mp4"
        }
      />
      <ProjectSection
        url={"/casa-chirilagua"}
        titleSize={"text-4xl"}
        title={"Casa Chirilagua"}
        videoUrl={
          "https://res.cloudinary.com/dcss55nem/video/upload/v1747627984/Untitled_design_23_gbdkes_inbtze.mp4"
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
        bgColor={"bg-white"}
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
        bgColor={"bg-white"}
      />
      <ToolsSection
        frontEndData={toolsData["my-portfolio"].frontEnd}
        checkWhatDataToShow={{
          frontEndData: true,
          backEndData: false,
          bothData: false,
        }}
        bgColor={"bg-white"}
      />
      <Contact />
      <motion.div
        variants={variants}
        animate={cursorVariant}
        {...{ className: "cursor" }}
      />
    </Page>
  );
}
