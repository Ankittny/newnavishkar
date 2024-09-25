"use client"
import React from "react";
import Image from "next/image";
import Child1 from "../../assets/product/child1.png";
import Child2 from "../../assets/product/child2.png"
const ShopByAge = () => {
  return (
    <>
      <section>
        <div className="container">
          <div className="row text-center">
            <div className="col-12">
              <div class="shop-by-title text-center">
                <h5>
                  SHOP BY <span>AGE</span>
                </h5>
                <p>STEAM-filled boxes of joy for 3-14 years</p>
              </div>
            </div>
          </div>
        </div>

        <div className="row shopByAge">
          <div className="col-6">
            <div className="group">
              <div className="row">
                <div className="col-6">
                  <h2 className="ageLabel">8-10</h2>{" "}
                  <h2 className="ageLabel">Years</h2>
                </div>

                <div className=" imageWrapper col-6">
                  <Image
                    src={Child1} // Add your actual image path here
                    alt="Child holding a robot"
                    layout="fill"
                    objectFit="contain"
                    className=""
                  />
                </div>
              </div>

              <div className="col-6"></div>
            </div>
          </div>

          <div className="col-6">
            <div className="group">
              <div className="row">
                <div className="col-6">
                  <h2 className="ageLabel">10+</h2>{" "}
                  <h2 className="ageLabel">Years</h2>
                </div>

                <div className=" imageWrapper col-6">
                  <Image
                    src={Child2} // Add your actual image path here
                    alt="Child holding a robot"
                    layout="fill"
                    objectFit="contain"
                    className=""
                  />
                </div>
              </div>

              <div className="col-6"></div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ShopByAge;
