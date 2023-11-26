import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import Image from "next/image";

function ToolsSection() {
  const data = [
    {
      imageUrl:
        "https://res.cloudinary.com/dcss55nem/image/upload/v1700934047/Copy_of_Space_and_Astronomy_Film_Video_Intro_11_tjnkdq.png",
    },
    {
      imageUrl:
        "https://res.cloudinary.com/dcss55nem/image/upload/v1700934047/Copy_of_Space_and_Astronomy_Film_Video_Intro_11_tjnkdq.png",
    },
    {
      imageUrl:
        "https://res.cloudinary.com/dcss55nem/image/upload/v1700934047/Copy_of_Space_and_Astronomy_Film_Video_Intro_11_tjnkdq.png",
    },
    {
      imageUrl:
        "https://res.cloudinary.com/dcss55nem/image/upload/v1700934047/Copy_of_Space_and_Astronomy_Film_Video_Intro_11_tjnkdq.png",
    },
    {
      imageUrl:
        "https://res.cloudinary.com/dcss55nem/image/upload/v1700934047/Copy_of_Space_and_Astronomy_Film_Video_Intro_11_tjnkdq.png",
    },
    {
      imageUrl:
        "https://res.cloudinary.com/dcss55nem/image/upload/v1700934047/Copy_of_Space_and_Astronomy_Film_Video_Intro_11_tjnkdq.png",
    },
    {
      imageUrl:
        "https://res.cloudinary.com/dcss55nem/image/upload/v1700934047/Copy_of_Space_and_Astronomy_Film_Video_Intro_11_tjnkdq.png",
    },
  ];

  return (
    <section className="min-h-screen h-auto bg-black w-screen overflow-auto">
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col items-center ">
          <h1 className=" font-bold text-4xl text-white pt-6 pb-2">
            Tools Used
          </h1>
        </div>
        {/* <p className="text-gray-300 text-[20px]">Using the latest Technology</p> */}
      </div>
      <div className="flex flex-row w-full item-center justify-center">
        {" "}
        <h1 className="text-2xl text-zinc-400 pt-6 pb-2 justify-center ">
          Front End
        </h1>
      </div>
      <div className="p-10 ">
        {/* <Swiper
          slidesPerView={5}
          loop={true}
          autoplay={{
            delay: 0,
            disableOnInteraction: false,
          }}
          speed={6000}
          modules={[Autoplay]}
          className="max-w-[80%] h-full "
        > */}
          {data.map((item, index) => {
            return (
              // <SwiperSlide key={index}>
                <Image
                  className="bg-white rounded-full"
                  src={item.imageUrl}
                  width={500}
                  height={500}
                ></Image>
              // </SwiperSlide>
            );
          })}
        {/* </Swiper> */}
      </div>
    </section>
  );
}

export default ToolsSection;
