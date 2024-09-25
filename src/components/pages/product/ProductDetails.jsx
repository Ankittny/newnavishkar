import ProductBanner from "@/components/ProductBanner";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import CertificateLogo from "../../../../assets/product/Mark1.png";
import StarIcon from "@mui/icons-material/Star";

const ProductDetails = () => {
  return (
    <>
      <div className="">
        <ProductBanner title="Navishkar - Kids Toy Store" />
      </div>
      <div className="container mt-5">
        <div className="row">
          <div className="col-12 text-center proudctDetailHeading">
            <h1 className="primary-color ">Navishkar The Leading Brand</h1>
          </div>
          <div className="d-flex gap-2">
            <p className="productCategory">Category</p> /
            <span>
              <p className="productCategory">SubCategory</p>
            </span>
          </div>

          <div className="row mt-3">
            <div className="col-6"></div>
            <div className="col-6">
              <div class="motonove-right-title">
                <h3>Motonova</h3>
                <p className="">
                  A green energy product that generates energy by the inertia of
                  the flywheel.
                </p>
                <div class="motonova-highlight">
                  <span>Highlights</span>
                  <div class="wheel-balance d-flex gap-3">
                    <ul>
                      <li>
                        <Link href="">Monowheel Balance</Link>
                      </li>
                      <li>
                        <Link href="">Green Energy</Link>
                      </li>
                      <li>
                        <Link href="">Green Energy</Link>
                      </li>
                      <li>
                        <Link href="">Easy Assembly</Link>
                      </li>
                    </ul>
                    <Image
                      src={CertificateLogo}
                      alt="ddd"
                      width={100}
                      height={100}
                    />
                  </div>
                  <div class="rating-title mt-3">
                    <span>Rating</span>
                    <p>50+ bought in past month</p>
                  </div>
                </div>

                <div class="full-rating">
                  <div class="reting-create-price">
                    <h3>₹ 1999</h3>
                    <span>M.R.P.: ₹2,654</span> <br />
                    <StarIcon />
                  </div>
                  <div class="rating-star">
                    <span>Navishkar</span>
                    <p>Inclusive of all taxes</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductDetails;
