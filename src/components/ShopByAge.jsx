"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import SHopByIntrest from "./SHopByIntrest";

const ShopByAge = ({ categoryData }) => {
  console.log("CategoryData", categoryData[0]?.name);

  const [selectedAgeGroup, setSelectedAgeGroup] = useState(
    categoryData[0]?.name || ""
  );

  useEffect(() => {
    if (categoryData && categoryData.length > 0) {
      setSelectedAgeGroup(categoryData[0].name); // Set default to the first category name
    }
  }, [categoryData]);

  const handleAgeGroupClick = (ageGroup) => {
    setSelectedAgeGroup(ageGroup);
  };

  return (
    <>
      <section>
        <div className="container">
          <div className="row text-center">
            <div className="col-12">
              <div className="shop-by-title text-center">
                <h5>
                  SHOP BY <span>AGE</span>
                </h5>
                <p>STEAM-filled boxes of joy for 3-14 years</p>
              </div>
            </div>
          </div>
        </div>

        <div className="row shopByAge">
          <div className="col-6 " style={{ cursor: "pointer" }}>
          <div className="group" onClick={() => handleAgeGroupClick(categoryData[0]?.id)}>
              <div className="row">
                <div className="col-6">
                <h2 className="ageLabel">{categoryData[0]?.name}</h2>
                  {/* <h2 className="ageLabel">Years</h2> */}
                </div>

                <div className="imageWrapper col-6">
                  <Image
                    src={categoryData[0]?.icon_full_url?.path} 
                    width={100}
                    height={100}
                    alt="Child holding a robot"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="col-6" style={{ cursor: "pointer" }}>
          <div className="group" onClick={() => handleAgeGroupClick(categoryData[1]?.id)}>
              <div className="row">
                <div className="col-6">
                <h2 className="ageLabel">{categoryData[1]?.name}</h2>
                  {/* <h2 className="ageLabel">Years</h2> */}
                </div>

                <div className="imageWrapper col-6">
                  <Image
                  src={categoryData[1]?.icon_full_url?.path} 
                    width={100}
                    height={100}
                    alt="Child holding a robot"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <SHopByIntrest selectedAgeGroup={selectedAgeGroup} />
    </>
  );
};

export default ShopByAge;

