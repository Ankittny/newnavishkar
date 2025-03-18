

"use client";
import { categories } from "@/redux/Action/category";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import ShopByInterest from "../components/SHopByIntrest"; // Import the ShopByInterest component

const BoysToys = () => {
  const [categoryData, setCategoryData] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  
  const dispatch = useDispatch();
  const { category,} = useSelector((state) => state.category);
  

  useEffect(() => {
    dispatch(categories());
  }, [dispatch]);

  useEffect(() => {
    if (category && category.length > 0) {
      setCategoryData(category);
    }
  }, [category]);

  const handleSubcategoryClick = async (subcategoryName) => {
    setSelectedCategory(subcategoryName);
  
  };

  return (
    <div className="leading-left-title">
      <div className="two-kids-title">
        <img src="./product/children-holding-blank-banner-1.png" alt="children" />
      </div>
      <div className="lab-position">
        <div className="left-search-title">
          <p>Search</p>
          <hr />
          <div className="all-left-search d-flex align-items-center">
            <input type="text" placeholder="Search Products" className="search-bar" />
            <IoSearch className="serch-media" />
          </div>
        </div>
      </div>

      <div className="left-product-title mt-3">
        <p>Categories</p>
        <div className="left-p-title">
          {categoryData.map((cat) => (
            <div key={cat.id}>
              <ul>
                {cat.childes?.length > 0 &&
                  cat.childes.map((child) => (
                    <li key={child.id}>
                      <strong>
                        <hr />
                        {child.name}
                      </strong>
                      {child.childes?.length > 0 && (
                        <ul>
                          {child.childes.map((subChild) => (
                            <li
                              key={subChild.id}
                              className="cursor-pointer"
                              onClick={() => handleSubcategoryClick(subChild.slug)}
                              style={{ cursor: "pointer" }}
                            >
                              {subChild.name}
                            </li>
                          ))}
                        </ul>
                      )}
                    </li>
                  ))}
              </ul>
            </div>
          ))}
        </div>
        <button className="btn">
          <Link href="/live-projects">Live Project</Link>
        </button>
      </div>

      {/* ✅ Show Products in ShopByInterest Instead of Default */}
      <div className="project-container mt-4" >
        {selectedCategory ? (
          <ShopByInterest selectedCategory={selectedCategory} className="display-block"/>
        ) : (
          <p></p>
        )}
      </div>
    </div>
  );
};

export default BoysToys;
