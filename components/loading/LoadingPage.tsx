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
