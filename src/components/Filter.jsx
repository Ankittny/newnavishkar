"use client";
import Image from "next/image";
import React, { useState } from "react";

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
          src={'/product/children-holding-blank-banner 1.png'}
          width={100}
          height={100}
          alt="children"
        />
      </div>

      <div className="lab-position">
        <div className="lab-left-title battery-title">
          <p>Category</p>
          <div className="left-list-title">
            <div className="battery-opra">
              <div className="form-check">
                <input
                  className="form-check-input"
                  type="checkbox"
                  id="steam" // Add id attribute
                  name="steam"
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
                      id="stemToys" // Add id attribute
                      name="stemToys"
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
                      id="stemProjects" // Add id attribute
                      name="stemProjects"
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