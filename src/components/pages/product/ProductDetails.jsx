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

  return (
    <>
      <div className="">
        <ProductBanner
          imageUrl={
            categryDetailData?.thumbnail_full_url?.path ||
            "/product/productDetailBanner.png"
          }
        />
      </div>
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="container mt-5">
              <div className="row">
                <div className="col-md-12 text-center proudctDetailHeading">
                  <h1 className="">Navishkar The Leading Brand</h1>
                </div>

                <div className="row mt-3">
                  <div className="col-md-5">
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
                  <div className="col-md-7">
                    <div className="motonove-right-title">
                      <div className="d-flex gap-5">
                        <h3>
                          {categryDetailData
                            ? categryDetailData.name
                            : "Loading..."}
                        </h3>
                      </div>
                      <p>
                        A green energy product that generates energy by the
                        inertia of the flywheel.
                      </p>
                      <div className="motonova-highlight">
                        <span>Highlights</span>
                        <div className="wheel-balance d-flex gap-3 mt-3">
                          <ul>
                            <li>
                              <Link href="">Monowheel Balance</Link>
                            </li>
                            <li>
                              <Link href="">Green Energy</Link>
                            </li>
                            <li>
                              <Link href="">Easy Assembly</Link>
                            </li>
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
                          <h3>₹ {categryDetailData?.price || "1999"}</h3>
                          <span>
                            M.R.P.: ₹{categryDetailData?.mrp || "2,654"}
                          </span>
                        </div>
                        <div className="rating-star">
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
                          <ul>
                            <li>Plastic Parts (2 stencils)</li>
                            <li>Tire Skins</li>
                            <li>Instruction Manual Book</li>
                            <li>Mechanical and Electronic Parts</li>
                          </ul>
                        </div>
                        <div className="mt-gera-title">
                          <span>M1</span>
                          <p>White gear</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="image-sec-66 d-flex justify-content-center align-content-center">
                    <Image
                      src={"/product/image66.png"}
                      width={100}
                      height={100}
                      alt="danger"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="row mt-2 ">
          <div className="col-md-4">
            <Certificate
              title={"Intoducing MINOS"}
              imageUrl={"/product/minoscer.png"}
              linkText="Buy Now"
              linkUrl="/demo"
            />
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
