import { useState } from "react";
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

  const buttonDefaultStyle = 'hover:text-white bg-gradient-to-r from-secondary-600 to-secondary-800 text-zinc-900 bg-white border border-primary-200';
  const buttonActiveStyle = 'bg-gradient-to-r from-[#3b5bdb] to-[#364fc7] text-white';

  return (
    <section className={`min-h-[70vh] h-auto w-screen ${bgColor}`}>
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
                activeButton === "Both"
                  ? buttonActiveStyle
                  : buttonDefaultStyle
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
