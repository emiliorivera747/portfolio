import React from "react";
import Image from "next/image";

function About() {
  return (
    <section className="h-screen w-screen bg-black overflow-auto gap-10 ">
      <div className="p-10 gap-6 flex flex-col items-top justify-center pt-20 md:pt-40">
        <h6 className="text-4xl md:text-7xl text-white font-bold text-center">
          About Me
        </h6>
        <div className="flex flex-col md:flex-row md:gap-8">
          <div className="flex flex-col md:w-1/2 h-screen items-center justify-center">
            <h1 className="text-white font-bold text-2xl md:text-4xl pb-3 md:pb-6">
              My Journey
            </h1>
            <p className="text-white text-start">
              {`My journey into Software Engineering began in high school during my first Computer Science course, where I discovered the potential of software development to create almost anything imaginable. After building my very first full stack web application in my Cloud Software Development course at Virginia Tech, it solidified my aspiration to become a full-stack developer. Since then, my curiosity has led me to explore additional frameworks/libraries like React.js and Next.js, and I continue to learn and embrace the latest technology.`}
            </p>
            <br></br>
            <p className="text-white text-start">
              {`I earned my bachelor's degree in Computer Science from Virginia Tech, graduating in December 2022. Since then, I've freelanced to refine my skills in both front-end and back-end systems.`}
            </p>
          </div>
          <div className="flex items-center md:w-1/2">
            <div className="text-white">
              <Image
                src="https://res.cloudinary.com/dcss55nem/image/upload/v1701486445/20221216_115051_ezqxrn.jpg"
                height={600}
                width={600}
                alt="Old Town Toastmasters"
              />
              <h2 className="md:text-sm pt-2 font-semibold  text-center">
                Virginia Tech Graduation Cermony December 2022
              </h2>
            </div>
          </div>
        </div>

        <div className="flex flex-col md:flex-row h-screen items-center justify-center gap-0 md:gap-10 ">
          <div className="text-white">
            <Image
              src="https://res.cloudinary.com/dcss55nem/image/upload/v1701747663/IMG_2215_kypj32.jpg"
              height={500}
              width={500}
              alt="Old Town Alexandria Toastmasters"
            />
            <h2 className="md:text-sm pt-2 font-semibold text-center">
              Intramural Soccer at Virginia Tech
            </h2>
          </div>
          <div className="flex flex-col md:w-1/2 h-screen items-center justify-center">
            <h1 className="text-white font-bold text-2xl md:text-4xl pb-3 md:pb-6">
              Hobbies
            </h1>
            <p className="text-white text-start">
              {`In my free time, I enjoy playing soccer, practicing public speaking, and volunteering in my community.`}
            </p>
            <h1></h1>
          </div>
        </div>
        <div className="flex flex-col md:flex-col h-1/4 text-center items-center justify-center gap-0  ">
          <h2 className="text-white text-4xl p-10">
            {`"Everyone has a story but there is no one better than for you to tell it. Don't let the fear of public speaking get in the way."`}
          </h2>
 
        </div>
        <div className="flex flex-col md:flex-row h-screen items-center justify-center gap-0 md:gap-10 ">

          <div className="flex flex-col md:w-1/2 h-screen items-center justify-center">
            <h1 className="text-white font-bold text-2xl md:text-4xl pb-3 md:pb-6">
              Public Speaking
            </h1>
            <p className="text-white text-start">
              {`
I am a member of the City of Alexandria Toastmasters, Crystal City Evening Toastmasters, and Old Town Alexandria Toastmaster. I'm currently enrolled in the visionary communication pathways program to enhance my skills as a strategic communicator and leader by writing and delivering speeches. My goal is to one day use my public speaking skills to lead and express my ideas effectively. I’m dedicated to helping others achieve their public speaking goals because I know how hard it was for me to get started.
`}
            </p>
            <h1></h1>
          </div>
          <div className="text-white">
            <Image
              src="https://res.cloudinary.com/dcss55nem/image/upload/w_1000,ar_16:9,c_fill,g_auto,e_sharpen/v1701476514/old_town_toastmasters_tjjtwn.jpg"
              height={500}
              width={500}
              alt="Old Town Alexandria Toastmasters"
            />
            <h2 className="md:text-sm pt-2 font-semibold text-center">
              Old Town Toastmasters Club
            </h2>
          </div>
        </div>
      </div>
    </section>
  );
}

export default About;
