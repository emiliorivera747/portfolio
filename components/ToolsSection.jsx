import React from "react";
import "swiper/css";
import Slider from "./Slider";
function ToolsSection({ toolData, bgColor, textColor }) {
  return (
    <section
      className={`relative min-h-screen h-auto ${bgColor} w-screen overflow-auto`}
    >
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col items-center ">
          <h1 className={`font-bold text-4xl ${textColor} pt-6 pb-2`}>
            Tools Used
          </h1>
        </div>
      </div>
      {toolData?.map((item, index) => {
        return (
          <>
            <div className="flex flex-col w-full items-center justify-center">
            <h1 className={`text-2xl ${textColor} pt-6 pb-2 justify-center `}>
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
