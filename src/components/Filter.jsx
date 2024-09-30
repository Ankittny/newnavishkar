"use client";
import Image from "next/image";
import React, { useState } from "react";
// import chid from "../../assets/product/children-holding-blank-banner 1.png";

const Filter = () => {
  const [selectedCategories, setSelectedCategories] = useState({
    steam: false,
    stemToys: false,
    stemProjects: false,
  });

  const handleChange = (event) => {
    const { name, checked } = event.target;
    setSelectedCategories((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  return (
    <div className="leading-left-title">
      <div className="two-kids-title">
        <Image
          src={'/public/product/children-holding-blank-banner 1.png'}
          alt="children"
        />
      </div>

      <div className="lab-position">
        <div className="lab-left-title battery-title">
          <p>Category</p> {/* Fixed the 'P' to lowercase 'p' */}
          <div className="left-list-title">
            <div className="battery-opra">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  name="steam" // Add name attribute
                  checked={selectedCategories.steam}
                  onChange={handleChange}
                />
                <label className="form-check-label" htmlFor="steam">
                  Stem
                </label>
              </div>
              <ul>
                <li>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="stemToys" // Add name attribute
                      checked={selectedCategories.stemToys}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="stemToys">
                      Stem Toys
                    </label>
                  </div>
                </li>
                <li>
                  <div className="form-check">
                    <input
                      className="form-check-input"
                      type="checkbox"
                      name="stemProjects" // Add name attribute
                      checked={selectedCategories.stemProjects}
                      onChange={handleChange}
                    />
                    <label className="form-check-label" htmlFor="stemProjects">
                      Stem Projects
                    </label>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filter;
