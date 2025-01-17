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
import { WorkshopData } from "@/redux/Action/Workshop";

const Lab = () => {
  const [labData, setLabData] = useState([]);
  const router = useRouter();
  const dispatch = useDispatch();

  const { loading, workshop, error } = useSelector((state) => state.workshop);

  // here redux logic implement
  const navbarCategories = useSelector(
    (state) => state.navbarCategories.navbarCategories
  );

  const nlabsCategories = navbarCategories.filter(
    (category) =>
      category.type === "K-12 Offering" &&
      category.name.toLowerCase().includes("n-labs")
  );

  const firstWorkshop = nlabsCategories[0];

  useEffect(() => {
    if (firstWorkshop && firstWorkshop.slug) {
      dispatch(WorkshopData(firstWorkshop.slug));
    }
  }, [dispatch, firstWorkshop]);

  return (
    <>
      {firstWorkshop && (
        <ProductBanner
          title={firstWorkshop.name} // Use the category name for the title
          description={firstWorkshop.description} // Use the category description
          linkText="Live Demo"
          linkUrl="/demo"
          imageUrl={firstWorkshop.cover_pic_path || "/labs/labBanner.png"} // Default to a placeholder if imageUrl is missing
        />
      )}

      <div className="container mt-5">
        <div className="row detail-nav">
          <div className="col-lg-3">
            <BoysToys />
          </div>

          <div className="col-lg-9">
            <div className="mt-2 right-sight-title-brand">
              <h1>Navishkar The Leading Brand</h1>
            </div>

            <div className="row">
              {workshop.map((item, index) => (
                <div key={index} className="col-lg-6">
                  <div className="toddler-title d-flex gap-4">
                    <div className="imag-toddler">
                      <Image
                        src={item.image_path}
                        alt={item.title}
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="labs-toddler">
                      <p>{item.title}</p>
                      <span>{item.description}</span>
                      <div className="an-int">
                      <Link href={`/labs/${item.slug}`}>Read more</Link>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <Divider
              className="mt-5"
              sx={{
                borderColor: "#175A95", // Custom color
                borderBottomWidth: 2, // Custom width
              }}
            ></Divider>
            <div className="all-details-age mt-3">
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
                1 to 3 Years | 4 to 8 Years | 15 to 17 Years | 18 Years Above.
              </span>
            </div>
          </div>
        </div>

        <div className="row">
          <div className="col-lg-4">
            <Certificate
              title={"Intoducing MINOS"}
              imageUrl={"/product/minoscer.png"}
              linkText="Buy Now"
              linkUrl="/demo"
            />
          </div>
        </div>
      </div>

      {/* Kids Toy */}
      <section>
        <div className="nami-toys-toys-store">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="all-toys d-flex justify-content-between align-items-center">
                  <div className="toys-text">
                    <h4>Navishkar - Kids Toy Store</h4>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing <br />
                      elit, sed do eiusmod tempor incididunt ut labore et <br />
                      dolore magna aliqua. Ut enim ad minim veniam, quis <br />
                      nostrud exercitation ullamco laboris nisi ut aliquip
                      <br /> ex ea commodo consequat.
                    </p>
                    {/* <a href="">Shop More </a> */}
                  </div>
                  <div className="img-toys-titles">
                    <img src="./product/Group 77.png" alt="77" />
                  </div>
                  <div className="img-toys-title">
                    <img src="./product/pngtree-cheerful.png" alt="77" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="camp-activity-title" id="camp-activity-title">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="camp-title-act text-center">
                <h2>
                  Our summer camp <span>activity</span>
                </h2>
                <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                  Ut enim ad minim veniam, quis nostrud exercitation ullamco
                  laboris nisi ut aliquip ex ea commodo consequat.
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
                      sed do eiusmod tempor incididunt ut labore et.
                    </p>
                  </div>
                </div>
                <div className="col-lg-6"></div>
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
          centeredSlides={true}
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
