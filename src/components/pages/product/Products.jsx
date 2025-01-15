// src/app/components/Product.js
"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ProductBanner from "@/components/ProductBanner";
import ShopByAge from "@/components/ShopByAge";
import OurAchievment from "@/components/OurAchievment";
import { categories } from "@/redux/Action/category";

const Product = () => {
  const [categoryData, setCategoryData] = useState([]);
  const dispatch = useDispatch();

  const { loading, success, error, category } = useSelector(
    (state) => state.category
  );

  useEffect(() => {
    dispatch(categories());
  }, [dispatch]);

  useEffect(() => {
    if (category && category.length > 0) {
      setCategoryData(category);
    }
  }, [category]);

  return (
    <>
      <ProductBanner
        title="Navishkar - Kids Toy Store"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Experience the joy of learning with our curated toys."
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
