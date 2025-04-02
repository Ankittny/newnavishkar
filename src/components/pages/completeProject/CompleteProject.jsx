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
import { useParams, usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import BoysToys from "@/components/BoysToys";
import OurAchievement from "@/components/OurAchievment";
import { completeProjectData } from "@/redux/Action/CompleteProject";
import Card from "@/components/card/Card";
import { WorkshopData } from "@/redux/Action/Workshop";


const CompleteProject = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [visibleCount, setVisibleCount] = useState(6);
  const [isExpanded, setIsExpanded] = useState(false);

  const pathname = usePathname(); // Get the full pathname
  const cleanPathname = pathname.startsWith("/") ? pathname.slice(1) : pathname;
  console.log(cleanPathname); // Logs the pathname without the leading "/"


  const { loading, error, cmlproject } = useSelector(
    (state) => state.completeProject
  );

  const navbarCategories = useSelector(
    (state) => state.navbarCategories.navbarCategories
  );

  const projectCategories = navbarCategories.filter(
    (category) =>
      category.type === "n-shop" &&
      category.name.toLowerCase().includes("projects") // Ensure lowercase comparison
  );
  
    console.log("Category Test",projectCategories);

  const firstWorkshop = projectCategories[0];

  useEffect(() => {
    if (firstWorkshop && firstWorkshop.slug) {
      dispatch(WorkshopData(firstWorkshop.slug));
    }
  }, [dispatch, firstWorkshop]);


  console.log("complete data ankit", cmlproject);

  useEffect(() => {
    dispatch(completeProjectData(cleanPathname));
  }, []);

  const handleCardClick = (slug) => {
    router.push(`/products/${slug}`);
  };

  const handleAddToCart = (id) => {
    console.log(`Added to cart: ${id}`);
  };

  const toggleProducts = () => {
    if (isExpanded) {
      setVisibleCount(6); // Show only 6 products again
    } else {
      setVisibleCount(cmlproject.length); // Show all products
    }
    setIsExpanded(!isExpanded);
  };

  return (
    <>
     

      {firstWorkshop && (
        <ProductBanner
        
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
              <h1 className="text-center font-complete">Complete Projects</h1>
            </div>

            <div className="row mt-5">
              {cmlproject.slice(0, visibleCount).map((item) => (
                <div className="col-lg-6" key={item.id}>
                 
                  <Card
                    id={item.id}
                    imageUrl={item.thumbnail_full_url?.path || "/labs/lab1.png"}
                    name={item.name}
                    discount={item.discount || "-15%"}
                    price={item.unit_price || "699"}
                    originalPrice={item.original_price || "799"}
                    onClick={() => handleCardClick(item.slug)}
                    onAddToCart={() => handleAddToCart(item.id)}
                    rating={item?.reviews_avg_rating}
                  />
                </div>
              ))}
            </div>
            {cmlproject.length > 6 && (
              <div className="text-center mt-4">
                <button className="btn btn-primary" onClick={toggleProducts}>
                  {isExpanded ? "See Less" : "See More"}
                </button>
              </div>
            )}
          </div>
        </div>
      </div>


      <OurAchievement />
    </>
  );
};

export default CompleteProject;
