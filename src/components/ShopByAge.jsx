"use client";
import React, { useState } from "react";
import Image from "next/image";
import SHopByIntrest from "./SHopByIntrest";

const ShopByAge = () => {

  const [selectedAgeGroup, setSelectedAgeGroup] = useState("8-10");

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
          <div className="col-6 " style={{cursor:'pointer'}}>
            <div className="group" onClick={() => handleAgeGroupClick("8-10")}>
              <div className="row">
                <div className="col-6" >
                  <h2 className="ageLabel">8-10</h2>
                  <h2 className="ageLabel">Years</h2>
                </div>

                <div className="imageWrapper col-6">
                  <Image
                    src={"/product/child1.png"} // Correct the path if needed
                    width={100}
                    height={100}
                    alt="Child holding a robot"
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="col-6" style={{cursor:'pointer'}}>
            <div className="group" onClick={() => handleAgeGroupClick("10+")}>
              <div className="row">
                <div className="col-6">
                  <h2 className="ageLabel">10+</h2>
                  <h2 className="ageLabel">Years</h2>
                </div>

                <div className="imageWrapper col-6">
                  <Image
                    src={"/product/child2.png"} // Correct the path if needed
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
