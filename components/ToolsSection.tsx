'use client'
import React, { useState } from "react";
import SecondaryHeader from "./titles/SecondaryHeader";
import PrimaryButton from "@/components/buttons/PrimaryButton";

//Components
import Tools from "@/components/tools-section/Tools";

//Types
import { ToolsSectionProps } from "@/types/tools";


/**
 * Displays a section with tools used in projects, allowing users to filter by Front End, Back End, or Both.
 * 
 * @returns tools section component
 */
function ToolsSection({
  bgColor,
  frontEndData,
  backEndData,
  bothData,
  checkWhatDataToShow,
}: ToolsSectionProps) {
  const [activeButton, setActiveButton] = useState<string>("Front End");

  const handleClick = (buttonName: string) => {
    setActiveButton(buttonName);
  };

  const buttonDefaultStyle =
    "hover:text-white bg-gradient-to-r from-secondary-600 to-secondary-800 text-zinc-900 bg-white border border-primary-200";
  const buttonActiveStyle =
    "bg-gradient-to-r from-[#3b5bdb] to-[#364fc7] text-white";

  return (
    <section className={`min-h-[70vh] h-auto w-screen ${bgColor}`}>
      {/* Header */}
      <div className="p-10 flex flex-row items-center justify-center pt-20">
        <SecondaryHeader title={"Tools Used"} />
      </div>

      <div className=" w-full flex-col flex  justify-center items-start ">
        {/* Buttons */}
        <div className=" h-20 flex flex-row items-center justify-center gap-1 px-10 sm:px-0 sm:gap-2 w-full mb-[2rem] ">
          {checkWhatDataToShow.frontEndData && (
            <PrimaryButton
              text={"Front End"}
              actionFunction={() => handleClick("Front End")}
              className={` w-40 ${
                activeButton === "Front End"
                  ? buttonActiveStyle
                  : buttonDefaultStyle
              }`}
            />
          )}

          {checkWhatDataToShow.backEndData && (
            <PrimaryButton
              text={"Back End"}
              actionFunction={() => handleClick("Back End")}
              className={`w-40 ${
                activeButton === "Back End"
                  ? buttonActiveStyle
                  : buttonDefaultStyle
              }`}
            />
          )}
          {checkWhatDataToShow.bothData && (
            <PrimaryButton
              text={"Both"}
              actionFunction={() => handleClick("Both")}
              className={` w-40 ${
                activeButton === "Both" ? buttonActiveStyle : buttonDefaultStyle
              }`}
            />
          )}
        </div>

        {/* Front End  */}
        {activeButton === "Front End" && (
          <Tools toolsData={frontEndData ? frontEndData : []} />
        )}

        {/* Back End */}
        {activeButton === "Back End" && (
          <Tools toolsData={backEndData ? backEndData : []} />
        )}

        {/* Both */}
        {activeButton === "Both" && (
          <Tools toolsData={bothData ? bothData : []} />
        )}
      </div>
    </section>
  );
}

export default ToolsSection;
