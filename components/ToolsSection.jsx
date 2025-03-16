import { useState } from "react";
import Image from "next/image";
import SecondaryHeader from "./titles/SecondaryHeader";
import PrimaryButton from "@/components/buttons/PrimaryButton";

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
      {/* Header */}
      <div className="p-20 flex flex-row items-center justify-center  ">
        <SecondaryHeader title={"Tools Used"} />
      </div>

      <div className=" w-full flex-col flex  justify-center items-start">
        {/* Buttons */}
        <div className=" h-20  flex flex-row items-center justify-center gap-1 px-10 sm:px-0 sm:gap-2 w-full mb-[5rem] p-10">
          {checkWhatDataToShow.frontEndData && (           
            <PrimaryButton
              text={"Front End"}
              actionFunction={() => handleClick("Front End")}
              className={` w-40 ${
                activeButton === "Front End"
                  ? ""
                  : "hover:text-white bg-gradient-to-r from-secondary-700 to-secondary-800 text-zinc-900 bg-white border border-primary-200"
              }`}
            />
          )}
          {checkWhatDataToShow.backEndData && (
            <PrimaryButton
              text={"Back End"}
              actionFunction={() => handleClick("Back End")}
              className={`w-40 ${
                activeButton === "Back End"
                  ? "bg-blue-500 text-white border-blue-500"
                  : "hover:text-white bg-gradient-to-r from-secondary-700 to-secondary-800 text-zinc-900 bg-white border border-primary-200"
              }`}
            />
          )}
          {checkWhatDataToShow.bothData && (
            <PrimaryButton
              text={"Both"}
              actionFunction={() => handleClick("Both")}
              className={` w-40 ${
                activeButton === "Both"
                  ? "bg-blue-500 text-white border-blue-500"
                  : "hover:text-white bg-gradient-to-r from-secondary-700 to-secondary-800 text-zinc-900 bg-white border border-primary-200"
              }`}
            />
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
