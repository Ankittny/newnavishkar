"use client";
import OurAchievment from "@/components/OurAchievment";
import ProductBanner from "@/components/ProductBanner";
import ShopByAge from "@/components/ShopByAge";
import { categories } from "@/redux/Action/category";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

const Product = () => {
  const [categoryData, setCategoryData] = useState([]);
  const dispatch = useDispatch();

  const {
    loading: isLoading,
    success: isSuccess,
    error,
    category,
  } = useSelector((state) => state.category);

  const fetchData = async () => {
    try {
      dispatch(categories());
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchData(); 
  }, []);

  useEffect(() => {
    if (category && category.length > 0) {
      setCategoryData(category);
    }
  }, [category]);

  // useEffect(() => {
  //   console.log("Loading:", isLoading);
  //   console.log("Success:", isSuccess);
  //   console.log("Error:", error);
  // }, [isLoading, isSuccess, error]);

  return (
    <>
      <ProductBanner
        title="Navishkar - Kids Toy Store"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elitvashcb biiwuhiwq uidh ih uhi iui"
        linkText="Live Demo"
        linkUrl="/demo"
        imageUrl={"/product/productbanner.png"}
      />
  
    
      <ShopByAge categoryData={categoryData} />
      <OurAchievment />
    </>
  );
};

export default Product;