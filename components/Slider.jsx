import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import Image from "next/image";

function Slider({ data, reverseDirection, slides }) {
  return (
    <div className=" flex items-center justify-center h-full  p-4">
      <Swiper
        // slidesPerView={slides}
        loop={true}
        autoplay={{
          delay: 500, // Adjust delay for better visibility
          disableOnInteraction: false,
          reverseDirection: reverseDirection,
        }}
        // spaceBetween={30}
        speed={5000}
        modules={[Autoplay]}
        className="w-full h-full flex"
        breakpoints={{
          640: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          768: {
            slidesPerView: 2,
            spaceBetween: 20,
          },
          1024: {
            slidesPerView: slides, // Or adjust based on your design
            spaceBetween: 30,
          },
        }}
        // style={{ height: '2000px' }} // Set the desired height
      >
        {data.map((item, index) => {
          return (
            <SwiperSlide className="h-full w-full" key={index}>
              <Image
                alt=" "
                className=" bg-zinc-100/5  rounded-lg p-16 backdrop-blur-sm "
                style={{
                  boxShadow:
                    "rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgb(209, 213, 219) 0px 0px 0px 1px inset",
                }}
                src={item.imageUrl}
                width={500}
                height={500}
              ></Image>
              <div className="flex item-center justify-center pt-8">
                {" "}
                <h1 className="text-zinc-400">{item.name}</h1>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}

export default Slider;
