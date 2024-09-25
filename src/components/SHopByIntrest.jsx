import React from "react";
import Filter from "./Filter";
import Card from "./card/Card";
import product1 from "../../assets/product/product1.png";

const products = [
  {
    id: 1,
    imageUrl: product1, // Replace with actual image paths
    title: "Play and Learn Kit",
    subtitle: "4-8 years | DIY Activity Kit",
    discount: 15,
    price: 765,
    oldPrice: 899,
  },
  {
    id: 2,
    imageUrl: product1,
    title: "Play and Learn Kit",
    subtitle: "6-12 years | DIY Kit",
    discount: 10,
    price: 1150,
    oldPrice: 1280,
  },
  {
    id: 3,
    imageUrl: product1,
    title: "Play and Learn Kit",
    subtitle: "6-12 years | DIY Kit",
    discount: 10,
    price: 1150,
    oldPrice: 1280,
  },
  
];
const SHopByIntrest = () => {
  return (
    <>
      <section className="shopbyintrest">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="shop-by-title text-center">
                <h5>
                  SHOP BY <span>INTREST</span>
                </h5>
              </div>
            </div>
          </div>

          <div className="row ">
            <div className="col-4">
              <Filter />
            </div>

            <div className="col-8">
              {/* <div className="row">
              <div className="col-lg-4">   {products.map((product) => (
                <Card
                  key={product.id}
                  imageUrl={product.imageUrl}
                  title={product.title}
                  subtitle={product.subtitle}
                  discount={product.discount}
                  price={product.price}
                  oldPrice={product.oldPrice}
                />
              ))}</div>
             
            </div> */}
              <div className="card-container">
                {products.map((product) => (
                  <Card
                    key={product.id}
                    imageUrl={product.imageUrl}
                    title={product.title}
                    subtitle={product.subtitle}
                    discount={product.discount}
                    price={product.price}
                    oldPrice={product.oldPrice}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default SHopByIntrest;
