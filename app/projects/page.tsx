import React from "react";
import Link from "next/link";
import Image from "next/image";

export const metadata = {
  title: "Projects | Emilio Rivera's Portfolio",
  description:
    "Learn more about projects created by Emilio Rivera to showcase his skills in React.js, Next.js, and Node.js.",
};

/**
 *
 * Shows list of all projects
 *
 * @returns project list
 */
function Project() {
  return (
    <section className="h-screen h-min-screen w-screen bg-black overflow-auto">
      <div className="h-full w-full pt-20 px-[8%]">
        <div className="w-full my-32 text-gray-900 md:px-0">
          {/* My Projects Header */}
          <div className="flex justify-center mb-20 md:justify-between">
            <h2 className="text-4xl text-center  md-tex-left text-white">
              Projects
            </h2>
          </div>

          {/* Items Container */}
          <div className="grid grid-cols-[1fr] sm:grid-cols-[1fr_1fr] grid-rows-[22rem_22rem] gap-8 text-2xl text-primary-100  h-full w-full ">
            <div
              className="group relative overflow-hidden w-full rounded-[12px] h-full"
              style={{ position: "relative" }}
            >
              <Link href="/casa-chirilagua">
                <Image
                  alt="Casa Chirilagua Image"
                  fill
                  className="w-full duration-200 md-block group-hover:scale-110"
                  src={
                    "https://res.cloudinary.com/dcss55nem/image/upload/v1701526592/Space_and_Astronomy_Film_Video_Intro_4_iuwnwv.png"
                  }
                />

                {/* Gradient */}
                <div className="absolute top-0 bottom-0 right-0 left-0 bg-gradient-to-b from-transparent to-gray-900 group-hover:from-primary-500 group-hover:to-white group-hover:opacity-70"></div>
                <h5 className="absolute px-6 duration-200 w-52 bottom-4 md-bottom-8 md:px-10 group-hover:scale-110 group-hover:text-black">
                  Casa Chirilagua
                </h5>
              </Link>
            </div>

            <div
              className="group relative overflow-hidden w-full rounded-[12px] h-full "
              style={{ position: "relative" }}
            >
              <Link
                href="/my-portfolio"
                aria-label="Link to Portfolio Project Section"
              >
                <Image
                  alt="Portfolio Image"
                  fill
                  className="w-full duration-200 md-block group-hover:scale-110"
                  src={
                    "https://res.cloudinary.com/dcss55nem/image/upload/v1753932226/Screenshot_2025-07-30_at_8.22.13_PM_eu24ir.png"
                  }
                />

                {/* Gradient */}
                <div className="absolute top-0 bottom-0 right-0 left-0 bg-gradient-to-b from-transparent to-gray-900 group-hover:from-primary-400 group-hover:to-primary-100 group-hover:opacity-70"></div>
                <h5 className="absolute px-6 duration-200 w-52 bottom-4 md-bottom-8 md:px-10 group-hover:scale-110 group-hover:text-black">
                  Portfolio Website
                </h5>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Project;
