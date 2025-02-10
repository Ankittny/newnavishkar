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
import BoysToys from "./BoysToys";
import SortOptions from "./SortOptions";
import { Divider } from "@mui/material";



const SHopByIntrest = ({ selectedAgeGroup }) => {
  const [filteredCategories, setFilteredCategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const dispatch = useDispatch();
  const router = useRouter();

  const { categoryByAgeGroup, filterCategory } = useSelector((state) => state.category);

  useEffect(() => {
    if (selectedAgeGroup) {
      dispatch(categoryByAgeGroups(selectedAgeGroup));
    }
  }, [dispatch, selectedAgeGroup]);

  useEffect(() => {
    if (categoryByAgeGroup?.length) {
      setFilteredCategories(categoryByAgeGroup);
    }
  }, [categoryByAgeGroup]);

  useEffect(() => {
    dispatch(FilterCategory());
  }, [dispatch]);

  useEffect(() => {
    if (filterCategory?.length) {
      setCategories(filterCategory);
    }
  }, [filterCategory]);

  const handleCardClick = (slug) => {
    router.push(`/products/${slug}`);
  };

  const handleAddToCart = (item) => {
    console.log("Added to cart: ", item);
  };

  return (
    <>
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
            <BoysToys />
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
                    onClick={() => handleCardClick(category.slug)}
                    onAddToCart={handleAddToCart}
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
                    <div className="button mt-3 d-flex gap-3 justify-content-between px-4">
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
                    <div className="button mt-3 d-flex gap-3 justify-content-between px-4">
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
                    <div className="button mt-3 d-flex gap-3 justify-content-between px-4">
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
                    <div className="button mt-3 d-flex gap-3 justify-content-between px-4">
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
</>
  );
};

export default SHopByIntrest;
