import OurAchievment from "@/components/OurAchievment";
import ProductBanner from "@/components/ProductBanner";
import ShopByAge from "@/components/ShopByAge";
import React from "react";


const product = () => {

  return (
    <>
      <ProductBanner
        title="Navishkar - Kids Toy Store"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elitvashcb biiwuhiwq uidh ih uhi iui "
        linkText="Live Demo"
        linkUrl="/demo"
        imageUrl = {'/product/productbanner.png'}
      />
      <ShopByAge />
      <OurAchievment />
    </>
  );
};

export default product;
