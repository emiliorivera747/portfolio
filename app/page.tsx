"use client";
import "@/styles/globals.css";
import { motion, AnimatePresence } from "framer-motion";

//Components
import Testimonial from "@/components/Testimonial";
import PrimaryLandingPageSection from "@/features/primary-landing-page/components/PrimaryLandingPageSection";
import Page from "@/components/Page";

//Sections
import Contact from "@/components/Contact";
import ProjectSection from "@/components/ProjectSection";
import ToolsSection from "@/components/ToolsSection";

//Data
import { toolsData } from "@/utils/data/tools/allToolsData";

// Data
import { navBarData } from "@/utils/data/navbar/navbarData";
import Navbar from "@/components/navbar/Navbar";

import Footer from "@/components/footers/Footer";
/**
 *  Main App component that wraps around all pages.
 *
 * @param {*} param0
 * @returns
 */
export default function App() {
  return (
    <>
      <Navbar menuItems={navBarData} />
      <AnimatePresence mode="wait">
        <motion.div {...({ className: "h-auto" } as any)}>
          <Page>
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
              buttonBorderColor={"border-zinc-800 hover:border-zinc-800"}
              buttonBgColor={"hover:bg-primary-1000"}
              buttonHoverTextColor={"hover:text-white"}
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
              buttonBgColor={"hover:bg-primary-1000"}
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
              buttonBgColor={"hover:bg-primary-1000"}
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
            <Footer />
          </Page>
          <motion.div
            {...({
              className:
                "absolute top-0 left-0 w-screen h-screen bg-black z-50",
              initial: { scaleY: 0 },
              animate: { scaleY: 0 },
              exit: { scaleY: 1 },
              transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] },
            } as any)}
          />
        </motion.div>
      </AnimatePresence>
    </>
  );
}
