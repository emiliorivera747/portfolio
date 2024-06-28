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
          // delay: 500,
          disableOnInteraction: false,
          reverseDirection: reverseDirection,
        }}
        speed={2000}
        modules={[Autoplay, Navigation]} // Add Navigation module
        className="w-full  flex "
        navigation={{
          // Enable navigation
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
        breakpoints={{
          0: {
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
          <SwiperSlide className="h-full w-full p-2" key={index}>
            <div className="flex flex-col">
              <Image
                alt={item.name}
                className="  rounded-xl p-12 backdrop-blur-sm bg-black/2 "
                src={item.imageUrl}
                width={400}
                height={400}
                style={{
                  // boxShadow: `rgba(0, 0, 0, 0.12) 0px 6px 16px`,
                  borderRadius: "5px",
              }}
                loading="lazy"
              ></Image>
              <div className="flex item-center justify-center pt-4">
                {" "}
                <h1 className="text-zinc-400">{item.name}</h1>
              </div>
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
