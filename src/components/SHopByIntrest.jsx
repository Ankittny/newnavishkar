import React, { useState } from "react";
import Filter from "./Filter";
import Card from "./card/Card";
import { useDispatch, useSelector } from "react-redux";
import { product } from "@/redux/Action/product";

const products = [
  {
    id: 1,
    imageUrl: "/product/product1.png", // Replace with actual image paths
    title: "Play and Learn Kit",
    subtitle: "10  years | DIY Activity Kit",
    discount: 15,
    price: 765,
    oldPrice: 899,
    ageGroup: "10+", // Added ageGroup field
  },
  {
    id: 2,
    imageUrl: "/product/product1.png",
    title: "Play and Learn Kit",
    subtitle: "8-10 years | DIY Kit",
    discount: 10,
    price: 1150,
    oldPrice: 1280,
    ageGroup: "8-10", // Added ageGroup field
  },
  {
    id: 3,
    imageUrl: "/product/product1.png",
    title: "Play and Learn Kit",
    subtitle: "8-10 years | DIY Kit",
    discount: 10,
    price: 1150,
    oldPrice: 1280,
    ageGroup: "8-10", // Added ageGroup field
  },
  {
    id: 4,
    imageUrl: "/product/product1.png",
    title: "Play and Learn Kit",
    subtitle: "8-10 years | DIY Kit",
    discount: 10,
    price: 1150,
    oldPrice: 1280,
    ageGroup: "8-10", // Added ageGroup field
  },
  {
    id: 5,
    imageUrl: "/product/product1.png",
    title: "Play and Learn Kit",
    subtitle: "10+ years | DIY Kit",
    discount: 20,
    price: 2000,
    oldPrice: 2500,
    ageGroup: "10+", // Added ageGroup field
  },
];

const SHopByIntrest = ({ selectedAgeGroup }) => {
  // const [products, setProducts] = useState("");

  // const dispatch = useDispatch();

  // const { loading: isLoading, success: isSuccess } = useSelector(
  //   (state) => state.product
  // );

  // const fetchProductList = async () => {
  //   const data = dispatch(product);
  //   console.log(data);
  //   setProducts(data);
  // };

  const filteredProducts = products.filter(
    (product) => product.ageGroup === selectedAgeGroup
  );

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
                <p>A whole lotta fun & learning</p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-4">
              <Filter />
            </div>

            <div className="col-8">
              <div className="card-container">
                {filteredProducts.map((product) => (
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
