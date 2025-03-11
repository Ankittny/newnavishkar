// src/app/components/Product.js
"use client";
import OurAchievment from "@/components/OurAchievment";
import ProductBanner from "@/components/ProductBanner";
import ShopByAge from "@/components/ShopByAge";
import { categories } from "@/redux/Action/category";
import { WorkshopData } from "@/redux/Action/Workshop";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Product = () => {
  const [categoryData, setCategoryData] = useState([]);
  const dispatch = useDispatch();
  const { loading: isLoading, success: isSuccess, error, category } = useSelector(
    (state) => state.category
  );

  const fetchData = async () => {
    try {
      dispatch(categories());
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [dispatch]);

  useEffect(() => {
    if (category && category.length > 0) {
      setCategoryData(category);
    }
  }, [category]);

  const navbarCategories = useSelector(
      (state) => state.navbarCategories.navbarCategories
    );
  
    const projectCategories = navbarCategories.filter(
      (category) =>
        category.type === "n-shop" &&
        category.name.toLowerCase().includes("products") // Ensure lowercase comparison
    );
    
      console.log("Category Test",projectCategories);
  
    const firstWorkshop = projectCategories[0];
  
    useEffect(() => {
      if (firstWorkshop && firstWorkshop.slug) {
        dispatch(WorkshopData(firstWorkshop.slug));
      }
    }, [dispatch, firstWorkshop]);
  

  return (
    <>
        {firstWorkshop && (
        <ProductBanner
          
          linkText="Live Demo"
          linkUrl="/demo"
          imageUrl={firstWorkshop.cover_pic_path || "/labs/labBanner.png"} // Default to a placeholder if imageUrl is missing
        />
      )}
      <ShopByAge categoryData={categoryData} />
      <OurAchievment />
    </>
  );
};

export default Product;
