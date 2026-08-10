"use client";
import "@/styles/globals.css";
import dynamic from "next/dynamic";
import { motion, AnimatePresence } from "framer-motion";
import React, { useEffect } from "react";
import type { Testimonial as TestimonialDoc } from "@/payload-types";
import type { ToolItem } from "@/types/tools";
import type { HomeProjectSection } from "@/utils/data/home/projectSectionsData";

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

// Separates one project's block — its media section plus the tools that go
// with it — from the next, so the homepage reads as distinct projects rather
// than one continuous scroll.
const ProjectDivider = () => (
  <div className="w-full border-b border-primary-200 pt-10" />
);

// Editors pick a named header style rather than typing Tailwind classes, so
// the type scale stays consistent and the CMS stays free of styling details.
// "featured" routes to ProjectSectionV2's centered header; the other two use
// ProjectSection.
const headerStyles = {
  featured: {
    titleClassName: "text-2xl sm:text-4xl text-tertiary-1000 font-semibold",
    titleSize: "",
    titleFont: "",
    cover: "sm:object-cover",
  },
  standard: {
    titleClassName: "",
    titleSize: "text-3xl sm:text-4xl",
    titleFont: "font-bold",
    cover: "sm:object-cover",
  },
  compact: {
    titleClassName: "",
    titleSize: "text-2xl sm:text-3xl",
    titleFont: "font-bold",
    cover: "object-cover",
  },
} as const;

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
  projectSections,
}: {
  testimonials: TestimonialDoc[];
  heroVideoUrl?: string;
  toolsByProject: ProjectToolsBySlug;
  menuItems: MenuItem[];
  projectSections: HomeProjectSection[];
}) {
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
            {projectSections.map((section, index) => {
              const style = headerStyles[section.headerStyle];
              const tools = section.toolsSlug
                ? toolsByProject[section.toolsSlug] ?? emptyTools
                : undefined;

              return (
                <React.Fragment key={`${section.title}-${index}`}>
                  {section.showDividerBefore && <ProjectDivider />}

                  {section.headerStyle === "featured" ? (
                    <ProjectSectionV2
                      url={section.url}
                      title={section.title}
                      subtitle={section.subtitle}
                      videoUrl={section.videoUrl}
                      imageUrl={section.imageUrl}
                      imageAlt={section.imageAlt}
                      mobileImageUrl={section.mobileImageUrl}
                      mobileImageAlt={section.mobileImageAlt}
                      buttonLabel={section.buttonLabel}
                      titleClassName={style.titleClassName}
                      bgColor="bg-white"
                      videoCover={style.cover}
                    />
                  ) : (
                    <ProjectSection
                      url={section.url}
                      title={section.title}
                      titleSize={style.titleSize}
                      titleColor="text-primary-1000"
                      titleFont={style.titleFont}
                      videoUrl={section.videoUrl}
                      imageUrl={section.imageUrl}
                      imageAlt={section.imageAlt}
                      mobileImageUrl={section.mobileImageUrl}
                      mobileImageAlt={section.mobileImageAlt}
                      buttonLabel={section.buttonLabel}
                      bgColor="bg-white"
                      videoCover={style.cover}
                    />
                  )}

                  {tools && hasAnyTools(tools) && (
                    <ToolsSection
                      frontEndData={tools.frontEnd}
                      backEndData={tools.backEnd}
                      bothData={tools.both}
                      checkWhatDataToShow={{
                        frontEndData: tools.frontEnd.length > 0,
                        backEndData: tools.backEnd.length > 0,
                        bothData: tools.both.length > 0,
                      }}
                      bgColor={"bg-white"}
                    />
                  )}
                </React.Fragment>
              );
            })}
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
