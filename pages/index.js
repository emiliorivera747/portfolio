import { useEffect, useState, useRef } from "react";
import Head from 'next/head';
import HeaderSection from "@/components/HeaderSection";
import ProjectSection from "@/components/ProjectSection";
import ToolsSection from "@/components/ToolsSection";
import { motion } from "framer-motion";
import Page from "@/components/page";
import Contact from "@/components/Contact";
//test

//Components 
import Testimonial from "@/components/Testimonial";

export const metadata = {
  title: "Home | Emilio Rivera Portfolio",
  description:
    "Welcome to Emilio Rivera Portfolio, a Full Stack Engineer based in San Jose, CA. specializing in React.js, Next.js, and Node.js.",
};

export default function Home() {
  // const [screenWidth, setScreenWidth] = useState(window ? window.innerWidth : "" );

  const frontEndData = [
    {
      name: "React",
      imageUrl:
        "https://res.cloudinary.com/dcss55nem/image/upload/v1701032021/14_k0egpe.png",
    },
    {
      name: "Tailwind",
      imageUrl:
        "https://res.cloudinary.com/dcss55nem/image/upload/v1701032021/15_pzbsyb.png",
    },
    {
      name: "Sass",
      imageUrl:
        "https://res.cloudinary.com/dcss55nem/image/upload/v1701032021/16_bonjj4.png",
    },

    {
      name: "Figma",
      imageUrl:
        "https://res.cloudinary.com/dcss55nem/image/upload/v1701032021/17_lvirvm.png",
    },
    {
      name: "Redux Tool Kit",
      imageUrl:
        "https://res.cloudinary.com/dcss55nem/image/upload/v1701032025/19_tvxcu4.png",
    },
    {
      name: "CSS",
      imageUrl:
        "https://res.cloudinary.com/dcss55nem/image/upload/v1701032024/18_krpore.png",
    },
    {
      name: "HTML",
      imageUrl:
        "https://res.cloudinary.com/dcss55nem/image/upload/v1701032025/20_dj1kp5.png",
    },
  ];
  const backEndData = [
    {
      name: "Express",
      imageUrl:
        "https://res.cloudinary.com/dcss55nem/image/upload/v1701033384/Copy_of_Space_and_Astronomy_Film_Video_Intro_13_wooz0a.png",
    },
    {
      name: "Node js",
      imageUrl:
        "https://res.cloudinary.com/dcss55nem/image/upload/v1701032028/22_p333bu.png",
    },
    {
      name: "MongoDB",
      imageUrl:
        "https://res.cloudinary.com/dcss55nem/image/upload/v1701032028/23_xbkhqi.png",
    },
    {
      name: "Mongoose",
      imageUrl:
        "https://res.cloudinary.com/dcss55nem/image/upload/v1701032028/23_xbkhqi.png",
    },
    {
      name: "Postman",
      imageUrl:
        "https://res.cloudinary.com/dcss55nem/image/upload/v1701032032/27_jorltd.png",
    },
  ];
  const bothData = [
    {
      name: "Auth0",
      imageUrl:
        "https://res.cloudinary.com/dcss55nem/image/upload/v1701032028/24_rox9ad.png",
    },
    {
      name: "JavaScript",
      imageUrl:
        "https://res.cloudinary.com/dcss55nem/image/upload/v1701032031/25_cfrb7c.png",
    },
    {
      name: "Cloudinary",
      imageUrl:
        "https://res.cloudinary.com/dcss55nem/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1700277363/samples/cloudinary-icon.png",
    },

    {
      name: "GitHub",
      imageUrl:
        "https://res.cloudinary.com/dcss55nem/image/upload/v1701048416/31_kpgvez.png",
    },
    {
      name: "Heroku",
      imageUrl:
        "https://res.cloudinary.com/dcss55nem/image/upload/v1701032032/28_zxknjp.png",
    },
  ];
  const frontEndDataTwo = [
    {
      name: "Nextjs",
      imageUrl:
        "https://res.cloudinary.com/dcss55nem/image/upload/v1701048415/29_wbkxgo.png",
    },
    {
      name: "React",
      imageUrl:
        "https://res.cloudinary.com/dcss55nem/image/upload/v1701032021/14_k0egpe.png",
    },
    {
      name: "Tailwind",
      imageUrl:
        "https://res.cloudinary.com/dcss55nem/image/upload/v1701032021/15_pzbsyb.png",
    },
    {
      name: "Sass",
      imageUrl:
        "https://res.cloudinary.com/dcss55nem/image/upload/v1701032021/16_bonjj4.png",
    },
    {
      name: "Git Hub",
      imageUrl:
        "https://res.cloudinary.com/dcss55nem/image/upload/v1701032032/26_iyfvkr.png",
    },
    {
      name: "HTML",
      imageUrl:
        "https://res.cloudinary.com/dcss55nem/image/upload/v1701032025/20_dj1kp5.png",
    },
    {
      name: "Cloudinary",
      imageUrl:
        "https://res.cloudinary.com/dcss55nem/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1700277363/samples/cloudinary-icon.png",
    },
  ];
  const toolData = [
    { title: "Front End", data: frontEndData, slides: 4 },
    { title: "Back End", data: backEndData, slides: 4 },
    { title: "Front End & Back End", data: bothData, slides: 4 },
  ];
  const toolDataTwo = [
    { title: "Front End", data: frontEndDataTwo, slides: 4 },
  ];
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

  const textEnter = () => setCursorVariant("text");
  const textLeave = () => setCursorVariant("default");
  const textLeaveWhiteBg = () => setCursorVariant("default2");
  const textEnterNone = () => setCursorVariant("none");
  const textLeaveNone = () => setCursorVariant("none");

  return (
    <Page>
      <Head>
        <title>
          {metadata.title}
        </title>
        <meta
          name="description"
          content={metadata.description}
          key="desc"
        />
      </Head>
      <section className="h-screen w-screen overflow-x-hidden">
        <HeaderSection
          // textEnter={textEnter}
          // textLeave={textLeave}
          videoUrl={
            "https://res.cloudinary.com/dcss55nem/video/upload/v1723761408/njth0ximkbqfobcqtzov.mp4"
          }
        />
        <ProjectSection
          title={"Casa Chirilagua"}
          videoUrl={
            "https://res.cloudinary.com/dcss55nem/video/upload/v1723783785/Untitled_design_4_stjdmq.mp4"
          }
          buttonLabel={"Learn More"}
          // textEnter={textEnter}
          // textLeave={textLeave}
          titleColor={"text-white sm:text-black"}
          titleFont={"font-bold"}
          buttonTextColor={"text-white"}
          buttonBorderColor={"border-white"}
          buttonBgColor={"hover:bg-white"}
          buttonHoverTextColor={"hover:text-black"}
          bgColor={"bg-black"}
          videoCover={"sm:object-cover"}
        />
        
        <ToolsSection
          toolData={toolData}
          bgColor={"bg-black"}
          textColor={"text-white"}
        ></ToolsSection>
        <Testimonial/>
        <ProjectSection
          title={"My Portfolio Website"}
          videoUrl={
            "https://res.cloudinary.com/dcss55nem/video/upload/v1702685763/Space_and_Astronomy_Film_Video_Intro_20_ibjn2t.mp4"
          }
          buttonLabel={"Learn More"}
          titleColor={"text-black"}
          titleFont={"font-extrabold"}
          buttonTextColor={"text-black md:text-black"}
          buttonBorderColor={"border-black md:border-black"}
          buttonBgColor={"hover:bg-black md:hover:bg-black"}
          buttonHoverTextColor={"hover:text-white md:hover:text-white"}
          videoCover={"sm:object-cover"}
        />
        <ProjectSection
          title={"Responsive Design"}
          titleColor={"text-black"}
          titleFont={"font-extrabold"}
          videoUrl={
            "https://res.cloudinary.com/dcss55nem/video/upload/v1724007631/Untitled_design_8_urcmj0.mp4"
          }
          buttonLabel={"Learn More"}
          buttonTextColor={"text-white"}
          buttonBorderColor={"border-white hover:border-black"}
          buttonBgColor={"hover:bg-black"}
          buttonHoverTextColor={"hover:text-white"}
          videoCover={"object-cover"}
        />
        <ToolsSection
          toolData={toolDataTwo}
          bgColor={"bg-white"}
          textColor={"text-black"}
        ></ToolsSection>
        <Contact
        //  textEnter={textEnter}
        // textLeave={textLeave}
        ></Contact>
        <motion.div
          className="cursor"
          variants={variants}
          animate={cursorVariant}
        />
      </section>
    </Page>
  );
}
