"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import SHopByIntrest from "./SHopByIntrest";

const ShopByAge = ({ categoryData }) => {
  const [selectedAgeGroup, setSelectedAgeGroup] = useState("");

  useEffect(() => {
    if (categoryData && categoryData.length > 0) {
      setSelectedAgeGroup(categoryData[0]?.slug || "");
    }
  }, [categoryData]);

  const handleAgeGroupClick = (ageGroupSlug) => {
    setSelectedAgeGroup(ageGroupSlug);
  };

  if (!categoryData || categoryData.length === 0) {
    return <div>Loading...</div>;
  }

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
          {categoryData.slice(0, 2).map((group, index) => (
            <div
              className="col-lg-6"
              key={group?.id || index}
              style={{ cursor: "pointer" }}
              onClick={() => handleAgeGroupClick(group?.slug)}
            >
              <div className="group">
                <div className="row align-items-center">
                  <div className="col-lg-6">
                    <h2 className="ageLabel">{group?.name}</h2>
                  </div>
                  <div className="col-lg-6 imageWrapper">
                    {group?.icon_full_url?.path ? (
                      <Image
                        src={group.icon_full_url.path}
                        width={200}
                        height={175}
                        alt={group?.name || "Age Group"}
                        className="img-fluid"
                      />
                    ) : (
                      <div>No Image Available</div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <SHopByIntrest selectedAgeGroup={selectedAgeGroup} />
    </>
  );
};

export default ShopByAge;
