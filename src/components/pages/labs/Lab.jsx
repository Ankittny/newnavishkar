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
import { useDispatch,useSelector} from "react-redux";

const Lab = () => {
  const [labData,setLabData]=useState([]);
  const router = useRouter();
  const dispatch =useDispatch();


  // here redux logic implement




  const fetchLabData = async () =>{
   
  }

  useEffect(()=>{
    fetchLabData();
  },[])

  const handleClick = (id) =>{
    router.push(`/labs${id}`);
  }

  return (
    <>
      <ProductBanner
        title="Navishkar - Kids Toy Store"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elitvashcb biiwuhiwq uidh ih uhi iui "
        linkText="Live Demo"
        linkUrl="/demo"
        imageUrl={"/labs/labBanner.png"}
      />

      <div className="container">
        <div className="row">
          <div className="col-3">
            <Filter />
          </div>

          <div className="col-9">
            <div className="mt-2 right-sight-title-brand">
              <h1>Navishkar The Leading Brand</h1>
            </div>
            <div className="row">
              <div className="col-6">
                <div class="toddler-title d-flex gap-4">
                  <div class="imag-toddler">
                    <Image
                      src={"/labs/lab1.png"}
                      alt="lab"
                      width={100}
                      height={100}
                    />
                  </div>
                  <div class="labs-toddler">
                    <p>Toddler Labs</p>
                    <span>
                      Safe, stimulating, and fun learning space for young
                      children. Focus on all-round development through play.
                    </span>
                    <div class="an-int">
                      <Link href="">Read more</Link>
                    </div>
                  </div>
                </div>
              </div>

              <div className="col-6">
                <div className="toddler-title d-flex gap-4"></div>
              </div>
            </div>

            <Divider
              className="mt-5"
              sx={{
                borderColor: "#175A95", // Custom color
                borderBottomWidth: 2, // Custom width
              }}
            ></Divider>
            <div class="all-details-age">
              <p>Battery and Non battery operated</p>
              <span>Battery Operated | Non-Battery Operated</span>
              <p>Subjects</p>
              <span>Physics | Chemistry | Biology | Maths</span>
              <p>Class</p>
              <span>
                Nursery | LKG | UKG | 1st Standard | 2nd Standard | 3rd Standard
                | 4rd Standard |5rd Standard |6rd Standard |7rd Standard |8rd
                Standard |9rd Standard |10th Standard |11th Standard |12th
                Standard |
              </span>
              <p>Age</p>
              <span>
                1 to 3 Years | 4 to 8 Years | 15 to 17 Years | 18 Years Above{" "}
              </span>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-4">
            <Certificate
              title={"Intoducing MINOS"}
              imageUrl={"/product/minoscer.png"}
              linkText="Buy Now"
              linkUrl="/demo"
            />
          </div>
        </div>

        <div className="camp-activity-title" id="camp-activity-title">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="camp-title-act text-center">
                  <h2>
                    Our summer camp <span>activity</span>{" "}
                  </h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.
                  </p>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <div className="summer-activity">
                      <Image
                        src={"/labs/summer1.png"}
                        alt="img2"
                        width={100}
                        height={100}
                      />
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit,
                        sed do eiusmod tempor incididunt ut labore et{" "}
                      </p>
                    </div>
                  </div>
                  <div class="col-lg-6"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        <div className="col-12 mt-3 mb-3">
          <div className="text-center ">
            <h1 className="reletedHead">Related Products</h1>
          </div>
        </div>
        <div className="col-12">
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
    </>
  );
};

export default Lab;
