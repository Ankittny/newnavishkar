import React, { useEffect, useState } from "react";
import Card from "./card/Card";
import { useDispatch, useSelector } from "react-redux";
import {
  categoryByAgeGroups,
  FilterCategory,
  FilterSubCategory,
} from "@/redux/Action/category";
import { useRouter } from "next/navigation";
import BoysToys from "./BoysToys";
import SortOptions from "./SortOptions";
import { Divider } from "@mui/material";

const ShopByIntrest = ({ selectedAgeGroup, selectedCategory }) => {
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [isFilterActive, setIsFilterActive] = useState(false); // Track if a filter is active
  const dispatch = useDispatch();
  const router = useRouter();
  const { categoryByAgeGroup, filterSubCategories } = useSelector((state) => state.category);
  const [loadings, setLoadings] = useState(false);

  console.log("filteredCategories:", filteredCategories); // Debugging
  console.log("isFilterActive:", isFilterActive); // Debugging

  // Fetch categories by age group (default data)
  useEffect(() => {
    if (selectedAgeGroup) {
      dispatch(categoryByAgeGroups(selectedAgeGroup));
    }
  }, [dispatch, selectedAgeGroup]);

  // Fetch categories by selected category
  useEffect(() => {
    if (selectedCategory) {
      dispatch(FilterSubCategory(selectedCategory));
    }
  }, [dispatch, selectedCategory]);

  // Update filtered categories when categoryByAgeGroup changes
  useEffect(() => {
    if (categoryByAgeGroup?.length) {
      setFilteredCategories(categoryByAgeGroup);
      setIsFilterActive(false);
    }
  }, [categoryByAgeGroup]);

  // Update filtered categories when filterSubCategory changes
  useEffect(() => {
    if (filterSubCategories?.length) {
      setFilteredCategories(filterSubCategories);
      setIsFilterActive(true);
    }
  }, [filterSubCategories]);

  const handleCardClick = (slug) => {
    setLoadings(true);
    setTimeout(() => {
      setLoadings(false);
      router.push(`/products/${slug}`);
    }, 2000);
  };

  return (
    <section className="shopbyintrest mt-4">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <h5>
              SHOP BY <span>INTEREST</span>
            </h5>
            {/* <p>A whole lotta fun & learning</p> */}
          </div>
        </div>

        <div className="row dr-title mt-4">
          <div className="col-lg-3">
            <BoysToys />
            <Divider />
          </div>

          <div className="col-lg-9">
            <div className="row">
              <SortOptions />
            </div>
            <div className="card-container">
              {filteredCategories.length > 0 ? (
                filteredCategories.map((category, index) => (
                  <Card
                    key={category.id || index}
                    id={category.id}
                    imageUrl={category.thumbnail_full_url?.path || "/fallback-image.png"}
                    name={category?.name}
                    discount={category?.discount}
                    price={category?.unit_price}
                    oldPrice={category?.purchase_price}
                    onClick={() => handleCardClick(category?.slug)}
                    discount_type={category?.discount_type}
                    current_stock={category?.current_stock}
                    rating={category?.reviews_avg_rating}
                  />
                ))
              ) : (
                <p>No categories available.</p>
              )}
            </div>
          </div>
        </div>
      </div>

      {loadings && (
        <div className="home-loading-overlay">
          <div className="home-spinner-container text-center">
            <div className="home-spinner"></div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ShopByIntrest;
