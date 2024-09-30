"use client";
import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";


const OurAchievement = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-12">
            <div className="shop-by-title text-center">
              <h5>
                OUR <span>ACHIEVEMENTS</span>
              </h5>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-12">
            <div className="slide-container">
              <Swiper
                navigation={false}
                modules={[Autoplay, Navigation]} // Importing Autoplay module
                className="mySwiper"
                autoplay={{
                  delay: 3000, // Adjust delay as needed
                  disableOnInteraction: false,
                }}
                loop={true} 
                breakpoints={{
                  640: {
                    slidesPerView: 2,
                    spaceBetween: 20,
                  },
                  768: {
                    slidesPerView: 4,
                    spaceBetween: 40,
                  },
                  1024: {
                    slidesPerView: 4,
                    spaceBetween: 50,
                  },
                }}
               
              >
                <SwiperSlide>
                  <Image src={'/public/achievement/ach1.png'} height={100} width={100} alt="Achievement 1" />
                </SwiperSlide>
                <SwiperSlide>
                  <Image src={'/public/achievement/achi2.png'} width={100} height={100} alt="Achievement 2" />
                </SwiperSlide>
                <SwiperSlide>
                  <Image src={'/public/achievement/ach3.png'} height={100} width={100} alt="Achievement 3" />
                </SwiperSlide>
                <SwiperSlide>
                  <Image src={'/public/achievement/ach4.png'} width={100} height={100} alt="Achievement 4" />
                </SwiperSlide>
                <SwiperSlide>
                  <Image src={'/public/achievement/ach5.png'} height={100} width={100} alt="Achievement 5" />
                </SwiperSlide>
              </Swiper>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default OurAchievement;