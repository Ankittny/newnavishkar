// src/app/components/SHopByIntrest.js
"use client";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Card from "./card/Card";
import Filter from "./Filter";
import { categoryByAgeGroups } from "@/redux/Action/category";
import { useRouter } from "next/navigation";

const SHopByIntrest = ({ selectedAgeGroup }) => {
  const [filteredCategories, setFilteredCategories] = useState([]);
  const dispatch = useDispatch();
  const router = useRouter();

  const { categoryByAgeGroup } = useSelector((state) => state.category);

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

  return (
    <section className="shop-by-interest-section">
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <Filter />
          </div>
          <div className="col-md-9">
            <div className="shop-by-interest-cards">
              {filteredCategories.length > 0 ? (
                filteredCategories.map((category) => (
                  <Card
                    key={category.id}
                    id={category.id}
                    imageUrl={category.thumbnail_full_url?.path || ""}
                    name={category.name}
                    discount={category.discount}
                    price={category.unit_price}
                    oldPrice={category.purchase_price}
                    onClick={() => handleCardClick(category.slug)}
                  />
                ))
              ) : (
                <p className="shop-by-interest-no-data">
                  No categories available.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SHopByIntrest;
