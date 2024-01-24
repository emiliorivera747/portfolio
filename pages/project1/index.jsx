import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
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
      opacity: 0.5,
      imageUrl:
        "https://res.cloudinary.com/dcss55nem/image/upload/v1703106052/Screenshot_42_derzh2.png",
      title: "Welcome Page",
      paragraph:
        "Included an image of program participants with a purple background, consistent with the organization's official colors of purple, green, and orange.",
    },
    {
      opacity: 0.4,
      imageUrl:
        "https://res.cloudinary.com/dcss55nem/image/upload/v1703106082/Screenshot_43_qxtb1f.png",
      title: "Login",
      paragraph:
        "The front end and back end are protected with Auth0, a third-party authentication service. Auth0 uses AES-256 to encrypt data at rest and is ISO27018 certified, complying with security and privacy guidelines for managing PII.",
    },
    {
      opacity: 0.4,
      imageUrl:
        "https://res.cloudinary.com/dcss55nem/image/upload/v1703106149/Screenshot_44_eckb71.png",
      title: "Dashboard Part 1",
      paragraph: (
        <ul>
          Created custom dashboard components using the recharts library.
          <li>
            <span className="font-bold">Pie chart</span>: Categorizes the
            programs by the number of students.
          </li>
          <li>
            <span className="font-bold">Reusable card component</span>: Used to
            display useful metrics such as percentages or numbers.
          </li>
        </ul>
      ),
    },
    {
      opacity: 0.5,
      imageUrl:
        "https://res.cloudinary.com/dcss55nem/image/upload/v1703106150/Screenshot_45_a8cnad.png",
      title: "Dashboard Part 2",
      paragraph:
        "Line graph created using recharts, displaying the number of students enrolled over time, along with additional reusable card components.",
    },
    {
      opacity: 0.3,
      imageUrl:
        "https://res.cloudinary.com/dcss55nem/image/upload/v1703106152/Screenshot_46_mwhpdj.png",
      title: "Student Page",
      paragraph: (
        <ul>
          Students, parents, programs, and families have a similar user
          interface, utilizing:
          <li className="">
            <span className="font-bold">Custom reusable table component</span>:
            Displays useful information such as names and other relevant fields.
          </li>
          <li>
            <span className="font-bold">Custom reusable Search bar</span>: Helps
            in finding specific users.
          </li>
          <li>
            <span className="font-bold">
              Custom reusable Side navigation bar
            </span>
            : Facilitates easy navigation within the pages.
          </li>
        </ul>
      ),
    },
    {
      opacity: 0.3,
      imageUrl:
        "https://res.cloudinary.com/dcss55nem/image/upload/v1703106153/Screenshot_47_tdnhsh.png",
      title: "Student Profile Part 1",
      paragraph: (
        <ul>
          Students, parents, programs, and families have a similar user
          interface, utilizing:
          <li>
            <span className="font-extrabold">
              Custom reusable profile component
            </span>
            : Displays relevant relationships, such as programs, parents, or
            children for the parent profile. Provides the flexibility of adding
            a parent to a specific student or adding a student to a particular
            program.
          </li>{" "}
        </ul>
      ),
    },
    {
      opacity: 0.4,
      imageUrl:
        "https://res.cloudinary.com/dcss55nem/image/upload/v1703262379/Screenshot_48_rvdabm.png",
      title: "Student Profile Part 2",
      paragraph:
        "Collapsible headers provide useful information about the student, program, parent, or other entities.",
    },
    {
      opacity: 0.4,
      imageUrl:
        "https://res.cloudinary.com/dcss55nem/image/upload/v1703262475/Screenshot_57_ll3bll.png",
      title: "Student Profile Part 3",
      paragraph:
        "Created a reusable modal component used throughout the web application.",
    },
    {
      opacity: 0.4,
      imageUrl:
        "https://res.cloudinary.com/dcss55nem/image/upload/v1703106160/Screenshot_49_cy3fcs.png",
      title: "Student Profile Part 4",
      paragraph: "Includes a reusable Delete component.",
    },
    {
      opacity: 0.5,
      imageUrl:
        "https://res.cloudinary.com/dcss55nem/image/upload/v1703106161/Screenshot_50_loutw3.png",
      title: "Student Registration Part 1",
      paragraph: "",
    },
    {
      opacity: 0.5,
      imageUrl:
        "https://res.cloudinary.com/dcss55nem/image/upload/v1703106162/Screenshot_51_irucos.png",
      title: "Student Registration Part 2",
      paragraph: "",
    },
    {
      opacity: 0.5,
      imageUrl:
        "https://res.cloudinary.com/dcss55nem/image/upload/v1703106162/Screenshot_52_cr7otq.png",
      title: "Student Registration Part 3",
      paragraph: "",
    },
    {
      opacity: 0.5,
      imageUrl:
        "https://res.cloudinary.com/dcss55nem/image/upload/v1703106166/Screenshot_54_db2ybx.png",
      title: "Student Registration Part 4",
      paragraph: "",
    },
  ];
  const backgroundImageUrl =
    "https://res.cloudinary.com/dcss55nem/image/upload/v1702849160/Copy_of_Space_and_Astronomy_Film_Video_Intro_18_wvt2b6.png";

  return (
    <section className={`h-screen w-screen overflow-x-hidden bg-black`}>
      {/* Title */}
      <motion.div className="relative h-screen w-screen">
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <motion.div
          initial="initial"
          whileInView="animate"
          variants={variants}
          className="absolute inset-0 flex items-center p-40 justify-center h-full w-full"
        >
          <h6 className=" text-4xl md:text-8xl text-white font-bold text-center text-trans">
            Casa Chirilagua
          </h6>
        </motion.div>
      </motion.div>

      {/* Description */}
      <div
        initial="initial"
        whileInView="animate"
        variants={variants}
        className="w-screen bg-white h-auto min-h-screen"
      >
        <motion.div className=" h-full">
          <motion.div className="h-1/6 w-full flex items-top justify-center pt-10">
            <h1 className="text-3xl text-black font-bold"> What did I do?</h1>
          </motion.div>
          <motion.div className="h-full w-full bg-white">
            {" "}
            <h1 className="p-6 text-black text-start leading-loose tracking-wider md:text-xl md:p-16">
              Developed an internal website using MongoDB, Express.js, Node.js,
              and React to help manage programs for Casa Chirilagua, a
              non-profit organization based in the City of Alexandria, Virginia.
            </h1>
            <div className=" grid gap-5 md:gap-1 md:grid-cols-5 w-full pt-6">
              <div className="w-full flex flex-col pl-6 md:pl-16 col-span-1">
                <h1 className="text-black text-start leading-loose tracking-wider text-xl  font-bold pb-6">
                  Role
                </h1>
                <p className="text-md text-black">Full Stack Engineer</p>
              </div>
              <motion.div className="w-full flex flex-col pl-6 md:pl-16 col-span-2">
                {" "}
                <h1 className="text-black text-start leading-loose tracking-wider text-xl font-bold pb-6 ">
                  Responsibility
                </h1>
                <p className="text-sm md:text-md text-black leading-loose tracking-wider">
                  Consultation, Front End Architecture, Back End Development,
                  Create and Manage Database, Create RESTful APIs, Security,
                  UI/UX Design, Figma Prototyping, Deployment, Present Demos,
                  Employee Training.
                </p>
              </motion.div>
              <motion.div className="w-full flex flex-col pl-6 md:pl-16 col-span-2">
                {" "}
                <h1 className="text-black text-start leading-loose tracking-wider text-xl font-bold pb-6">
                  Learn more about Casa Chirilagua
                </h1>
                <Link
                  href="https://casachirilagua.org/"
                  className="text-sm md:text-m leading-loose tracking-wider text-blue-500"
                >
                  https://casachirilagua.org/
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Welcome Page */}
      <div className=" bg-white w-screen relative min-h-screen h-auto ${bgColor w-screen overflow-auto">
        {data.map((item, index) => {
          return (
            <div className=" flex flex-col p-10 md:p-20" key={index}>
              <motion.div className="h-1/6 w-full flex items-top justify-center pt-10 pb-10 ">
                <h1 className="text-2xl text-black font-bold ">{item.title}</h1>
              </motion.div>
              <p className="pb-6 leading-loose tracking-wider">{item.paragraph}</p>
              <div className="w-full">
                <img
                  alt={item.name}
                  src={item.imageUrl}
                  loading="lazy"
                ></img>
              </div>
            </div>
          );
        })}
      </div>
      {/* <div className="h-screen w-screen bg-white">
        <ProjectSlider data={data} />
      </div> */}
      <div className="h-screen w-screen bg-black flex items-center justify-center">
        <h1 className="text-6xl text-white">Demo Comming Soon...</h1>
      </div>
    </section>
  );
}

export default Project1;
