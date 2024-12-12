"use client";
import Image from "next/image";
import React, { useState } from "react";

const Filter = ({ categories, onFilterChange }) => {
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

  // Handle subcategory change
  const handleSubCategoryChange = (categoryId, subCategoryName, checked) => {
    setSelectedSubCategories((prev) => ({
      ...prev,
      [categoryId]: {
        ...prev[categoryId],
        [subCategoryName]: checked,
      },
    }));
    onFilterChange("subcategory", subCategoryName, checked);
  };

  return (
    <div className="filter-container">
      {/* <div className="title-section">
        <Image
          src="/product/children-holding-blank-banner-1.png"
          width={100}
          height={100}
          alt="children"
        />
      </div> */}

      <div className="filter-section">
        <div className="filter-options">
          {/* Category Section */}
          <div className="category-section">
            <p style={{ fontWeight: "bold", fontSize: "1.2rem" }}>Categories</p>
            {categories && categories.length > 0 ? (
              categories.map((category) => (
                <div key={category.id} className="category">
                  <div className="form-check" style={{ marginBottom: "8px" }}>
                    <input
                      className="form-check-input"
                      type="checkbox"
                      id={category.name}
                      name={category.name}
                      checked={!!selectedCategories[category.name]}
                      onChange={handleCategoryChange}
                    />
                    <label
                      className="form-check-label"
                      htmlFor={category.name}
                      style={{ fontWeight: "bold", fontSize: "1rem" }}
                    >
                      {category.name}
                    </label>
                  </div>

                  {/* Subcategories (Childes) */}
                  {category.childes && category.childes.length > 0 && (
                    <div className="subcategory-section" style={{ marginLeft: "20px", paddingLeft: "10px" }}>
                      {category.childes.map((subcategory) => (
                        <div
                          key={subcategory.id}
                          className="form-check subcategory"
                          style={{ marginBottom: "5px" }}
                        >
                          <input
                            className="form-check-input"
                            type="checkbox"
                            id={subcategory.name}
                            name={subcategory.name}
                            checked={
                              selectedSubCategories[category.id]
                                ? selectedSubCategories[category.id][subcategory.name] || false
                                : false
                            }
                            onChange={(e) =>
                              handleSubCategoryChange(category.id, subcategory.name, e.target.checked)
                            }
                          />
                          <label
                            className="form-check-label"
                            htmlFor={subcategory.name}
                            style={{ fontSize: "0.9rem", color: "#555" }}
                          >
                            {subcategory.name}
                          </label>
                        </div>
                      ))}
                    </div>
                  )}
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
