"use client";
import Link from "next/link";
import React from "react";

const ProductBanner = ({ title, description, linkText, linkUrl }) => {
  return (
    <section>
      <div className="productBanner">
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
