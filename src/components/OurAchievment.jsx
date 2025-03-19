"use client";
import React, { useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import Image from "next/image";
import { Banner } from "@/redux/Action/Banner";
import { useDispatch, useSelector } from "react-redux";

const OurAchievement = () => {
  const dispatch = useDispatch();
  const { loading, BannerImage, error } = useSelector((state) => state.banner);

  useEffect(() => {
    // Dispatch Redux action to fetch banners
    dispatch(Banner());
  }, [dispatch]);

  return (
    <div className="mb-5">
      <div className="shop-by-title text-center">
        <h5>
          OUR <span>ACHIEVEMENTS</span>
        </h5>
      </div>
      <div className="row">
        <div className="col-lg-12">
          <div className="slide-container">
            {loading && <p>Loading...</p>}
            {error && <p>Error: {error}</p>}
            {!loading && !error && BannerImage.length > 0 && (
              <Swiper
                centeredSlides={true}
                navigation={true}
                modules={[Autoplay, Navigation]}
                className="mySwiper"
                autoplay={{
                  delay: 3000,
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
                    spaceBetween: 20,
                  },
                  1024: {
                    slidesPerView: 4,
                    spaceBetween: 20,
                  },
                }}
              >
                {BannerImage.map((banner, index) => (
                  <SwiperSlide key={index}>
                    <Image
                      src={banner.photo_full_url.path} // Replace with the actual field from your API
                      height={200}
                      width={200}
                      alt={`Achievement ${index + 1}`}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OurAchievement;
