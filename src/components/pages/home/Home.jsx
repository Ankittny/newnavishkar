"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import "../../../styles/_home.scss";
import Button from "@/components/Button";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { HiArrowLongRight } from "react-icons/hi2";
import { Autoplay } from "swiper/modules";
import { useRouter } from "next/navigation";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";

import { EffectCoverflow, Pagination, Navigation } from "swiper/modules";
import OurAchievement from "@/components/OurAchievment";
import Card from "@/components/card/Card";
import { useDispatch, useSelector } from "react-redux";
// import { categories } from "@/redux/Action/category";
import { homeProducts } from "@/redux/Action/HomeProduct";
import { API_URL } from "../../../config/config";
import Tab from "@mui/material/Tab";
import TabContext from "@mui/lab/TabContext";
import TabList from "@mui/lab/TabList";
import TabPanel from "@mui/lab/TabPanel";
import Box from "@mui/material/Box";

const Home = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [showImage, setShowImage] = useState(true);

  const [productsData, setProductsData] = useState([]);
  const { loading, products, error } = useSelector((state) => state.home);
  const [activeTab, setActiveTab] = useState({});// To track which tab is active

  const handleTabClick = (tabIndex, categoryIndex) => {
    setActiveTab((prevState) => ({
      ...prevState,
      [categoryIndex]: tabIndex,
    }));
  };

  const fetchProductData = async () => {
    try {
      console.log("Dispatching product action");
      await dispatch(homeProducts()); // Dispatch homeProducts action to fetch data
    } catch (error) {
      console.error("Error fetching category products:", error);
    }
  };

  useEffect(() => {
    fetchProductData(); // Trigger product data fetching when component mounts
  }, [dispatch]);

  useEffect(() => {
    if (products && products.length > 0) {
      setProductsData(products); // Update local state with Redux products data
      console.log("Fetched product:", products); // Log the fetched products
    } else {
      console.log("No products fetched or empty array:", products);
    }
  }, [products]);

  console.log("ANkit sir", productsData);

  const handleCardClick = (slug) => {
    console.log(`Card clicked: ${slug}`);
  };

  const handleAddToCart = (id) => {
    console.log(`Added to cart: ${id}`);
  };

  // Automatically toggle every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setShowImage((prev) => !prev);
    }, 3000); // 3000ms = 3 seconds

    // Cleanup interval on component unmount
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      <section>
        <div className="home-page-title text-center mt-5">
          <div className="container">
            <div className="home-learn-title d-flex justify-content-center align-items-center gap-3">
              <h1 className="title-home fw-bold">Learn</h1>
              <span className="easily-title">Easily</span>
              <img src="product/little.png" />
            </div>
            <div className="anywhere-title d-flex justify-content-center align-items-cengter gap-4 fw-bold">
              <div className="first-itme">
                <h1 className="text-data-analytics">Anywhere </h1>
              </div>
              <div className="image-item d-flex align-items-center">
                <img src="product/IMG_5991.png" width={45} height={45} />
                <div className="">
                  <img src="product/img_5960.png" width={50} height={50} />
                </div>
              </div>
              <div className="text-data-analytics">
                <h1 className="text-data-analytics">and Anytime</h1>
              </div>
            </div>
          </div>
          <div className="award-section">
            <div className="row">
              <div className="col-lg-4">
                <div className="award-name">
                  <img src="product/200w.gif" style={{ width: "75%" }} />
                </div>
              </div>
              <div className="col-lg-4">
                <div className="award-name">
                  <h2>
                    On my website, you'll find resources and trainings to help
                    you find aliveness and vitality in your relationships.
                  </h2>{" "}
                </div>
                <div className="award-price d-flex justify-content-center align-items-center gap-3">
                  <div className="training-title">
                    <img src="product/Group-95.png" width={150} />
                  </div>
                  <div className="training-title d-flex gap-2 mt-5">
                    <img src="product/image 2.png" />
                    <img src="product/image 2.png" />
                    <img src="product/image 2.png" />
                  </div>
                  <div className="training-title">
                    <img src="product/Group-96.png" width={110} />
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="training-title">
                  <img src="product/wheel.gif" style={{ width: "80%" }} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===========================================Experience the world=================================== */}

      <section>
        <div className="world-title">
          <div className="Learning-title text-center fw-bold">
            Experience the world of immersive <br /> Learning
          </div>
          <div className="container mt-4">
            <div className="row">
              <div className="col-lg-6">
                <div className=" bg-find d-flex gap-3">
                  <div className="back-bg-title">
                    <img src="product/Untitled-90.png" />
                  </div>
                  <div className="pt-4 px-3 devp-text">
                    <h2 className=" innovation-heading text-white fw-bold">
                      Workshop{" "}
                    </h2>
                    <p>
                      AI and Robotics workshop that we wish to conduct in the
                      school premises. The purpose of this workshop is to
                      increase awareness and generate interest in the field of
                      AI and Robotics and drone and to educate the students
                      regarding the new emerging technologies and how important
                      it is to stay updated in this technology driven world.
                    </p>
                    <button className="bg-white px-4 py-2 border-0 mb-2 ">
                      View Product
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="world-title-heading d-flex gap-3">
                  <div className=" pt-4 px-3 devp-text">
                    <h2 className=" innovation-heading fw-bold">
                      innovative <span>projects</span>{" "}
                    </h2>
                    <p>
                      AI and Robotics workshop that we wish to conduct in the
                      school premises. The purpose of this workshop is to
                      increase awareness and generate interest in the field of
                      AI and Robotics and drone and to educate the students
                      regarding the new emerging technologies and how important
                      it is to stay updated in this technology driven world.
                    </p>

                    <button className="bg-white dx-text-bg px-4 py-2 border-0 mb-2 ">
                      View Product
                    </button>
                  </div>
                  <div className="back-bg-title">
                    <img src="product/Untitled-90.png" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===========================================minos -title =================================== */}
      <div className="container">
        <div className="frame mt-5"></div>
      </div>

      {/* ===============================================drone-services =================================== */}
      <section>
        <div className="drone-services-title mt-5 py-4">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="drone-humble-drnoe">
                  <h2 className="">
                    N - <span>Labs</span>
                  </h2>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                    do eiusmod tempor incididunt ut labore et dolore magna
                    aliqua. Ut enim ad minim veniam, quis nostrud exercitation
                    ullamco laboris nisi ut aliquip ex ea commodo consequat.{" "}
                  </p>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="drone-humble-drnoe pt-5 d-flex justify-content-center">
                  <h2 className="">
                    N - <span>DRONE SERVICE</span>
                  </h2>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="video-title">
          <div className="row">
            <div className="col-lg-6">
              <video
                autoPlay
                loop
                muted
                className="frontend-video"
                style={{ width: "100%" }}
              >
                <source src="product/video/Navishkar.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="col-lg-6">
              <div className="drone-image">
                <img
                  src="product/DeWatermark.png"
                  height={374}
                  style={{ width: "100%" }}
                ></img>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* +++++++++++++++++++++++++++++++++++++++++++++++++++++Feature-topics+++++++++++++++++++++++++++++++++++++++++ */}

      <div className="feature-topic-title mt-5">
        <div className="feature-heading">
          <h3 className="fw-bolder text-center">Featured Topics By Category</h3>
        </div>
      </div>
      <section className="shopbyintrest mt-5">
        <div className="container">
          <div className="row mt-5">
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
              <div className="meet-minos-title mt-5">
                <img
                  src="product/video/MicrosoftTeams-video (2).png"
                  style={{ width: "100%" }}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
              <div className="meet-minos-title mt-3">
                <img
                  src="product/video/MicrosoftTeams-video (3).png"
                  style={{ width: "100%" }}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
              <div className="meet-minos-title">
                <img
                  src="product/video/MicrosoftTeams-video (5) 1.png"
                  style={{ width: "100%" }}
                />
              </div>
            </div>
            <div className="col-lg-3 col-md-6 col-sm-6 col-xs-12">
              <div className="meet-minos-title mt-3">
                <img
                  src="product/video/MicrosoftTeams-video.png"
                  style={{ width: "100%" }}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

    
      

<section className="shopbyintrest">
  <div className="container">
    <div className="row">
      <div className="col-lg-12">
        {productsData && productsData.length > 0 ? (
          productsData.map((category, categoryIndex) => (
            <div key={category.id} className="shop-by-category">
              {/* Category title */}
              <div className="shop-by-title text-center">
                <h5>
                  SHOP BY{" "}
                  <span>{category.slug || "No category available"}</span>
                </h5>
              </div>

              {/* Tabs and Tab Panels */}
              <div className="tabs-container">
                {category.childes && category.childes.length > 0 ? (
                  <TabContext value={activeTab[categoryIndex] || "0"}>
                    <Box className="tabs-wrapper">
                      <TabList
                        aria-label={`Tabs for ${category.slug}`}
                        className="tab-buttons"
                      >
                        {category.childes.map((child, index) => (
                          <Tab
                            key={child.id}
                            label={child.name}
                            value={index.toString()}
                            onClick={() => handleTabClick(index.toString(), categoryIndex)}
                          />
                        ))}
                      </TabList>
                    </Box>

                    {/* Tab Panels */}
                    {category.childes.map((child, index) => (
                      <TabPanel
                        key={child.id}
                        value={index.toString()}
                        className="tab-content"
                      >
                        {child.products && child.products.length > 0 ? (
                          child.products.map((product) => (
                            <Card
                              key={product.id}
                              id={product.id}
                              imageUrl={`https://navishkar.overseaseducationlane.com/public/assets/back-end/product/thumbnail/${product.thumbnail || ""}`}
                              name={product.name}
                              discount={product.discount}
                              price={product.unit_price}
                              onClick={() => handleCardClick(product.slug)}
                              onAddToCart={() => handleAddToCart(product.id)}
                            />
                          ))
                        ) : (
                          <p>No products available in this subcategory</p>
                        )}
                      </TabPanel>
                    ))}
                  </TabContext>
                ) : (
                  <p className="no-data-message">No Subcategories</p>
                )}
              </div>

              {/* Main products display */}
              <div className="row dr-title mt-5">
                <div className="col-md-12">
                  <div className="card-container">
                    {!activeTab[categoryIndex] &&
                      category.products?.map((product) => (
                        <Card
                          key={product.id}
                          id={product.id}
                          imageUrl={`https://navishkar.overseaseducationlane.com/public/assets/back-end/product/thumbnail/${product.thumbnail || ""}`}
                          name={product.name}
                          price={product.unit_price}
                          discount={product.discount}
                          onClick={() => handleCardClick(product.slug)}
                          onAddToCart={() => handleAddToCart(product.id)}
                        />
                      ))}
                  </div>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p>No products available</p>
        )}
      </div>
    </div>
  </div>
</section>




      {/* ==================================================drone========================================= */}
      <section>
        <div className="drone-fly mt-5">
          <div className="container">
            <div className="cpi-drone">
              <span>MINOS</span>
              <img src="product/TEST-13.png" style={{ width: "100%" }}></img>
            </div>
          </div>
        </div>
      </section>

      {/* ==================================================testimonial========================================= */}
      <section>
        <div className="testimionial-lyer mt-5">
          <div className="container">
            <div className="row pt-5">
              <div className="col-lg-6">
                <div className="testiminoal-flower-typical">
                  <strong>Our clients</strong>
                  <Swiper
                    effect={"coverflow"}
                    grabCursor={"true"}
                    conteredSlides={"true"}
                    loop={"true"}
                    slidesPerView={"auto"}
                    coverflowEffect={{
                      rotate: 0,
                      stretch: 0,
                      depth: 100,
                      modifier: 2.5,
                    }}
                    autoplay={{
                      delay: 2500,
                      disableOnInteraction: false,
                    }}
                    pagination={{
                      el: ".swiper-pagination",
                      clickable: true,
                    }}
                    navigation={{
                      nextEl: "swiper-button-next",
                      prevEl: "swiper-button-prev",
                      clickable: true,
                    }}
                    modules={[
                      EffectCoverflow,
                      Pagination,
                      Navigation,
                      Autoplay,
                    ]}
                    className="swiper_container"
                  >
                    <SwiperSlide>
                      {/* <img src="product/DeWatermark.png" /> */}
                      <p>
                        The team at ABC Drone Services did an exceptional job
                        capturing aerial shots for our real estate listings.
                        Their attention to detail and ability to showcase
                        properties angles helped us attract more buyers.{" "}
                      </p>
                    </SwiperSlide>
                    <SwiperSlide>
                      {/* <img src="product/DeWatermark.png" /> */}
                      <p>
                        The team at ABC Drone Services did an exceptional job
                        capturing aerial shots for our real estate listings.
                        Their attention to detail and ability to showcase
                        properties from angles helped us attract more buyers.{" "}
                      </p>
                    </SwiperSlide>
                    <SwiperSlide>
                      {/* <img src="product/DeWatermark.png" /> */}
                      <p>
                        The team at ABC Drone Services did an exceptional job
                        capturing aerial shots for our real estate listings.
                        Their attention to detail and ability to showcase
                        properties from angles helped us attract more buyers.{" "}
                      </p>
                    </SwiperSlide>
                    <SwiperSlide>
                      {/* <img src="product/DeWatermark.png" /> */}
                      <p>
                        The team at ABC Drone Services did an exceptional job
                        capturing aerial shots for our real estate listings.
                        Their attention to detail and ability to showcase
                        properties from angles helped us attract more buyers.{" "}
                      </p>
                    </SwiperSlide>
                    <SwiperSlide>
                      {/* <img src="product/DeWatermark.png" /> */}
                      <p>
                        The team at ABC Drone Services did an exceptional job
                        capturing aerial shots for our real estate listings.
                        Their attention to detail and ability to showcase
                        properties from angles helped us attract more buyers.{" "}
                      </p>
                    </SwiperSlide>

                    {/* <div className="slider-controler">
                      <div className="swiper-pagination"></div>
                    </div> */}
                  </Swiper>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="swiper-galley">
                  <Swiper
                  centeredSlides={true}
                    effect={"coverflow"}
                    grabCursor={"true"}
                    conteredSlides={"true"}
                    loop={"true"}
                    slidesPerView={"auto"}
                    coverflowEffect={{
                      rotate: 0,
                      stretch: 0,
                      depth: 100,
                      modifier: 2.5,
                    }}
                    autoplay={{
                      delay: 2500,
                      disableOnInteraction: false,
                    }}
                    pagination={{
                      el: ".swiper-pagination",
                      clickable: true,
                    }}
                    navigation={{
                      nextEl: "swiper-button-next",
                      prevEl: "swiper-button-prev",
                      clickable: true,
                    }}
                    modules={[
                      EffectCoverflow,
                      Pagination,
                      Navigation,
                      Autoplay,
                    ]}
                    className="swiper_container"
                  >
                    <SwiperSlide>
                      <img src="product/DeWatermark.png" />
                      {/* <p>The team at ABC Drone Services did an
                        exceptional job capturing aerial shots for our real estate listings.
                        Their attention to detail and ability to showcase properties 
                        angles helped us attract more buyers. </p> */}
                    </SwiperSlide>
                    <SwiperSlide>
                      <img src="product/DeWatermark.png" />
                      {/* <p>The team at ABC Drone Services did an
                        exceptional job capturing aerial shots for our real estate listings.
                        Their attention to detail and ability to showcase properties from 
                        angles helped us attract more buyers. </p> */}
                    </SwiperSlide>
                    <SwiperSlide>
                      <img src="product/DeWatermark.png" />
                      {/* <p>The team at ABC Drone Services did an
                        exceptional job capturing aerial shots for our real estate listings.
                        Their attention to detail and ability to showcase properties from 
                        angles helped us attract more buyers. </p> */}
                    </SwiperSlide>
                    <SwiperSlide>
                      <img src="product/DeWatermark.png" />
                      {/* <p>The team at ABC Drone Services did an
                        exceptional job capturing aerial shots for our real estate listings.
                        Their attention to detail and ability to showcase properties from 
                        angles helped us attract more buyers. </p> */}
                    </SwiperSlide>
                    <SwiperSlide>
                      <img src="product/DeWatermark.png" />
                      {/* <p>The team at ABC Drone Services did an
                        exceptional job capturing aerial shots for our real estate listings.
                        Their attention to detail and ability to showcase properties from 
                        angles helped us attract more buyers. </p> */}
                    </SwiperSlide>

                    <div className="slider-controler">
                      <div className="swiper-pagination"></div>
                    </div>
                  </Swiper>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      {/* ========================================================school schildren ------------------------------------ */}
      <section>
        <div className="nami-toys-toys-store store-school-text">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="all-toys d-flex justify-content-between align-items-center">
                  <div className="img-toys-title">
                    <img
                      src="./product/laugh.png"
                      alt="77"
                      style={{ maxWidth: "100%", height: "inherit" }}
                    />
                  </div>
                  <div className="toys-text text-white">
                    <span>EXPLORE</span>
                    <h4 className="text-white fw-bold mt-3">
                      Get Creative With <br />
                      Navishkar
                    </h4>
                    <p className="text-white mt-3">
                      Sit amet mauris commodo quis imperdiet massa tincidunt
                      nunc. Tortor id aliquet lectus proin. Turpis nunc eget
                      lorem dolor sed viverra ipsum.
                    </p>
                    <ul className="listing-upper-title">
                      <li>
                        Learn creative skills to achieve your personal and
                        professional goals.
                      </li>
                      <li>Tune in and level up at your own pace</li>
                      <li>
                        Connect with a global community of curious creatives.
                      </li>
                    </ul>
                    <button className="get-set-btn">
                      Get started today <HiArrowLongRight />{" "}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <OurAchievement />
      </section>
    </>
  );
};

export default Home;
