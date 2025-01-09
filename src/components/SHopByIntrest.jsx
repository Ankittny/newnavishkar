import React, { useEffect, useState } from "react";
import Card from "./card/Card";
import { useDispatch, useSelector } from "react-redux";
import {
  categoryByAgeGroups,
  FilterCategory,
  FilterSubCategory,
} from "@/redux/Action/category";
import { useRouter } from "next/navigation";

import Link from "next/link";
import Filter from "./Filter";

import Button from "./Button";

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

  console.log("Fffffffffffffffffff", filterCategory);

  const handleFilterChange = (type, name, checked) => {
    console.log(`Filter ${type} changed: ${name}, checked: ${checked}`);
  };

  const handleAddToCart = (item) => {
    console.log("Added to cart: ", item);
  };

  return (
    <>
      {/* ============================================Best-Seller======================================== */}
      <section>
        <div className="seller-top">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="shop-by-title text-center">
                  <h5>
                    BEST<span>SELLER</span>
                  </h5>
                  <p>Crowd-pleasers for every age</p>
                </div>
              </div>

              <div className="col-lg-3">
                <div className="seller-offer">
                  <div className="seller-sell">
                    <img src="product/motor.png" />
                  </div>
                  <div className="playkit-action action-inject">
                    <div className="kit-down">
                      <p>Play and Learn Kit | 3-6 years | DIY Activity Kit</p>
                    </div>
                    <div className="button mt-4 d-flex gap-3 align-items-center">
                      <div className="ex-btn">-15%</div>
                      <div className="price-text">
                        <span>₹699</span>
                      </div>
                      <div className="overline-text">
                        <p>₹799</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="seller-offer">
                  <div className="seller-sell">
                    <img src="product/motor.png" />
                  </div>
                  <div className="playkit-action action-inject">
                    <div className="kit-down">
                      <p>Play and Learn Kit | 3-6 years | DIY Activity Kit</p>
                    </div>
                    <div className="button mt-4 d-flex gap-3 align-items-center">
                      <div className="ex-btn">-15%</div>
                      <div className="price-text">
                        <span>₹699</span>
                      </div>
                      <div className="overline-text">
                        <p>₹799</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="seller-offer">
                  <div className="seller-sell">
                    <img src="product/motor.png" />
                  </div>
                  <div className="playkit-action action-inject">
                    <div className="kit-down">
                      <p>Play and Learn Kit | 3-6 years | DIY Activity Kit</p>
                    </div>
                    <div className="button mt-4 d-flex gap-3 align-items-center">
                      <div className="ex-btn">-15%</div>
                      <div className="price-text">
                        <span>₹699</span>
                      </div>
                      <div className="overline-text">
                        <p>₹799</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-3">
                <div className="seller-offer">
                  <div className="seller-sell">
                    <img src="product/motor.png" />
                  </div>
                  <div className="playkit-action action-inject">
                    <div className="kit-down">
                      <p>Play and Learn Kit | 3-6 years | DIY Activity Kit</p>
                    </div>
                    <div className="button mt-4 d-flex gap-3 align-items-center">
                      <div className="ex-btn">-15%</div>
                      <div className="price-text">
                        <span>₹699</span>
                      </div>
                      <div className="overline-text">
                        <p>₹799</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================Kids-toy-store===================================== */}
      <section>
        <div className="nami-toys-toys-store">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                <div className="all-toys d-flex justify-content-between align-items-center">
                  <div className="toys-text">
                    <h4>Navishkar - Kids Toy Store</h4>
                    <p>
                      Lorem ipsum dolor sit amet, consectetur adipiscing <br />{" "}
                      elit, sed do eiusmod tempor incididunt ut labore et <br />{" "}
                      dolore magna aliqua. Ut enim ad minim veniam, quis <br />
                      nostrud exercitation ullamco laboris nisi ut aliquip{" "}
                      <br /> ex ea commodo consequat.
                    </p>
                    {/* <a href="">Shop More </a> */}
                  </div>
                  <div className="img-toys-titles">
                    <img src="./product/Group 77.png" alt="77" />
                  </div>
                  <div className="img-toys-title">
                    <img src="./product/pngtree-cheerful.png" alt="77" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

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

          <div className="row dr-title mt-4">
            <div className="col-md-3">
              <Filter />
            </div>
            <div className="col-md-9">
            <div className="card-container">
  {filteredCategories?.length > 0 ? (
    filteredCategories.map((category) => (
      <Card
        key={category.id || category.slug}
        id={category.id}
        imageUrl={category.thumbnail_full_url?.path || null}
        name={category?.name}
        discount={category?.discount}
        price={category?.unit_price}
        oldPrice={category?.purchase_price}
        discount_type={category?.discount_type}
        onClick={() => handleCardClick(category.slug)}
        onAddToCart={handleAddToCart}
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
    </>
  );
};

export default SHopByIntrest;
