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

const ShopByIntrest = ({ selectedAgeGroup }) => {
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [selectedSubcategory, setSelectedSubcategory] = useState(null);
  const dispatch = useDispatch();
  const { categoryByAgeGroup, filterSubCategory } = useSelector((state) => state.category);

  // Fetch categories by age group
  useEffect(() => {
    if (selectedAgeGroup) {
      dispatch(categoryByAgeGroups(selectedAgeGroup));
    }
  }, [dispatch, selectedAgeGroup]);

  // Update filtered categories when categoryByAgeGroup changes
  useEffect(() => {
    if (categoryByAgeGroup?.length) {
      setFilteredCategories(categoryByAgeGroup);
    }
  }, [categoryByAgeGroup]);

  // Fetch subcategory data when a subcategory is selected
  useEffect(() => {
    if (selectedSubcategory) {
      dispatch(FilterSubCategory(selectedSubcategory));
    }
  }, [dispatch, selectedSubcategory]);

  // Update filtered categories when filterSubCategory changes
  useEffect(() => {
    if (filterSubCategory?.length) {
      setFilteredCategories(filterSubCategory);
    }
  }, [filterSubCategory]);

  // Handle subcategory click from BoysToys
  const handleSubcategoryClick = (subcategorySlug) => {
    setSelectedSubcategory(subcategorySlug);
  };

  return (
    <section className="shopbyintrest mt-4">
      <div className="container">
        <div className="row">
          <div className="col-12 text-center">
            <h5>
              SHOP BY <span>INTEREST</span>
            </h5>
            <p>A whole lotta fun & learning</p>
          </div>
        </div>

        <div className="row dr-title mt-4">
          {/* Sidebar */}
          <div className="col-md-3">
            <BoysToys onSubcategoryClick={handleSubcategoryClick} />
            <Divider />
          </div>

          {/* Main Content */}
          <div className="col-md-9">
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
                    discount_type={category?.discount_type}
                    current_stock={category?.current_stock}
                  />
                ))
              ) : (
                <p>No categories available.</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopByIntrest;