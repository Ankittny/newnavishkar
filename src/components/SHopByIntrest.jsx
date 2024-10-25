import React, { useEffect, useState } from "react";
import Filter from "./Filter";
import Card from "./card/Card";
import { useDispatch, useSelector } from "react-redux";
import {
  categoryByAgeGroups,
  FilterCategory,
  FilterSubCategory,
} from "@/redux/Action/category";
import { useRouter } from "next/navigation";

const SHopByIntrest = ({ selectedAgeGroup }) => {
  const [filteredCategories, setFilteredCategories] = useState([
    selectedAgeGroup,
  ]);
  const [categories, setCategories] = useState([]);

  const dispatch = useDispatch();
  const router = useRouter();

  const {
    loading: isLoading,
    error,
    categoryByAgeGroup,
    filterCategory,
  } = useSelector((state) => state.category);


  useEffect(() => {
    if (selectedAgeGroup) {
      dispatch(categoryByAgeGroups(selectedAgeGroup));
    }
  }, [dispatch, selectedAgeGroup]);

  useEffect(() => {
    if (categoryByAgeGroup) {
      console.log("API Response Data:", categoryByAgeGroup);
      setFilteredCategories(categoryByAgeGroup);
    }
  }, [categoryByAgeGroup]);

  const handleCardClick = (slug) => {
    router.push(`/products/${slug}`);
  };


  const fetchCategoryFilterData = async () => {
    try {
      console.log("Dispatching FilterCategory action");
      await dispatch(FilterCategory());
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    fetchCategoryFilterData();
  }, []);

  
  useEffect(() => {
    if (filterCategory && filterCategory.length > 0) {
      setCategories(filterCategory); // Correctly set the fetched data
      console.log("Categories fetched:", filterCategory); // Log fetched categories
    }
  }, [filterCategory]);


  console.log("Fffffffffffffffffff",filterCategory)
  
  const handleFilterChange = (type, name, checked) => {
    console.log(`Filter ${type} changed: ${name}, checked: ${checked}`);
    
  };

  const handleAddToCart = (item) => {
    console.log("Added to cart: ", item);
  };


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
            <Filter
              categories={categories}
              onFilterChange={handleFilterChange}
            />
            </div>

            <div className="col-8 ">
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
                    imageUrl={category.thumbnail_full_url?.path}
                    name={category?.name}
                    discount={category?.discount}
                    in
                    the
                    response
                    price={category?.unit_price}
                    oldPrice={category?.purchase_price}
                    applicable
                    discount_type={category?.discount_type}
                    onClick={() => handleCardClick(category.slug)}
                    onAddToCart={handleAddToCart}
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


