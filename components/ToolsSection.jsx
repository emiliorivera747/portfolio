import { useState } from "react";
import Image from "next/image";

//Components
import Tools from "@/components/tools-section/Tools";

function ToolsSection({
  bgColor,
  frontEndData,
  backEndData,
  bothData,
  checkWhatDataToShow,
}) {
  // State to track which button (if any) is currently active
  const [activeButton, setActiveButton] = useState("Front End");

  const handleClick = (buttonName) => {
    setActiveButton(buttonName);
  };

  return (
    <section className={`h-[70vh] w-screen ${bgColor}`}>
      <div className="h-20 flex items-center justify-center pb-10">
        <h1 className={`font-bold text-3xl text-zinc-700 pt-6 pb-2`}>
          Tools Used
        </h1>
      </div>

      <div className=" w-full flex-col flex  justify-center items-start ">
        {/* Buttons */}
        <div className=" h-20  flex flex-row items-center justify-center gap-1 px-10 sm:px-0 sm:gap-2 w-full mb-20 p-10">
          {checkWhatDataToShow.frontEndData && (
            <button
              className={`rounded-full border w-40 h-[2.8rem] self-center justify-center text-center p-2 bottom-0 text-base font-medium
              ${
                activeButton === "Front End"
                  ? "bg-blue-500 text-white border-blue-500"
                  : "hover:text-white hover:bg-blue-500  hover:border-blue-500 border-[#dee2e6] text-zinc-900"
              }
            `}
              onClick={() => handleClick("Front End")}
            >
              Front End
            </button>
          )}
          {checkWhatDataToShow.backEndData && (
            <button
              className={`rounded-full border   w-40 h-[2.8rem]  self-center justify-center text-center p-2 bottom-0 text-base font-medium
              ${
                activeButton === "Back End"
                  ? "bg-blue-500 text-white border-blue-500"
                  : "hover:text-white hover:bg-blue-500  hover:border-blue-500 border-[#dee2e6] text-zinc-900"
              }
            `}
              onClick={() => handleClick("Back End")}
            >
              Back End
            </button>
          )}
          {checkWhatDataToShow.bothData && (
            <button
              className={`rounded-full border  w-40 h-[2.8rem] self-center justify-center text-center p-2 bottom-0 text-base font-medium
              ${
                activeButton === "Both"
                  ? "bg-blue-500 text-white border-blue-500"
                  : "hover:text-white hover:bg-blue-500  hover:border-blue-500 border-[#dee2e6] text-zinc-900"
              }
            `}
              onClick={() => handleClick("Both")}
            >
              Both
            </button>
          )}
        </div>

        {/* Front End  */}
        {activeButton === "Front End" && <Tools toolsData={frontEndData} />}

        {/* Back End */}
        {activeButton === "Back End" && <Tools toolsData={backEndData} />}

        {/* Both */}
        {activeButton === "Both" && <Tools toolsData={bothData} />}
      </div>
    </section>
  );
}

export default ToolsSection;
