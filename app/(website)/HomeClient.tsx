"use client";
import "@/styles/globals.css";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect } from "react";
import type { Testimonial as TestimonialDoc } from "@/payload-types";
import type { ToolItem } from "@/types/tools";

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
import type { MenuItem } from "@/types/navbar";
import Navbar from "@/components/navbar/Navbar";

type ProjectToolsBySlug = Record<
  string,
  { frontEnd: ToolItem[]; backEnd: ToolItem[]; both: ToolItem[] }
>;

const emptyTools: { frontEnd: ToolItem[]; backEnd: ToolItem[]; both: ToolItem[] } = {
  frontEnd: [],
  backEnd: [],
  both: [],
};

/**
 *  Main App component that wraps around all pages.
 *
 * @param {*} param0
 * @returns
 */
export default function App({
  testimonials,
  heroVideoUrl,
  toolsByProject,
  menuItems,
}: {
  testimonials: TestimonialDoc[];
  heroVideoUrl?: string;
  toolsByProject: ProjectToolsBySlug;
  menuItems: MenuItem[];
}) {
  const myPortfolioTools = toolsByProject["my-portfolio"] ?? emptyTools;
  const casaChirilaguaTools = toolsByProject["casa-chirilagua"] ?? emptyTools;
  const trellisMoneyTools = toolsByProject["trellis-money"] ?? emptyTools;

  const hasAnyTools = (t: typeof emptyTools) =>
    t.frontEnd.length > 0 || t.backEnd.length > 0 || t.both.length > 0;

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
      <Navbar menuItems={menuItems} />
      <AnimatePresence mode="wait">
        <motion.div {...({ className: "h-auto" } as any)}>
          <Page>
            <PrimaryLandingPageSection videoUrl={heroVideoUrl} />
            <ProjectSectionV2
              url={"/projects/trellis-money"}
              title={"Trellis Money"}
              videoUrl={
                "https://res.cloudinary.com/dxxdfgpdh/video/upload/v1772235119/Portfolio_Video_2_tupy6r.mp4"
              }
              buttonLabel={"Learn More"}
              titleClassName="text-2xl sm:text-4xl text-tertiary-1000 font-semibold"
              bgColor="bg-white"
              videoCover="sm:object-cover"
            />
            {hasAnyTools(trellisMoneyTools) && (
              <ToolsSection
                frontEndData={trellisMoneyTools.frontEnd}
                backEndData={trellisMoneyTools.backEnd}
                bothData={trellisMoneyTools.both}
                checkWhatDataToShow={{
                  frontEndData: trellisMoneyTools.frontEnd.length > 0,
                  backEndData: trellisMoneyTools.backEnd.length > 0,
                  bothData: trellisMoneyTools.both.length > 0,
                }}
                bgColor={"bg-white"}
              />
            )}
            <div className="w-full border-b border-primary-200 pt-10"></div>
            <ProjectSection
              url={"/projects/casa-chirilagua"}
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
              frontEndData={casaChirilaguaTools.frontEnd}
              backEndData={casaChirilaguaTools.backEnd}
              bothData={casaChirilaguaTools.both}
              checkWhatDataToShow={{
                frontEndData: casaChirilaguaTools.frontEnd.length > 0,
                backEndData: casaChirilaguaTools.backEnd.length > 0,
                bothData: casaChirilaguaTools.both.length > 0,
              }}
              bgColor={"bg-white"}
            />
            <ProjectSection
              url={"/projects/my-portfolio"}
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
              url={"/projects/my-portfolio"}
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
              frontEndData={myPortfolioTools.frontEnd}
              backEndData={myPortfolioTools.backEnd}
              bothData={myPortfolioTools.both}
              checkWhatDataToShow={{
                frontEndData: myPortfolioTools.frontEnd.length > 0,
                backEndData: myPortfolioTools.backEnd.length > 0,
                bothData: myPortfolioTools.both.length > 0,
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
