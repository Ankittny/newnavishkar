"use client"
import React from 'react';
import ProductDetailsComponent  from '@/components/pages/product/ProductDetails';
import {Metadata} from "next";
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';


const ProductDetails = ({params}) => {
  console.log("params slug", params);
  
  return ( 
    <>
    <Navbar/>
    <ProductDetailsComponent  params={params} />
    <Footer/>
    </>
  )
}

export default ProductDetails