import OurAchievment from "@/components/OurAchievment";
import ProductBanner from "@/components/ProductBanner";
import ShopByAge from "@/components/ShopByAge";
import SHopByIntrest from "@/components/SHopByIntrest";
import React from "react";


const product = () => {
  return (
    <>
      <ProductBanner
        title="Navishkar - Kids Toy Store"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elitvashcb biiwuhiwq uidh ih uhi iui "
        linkText="Live Demo"
        linkUrl="/demo"
        imageUrl = {'/public/product/productbanner.png'}
      />
      <ShopByAge />
      <SHopByIntrest />
      <OurAchievment />
    </>
  );
};

export default product;
