"use client"
import React, { useEffect, useState } from "react";
import Filter from "./Filter";
import Card from "./card/Card";
import { useDispatch, useSelector } from "react-redux";
import { categoryByAgeGroups } from "@/redux/Action/category";
import { useRouter } from "next/navigation";

const SHopByIntrest = ({ selectedAgeGroup }) => {
  const [filteredCategories, setFilteredCategories] = useState([]);
  const dispatch = useDispatch();
  const router = useRouter();

  
  const {
    loading: isLoading,
    error,
    categoryByAgeGroup, 
  } = useSelector((state) => state.category);

  useEffect(() => {
    if (selectedAgeGroup) {
      dispatch(categoryByAgeGroups(selectedAgeGroup));
    }
  }, [dispatch, selectedAgeGroup]);

  
  useEffect(() => {
    if (categoryByAgeGroup) {
      setFilteredCategories(categoryByAgeGroup);
    }
  }, [categoryByAgeGroup]);

  const handleCardClick = (slug) => {
    router.push(`/products/${slug}`);
  };

  console.log("hvbdj",filteredCategories)

  return (
    <>
      <section className="shopbyintrest">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="shop-by-title text-center">
                <h5>
                  SHOP BY <span>INTEREST</span>
                </h5>
                <p>A whole lotta fun & learning</p>
              </div>
            </div>
          </div>

          <div className="row">
            <div className="col-4">
              <Filter />
            </div>

            <div className="col-8 curser">
              <div className="card-container">
                {isLoading && <div>Loading...</div>}
                {error && <div>Error: {error}</div>}
                {!isLoading && !error && filteredCategories?.length === 0 && (
                  <div>No products found for this age group.</div>
                )}
                {filteredCategories?.map((category) => (
                  <Card
                    key={category.id}
                    id={category.id} 
                    imageUrl={category.imagesl}
                    title={category.name}
                    discount={category.discount}
                    price={category.price}
                    oldPrice={category.oldPrice}
                    onClick={() => handleCardClick(category.slug)}
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