import React from "react";
import DotLoader from "@/components/loading/DotLoader";

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center bg-black h-screen w-screen text-white ">
      <div className="w-screen h-screen flex flex-col gap-2 items-center justify-center">
        <div className="translate-y-[-50%] flex flex-col items-center justify-center">
          <div className="text-white text-md mb-4 h-[90%]">
            <span className="font-semibold text-xl">
              Simplicity is the ultimate sophistication.
            </span>{" "}
            <p className="flex items-center justify-center text-primary-700 mt-4">
              - Leonardo Da Vinci
            </p>
          </div>
          <DotLoader bgColor="bg-white" dotWidth="w-3" dotHeight="h-3" />
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
