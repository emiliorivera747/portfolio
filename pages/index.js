import { useEffect, useState } from "react";
import HeaderSection from "@/components/HeaderSection";
import ProjectSection from "@/components/ProjectSection";
import ToolsSection from "@/components/ToolsSection";
import { motion } from "framer-motion";

import MainPageSectionHeader from "@/components/MainPageSectionHeader";
import Contact from "@/components/Contact";

export default function Home() {
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
        "https://res.cloudinary.com/dcss55nem/image/upload/v1701032021/16_bonjj4.png",
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
  const variants = {
    default: {
      height: 20,
      width: 20,
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      backgroundColor: "white",
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
      <ProjectSection
        title={"Casa Chirilagua"}
        videoUrl={
          "https://res.cloudinary.com/dcss55nem/video/upload/v1700334609/Space_and_Astronomy_Film_Video_Intro_2_flwyd5.mp4"
        }
        buttonLabel={"Learn About Project"}
        textEnter={textEnter}
        textLeave={textLeave}
        titleColor={"text-black"}
        titleFont={"font-bold"}
        buttonTextColor={"text-white"}
        buttonBorderColor={"border-white"}
        buttonBgColor={"hover:bg-white"}
        buttonHoverTextColor={"hover:text-black"}

      />
      <ToolsSection
        toolData={toolData}
        bgColor={"bg-black"}
        textColor={"text-white"}
      ></ToolsSection>
      <ProjectSection
        title={"My Portfolio Website"}
        videoUrl={
          "https://res.cloudinary.com/dcss55nem/video/upload/v1701549492/Space_and_Astronomy_Film_Video_Intro_14_fwhk3u.mp4"
        }
        buttonLabel={"Learn About Project"}
        titleColor={"text-white"}
        titleFont={"font-extrabold"}
        buttonTextColor={"text-white"}
        buttonBorderColor={"border-white"}
        buttonBgColor={"hover:bg-white"}
        buttonHoverTextColor={"hover:text-black"}

      />
      <ProjectSection
        title={""}
        titleColor={"text-zinc-500"}
        titleFont={"font-extrabold"}
        videoUrl={
          "https://res.cloudinary.com/dcss55nem/video/upload/v1701557230/Space_and_Astronomy_Film_Video_Intro_16_fjtbwv.mp4"
        }
        buttonLabel={"Learn About Project"}
        buttonTextColor={"text-gray-500"}
        buttonBorderColor={"border-gray-500"}
        buttonBgColor={"hover:bg-gray-500"}
        buttonHoverTextColor={"hover:text-white"}
      />
      <ToolsSection
        toolData={toolDataTwo}
        bgColor={"bg-white"}
        textColor={"text-black"}
      ></ToolsSection>
      <Contact textEnter={textEnter} textLeave={textLeaveWhiteBg}></Contact>
      <motion.div
        className="cursor"
        variants={variants}
        animate={cursorVariant}
      />
    </div>
  );
}
