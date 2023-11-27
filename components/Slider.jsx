import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import Image from "next/image";

function Slider({ data, reverseDirection, slides}) {
  return (
    <div className="p-4 flex items-center justify-center">
      <Swiper
        slidesPerView={slides}
        loop={true}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
          reverseDirection: reverseDirection,
        }}
        spaceBetween={30}
        speed={5000}
        modules={[Autoplay]}
        className="w-full h-full "
       
        // style={{ height: '2000px' }} // Set the desired height
      >
        {data.map((item, index) => {
          return (
            <SwiperSlide
              className="h-full w-full"
              key={index}
              
            >
              <Image
                className=" bg-white/5  rounded-lg border-red-900 p-16 backdrop-blur-sm"
                style={{
                  boxShadow:
                    "rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px",
                }}
                src={item.imageUrl}
                width={500}
                height={500}
              ></Image>
              <div className="flex item-center justify-center pt-8">
                {" "}
                <h1 className="text-white">{item.name}</h1>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
      {/* <Swiper
        slidesPerView={4}
        loop={true}
        autoplay={{
          delay: 0,
          disableOnInteraction: false,
        }}
        spaceBetween={30}
        speed={5000}
        modules={[Autoplay]}
        className="w-full h-96 bg-white"
        // style={{ height: '2000px' }} // Set the desired height
      >
        {data.map((item, index) => {
          return (
            <SwiperSlide className="h-full" key={index}>
              <Image
                className="bg-white rounded-lg "
                style={{
                  boxShadow:
                    "rgba(9, 30, 66, 0.25) 0px 1px 1px, rgba(9, 30, 66, 0.13) 0px 0px 1px 1px",
                }}
                src={item.imageUrl}
                width={1000}
                height={1000}
              ></Image>
            </SwiperSlide>
          );
        })}
      </Swiper> */}
    </div>
  );
}

export default Slider;
