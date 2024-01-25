import React from "react";
import Link from "next/link";
import Page from "@/components/page";
function Project() {
  return (
    <Page>
      <section className="h-screen w-screen bg-black overflow-auto">
        <div className="flex items-center justify-center h-full w-full pt-20">
          <div className="container max-w-6xl mx-auto my-32 px-6 text-gray-900 md:px-0">
            {/* My Projects Header */}
            <div className="flex justify-center mb-20 md:justify-between">
              <h2 className="text-4xl text-center uppercase md-tex-left text-white">
                My Projects
              </h2>
            </div>

            {/* Items Container */}
            <div className="flex flex-col w-full space-y-6 text-2xl text-white uppercase md:flex-row md:space-y-0 md:space-x-8 ">
              <div className="group relative overflow-hidden md:w-full">
                <Link href="/project1">
                  <img
                    src="https://res.cloudinary.com/dcss55nem/image/upload/v1701526592/Space_and_Astronomy_Film_Video_Intro_4_iuwnwv.png"
                    className="w-full duration-200 md-block group-hover:scale-110"
                  ></img>
                  {/* Gradient */}
                  <div className="absolute top-0 bottom-0 right-0 left-0 bg-gradient-to-b from-transparent to-gray-900 group-hover:from-gray-50 group-hover:to-white group-hover:opacity-70"></div>
                  <h5 className="absolute px-6 duration-200 w-52 bottom-4 md-bottom-8 md:px-10 group-hover:scale-110 group-hover:text-black">
                    Casa Chirilagua
                  </h5>
                </Link>
              </div>
              <div className="group relative overflow-hidden md:w-full">
                <Link href="/project2">
                  <img
                    src="https://res.cloudinary.com/dcss55nem/image/upload/v1701525646/Space_and_Astronomy_Film_Video_Intro_3_jij1s1.png"
                    className="w-full duration-200 md-block group-hover:scale-110"
                  ></img>
                  {/* Gradient */}
                  <div className="absolute top-0 bottom-0 right-0 left-0 bg-gradient-to-b from-transparent to-gray-900 group-hover:from-gray-50 group-hover:to-white group-hover:opacity-70"></div>
                  <h5 className="absolute px-6 duration-200 w-52 bottom-4 md-bottom-8 md:px-10 group-hover:scale-110 group-hover:text-black">
                    Portfolio Website
                  </h5>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Page>
  );
}

export default Project;
