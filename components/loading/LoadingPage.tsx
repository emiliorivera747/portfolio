import React from "react";
import DotLoader from "@/components/loading/DotLoader";

interface LoadingPageProps {
  theme?: "white" | "black";
}
const LoadingPage = ({ theme = "black" }: LoadingPageProps) => {
  return (
    <div
      className={`flex items-center justify-center ${
        theme === "white" ? "bg-white" : "bg-black"
      } h-screen w-screen text-white`}
    >
      <div className="w-screen h-screen flex flex-col gap-2 items-center justify-center">
        <div className="translate-y-[-50%] flex flex-col items-center justify-center">
          <div
            className={`${
              theme === "white" ? "text-primary-1000" : "text-white"
            } text-md mb-4 h-[90%]`}
          >
            <span
              className={`font-semibold text-xl ${
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
              theme === "white" ? "text-primary-1000" : "text-white"
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
