"use client";
import "@/styles/globals.css";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import type { Testimonial as TestimonialDoc } from "@/payload-types";

// Components - dynamically imported for better performance
const Testimonial = dynamic(() => import("@/components/Testimonial"), {
  loading: () => null,
});
import Contact from "@/components/Contact";
const Footer = dynamic(() => import("@/components/footers/Footer"), {
  loading: () => null,
});

// Components - static imports (critical for initial render)
import PrimaryLandingPageSection from "@/features/primary-landing-page/components/PrimaryLandingPageSection";
import Page from "@/components/Page";
import ProjectSection from "@/components/ProjectSection";
import ProjectSectionV2 from "@/components/ProjectSectionV2";
import ToolsSection from "@/components/ToolsSection";

// Data
import { toolsData } from "@/utils/data/tools/allToolsData";
import { navBarData } from "@/utils/data/navbar/navbarData";
import Navbar from "@/components/navbar/Navbar";

/**
 *  Main App component that wraps around all pages.
 *
 * @param {*} param0
 * @returns
 */
export default function App({
  testimonials,
}: {
  testimonials: TestimonialDoc[];
}) {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash) {
      const id = hash.slice(1);
      const timer = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 300);
      return () => clearTimeout(timer);
    }
  }, []);

  return (
    <>
      <Navbar menuItems={navBarData} />
      <AnimatePresence mode="wait">
        <motion.div {...({ className: "h-auto" } as any)}>
          <Page>
            <PrimaryLandingPageSection
              videoUrl={
                "https://res.cloudinary.com/davx3yyob/video/upload/v1760238501/Portfolio_Video_t0y4tc_ykkaej.mp4"
              }
            />
            <ProjectSectionV2
              url={"https://www.trellismoney.com/"}
              title={"Trellis Money"}
              videoUrl={
                "https://res.cloudinary.com/dxxdfgpdh/video/upload/v1772235119/Portfolio_Video_2_tupy6r.mp4"
              }
              buttonLabel={"Visit Trellis Money"}
              titleClassName="text-2xl sm:text-4xl text-tertiary-1000 font-semibold"
              bgColor="bg-white"
              videoCover="sm:object-cover"
            />
            <ToolsSection
              frontEndData={toolsData["my-portfolio"].frontEnd}
              backEndData={toolsData["my-portfolio"].backEnd}
              bothData={toolsData["my-portfolio"].both}
              checkWhatDataToShow={{
                frontEndData: true,
                backEndData: true,
                bothData: true,
              }}
              bgColor={"bg-white"}
            />
            <div className="w-full border-b border-primary-200 pt-10"></div>
            <ProjectSection
              url={"/casa-chirilagua"}
              titleSize={"text-3xl sm:text-4xl"}
              title={"Casa Chirilagua"}
              videoUrl={
                "https://res.cloudinary.com/davx3yyob/video/upload/v1760237004/Untitled_design_23_gbdkes_inbtze_fni0i9.mp4"
              }
              buttonLabel={"Learn More"}
              titleColor={"text-primary-1000"}
              titleFont={"font-semibold"}
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
            <ProjectSection
              url={"/my-portfolio"}
              titleSize={"text-3xl sm:text-4xl"}
              title={"Portfolio"}
              videoUrl={
                "https://res.cloudinary.com/davx3yyob/video/upload/v1760242424/Portfolio_Video_1_hnsfub.mp4"
              }
              buttonLabel={"Learn More"}
              titleColor={"text-primary-1000"}
              titleFont={"font-bold"}
              bgColor={"bg-white"}
              videoCover={"sm:object-cover"}
            />
            <ProjectSection
              url={"/my-portfolio"}
              title={"Responsive Design"}
              titleSize={"text-2xl sm:text-3xl"}
              titleColor={"text-primary-1000"}
              titleFont={"font-bold"}
              videoUrl={
                "https://res.cloudinary.com/davx3yyob/video/upload/v1760242715/Untitled_design_20_pg1n4r_kv58m5.mp4"
              }
              buttonLabel={"Learn More"}
              videoCover={"object-cover"}
              bgColor={"bg-white"}
            />
            <ToolsSection
              frontEndData={toolsData["my-portfolio"].frontEnd}
              backEndData={toolsData["my-portfolio"].backEnd}
              bothData={toolsData["my-portfolio"].both}
              checkWhatDataToShow={{
                frontEndData: true,
                backEndData: true,
                bothData: true,
              }}
              bgColor={"bg-white"}
            />
            <Testimonial testimonials={testimonials} />
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
