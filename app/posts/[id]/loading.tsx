import React from "react";
import DotLoader from "@/components/loading/DotLoader";

/**
 *
 * Loading page show Leonardo da Vinci qoute
 *
 * @returns loading page
 */
const loading = () => {
  return (
    <div className="flex items-center justify-center bg-white h-screen w-screen text-white ">
      <div className="w-screen h-screen flex flex-col gap-2 items-center justify-center">
        <div className="translate-y-[-50%] flex flex-col items-center justify-center">
          <div className="text-primary-1000 text-md mb-4 h-[90%]">
            <span className="font-semibold text-xl">
              Simplicity is the ultimate sophistication.
            </span>{" "}
            <p className="flex items-center justify-center text-primary-700 mt-4">
              - Leonardo Da Vinci
            </p>
          </div>
          <DotLoader bgColor="bg-primary-1000" dotWidth="w-3" dotHeight="h-3" />
        </div>
      </div>
    </div>
  );
};

export default loading;
