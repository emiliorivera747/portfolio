import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay, Navigation } from "swiper/modules";
import Image from "next/image";

function Slider({ data, reverseDirection, slides }) {
  return (
    <div className=" flex items-center justify-center h-full  p-4">
      <Swiper
        loop={true}
        autoplay={{
          delay: 500,
          disableOnInteraction: false,
          reverseDirection: reverseDirection,
        }}
        speed={5000}
        modules={[Autoplay, Navigation]} // Add Navigation module
        className="w-full h-full flex"
        navigation={{   // Enable navigation
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        breakpoints={{
          0:{
            slidesPerView: 1,
            spaceBetween: 20,
          },
          600: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
  
          1024: {
            slidesPerView: slides,
            spaceBetween: 30,
          },
        }}
      >
        {data.map((item, index) => (
          <SwiperSlide className="h-1/2 w-full" key={index}>
            <Image
              alt=" "
              className=" bg-zinc-100/5  rounded-lg p-16 backdrop-blur-sm "
              style={{
                boxShadow:
                  "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset",
              }}
              src={item.imageUrl}
              width={300}
              height={200}
            ></Image>
            <div className="flex item-center justify-center pt-8">
              {" "}
              <h1 className="text-zinc-400">{item.name}</h1>
            </div>
          </SwiperSlide>
        ))}
        <div className="swiper-button-next"></div>
        <div className="swiper-button-prev"></div>
      </Swiper>
    </div>
  );
}

export default Slider;