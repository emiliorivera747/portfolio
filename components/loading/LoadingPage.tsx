import React from "react";
import DotLoader from "@/components/loading/DotLoader";

interface LoadingPageProps {
  theme?: "white" | "black";
}
const LoadingPage = ({ theme = "black" }: LoadingPageProps) => {
  return (
    <div
      className={` flex items-center justify-center ${
        theme === "white" ? "bg-white" : "bg-black"
      } h-screen w-screen text-white`}
    >
      <div className=" w-screen h-screen flex flex-col gap-2 items-center justify-center">
        <div className=" flex flex-col items-center justify-center">
          <div
            className={`p-2 ${
              theme === "white" ? "text-primary-1000" : "text-white"
            } text-sm sm:text-md mb-4 h-[90%]`}
          >
            <span
              className={`flex text-center items-center justify-center font-semibold text-md sm:text-xl ${
                theme === "white" ? "text-primary-1000" : "text-white"
              }`}
            >
              Simplicity is the ultimate sophistication.
            </span>{" "}
            <p
              className={`flex items-center justify-center text-primary-700 mt-4 `}
            >
              - Leonardo Da Vinci
            </p>
          </div>
          <DotLoader
            bgColor={`${
              theme === "white" ? "bg-primary-1000" : "bg-white"
            }`}
            dotWidth="w-3"
            dotHeight="h-3"
          />
        </div>
      </div>
    </div>
  );
};

export default LoadingPage;
