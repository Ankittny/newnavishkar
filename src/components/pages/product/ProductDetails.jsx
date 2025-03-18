"use client";
import ProductBanner from "@/components/ProductBanner";
import Image from "next/image";
import Link from "next/link";
import React, { useState, useEffect } from "react";
import StarIcon from "@mui/icons-material/Star";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import FavoriteIcon from "@mui/icons-material/Favorite";
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Avatar,
} from "@mui/material";

import OurAchievement from "@/components/OurAchievment";
import Certificate from "@/components/Certificate";
import { useDispatch, useSelector } from "react-redux";
import { CategoryDetail } from "@/redux/Action/category";
import BoysToys from "@/components/BoysToys";
import { useParams } from "next/navigation";
import RelatedProduct from "@/components/RelatedProduct";
import { Button } from "react-bootstrap";
import { addToCart } from "@/redux/Reducer/Cart";
import axios from "axios";
import toast from "react-hot-toast";

const ProductDetails = () => {
  const { productid } = useParams();
  console.log("Product slug ID:", productid);

  const dispatch = useDispatch();
  const {
    loading: isLoading,
    success: isSuccess,
    error,
    categoryDetail,
  } = useSelector((state) => state.category);

  const [categryDetailData, setCategoryDetailData] = useState(null);
  const [mainImage, setMainImage] = useState(null);



  const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/340"; // Fallback image
  };

  const fetchDataById = async () => {
    try {
      dispatch(CategoryDetail(productid));
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchDataById();
  }, [productid]);

  useEffect(() => {
    if (categoryDetail) {
      console.log("categoryDetail shalu", categoryDetail);
      setCategoryDetailData(categoryDetail);

      // Set the first image from images_full_url as the main image
      if (categoryDetail.images_full_url?.length > 0) {
        setMainImage(categoryDetail.images_full_url[0].path);
      }
    }
  }, [categoryDetail]);

  console.log("Categories ssssssss Detail Data:", categryDetailData);
  console.log("rahul", categoryDetail);
  // console.log("PDF URL:", categryDetailData?.pdf_doc_path);


  const videoUrl = categryDetailData?.video_url;
  console.log("Video URL:", videoUrl);

  const getEmbedUrl = (url) => {
    if (!url) return null;

    // Extract the video ID using regex
    const videoIdMatch = url.match(/(?:\?v=|\/embed\/|\/v\/|\/watch\?v=|\/youtu.be\/|\/shorts\/)([^&?/]+)/);
    const videoId = videoIdMatch ? videoIdMatch[1] : null;

    return videoId ? `https://www.youtube.com/embed/${videoId}` : null;
  };

  const embedUrl = getEmbedUrl(videoUrl);

  
  const [quantity, setQuantity] = useState(1);

  const handleIncrease = () => {
    setQuantity((prev) => prev + 1);
  };

  const handleDecrease = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : 1));
  };


  // const handleAddToCart = async () => {
  //   const token = localStorage.getItem("authAdminToken");
  //   try {
  //     const response = await axios.post(
  //       "https://navishkar.overseaseducationlane.com/api/v1/cart/add",
  //       {
  //         id: categoryDetail.id,
  //         quantity: quantity,
  //       },
  //       {
  //         headers: {
  //           "Content-Type": "application/json",
  //           Authorization: `Bearer ${token}`,
  //         },
  //       }
  //     );

  //     if (response.status === 200) {
  //       console.log("Item added successfully:", categoryDetail.id);
  //       dispatch(
  //         addToCart({
  //           id: categoryDetail.id,
  //           name: categoryDetail.name,
  //           price: categoryDetail.unit_price,
  //           image: mainImage,
  //           quantity,
  //         })
  //       );
  //     } else {
  //       console.error("Error adding item to cart", response.data.message || "Error");
  //     }
  //   } catch (error) {
  //     console.error("Error sending cart data:", error);
  //   }
  // };

  const handleAddToCart = async () => {
    const token = localStorage.getItem("authAdminToken");

    if (!token) {
      toast.error("Please login to add items to the cart.");
      return;
    }

    try {
      const response = await axios.post(
        "https://admin.navishkar.com/api/v1/cart/add",
        { id: categoryDetail.id, quantity },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.data.status === 0) {
        toast.error(response.data.message || "Out of stock!");
        return;
      }

      if (response.status === 200) {
        dispatch(
          addToCart({
            id: categoryDetail.id,
            name: categoryDetail.name,
            price: categoryDetail.unit_price,
            image: mainImage,
            quantity,
          })
        );
        toast.success("Item added to cart successfully!");
      } else {
        toast.error("Failed to add item to cart.");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "An error occurred while adding to cart.");
    }
  };


  const handleBuyNow = () => {
    console.log("Buying now:", { productId: categryDetailData?.id, quantity });
    alert("Buy Now clicked");
  };


  return (
    <>
      {/* <div className="">
        <ProductBanner
          imageUrl={
            categryDetailData?.thumbnail_full_url?.path ||
            "/product/productDetailBanner.png"
          }
        />
      </div> */}
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="mt-5">
              <div className="col-md-12 text-center approvel-grand proudctDetailHeading">
                <h1 className="">Navishkar The Leading Brand</h1>
              </div>

              <div className="row mt-3">
                <div className="col-md-6 box-sh">
                  <Box sx={{ padding: "20px" }}>
                    {/* Main Product Card */}
                    <CardMedia
                      component="img"
                      image={mainImage} // Display the selected image
                      alt="Products"
                      onError={handleImageError}
                    />

                    {/* Thumbnails */}
                    <Grid container spacing={2} sx={{ marginTop: "20px" }}>
                      {categryDetailData?.images_full_url?.map(
                        (thumb, index) => (
                          <Grid item xs={3} key={index}>
                            <CardMedia
                              component="img"
                              height="100"
                              image={thumb.path}
                              alt={`Thumbnail ${index + 1}`}
                              onClick={() => setMainImage(thumb.path)}
                              style={{ cursor: "pointer" }}
                              onError={handleImageError}
                            />
                          </Grid>
                        )
                      )}
                    </Grid>
                  </Box>


                </div>


                <div className="col-md-6">
                  <div className="motonove-right-title">
                    <div className="d-flex gap-5">
                      <h3>
                        {categryDetailData
                          ? categryDetailData.name
                          : "Loading..."}
                      </h3>
                    </div>
                    <p

                      dangerouslySetInnerHTML={{
                        __html:
                          categryDetailData?.short_description ||
                          "<p>Loading sort description...</p>",
                      }}>

                    </p>
                    <div className="motonova-highlight">
                      <span>Highlights</span>
                      <div className="wheel-balance d-flex gap-3 mt-3">
                        <ul>
                          {categryDetailData?.tags?.map((tag, index) => (
                            <li key={index}>{tag.tag}</li>
                          ))}
                        </ul>

                        <Image
                          src={"/product/Mark1.png"}
                          alt="Mark1"
                          width={80}
                          height={80}
                        />
                      </div>
                    </div>

                    <div className="full-rating">
                      <div className="reting-create-price">
                        <h3>₹ {categryDetailData?.
                          unit_price || "1999"}</h3>
                        <span>
                          M.R.P.: ₹{categryDetailData?.unit_price || "2,654"}
                        </span>
                      </div>


                      {/* Button */}

                      <div className="quantity-container mt-3">
                        <div className="quantity-control d-flex align-items-center gap-2">
                          <button onClick={handleDecrease} className="btn btn-outline-primary">-</button>
                          <span>{quantity}</span>
                          <button onClick={handleIncrease} className="btn btn-outline-primary">+</button>
                        </div>
                        <div className="button-container mt-3 d-flex gap-3">
                          <button className="btn btn-primary" onClick={handleAddToCart}>
                            Add to Bag
                          </button>
                          <button onClick={handleBuyNow} className="btn btn-danger">Buy Now</button>
                        </div>
                      </div>

                      <div className="rating-star mt-2">
                        <span>Navishkar</span>
                        <p>Inclusive of all taxes</p>
                      </div>
                      <div className="free-delivery-date d-flex">
                        <div>
                          <LocalShippingIcon
                            sx={{ fontSize: 40, color: "#175A95" }}
                          />
                          <p style={{ fontSize: "15px" }} className="m-0">
                            Free Delivery
                          </p>
                        </div>
                      </div>
                      <div className="ic0n-about-trust">
                        <h3>About this item</h3>
                        <div
                          dangerouslySetInnerHTML={{
                            __html:
                              categryDetailData?.details ||
                              "<p>Loading description...</p>",
                          }}
                        />
                      </div>

                      <div className="ic0n-about-trust">
                        <h3>What is inside the box?</h3>
                        <ul
                          dangerouslySetInnerHTML={{
                            __html:
                              categryDetailData?.what_is_inside_the_box ||
                              "<li>No items available</li>",
                          }}
                        ></ul>
                      </div>
                      <div className="mt-gera-title">
                        <span>M1</span>
                        <p>White gear</p>
                      </div>
                    </div>
                  </div>
                </div>


              </div>
            </div>
          </div>
        </div>


        <div className="image-sec-66 d-flex justify-content-center align-content-center ">
          <Image
            src={"/product/image66.png"}
            width={500}
            height={200}
            alt="danger"
          />
        </div>



        <div className="row mt-2 ">
          <div className="col-md-4">
            <div className="mini-img-minos">
              <Image
                src={categryDetailData?.certificate_path || "/product/productDetailBanner.png"}
                width={300}
                height={200}
                alt="Mark1"
                className=""
              />

              <button className="mt-2">
                <Link href="#" target="_blank" rel="noopener noreferrer">
                  Download Certificate
                </Link>
              </button>

            </div>
          </div>

          <div className="col-md-4">
            <div className="mini-img-minos">
              {/* Check if pdf_doc_path exists before rendering */}
              {categryDetailData?.pdf_doc_path ? (
                <>
                  <Image
                    src={'/PDF.png'}  // ✅ Correct path
                    width={300}
                    height={200}
                    alt="Mark1"
                  />

                  {/* Download Button */}
                  <button className="mt-2">
                    <Link href={categryDetailData?.pdf_doc_path} target="_blank" rel="noopener noreferrer">
                      Download PDF
                    </Link>
                  </button>
                </>
              ) : (
                <p>PDF not available</p>
              )}
            </div>
          </div>

          <div className="col-md-4">
            <div className="mini-img-minos">
              {/* Embedded YouTube Video */}
              {embedUrl ? (
                <iframe
                  width="300"
                  height="200"
                  src={embedUrl} // ✅ Corrected embed URL
                  title="YouTube Video"
                  frameBorder="0"
                  allowFullScreen
                ></iframe>
              ) : (
                <p>Loading video...</p>
              )}

              {/* Watch on YouTube Button */}
              {videoUrl && (
                <Link href={videoUrl} target="_blank" rel="noopener noreferrer" className="mt-2">
                  <button>Watch on YouTube</button>
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Related Products */}

      <RelatedProduct productId={categryDetailData?.id} />

      <OurAchievement />
    </>
  );
};

export default ProductDetails;
