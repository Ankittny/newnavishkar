import React from "react";
import "../../styles/_product.scss";
import Products from "../../components/pages/product/Products";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const Product = () => {
  return (
    <>
    <Navbar/>
     <Products/>
     <Footer/>
    </>
  );
};

export default Product;
