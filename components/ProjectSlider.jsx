import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, HashNavigation } from "swiper/modules";

//test
function ProjectSlider({ data }) {
 
  return (
    <Swiper
      spaceBetween={30}
      hashNavigation={{
        watchState: true,
      }}
      pagination={{
        clickable: true,
      }}
      navigation={true}
      modules={[Pagination, Navigation, HashNavigation]}
      className="w-full h-full"
    >
      {data.map((item, index) => {
        return (
          <SwiperSlide data-hash="slide1" key={index} className="bg-black">
            <div className="relative h-screen w-screen">
              {/* Background Image */}
              <div
                className="absolute top-0 left-0 w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url(${item.imageUrl})`,
                  opacity: item.opacity,
                }}
              ></div>

              {/* Text Content */}
              <div className="relative z-10 flex flex-col items-start justify-center w-full h-full">
                <div className="h-full w-2/3 p-16 flex flex-col justify-center items-start">
                  <h1 className="text-white font-semibold text-4xl lg:text-4xl pb-6">
                    {item.title}
                  </h1>
                  <div className="text-white leading-loose tracking-wider">{item.paragraph}</div>
                </div>
              </div>
            </div>
          </SwiperSlide>
        );
      })}
    </Swiper>
  );
}

export default ProjectSlider;
