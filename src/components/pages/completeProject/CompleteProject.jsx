"use client";
import ProductBanner from "@/components/ProductBanner";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Divider } from "@mui/material";
import Certificate from "@/components/Certificate";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import RelatedProduct from "@/components/RelatedProduct";
import Link from "next/link";
import Filter from "@/components/Filter";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import BoysToys from "@/components/BoysToys";
import OurAchievement from "@/components/OurAchievment";

const CompleteProject = () => {
  const [labData, setLabData] = useState([]);
  const router = useRouter();
  const dispatch = useDispatch();

  // here redux logic implement

  const fetchLabData = async () => {};

  useEffect(() => {
    fetchLabData();
  }, []);

  const handleClick = (id) => {
    router.push(`/labs${id}`);
  };

  return (
    <>
      <ProductBanner
        title="Navishkar - Kids Toy Store"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elitvashcb biiwuhiwq uidh ih uhi iui "
        linkText="Live Demo"
        linkUrl="/demo"
        imageUrl={"/labs/labBanner.png"}
      />

      <div className="container mt-5">
        <div className="row detail-nav">
          <div className="col-lg-3">
            <BoysToys />
          </div>

          <div className="col-lg-9">
            <div className="mt-2 right-sight-title-brand">
              <h1>Complete Projects</h1>
            </div>

            <div className="row">
              <div className="col-lg-6">
                <div class="complete-project  gap-4">
                  <div class="imag-complete">
                    <Image
                      src={"/labs/lab1.png"}
                      alt="lab"
                      width={100}
                      height={100}
                    />
                  </div>
                  <div class="project-name mt-3">
                    <h5>Simon Memory Game</h5>
                  </div>

                  <div className="d-flex flex-row gap-3">
                    <div className="complete-discount">
                      <p>-13%</p>
                    </div>
                    <div className="complete-price">
                      <h4>699</h4>
                    </div>
                    <div>
                      <p><s>$799</s></p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div class="complete-project  gap-4">
                  <div class="imag-complete">
                    <Image
                      src={"/labs/lab1.png"}
                      alt="lab"
                      width={100}
                      height={100}
                    />
                  </div>
                  <div class="project-name mt-3">
                    <h5>Simon Memory Game</h5>
                  </div>

                  <div className="d-flex flex-row gap-3">
                    <div className="complete-discount">
                      <p>-13%</p>
                    </div>
                    <div className="complete-price">
                      <h4>699</h4>
                    </div>
                    <div>
                      <p><s>$799</s></p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div class="complete-project  gap-4">
                  <div class="imag-complete">
                    <Image
                      src={"/labs/lab1.png"}
                      alt="lab"
                      width={100}
                      height={100}
                    />
                  </div>
                  <div class="project-name mt-3">
                    <h5>Simon Memory Game</h5>
                  </div>

                  <div className="d-flex flex-row gap-3">
                    <div className="complete-discount">
                      <p>-13%</p>
                    </div>
                    <div className="complete-price">
                      <h4>699</h4>
                    </div>
                    <div>
                      <p><s>$799</s></p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-lg-6">
                <div class="complete-project  gap-4">
                  <div class="imag-complete">
                    <Image
                      src={"/labs/lab1.png"}
                      alt="lab"
                      width={100}
                      height={100}
                    />
                  </div>
                  <div class="project-name mt-3">
                    <h5>Simon Memory Game</h5>
                  </div>

                  <div className="d-flex flex-row gap-3">
                    <div className="complete-discount">
                      <p>-13%</p>
                    </div>
                    <div className="complete-price">
                      <h4>699</h4>
                    </div>
                    <div>
                      <p><s>$799</s></p>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>

      <div className="row">
          <div className="col-lg-12 mt-3 mb-3">
            <div className="text-center ">
              <h1 className="reletedHead">Related Products</h1>
            </div>
          </div>
          <div className="col-lg-12">
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
                <RelatedProduct />
              </SwiperSlide>
              <SwiperSlide>
                <RelatedProduct />
              </SwiperSlide>
              <SwiperSlide>
                <RelatedProduct />
              </SwiperSlide>
              <SwiperSlide>
                <RelatedProduct />
              </SwiperSlide>
              <SwiperSlide>
                <RelatedProduct />
              </SwiperSlide>
              <SwiperSlide>
                <RelatedProduct />
              </SwiperSlide>
            </Swiper>
          </div>
        </div>

        <OurAchievement />
    </>
  );
};

export default CompleteProject;
