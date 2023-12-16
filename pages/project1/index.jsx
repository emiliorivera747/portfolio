import React from "react";
import Image from "next/image";

function Project1() {
  const backgroundImageUrl =
    "url(https://res.cloudinary.com/dcss55nem/image/upload/v1702750751/casa-logo_izyfkc.svg)";

  return (
    <section
      className={`relative min-h-screen h-auto bg-black w-screen overflow-auto`}
    >
      {/* Title */}
      <div className="h-screen w-screen">
        <div className="flex items-center justify-center h-full">
          <Image
            src={
              "https://res.cloudinary.com/dcss55nem/image/upload/v1702750751/casa-logo_izyfkc.svg"
            }
            width={500}
            height={500}
          />
        </div>
      </div>

      {/* Description */}
      <div className="h-screen w-screen bg-black">
        {/* <h1 className="text-black text-4xl font-bold text-center p-6">
          Description
        </h1> */}
        <h1 className="text-white text-6xl font-bold text-center p-6">
          Comming Soon...
        </h1>
      </div>
{/* 
      <div className="h-screen w-screen">
        <h1 className="text-white text-4xl font-bold text-center p-6">
          Final Product
        </h1>
      </div> */}

      {/*  */}
    </section>
  );
}

export default Project1;
