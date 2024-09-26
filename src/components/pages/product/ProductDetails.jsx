"use client"
import ProductBanner from "@/components/ProductBanner";
import Image from "next/image";
import Link from "next/link";
import React, { useState } from "react";
import CertificateLogo from "../../../../assets/product/Mark1.png";
import StarIcon from "@mui/icons-material/Star";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import DangerImage from "../../../../assets/product/image66.png";
import Minos from "../../../../assets/product/minoscer.png";
import FavoriteIcon from '@mui/icons-material/Favorite';
import {
  Box,
  Card,
  CardMedia,
  CardContent,
  Typography,
  Grid,
  Avatar,
} from "@mui/material";
import productDetailBanner from "../../../../assets/product/productDetailBanner.png"

const ProductDetails = () => {

  const [mainImage, setMainImage] = useState('https://www.w3schools.com/html/img_chania.jpg');

  const thumbnails = [
    'https://www.w3schools.com/html/pic_trulli.jpg',
    'https://www.w3schools.com/html/html5.gif',
    'https://www.w3schools.com/html/img_chania.jpg',
    
  ];
  const handleImageError = (e) => {
    e.target.src = "https://via.placeholder.com/340"; // Replace with any fallback image
  };

  return (
    <>
      <div className="">
        <ProductBanner imageUrl={productDetailBanner}  />
      </div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-12 text-center proudctDetailHeading">
            <h1 className="">Navishkar The Leading Brand</h1>
          </div>
          <div className="d-flex gap-2">
            <p className="productCategory">Category</p> /
            <span>
              <p className="productCategory">SubCategory</p>
            </span>
          </div>

          <div className="row mt-3">
            <div className="col-6 d-flex justify-content-end">
            <Box sx={{ padding: "20px" }}>
                {/* Main Product Card */}
                <Card sx={{ maxWidth: 345, position: "relative" }}>
                  <CardMedia
                    component="img"
                    height="340"
                    image={mainImage} // Display the selected image
                    alt="Products"
                    onError={handleImageError}
                  />
                </Card>

                {/* Thumbnails */}
                <Grid container spacing={2} sx={{ marginTop: "20px" }}>
                  {thumbnails.map((thumb, index) => (
                    <Grid item xs={3} key={index}>
                      <CardMedia
                        component="img"
                        height="100"
                        image={thumb}
                        alt={`Thumbnail ${index + 1}`}
                        onClick={() => setMainImage(thumb)}  
                        style={{ cursor: "pointer" }}  
                        onError={handleImageError} 
                      />
                    </Grid>
                  ))}
                </Grid>
              </Box>
            </div>
            <div className="col-6">
              <div class="motonove-right-title">
               <div className="d-flex justify-content-between">
               <h3>Motonova</h3> <span><FavoriteIcon sx={{fontSize: 35, color:'red'}} /></span>
               </div>
                <p className="">
                  A green energy product that generates energy by the inertia of
                  the flywheel.
                </p>
                <div class="motonova-highlight">
                  <span>Highlights</span>
                  <div class="wheel-balance d-flex gap-3">
                    <ul>
                      <li>
                        <Link href="">Monowheel Balance</Link>
                      </li>
                      <li>
                        <Link href="">Green Energy</Link>
                      </li>
                      <li>
                        <Link href="">Green Energy</Link>
                      </li>
                      <li>
                        <Link href="">Easy Assembly</Link>
                      </li>
                    </ul>
                    <Image
                      src={CertificateLogo}
                      alt="ddd"
                      width={100}
                      height={100}
                    />
                  </div>
                  <div class="rating-title mt-3">
                    <span>Rating</span>
                    <p>50+ bought in past month</p>
                  </div>
                </div>

                <div class="full-rating">
                  <div class="reting-create-price">
                    <h3>₹ 1999</h3>
                    <span>M.R.P.: ₹2,654</span> <br />
                    <StarIcon />
                  </div>
                  <div class="rating-star">
                    <span>Navishkar</span>
                    <p>Inclusive of all taxes</p>
                  </div>
                  <div class="free-delivery-date d-flex">
                    <div>
                      <LocalShippingIcon
                        sx={{ fontSize: 40, color: "#175A95" }}
                      />
                      <p style={{ fontSize: "15px" }} className="m-0">
                        Free Delivery
                      </p>
                    </div>
                    <div>
                      <LocalShippingIcon
                        sx={{ fontSize: 40, color: "#175A95" }}
                      />
                      <p style={{ fontSize: "15px" }} className="m-0">
                        Free Delivery
                      </p>
                    </div>
                  </div>
                  <div class="ic0n-about-trust">
                    <h3>About this item</h3>
                    <h4>
                      Let it go and try how far and how stable your MOTONOVA can
                      run!
                    </h4>
                    <p>
                      A green energy product that generates energy by the
                      inertia of the flywheel. After the force is applied, the
                      magic flywheel acts to stand up, and releases the power
                      with rotational kinetic energy to drive the gearbox. It
                      can drive stably and lastingly on a flat surface and roll
                      forward 15 meters with balance! Through assembling by
                      yourself, you can better understand the mechanism of the
                      gearbox. The transparent gearbox can be clearly seen how
                      the internal mechanism works so as to learn interesting
                      scientific principles while playing.
                    </p>
                    <h3>Additional Tools Required</h3>
                    <ul>
                      <li>Screwdriver (PH1 size)</li>
                      <li>Diagonal Pliers</li>
                    </ul>
                  </div>
                  <div class="ic0n-about-trust">
                    <h3>What is inside the box?</h3>
                    <ul>
                      <li>Plastic Parts (2 stencils)</li>
                      <li>Tire Skins</li>
                      <li>Instruction Manual Book</li>
                      <li>Mechanical and Electronic Parts</li>
                    </ul>
                  </div>
                  <div class="mt-gera-title">
                    <span>M1</span>
                    <p>White gear</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="image-sec-66 d-flex justify-content-center align-content-center">
              <Image src={DangerImage} alt="danger" />
            </div>

            <div className="row mt-2">
              <div className="col-4">
                <div class="mini-img-minos">
                  <Image src={Minos} alt="" />
                  <p class="text-center">Introducing MINOS</p>
                </div>
              </div>
              <div className="col-4">
                <div class="mini-img-minos">
                  <Image src={Minos} alt="" />
                  <p class="text-center">Introducing MINOS</p>
                </div>
              </div>
              <div className="col-4">
                <div class="mini-img-minos">
                  <Image src={Minos} alt="" />
                  <p class="text-center">Certificate</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
