'use client'
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { motion } from "framer-motion";
import Link from "next/link";
import { CldImage } from 'next-cloudinary';


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


/**
 * Casa Chirilagua Project
 * 
 * @returns 
 */
function Project1() {
  const data = [
    {
      opacity: 0.4,
      imageUrl:
        "https://res.cloudinary.com/dcss55nem/image/upload/v1747625338/Screenshot_2025-05-18_at_8.23.36_PM_sqxg9w.png",
      title: "Sign In Page",
      paragraph:
        "The front end and back end are protected with Auth0, a third-party authentication service. Auth0 uses AES-256 to encrypt data at rest and is ISO27018 certified, complying with security and privacy guidelines for managing PII.",
    },
    {
      opacity: 0.4,
      imageUrl:
        "https://res.cloudinary.com/dcss55nem/image/upload/v1747625577/Screenshot_2025-05-18_at_8.23.59_PM_fvumyy.png",
      title: "Dashboard",
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
      opacity: 0.3,
      imageUrl:
        "https://res.cloudinary.com/dcss55nem/image/upload/v1747625347/Screenshot_2025-05-18_at_8.24.52_PM_qelt8k.png",
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
        "https://res.cloudinary.com/dcss55nem/image/upload/v1747625356/Screenshot_2025-05-18_at_8.25.06_PM_nlyckk.png",
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
        "https://res.cloudinary.com/dcss55nem/image/upload/v1747625364/Screenshot_2025-05-18_at_8.25.45_PM_l9wfbo.png",
      title: "Student Profile Part 2",
      paragraph:
        "Collapsible headers provide useful information about the student, program, parent, or other entities.",
    },
    {
      opacity: 0.4,
      imageUrl:
        "https://res.cloudinary.com/dcss55nem/image/upload/v1747625378/Screenshot_2025-05-18_at_8.27.30_PM_rdolf3.png",
      title: "Student Profile Part 3",
      paragraph:
        "Notes section allows users to add notes about the student.",
    },
    {
      opacity: 0.4,
      imageUrl:
        "https://res.cloudinary.com/dcss55nem/image/upload/v1747625386/Screenshot_2025-05-18_at_8.26.25_PM_lokv3k.png",
      title: "Student Profile Part 4",
      paragraph: "Created a custom reusable modal",
    },
    {
      opacity: 0.5,
      imageUrl:
        "https://res.cloudinary.com/dcss55nem/image/upload/v1747624565/registration-part-1_lhvrsu.png",
      title: "Student Registration Part 1",
      paragraph: "",
    },
    {
      opacity: 0.5,
      imageUrl:
        "https://res.cloudinary.com/dcss55nem/image/upload/v1747624579/Screenshot_2025-05-01_at_9.42.37_AM_rljoqx_rnm0dj.png",
      title: "Student Registration Part 2",
      paragraph: "",
    },
    {
      opacity: 0.5,
      imageUrl:
        "https://res.cloudinary.com/dcss55nem/image/upload/v1747624565/registration-part-1_lhvrsu.png",
      title: "Student Registration Part 3",
      paragraph: "",
    },
  ];

  return (
    <section className={`h-screen w-screen overflow-x-hidden bg-black`}>

      {/* Title */}
      <motion.div {...{className:"relative h-screen w-screen"}}>
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <motion.div
          initial="initial"
          whileInView="animate"
          variants={variants}
          {...{className:"absolute inset-0 flex items-center p-40 justify-center h-full w-full"}}
        >
          <h6 className=" text-4xl md:text-8xl text-white font-bold text-center text-trans">
            Casa Chirilagua
          </h6>
        </motion.div>
      </motion.div>

      {/* Description */}
      <motion.div
        initial="initial"
        whileInView="animate"
        variants={variants}
        {...{ className: "w-screen bg-white h-[60vh]" }}
      >
        <motion.div {...{ className: "h-full mx-[6%]" }}>
          <motion.div {...{className:"h-1/6 w-full flex items-top justify-center pt-10"}}>
            <h1 className="text-3xl text-black font-bold"> What did I do?</h1>
          </motion.div>
          <motion.div {...{className:"h-full w-full bg-white" }}>
            <h1 className="font-light p-6 text-primary-800 text-start leading-loose tracking-wider md:text-xl md:p-16">
              Developed an internal website using MongoDB, Express.js, Node.js,
              and React to help manage programs for Casa Chirilagua, a
              non-profit organization based in the City of Alexandria, Virginia.
            </h1>
            <div className=" grid gap-5 md:gap-1 md:grid-cols-5 w-full pt-6">
              <div className="w-full flex flex-col pl-6 md:pl-16 col-span-1">
                <h1 className="text-primary-1000 text-start leading-loose tracking-wider text-xl  font-bold pb-6">
                  Role
                </h1>
                <p className="font-light text-md text-primary-800">Full Stack Engineer</p>
              </div>
              <motion.div {...{className:"w-full flex flex-col pl-6 md:pl-16 col-span-2"}}>
                {" "}
                <h1 className="text-black text-start leading-loose tracking-wider text-xl font-bold pb-6 ">
                  Responsibility
                </h1>
                <p className="text-sm md:text-md font-light text-md text-primary-800 leading-loose tracking-wider">
                  Consultation, Front End Architecture, Back End Development,
                  Create and Manage Database, Create RESTful APIs, Security,
                  UI/UX Design, Figma Prototyping, Deployment, Present Demos,
                  Employee Training.
                </p>
              </motion.div>
              <motion.div {...{className:"w-full flex flex-col pl-6 md:pl-16 col-span-2"}}>
                {" "}
                <h1 className="text-black text-start leading-loose tracking-wider text-xl font-bold pb-6">
                  Learn more about Casa Chirilagua
                </h1>
                <Link
                  href="https://casachirilagua.org/"
                  className="text-sm md:text-m leading-loose tracking-wider text-blue-500"
                  aria-label="Casa Chirilagua Website"
                >
                  https://casachirilagua.org/
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      <div className=" bg-white w-screen relative min-h-screen h-auto ${bgColor} w-screen overflow-auto">
        {data.map((item, index) => {
          return (
            <div className="flex flex-col p-10 mx-[6%]" key={index}>
              <motion.div {...{className:"h-1/6 w-full flex items-top justify-center pt-10 pb-10 text-primary-1000"}}>
                <h1 className="text-2xl text-black font-bold">{item.title}</h1>
              </motion.div>
              <div className="pb-6 leading-loose tracking-wider font-light text-md text-primary-800">
                {item.paragraph}
              </div>
              <div
                style={{ boxShadow: "rgba(0, 0, 0, 0.35) 0px 5px 15px" }}
                className="p-10 relative w-full h-[87vh] rounded-[12px] overflow-hidden shadow-md hover:shadow-xl"
              >
                <CldImage
                  alt={item.title}
                  src={item.imageUrl}
                  fill
                  style={{ objectFit: "cover" }}
                  className="rounded-[12px]"
                />
              </div>
            </div>
          );
        })}
      </div>
      <div className="h-screen w-screen bg-black flex items-center justify-center">
        <h1 className="text-6xl text-white">Demo Coming Soon...</h1>
      </div>
    </section>
  );
}

export default Project1;
