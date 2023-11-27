import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import Image from "next/image";
import Slider from "./Slider";
import { motion } from "framer-motion";

function ToolsSection({ toolData }) {


  return (
    <section className="min-h-screen h-auto bg-black w-screen overflow-auto">
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col items-center ">
          <h1 className=" font-bold text-4xl text-white pt-6 pb-2">
            Tools Used
          </h1>
        </div>
        {/* <p className="text-gray-300 text-[20px]">Using the latest Technology</p> */}
      </div>
      {toolData?.map((item, index) => {
        return (
          <>
            <div className="flex flex-col w-full items-center justify-center">
              <h1 className="text-2xl text-zinc-400 pt-6 pb-2 justify-center ">
                {item.title}
              </h1>
            </div>
            <Slider
              data={item.data}
              reverseDirection={index == 1 ? true : false}
              slides={item.slides}
            />
          </>
        );
      })}
    </section>
  );
}

export default ToolsSection;
