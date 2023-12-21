import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { motion, useScroll, useTransform } from "framer-motion";

import { Pagination, Navigation, HashNavigation } from "swiper/modules";

//components
import ProjectSlider from "@/components/ProjectSlider";
const variants = {
  initial: {
    y: 500,
    opacity: 0,
  },
  animate: {
    y: 0,
    opacity: 1,
    transition: {
      duration: 0.5,
      staggerChildren: 0.1,
    },
  },
};

function Project1() {
  const data = [
    {
      imageUrl:
        "https://res.cloudinary.com/dcss55nem/image/upload/v1703106052/Screenshot_42_derzh2.png",
      title: "Welcome Page",
      paragraph: "",
    },
    {
      imageUrl:
        "https://res.cloudinary.com/dcss55nem/image/upload/v1703106082/Screenshot_43_qxtb1f.png",
      title: "Login",
      paragraph: "",
    },
    {
      imageUrl:
        "https://res.cloudinary.com/dcss55nem/image/upload/v1703106149/Screenshot_44_eckb71.png",
      title: "Dashboard pt.1",
      paragraph: "",
    },
    {
      imageUrl:
        "https://res.cloudinary.com/dcss55nem/image/upload/v1703106150/Screenshot_45_a8cnad.png",
      title: "Dashboard pt.2",
      paragraph: "",
    },
    {
      imageUrl:
        "https://res.cloudinary.com/dcss55nem/image/upload/v1703106152/Screenshot_46_mwhpdj.png",
      title: "Student Page",
      paragraph: "",
    },
    {
      imageUrl:
        "https://res.cloudinary.com/dcss55nem/image/upload/v1703106153/Screenshot_47_tdnhsh.png",
      title: "Student Profile pt.1",
      paragraph: "",
    },
    {
      imageUrl:
        "https://res.cloudinary.com/dcss55nem/image/upload/v1703106160/Screenshot_49_cy3fcs.png",
      title: "Student Profile pt.2",
      paragraph: "",
    },
    {
      imageUrl:
        "https://res.cloudinary.com/dcss55nem/image/upload/v1703106161/Screenshot_50_loutw3.png",
      title: "Student Registration pt.1",
      paragraph: "",
    },
    {
      imageUrl:
        "https://res.cloudinary.com/dcss55nem/image/upload/v1703106162/Screenshot_51_irucos.png",
      title: "Student Registration pt.2",
      paragraph: "",
    },
    {
      imageUrl:
        "https://res.cloudinary.com/dcss55nem/image/upload/v1703106162/Screenshot_52_cr7otq.png",
      title: "Student Registration pt.3",
      paragraph: "",
    },
    {
      imageUrl:
        "https://res.cloudinary.com/dcss55nem/image/upload/v1703106166/Screenshot_54_db2ybx.png",
      title: "Student Registration pt.4",
      paragraph: "",
    },
  ];
  const backgroundImageUrl =
    "https://res.cloudinary.com/dcss55nem/image/upload/v1702849160/Copy_of_Space_and_Astronomy_Film_Video_Intro_18_wvt2b6.png";

  return (
    <section
      className={`relative min-h-screen h-auto bg-black min-w-screen w-auto`}
    >
      {/* Title */}
      <motion.div
        className="relative h-screen w-screen"
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <motion.div
          initial="initial"
          whileInView="animate"
          variants={variants}
          className="absolute inset-0 flex items-center p-40 justify-center h-full w-full"
        >
          <Image
            src="https://res.cloudinary.com/dcss55nem/image/upload/v1702750751/casa-logo_izyfkc.svg"
            layout="responsive"
            width={1000} // Adjust the percentage as needed
            height={1000} // Adjust the percentage as needed
            className="max-w-full max-h-full"
          />
        </motion.div>
      </motion.div>

      {/* Description */}
      <div className="w-screen bg-black h-auto min-h-screen">
        <motion.div
          initial="initial"
          whileInView="animate"
          variants={variants}
          className="bg-black h-full"
        >
          <motion.div className="h-1/6 w-full flex items-top justify-center pt-10">
            <h1 className="text-4xl text-white font-bold">
              {" "}
              What did I do?
            </h1>
          </motion.div>
          <motion.div className="h-full w-full bg-black">
            {" "}
            <h1 className="text-white text-start leading-loose tracking-wider text-xl p-16">
              Developed an internal website using MongoDb, Express.js, Node.js, and React
              to help manage programs for Casa Chirilagua, a non-profit
              organization based in the City of Alexandria, Virginia.
            </h1>
            <div className="flex flex-row w-full pt-6">
              <div className="w-full flex flex-col pl-16">
                <h1 className="text-white text-start leading-loose tracking-wider text-xl  font-bold pb-6">
                  Role
                </h1>
                <p className="text-md text-white">Full Stack Engineer</p>
              </div>
              <div className="w-full flex flex-col  pl-16 pr-16">
                {" "}
                <h1 className="text-white text-start leading-loose tracking-wider text-xl font-bold pb-6">
                  Responsibility
                </h1>
                <p className="text-md text-white leading-loose tracking-wider">
                  Consultation, Front End Architecture, Back End Development,
                  Create and Manage Databases, Create RESTful APIs, Security,
                  UI/UX Design, Figma Prototyping, Deployment, Present Demos,
                  Employee Training.
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      <div className="h-screen w-screen bg-white">
        <ProjectSlider data={data} />
      </div>
      <div className="h-screen w-screen bg-black">
        <h1 className="text-6xl text-white">Comming Soon...</h1>
      </div>
    </section>
  );
}

export default Project1;
