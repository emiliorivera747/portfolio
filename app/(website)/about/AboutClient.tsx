"use client";
import Page from "@/components/Page";
import HeroImageBanner from "@/components/HeroImageBanner";
import RichText from "@/components/payload/RichText";
import { CldImage } from "next-cloudinary";
import Image from "next/image";
import { motion } from "framer-motion";
import { cloudinaryPublicId, isCloudinaryUrl } from "@/lib/images";

// Matches the shape app/(website)/about/page.tsx builds from the `about-page`
// global. Rich-text fields stay `any` for the same reason RichText's own prop
// does — the generated Payload types describe them as a broad union.
export type AboutSectionView = {
  heading: string;
  body: any;
  imageUrl: string;
  imageAlt: string;
  imageCaption?: any;
  imagePosition: "left" | "right";
  quoteAfter?: any;
};

export type AboutHeroView = {
  title: string;
  alt: string;
  imageUrl: string;
  caption?: any;
};

const quoteVariants = {
  initial: { y: 400, opacity: 0 },
  animate: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.6, staggerChildren: 0.1 },
  },
};

// The section photos come from two places — pasted Cloudinary URLs and Payload
// uploads, which now also land on Cloudinary. CldImage wants a public ID
// rather than a URL, so anything Cloudinary-hosted goes through the extractor
// and everything else falls back to plain next/image.
function SectionPhoto({ url, alt }: { url: string; alt: string }) {
  const className =
    "rounded-[12px] shadow-lg hover:scale-105 transition-transform duration-300";

  return isCloudinaryUrl(url) ? (
    <CldImage
      src={cloudinaryPublicId(url)}
      height={700}
      width={700}
      alt={alt}
      className={className}
    />
  ) : (
    <Image src={url} height={700} width={700} alt={alt} className={className} />
  );
}

export default function AboutClient({
  hero,
  sections,
}: {
  hero: AboutHeroView;
  sections: AboutSectionView[];
}) {
  return (
    <Page>
      <section className="h-screen w-full bg-white overflow-x-hidden">
        <HeroImageBanner
          src={hero.imageUrl}
          alt={hero.alt}
          title={hero.title}
          caption={hero.caption ? <RichText data={hero.caption} /> : undefined}
        />

        {sections.map((section, index) => {
          // The heading slides in from whichever side its column sits on, so
          // it tracks `imagePosition` rather than being set per section.
          const textOnLeft = section.imagePosition === "right";

          return (
            <div key={`${section.heading}-${index}`}>
              <section className="px-[8%] flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 relative pt-10 w-screen overflow-auto h-auto min-h-[90vh] bg-white">
                <div className="flex flex-col md:w-1/2 items-center justify-center">
                  <motion.h1
                    initial="initial"
                    whileInView="animate"
                    viewport={{ once: true, amount: 0.5 }}
                    variants={{
                      initial: { x: textOnLeft ? -200 : 200, opacity: 0 },
                      animate: { x: 0, opacity: 1, transition: { duration: 1 } },
                    }}
                    {...({
                      className:
                        "text-primary-1000 font-bold text-2xl md:text-4xl pb-3 md:pb-6",
                    } as any)}
                  >
                    {section.heading}
                  </motion.h1>

                  {/* The body is authored as rich text, so paragraph spacing
                      and link colour have to be applied to the generated
                      <p>/<a> children rather than to a single element. */}
                  <div className="text-primary-900 text-start leading-loose tracking-wider text-[1.1rem] [&_p+p]:mt-6 [&_a]:text-blue-600 [&_a]:hover:underline">
                    <RichText data={section.body} />
                  </div>
                </div>

                {section.imageUrl && (
                  <div
                    className={
                      section.imagePosition === "left"
                        ? "order-last md:order-first"
                        : undefined
                    }
                  >
                    <SectionPhoto
                      url={section.imageUrl}
                      alt={section.imageAlt}
                    />
                    {section.imageCaption && (
                      <div className="md:text-2sm pt-4 text-center text-primary-800">
                        <RichText data={section.imageCaption} />
                      </div>
                    )}
                  </div>
                )}
              </section>

              {section.quoteAfter && (
                <div className="bg-white p-10 flex flex-col md:flex-col h-auto min-h-[70vh] text-center items-center justify-center gap-0">
                  <motion.div
                    {...{
                      className:
                        "bg-gradient-to-r bg-clip-text text-transparent from-primary-1000 to-primary-800 text-4xl md:p-10 leading-loose tracking-wider pb-10",
                      initial: "initial",
                      whileInView: "animate",
                      viewport: { once: true },
                      variants: quoteVariants,
                    }}
                  >
                    <RichText data={section.quoteAfter} />
                  </motion.div>
                </div>
              )}
            </div>
          );
        })}
      </section>
    </Page>
  );
}
