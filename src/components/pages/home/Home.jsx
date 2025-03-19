"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import "../../../styles/_home.scss";
import Button from "@/components/Button";
import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { HiArrowLongRight } from "react-icons/hi2";
import { Autoplay, } from "swiper/modules";
import { useRouter } from "next/navigation";
import "swiper/css";
import "swiper/css/effect-coverflow";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { Carousel } from 'react-bootstrap';
import { IoMdArrowDropright } from "react-icons/io";


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
import Link from "next/link";
import { fetchReviews } from "@/redux/Action/Review";

const Home = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [showImage, setShowImage] = useState(true);
  const [productsData, setProductsData] = useState([]);
  const { loading, products, error } = useSelector((state) => state.home);
  const { reviewList } = useSelector((state) => state.reviews);
  const [activeTab, setActiveTab] = useState({});// To track which tab is active
  const [instaData, setInstaData] = useState([]);
  const [loadingTabs, setLoadingTabs] = useState({});
  const [loadings, setLoadings] = useState(false);


  // console.log("Products", products);
  // console.log("Review", reviewList);
  // const handleTabClick = (tabIndex, categoryIndex) => {
  //   setActiveTab((prevState) => ({
  //     ...prevState,
  //     [categoryIndex]: tabIndex,
  //   }));
  // };


  const handleTabClick = (tabIndex, categoryIndex) => {
    const tabElement = document.querySelector(`.display-block-${tabIndex}`);
    if (tabElement) {
      tabElement.style.removeProperty('display');
    }
    // Show loader for the selected tab
    setLoadingTabs((prevState) => ({
      ...prevState,
      [categoryIndex]: true,
    }));

    // Simulate a delay before setting the active tab
    setTimeout(() => {
      setActiveTab((prevState) => ({
        ...prevState,
        [categoryIndex]: tabIndex,
      }));

      // Hide loader
      setLoadingTabs((prevState) => ({
        ...prevState,
        [categoryIndex]: false,
      }));
    }, 1000);
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

  const handleCardClick = (slug) => {
    setLoadings(true); // Show loader

    setTimeout(() => {
      setLoadings(false); // Hide loader just before navigation
      router.push(`/products/${slug}`);
    }, 2000); // 2-second delay
  };


  const handleInnovation = () => {
    setLoadings(true); // Show loader

    setTimeout(() => {
      setLoadings(false); // Hide loader just before navigation 
    }, 2000); // 2-second delay
  }

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

  const fetchInstagramPosts = async () => {
    try {
      const response = await fetch(
        "https://graph.instagram.com/me/media?fields=id,media_type,media_url,thumbnail_url,caption,timestamp&access_token=IGAAQiuxZCXcz1BZAE14dXhfdmRwUDdhbXBSUG0waWViTFhhck5KeWEtN2FraGUxeS0xNHFnS1dxZAktqQmhfeHhyZA3RHRklJRkEzVlRhRlB3YTdxRm5OWlJTLXpMNmJDZADNTRzgyV0FZARzlsczRiMldnYUlLRXVfeGF6eTFkVEpoMAZDZD"
      );
      const data = await response.json();
      setInstaData(data.data.filter((post) => post.media_type === "VIDEO"));
    } catch (error) {
      console.error("Error fetching Instagram posts:", error);
    }
  };

  useEffect(() => {
    fetchInstagramPosts();
    dispatch(fetchReviews());// Trigger Instagram posts fetching when component mounts
  }, []);
  return (
    <>
      <section>
        <div className="home-page-title text-center mt-5">
          <div className="container">
            <div className="home-learn-title d-flex justify-content-center align-items-center gap-3">
              <h1 className="title-home fw-bold">Learn</h1>
              <span className="easily-title">Easily</span>
              <div className="position-relative">
                <div className="position-absolute query-quality" style={{ top: "-30px", right: "0" }}>
                  <img src="product/little.png" />
                </div>
              </div>

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
                    Navishkar, where innovation and exploration unite! ,
                    we are passionately committed to providing high-quality STEAM education for young minds.
                    We Inspire curiosity & creativity, and foster a love for learning in students through experiential learning.
                  </h2>{" "}
                </div>
                <div className="award-price d-flex justify-content-center align-items-center gap-3">
                  <div className="training-title">
                    <img src="product/Group-95.png" width={150} />
                  </div>
                  <div className="training-title d-flex gap-2 mt-5">
                    <img
                      src="product/image 2.png"
                      alt="Certificate"
                      className="disable-image"
                      onContextMenu={(e) => e.preventDefault()} // Disable right-click
                      draggable="false" // Prevent dragging
                    />
                    <img src="product/image 2.png"
                      alt="Certificate"
                      className="disable-image"
                      onContextMenu={(e) => e.preventDefault()} // Disable right-click
                      draggable="false" // Prevent dragging
                    />
                    <img src="product/image 2.png"
                      alt="Certificate"
                      className="disable-image"
                      onContextMenu={(e) => e.preventDefault()} // Disable right-click
                      draggable="false" // Prevent dragging
                    />
                  </div>
                  <div className="training-title">
                    <img src="product/Group-96.png" width={110} />
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="training-title title-exit ">
                  {/* <img src="product/wheel.gif" style={{ width: "80%" }} /> */}
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
                    <button className="bg-white px-4 py-2 border-0 mb-2" onClick={handleInnovation}>
                      <Link href="/workshop">View Workshop</Link>
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="world-title-heading d-flex gap-3">
                  <div className=" pt-4 px-3 devp-text">
                    <h2 className=" innovation-heading fw-bold">
                      Innovative <span>Projects</span>{" "}
                    </h2>
                    <p>
                      AI and Robotics workshop that we wish to conduct in the
                      school premises. The purpose of this workshop is to
                      increase awareness and generate interest in the field of
                      AI and Robotics and drone and to educate the students
                      regarding the new emerging technologies and how important
                      it is to stay updated in this technology driven world.
                    </p>

                    <button className="bg-white dx-text-bg px-4 py-2 border-0 mb-2 " onClick={handleInnovation}>
                      <Link href="/innovation">View Innovation</Link>
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

      {/* ===============================================drone-services for desktop =================================== */}
      <section>
        <div className="drone-services-title mt-5 py-4 d-none d-sm-block d-sm-none d-md-block">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="drone-humble-drnoe">
                  <h2 className="">
                    N - <span>Labs</span>
                  </h2>
                  <p>
                    Navishkar Labs equips K1-K12 students with the tools for innovative STEM learning.
                    Through hands-on robotics, coding platforms, and engaging resources, they cultivate
                    creativity, problem-solving, and practical skills.{" "}
                  </p>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="drone-humble-drnoe ">
                  <h2 className="">
                    N - <span>Drone Services</span>
                  </h2>
                  <p>Spark your child's interest in STEM with Tinkering Intelli Labs Pvt Ltd's Navishkar drone workshop.
                    Kids will gain hands-on experience building and flying drones while
                    developing critical thinking and problem-solving skills.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="video-title d-none d-sm-block d-sm-none d-md-block">
          <div className="row">
            <div className="col-lg-6">
              <video
                autoPlay
                loop
                muted
                className="frontend-video"
                style={{ width: "100%", height: "100%", objectFit: "cover" }}
              >
                <source src="product/video/navishkar.mp4" type="video/mp4" />
              </video>
            </div>
            <div className="col-lg-6">
              <div className="drone-image">
                <img
                  src="product/DeWatermark.png"
                  style={{ width: "100%", height: "100%" }}
                ></img>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===============================================for mobile==================================== */}
      <section>
        <div className="drone-services-title py-4   d-lg-none d-xl-block d-xl-none d-xxl-block  d-md-none d-lg-block ">
          <div className="container">
            <div className="row">
              <div className="col-lg-6">
                <div className="drone-humble-drnoe ">
                  <h2 className="">
                    N - <span>Labs</span>
                  </h2>
                  <p>
                    Navishkar Labs equips K1-K12 students with the tools for innovative STEM learning.
                    Through hands-on robotics, coding platforms, and engaging resources, they cultivate
                    creativity, problem-solving, and practical skills.{" "}
                  </p>
                </div>
              </div>
              <div className="col-lg-6">
                <video
                  autoPlay
                  loop
                  muted
                  className="frontend-video"
                  style={{ width: "100%", height: "100%", objectFit: "cover" }}
                >
                  <source src="product/video/navishkar.mp4" type="video/mp4" />
                </video>
              </div>
              <div className="col-lg-6">
                <div className="drone-humble-drnoe mt-3">
                  <h2 className="">
                    N - <span>Drone Services</span>
                  </h2>
                  <p>Spark your child's interest in STEM with Tinkering Intelli Labs Pvt Ltd's Navishkar drone workshop.
                    Kids will gain hands-on experience building and flying drones while
                    developing critical thinking and problem-solving skills.</p>
                </div>
              </div>
              <div className="col-lg-6">
                <div className="drone-image">
                  <img
                    src="product/DeWatermark.png"
                    style={{ width: "100%", height: "100%" }}
                  ></img>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* +++++++++++++++++++++++++++++++++++++++++++++++++++++Feature-topics+++++++++++++++++++++++++++++++++++++++++ */}

      <div className="feature-topic-title mt-5">
        <div className="feature-heading">
          <h3 className="fw-bolder text-center text-uppercase">Today’s Highlights</h3>
        </div>
      </div>
      <section className="shopbyintrest mt-5">
        <div className="container">
          <div className="row mt-5">
            <div className="col-lg-12">
              <Carousel
                slide={true}
                interval={3000}
                controls={false} // Hide left and right arrows
              >
                {instaData.map((item, index) => {
                  // Group the items in sets of 4
                  if (index % 4 === 0) {
                    const groupedItems = instaData.slice(index, index + 4);
                    return (
                      <Carousel.Item key={index}>
                        <div className="d-flex justify-content-between flex-d">
                          {groupedItems.map((videoItem, videoIndex) => (
                            <div className="carousel-item-video" key={videoIndex}>
                              <video width="100%" height="400" controls>
                                <source src={videoItem.media_url} type="video/mp4" />
                                Your browser does not support the video tag.
                              </video>
                            </div>
                          ))}
                        </div>
                      </Carousel.Item>
                    );
                  }
                  return null;
                })}
              </Carousel>
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
                        SHOP BY <span>{category.name && category.name.toUpperCase()}{" "}</span>
                      </h5>
                    </div>

                    {/* Tabs and Tab Panels */}
                    <div className="tabs-container">
                      {category.childes && category.childes.length > 0 ? (
                        <TabContext value={activeTab[categoryIndex] || "0"} >
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
                            <TabPanel key={child.id} value={index.toString()} className={`tab-content display-block-${index}`} style={{ display: "none" }}>
                              {loadingTabs[categoryIndex] ? (
                                <div className="home-loading-overlay">
                                  <div className="home-spinner-container text-center">
                                    <div className="home-spinner"></div>
                                  </div>
                                </div>
                              ) : child.products && child.products.length > 0 ? (
                                child.products.map((product) => (
                                  <Card
                                    key={product.id}
                                    id={product.id}
                                    imageUrl={`https://admin.navishkar.com/public/assets/back-end/product/thumbnail/${product.thumbnail || ""}`}
                                    name={product.name}
                                    discount={product.discount}
                                    price={product.unit_price}
                                    onClick={() => handleCardClick(product.slug)}
                                    onAddToCart={() => handleAddToCart(product.id)}
                                    current_stock={product?.current_stock}
                                    rating={product.reviews_count}
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
                                imageUrl={`https://admin.navishkar.com/public/assets/back-end/product/thumbnail/${product.thumbnail || ""}`}
                                name={product.name}
                                price={product.unit_price}
                                discount={product.discount}
                                discount_type={product.discount_type}
                                onClick={() => handleCardClick(product.slug)}
                                onAddToCart={() => handleAddToCart(product.id)}
                                current_stock={product?.current_stock}

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
                  <strong>Product & Services Reviews</strong>

                  {loading ? (
                    <p>Loading...</p>
                  ) : error ? (
                    <p className="error">{error}</p>
                  ) : (
                    <Swiper

                      effect={"coverflow"}
                      grabCursor={true}
                      centeredSlides={true}
                      loop={true}
                      slidesPerView={"1"}
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

                      modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
                      className="swiper_container"
                    >
                      {reviewList.map((review, index) => (
                        <SwiperSlide key={index}>
                          {/* <img src={review.attachment[0]} alt="Review" /> */}
                          <p>{review.comment}</p>
                          <p>{"★".repeat(review.rating)}</p>

                        </SwiperSlide>
                      ))}
                    </Swiper>
                  )}
                </div>
              </div>

              <div className="col-lg-6">
                <div className="swiper-galley">
                  <Swiper

                    effect={"coverflow"}
                    grabCursor={true}
                    centeredSlides={true}
                    loop={true}
                    slidesPerView={"1"}
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

                    modules={[EffectCoverflow, Pagination, Navigation, Autoplay]}
                    className="swiper_container"
                  >
                    {reviewList.map((review, index) => (
                      <SwiperSlide key={index}>
                        {/* <img src={review.attachment[0]} alt="Review" /> */}

                        <img src={review.attachment} alt="Review" />

                      </SwiperSlide>
                    ))}
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
                    {/* <p className="text-white mt-3">
                      Sit amet mauris commodo quis imperdiet massa tincidunt
                      nunc. Tortor id aliquet lectus proin. Turpis nunc eget
                      lorem dolor sed viverra ipsum.
                    </p> */}
                    <ul className="listing-upper-title ">
                      <li className="">
                        <IoMdArrowDropright size={"25px"} />
                        Build with Navishkar: Dive into hands-on learning with DIY robotics kits and expert-led training.
                      </li>
                      <li>
                        <IoMdArrowDropright size={"25px"} />
                        Follow step-by-step guides to create innovative projects and bring your ideas to life.</li>
                      <li>
                        <IoMdArrowDropright size={"25px"} />
                        Enroll in hands-on training sessions and get personalized recommendations based on your skill level.
                      </li>
                      <li>
                        <IoMdArrowDropright size={"25px"} />
                        Gain exclusive benefits, expert insights, and access to Q&A sessions with industry leaders.</li>
                    </ul>
                    <button className="get-set-btn">
                      <Link href="/contactus">Join us <HiArrowLongRight /></Link>
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

      {loadings && (
        <div className="home-loading-overlay">
          <div className="home-spinner-container text-center">
            <div className="home-spinner"></div>
          </div>
        </div>
      )}
    </>
  );
};

export default Home;
