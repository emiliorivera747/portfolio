import React from "react";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Pagination, Navigation, HashNavigation } from "swiper/modules";
import { Suspense } from "react";
//test
function ProjectSlider({ data }) {
  return (
    <Suspense fallback={<p>Loading feed...</p>}>
      <Swiper
        spaceBetween={0}
        hashNavigation={{
          watchState: true,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Pagination, Navigation, HashNavigation]}
        className="w-full h-full m-0"
      >
        {data.map((item, index) => {
          return (
            <SwiperSlide data-hash="slide1" key={index} className="bg-black">
              <div className="relative h-screen w-screen">
                {/* Background Image */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <Image
                    src={item.imageUrl}
                    alt={item.title}
                    layout="fill"
                    style={{ opacity: item.opacity }}
                    className="object-scale-down sm:object-cover"
                    loading='lazy'
                  />
                </div>

                {/* Text Content */}
                <div className="relative z-10 flex flex-col items-start justify-center w-full h-full">
                  <div className="h-full w-full md:w-2/3 p-16 flex flex-col justify-center items-start">
                    <h1 className="text-white font-semibold text-xl md:text-4xl lg:text-4xl pb-6">
                      {item.title}
                    </h1>
                    <div className="text-sm text-white leading-loose tracking-wider">
                      {item.paragraph}
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </Suspense>
  );
}

export default ProjectSlider;
