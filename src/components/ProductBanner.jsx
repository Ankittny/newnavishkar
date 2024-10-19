"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductBanner = ({ title, description, linkText, linkUrl,imageUrl}) => {
  return (
    <section>
      <div className="productBanner">
      {imageUrl && <Image src={imageUrl} width={1000} height={400} alt="Product Image" className="product-image" />}
        <div className="navi-title">
          {title && <h1>{title}</h1>}
          {description && <p>{description}</p>}
          {linkText && linkUrl && (
            <button className="mt-3">
              <Link href={linkUrl}>{linkText}</Link>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductBanner;
