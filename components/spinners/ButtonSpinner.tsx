import React from "react";
import DotLoader from "@/components/loading/DotLoader";

/**
 * Button spinner used to show button is loading
 * 
 * @returns a spinner
 */
const ButtonSpinner = () => {
  return (
    <div className="w-screen h-screen flex flex-col gap-2 items-center justify-center ">
      <div className="translate-y-[-50%] flex flex-col items-center justify-center">
        <div className="text-white font-bold text-4xl  mb-2"></div>
        <div className="text-white text-sm mb-4">
          Seeing value where others don’t
        </div>
        <DotLoader bgColor="bg-white" dotWidth="w-3" dotHeight="h-3" />
      </div>
    </div>
  );
};

export default ButtonSpinner;
