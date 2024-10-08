"use client"
import React from 'react';
import ProductDetailsComponent  from '@/components/pages/product/ProductDetails';
import {Metadata} from "next";


const ProductDetails = ({params}) => {
  console.log("params slug", params);
  
  return ( 
    <>
    <ProductDetailsComponent  params={params} />
    </>
  )
}

export default ProductDetails