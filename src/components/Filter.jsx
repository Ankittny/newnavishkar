"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";

const Filter = ({ categories, onFilterChange }) => {
  console.log("CATEGORY FILTER DATA",categories)
  const [selectedCategories, setSelectedCategories] = useState({});
  const [selectedSubCategories, setSelectedSubCategories] = useState({});

  // Handle category change
  const handleCategoryChange = (event) => {
    const { name, checked } = event.target;
    setSelectedCategories((prev) => ({
      ...prev,
      [name]: checked,
    }));
    onFilterChange("category", name, checked);
  };


  // const handleSubCategoryChange = (event) => {
  //   const { name, checked } = event.target;
  //   setSelectedSubCategories((prev) => ({
  //     ...prev,
  //     [name]: checked,
  //   }));
  //   onFilterChange("subcategory", name, checked);
  // };

  return (
    <div className="filter-container">
      <div className="title-section">
        <Image
          src="/product/children-holding-blank-banner 1.png"
          width={100}
          height={100}
          alt="children"
        />
      </div>

      <div className="filter-section">
        <div className="filter-options">
          {/* Category Section */}
          <div className="category-section">
            <p>Categories</p>
            {categories && categories.length > 0 ? (
              categories.map((category) => (
                <div key={category.id} className="form-check">
                  <input
                    className="form-check-input"
                    type="checkbox"
                    id={category.name}
                    name={category.name}
                    checked={!!selectedCategories[category.name]}
                    onChange={handleCategoryChange}
                  />
                  <label className="form-check-label" htmlFor={category.name}>
                    {category.name}
                  </label>
                </div>
              ))
            ) : (
              <p>No categories available</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;