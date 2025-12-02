"use client";
import React from "react";
import Page from "@/components/Page";
import { CldImage } from "next-cloudinary";
import Link from "next/link";
import PrimaryHeader from "@/components/titles/PrimaryHeader";

// External Libraries
import { motion } from "framer-motion";

const variants = {
  initial: {
    y: 400,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1,
    },
  },
};

/**
 *  Displays information about me
 *
 * @returns the about page
 */
function About() {
  return (
    <Page>
      <section className="h-screen w-full bg-white overflow-x-hidden">
        <motion.div
          {...{
            initial: "initial",
            whileInView: "animate",
            variants,
            className: "h-full flex items-center justify-center bg-white",
          }}
        >
          {" "}
          <h1 className=" text-transparent bg-clip-text bg-gradient-to-r from-primary-900 to-primary-800 text-4xl md:text-8xl font-bold text-center">
            About Me.
          </h1>
        </motion.div>

        <section className=" px-[8%] flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 relative pt-10  w-screen overflow-auto h-auto min-h-[90vh] bg-white">
          <div className="flex flex-col md:w-1/2 items-center justify-center">
            <motion.h1
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.5 }}
              variants={{
                initial: { x: -200, opacity: 0 },
                animate: { x: 0, opacity: 1, transition: { duration: 1 } },
              }}
              {...({
                className:
                  "text-primary-1000 font-bold text-2xl md:text-4xl pb-3 md:pb-6",
              } as any)}
            >
              My Journey
            </motion.h1>

            <br></br>
            <p className="text-primary-900 text-start leading-loose tracking-wider text-[1.1rem]">
              I am an inventor, using engineering to create magic. I&apos;ve
              explored technologies such as React.js, Node.js, FastAPI, and
              Next.js to add to my toolbox, continually learning and embracing
              the latest technology.
            </p>
            <br></br>
            <p className="text-primary-900 text-start leading-loose tracking-wider text-[1.1rem]">
              {`I earned my bachelor's degree in Computer Science from Virginia Tech, graduating in December 2022. Since then, I've freelanced to refine my skills in both front-end and back-end systems.`}
            </p>
          </div>
          <div className="text-secondary-900">
            <CldImage
              src="https://res.cloudinary.com/dcss55nem/image/upload/v1701486445/20221216_115051_ezqxrn.jpg"
              height={700}
              width={700}
              alt="Virginia Tech Graduation"
              className="rounded-[12px] shadow-lg hover:scale-105 transition-transform duration-300"
            />
            <h2 className="md:text-2sm pt-4 text-center text-primary-800">
              Virginia Tech Graduation Ceremony December 2022
            </h2>
          </div>
        </section>

        <section className=" px-[8%] flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 relative pt-10  w-screen overflow-auto h-auto min-h-[90vh] bg-white">
          {" "}
          <div className="text-black order-last md:order-first">
            <CldImage
              src="https://res.cloudinary.com/dcss55nem/image/upload/v1701747663/IMG_2215_kypj32.jpg"
              height={700}
              width={700}
              alt="Intramural Soccer at Virginia Tech Fall 2022"
              className="rounded-[12px] shadow-lg hover:scale-105 transition-transform duration-300"
            />
            <h2 className="md:text-2sm pt-4 text-center text-primary-800">
              Intramural <span className="font-bold">Soccer</span> at Virginia
              Tech
            </h2>
          </div>
          <div className="flex flex-col h-1/2 md:w-1/2  items-center justify-center">
            <motion.h1
              {...({
                className:
                  "text-primary-1000 font-bold text-2xl md:text-4xl pb-3 md:pb-6",
              } as any)}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.5 }}
              variants={{
                initial: { x: 200, opacity: 0 },
                animate: { x: 0, opacity: 1, transition: { duration: 1 } },
              }}
            >
              Hobbies
            </motion.h1>
            <p className="text-primary-900 text-start leading-loose tracking-wider text-[1.2rem]">
              In my free time, I enjoy playing
              <strong> soccer</strong>, practicing
              <strong> public speaking</strong>, and
              <strong> volunteering </strong>in my community.
            </p>
            <h1></h1>
          </div>
        </section>
        <div className="bg-white p-10 flex flex-col md:flex-col h-auto min-h-[70vh] text-center items-center justify-center gap-0 ">
          <motion.h2
            {...{
              className:
                "bg-gradient-to-r bg-clip-text text-transparent from-primary-1000 to-primary-800 text-4xl md:p-10 leading-loose tracking-wider pb-10",
              initial: "initial",
              whileInView: "animate",
              variants,
            }}
          >
            {`"Everyone has a story, an idea, or message to share with the world and there is no one better than for you to share it through`}{" "}
            <strong>Public Speaking</strong>
            <span>{`"`}</span>
          </motion.h2>
          {/* <p className="text-xl font-light text-[#868e96]">- Emilio Rivera</p> */}
        </div>
        <section className=" px-[8%] flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16 relative pt-10  w-screen overflow-auto h-auto min-h-[90vh] bg-white">
          <div className="flex flex-col md:w-1/2  items-center justify-center p-10">
            <motion.h1
              {...({
                className:
                  "text-primary-1000 font-bold text-2xl md:text-4xl pb-3 md:pb-6",
              } as any)}
              initial="initial"
              whileInView="animate"
              viewport={{ once: true, amount: 0.5 }}
              variants={{
                initial: { x: -200, opacity: 0 },
                animate: { x: 0, opacity: 1, transition: { duration: 1 } },
              }}
            >
              Public Speaking
            </motion.h1>
            {/* <p className="text-primary-900 text-start leading-loose tracking-wider text-[1.2rem]">
              I love <strong>public speaking</strong> and hope to start my own
              public speaking organization someday.
            </p> */}
            <br></br>
            <p className="text-primary-900 text-start leading-loose tracking-wider text-[1.2rem]">
              Fall 2024, I got the privilege to represent{" "}
              <Link
                className="text-secondary-800 text-blue-600 hover:underline"
                href={
                  "https://www.toastmasters.org/Find-a-Club/00003572-saratoga-toastmasters-club"
                }
                aria-label="Saratoga Toastmasters Website"
              >
                Saratoga Toastmasters{" "}
              </Link>
              at the Divison level speech contest and was awarded 2nd place.
            </p>
            <h1></h1>
          </div>
          <div className="text-primary-900">
            <CldImage
              src="https://res.cloudinary.com/dcss55nem/image/upload/v1758821016/Screenshot_2025-09-25_at_10.22.39_AM_yse58q.png"
              height={700}
              width={700}
              alt="Toastmasters Open House 2025"
              className="rounded-[12px] shadow-lg hover:scale-105 transition-transform duration-300"
            />
            <h2 className="md:text-2sm pt-4 text-center text-primary-800">
              Toastmasters Open House 2025
            </h2>
          </div>
        </section>
        <section className="px-[8%] flex flex-col items-center justify-center gap-8 md:gap-16 relative pt-10  w-screen overflow-auto h-auto min-h-[90vh] bg-white">
          <PrimaryHeader className="text-4xl" title={"Volunteering"} />
          <div className="w-full h-[80vh] rounded-[12px] relative bg-black mb-40">
            <iframe
              className="w-full absolute top-0 right-0 h-full"
              src="https://player.vimeo.com/video/906510596?badge=0&amp;autopause=0&amp;player_id=0&amp;app_id=58479"
              allow="autoplay; fullscreen; picture-in-picture"
              title="1119 CM"
            ></iframe>
          </div>
        </section>
      </section>
    </Page>
  );
}

export default About;
