import React from "react";
import Image from "next/image";

function Project1() {
  const backgroundImageUrl =
    "https://res.cloudinary.com/dcss55nem/image/upload/v1702876299/Copy_of_Space_and_Astronomy_Film_Video_Intro_19_xfa2jp.png";

  return (
    <section
      className={`relative min-h-screen h-auto bg-black w-screen overflow-auto`}
    >
      {/* Title */}
      <div
        className="relative h-screen w-screen"
        style={{
          backgroundImage: `url(${backgroundImageUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="absolute inset-0 bg-black opacity-40"></div>
        <div className="absolute inset-0 flex items-center p-40 justify-center h-full w-full">
          <Image
            src="https://res.cloudinary.com/dcss55nem/image/upload/v1702750751/casa-logo_izyfkc.svg"
            layout="responsive"
            width={1000} // Adjust the percentage as needed
            height={1000} // Adjust the percentage as needed
            className="max-w-full max-h-full"
          />
        </div>
      </div>

      {/* Description */}
      <div className="h-screen w-screen bg-white overflow-auto">
        <div className="h-1/6 w-full flex items-top justify-center pt-10">
          <h1 className="text-4xl text-black font-semibold"> What did I do?</h1>
        </div>
        <div className="h-full w-full">
          {" "}
          <h1 className="text-gray-500 text-start leading-loose tracking-wider text-2xl p-16">
            Developed an internal website using Express.js, Node.js, and React
            to help manage programs for Casa Chirilagua, a non-profit
            organization based in the City of Alexandria, Virginia.
          </h1>
          <div className="flex flex-row w-full pt-6">
            <div className="w-full flex flex-col pl-16">
              <h1 className="text-black text-start leading-loose tracking-wider text-xl  font-bold pb-6">
                Role
              </h1>
              <p className="text-md text-gray-500">Full Stack Engineer</p>
            </div>
            <div className="w-full flex flex-col  pl-16 pr-16">
              {" "}
              <h1 className="text-black text-start leading-loose tracking-wider text-xl font-bold pb-6">
                Responsibility
              </h1>
              <p className="text-md text-gray-500 leading-loose tracking-wider">
                Consultation, Front End Architecture, Back End Development,
                Create and Manage Databases, Create RESTful APIs, Security,
                UI/UX Design, Figma Prototyping, Deployment, Present Demos,
                Employee Training.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="h-screen w-screen bg-white">
        {" "}
        <div className="w-full flex items-top justify-center pt-10">
          <h1 className="text-6xl">Comming Soon...</h1>
        </div>
      </div>
    </section>
  );
}

export default Project1;
