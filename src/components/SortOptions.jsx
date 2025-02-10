import React, { useState } from "react";
// import "./SortOptions.css"; // Import CSS

const SortOptions = () => {
  const [selected, setSelected] = useState("Popular");

  const sortOptions = [
    "Popular",
    "Price - Low to High",
    "Price - High to Low",
    "Discount - High to Low",
  ];

  return (
    <div className="sort-wrapper">
      <div className="sort-container">
        <span>Sort by</span>
        {sortOptions.map((option) => (
          <span
            key={option}
            className={`sort-option ${selected === option ? "active" : ""}`}
            onClick={() => setSelected(option)}
          >
            {option}
          </span>
        ))}
      </div>
      <div className="divider"></div> {/* Bottom Divider */}
    </div>
  );
};

export default SortOptions;
