import { useState } from "react";
import Image from "next/image";

function ToolsSection({ bgColor, frontEndData, backEndData, bothData, checkWhatDataToShow }) {
  // State to track which button (if any) is currently active
  const [activeButton, setActiveButton] = useState("Front End");


  const handleClick = (buttonName) => {
    setActiveButton(buttonName);
  };


  return (
    <section
      className={`h-auto w-screen ${bgColor}`}
    >
      <div className="h-[10%] flex items-center justify-center pb-10">
        <h1 className={`font-bold text-3xl text-zinc-700 pt-6 pb-2`}>
          Tools Used
        </h1>
      </div>

      <div className=" h-full w-full flex-col flex  justify-center items-start ">

        {/* Buttons */}
        <div className=" h-20 pt-10 flex flex-row items-center justify-center gap-1 px-10 sm:px-0 sm:gap-2 w-full">
          {checkWhatDataToShow.frontEndData === true && (<button
            className={`rounded-full border   w-40 h-[2.8rem] self-center justify-center text-center p-2 bottom-0 text-base font-medium
              ${activeButton === 'Front End' ? 'bg-blue-500 text-white border-blue-500' : 'hover:text-white hover:bg-blue-500  hover:border-blue-500 border-[#dee2e6] text-zinc-900'}
            `}
            onClick={() => handleClick('Front End')}
          >
            Front End
          </button>)}
          {checkWhatDataToShow.backEndData && (<button
            className={`rounded-full border   w-40 h-[2.8rem]  self-center justify-center text-center p-2 bottom-0 text-base font-medium
              ${activeButton === 'Back End' ? 'bg-blue-500 text-white border-blue-500' : 'hover:text-white hover:bg-blue-500  hover:border-blue-500 border-[#dee2e6] text-zinc-900'}
            `}
            onClick={() => handleClick('Back End')}
          >
            Back End
          </button>)}
          {checkWhatDataToShow.bothData === true && <button
            className={`rounded-full border  w-40 h-[2.8rem] self-center justify-center text-center p-2 bottom-0 text-base font-medium
              ${activeButton === 'Both' ? 'bg-blue-500 text-white border-blue-500' : 'hover:text-white hover:bg-blue-500  hover:border-blue-500 border-[#dee2e6] text-zinc-900'}
            `}
            onClick={() => handleClick('Both')}
          >
            Both
          </button>}
        </div>

        {/* Front End  */}
        {activeButton === 'Front End' && (
          <div className=" h-full w-screen grid grid-cols-3 sm:grid-cols-[1fr_1fr_1fr_1fr] sm:grid-rows-[1fr_1fr_1fr] gap-2 sm:px-60 pt-4 pb-10 ">
            {frontEndData.map((item, index) => (
              <div key={index} className="flex flex-col items-center justify-center gap-4 backdrop-blur-md">
                <Image
                  alt={item.name}
                  className="rounded-xl backdrop-blur-sm bg-black/2 "
                  src={item.imageUrl}
                  width={0}
                  height={0}
                  style={{
                    width: '50%',
                    height: 'auto',
                    // boxShadow: `rgba(0, 0, 0, 0.12) 0px 6px 16px`,
                    borderRadius: "5px",
                  }}
                  loading="lazy"
                ></Image>
                < div className="flex item-center justify-center " >
                  {" "}
                  <h1 className="text-zinc-500 text-xs"> {item.name}</h1>
                </div>
              </div>
            ))}
          </div>
        )
        }

        {/* Back End */}
        {
          activeButton === 'Back End' && (
            <div className="  h-full w-full grid grid-cols-3 sm:grid-cols-4 grid-rows-[3rem,3rem, 3rem] gap-2 sm:px-10 pt-4 pb-10 px-10">
              {backEndData.map((item, index) => (
                <div key={index} className="flex flex-col items-center justify-center gap-4  ">
                  <Image
                    alt={item.name}
                    className="  rounded-xl   backdrop-blur-sm bg-black/2 "
                    src={item.imageUrl}
                    width={0}
                    height={0}
                    style={{
                      width: '40%',
                      height: 'auto',
                      // boxShadow: `rgba(0, 0, 0, 0.12) 0px 6px 16px`,
                      borderRadius: "5px",
                    }}
                    loading="lazy"
                  ></Image>
                  < div className="flex item-center justify-center " >
                    {" "}
                    <h1 className="text-zinc-500"> {item.name}</h1>
                  </div>
                </div>
              ))}
            </div>
          )
        }

        {/* Both */}
        {
          activeButton === 'Both' && (
            <div className=" h-full w-full grid grid-cols-3 sm:grid-cols-4 grid-rows-[3rem,3rem, 3rem] gap-2 sm:px-10 pt-4 pb-10 px-10">
              {bothData.map((item, index) => (
                <div key={index} className="flex flex-col items-center justify-center gap-4 ">
                  <Image
                    alt={item.name}
                    className="  rounded-xl   backdrop-blur-sm bg-black/2 "
                    src={item.imageUrl}
                    width={0}
                    height={0}
                    style={{
                      width: '40%',
                      height: 'auto',
                      // boxShadow: `rgba(0, 0, 0, 0.12) 0px 6px 16px`,
                      borderRadius: "5px",
                    }}
                    loading="lazy"
                  ></Image>
                  < div className="flex item-center justify-center " >
                    {" "}
                    <h1 className="text-zinc-500"> {item.name}</h1>
                  </div>
                </div>
              ))}
            </div>
          )
        }
      </div >
    </section >
  );
}

export default ToolsSection;