"use client";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import SHopByIntrest from "./SHopByIntrest";
import Button from '@mui/material/Button';

const ShopByAge = ({ categoryData }) => {
  const [selectedAgeGroup, setSelectedAgeGroup] = useState([]);
  const [loading, setLoading] = useState(false); // State for loader
  const [showProducts, setShowProducts] = useState(true); // State to toggle product visibility

  useEffect(() => {
    if (categoryData && categoryData.length > 0) {
      setSelectedAgeGroup(categoryData[0]?.slug || "");
    }
  }, [categoryData]);

  const handleClick = (ageGroupId) => {
    setLoading(true); // Show loader
    // setShowProducts(false);
    
    setTimeout(() => {
      setLoading(false); // Hide loader
      setShowProducts(true); // Show products after 2 seconds
      setSelectedAgeGroup(ageGroupId);
    }, 2000); // 2 seconds delay
  };

  if (!categoryData || categoryData.length === 0) {
    return <div >Loading...</div>;
  }

  return (
    <>
      <section>
        <div className="container">
          <div className="row text-center">
            <div className="col-lg-12">
              <div className="shop-by-title text-center">
                <h5>
                  SHOP BY <span>AGE</span>
                </h5>
                <p>STEAM-filled boxes of joy for 3-14 years</p>
              </div>
            </div>
          </div>
        </div>

        {/* Loader */}
        {loading && (
          <div className="loading-overlay">
            <div className="spinner"></div>
          </div>
        )}

        {/* Product Listing (Hidden when loading is true) */}
        {showProducts && (
          <div className="row shopByAge">
            {categoryData.slice(0, 2).map((group, index) => (
              <div
                className="col-lg-6"
                style={{ cursor: "pointer" }}
                key={group?.id || index}
              >
                <div className="group">
                  <div className="row">
                    <div className="col-lg-6">
                      <h2 className="ageLabel">{group?.name}</h2>
                      <Button variant="outlined" className="text-white " onClick={() => handleClick(group?.slug)}>
                        Click here
                      </Button>
                    </div>
                    <div className="imageWrapper col-lg-6">
                      {group?.icon_full_url?.path ? (
                        <Image
                          src={group.icon_full_url.path}
                          width={200}
                          height={175}
                          alt={group?.name || "Age Group"}
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
        )}
      </section>

      <SHopByIntrest selectedAgeGroup={selectedAgeGroup} />

     
    </>
  );
};

export default ShopByAge;
