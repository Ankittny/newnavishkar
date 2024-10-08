import Image from "next/image";
import React from "react";

const Card = ({ imageUrl, name, discount, price, oldPrice ,onClick }) => {
  return (
    <>
      <div className="play-role-title title-access " onClick={onClick}>
        <div className="play-kit-title  play-cubric">
        <Image src={imageUrl} alt="image" width={300} height={200} />
        </div>
        <div className="playkit-action action-inject">
          <div className="kit-down">
            <p>{name}</p>
          </div>
          <div className="buttton mt-4 buttton mt-4 d-flex gap-3">
            <div className="ex-btn">
                -{discount}%
            </div>
            <div className="price-text">
                <span>${price}</span>
            </div>
            <div className="overline-text">
                <p>${oldPrice}</p>
            </div>
          </div>
        </div>
        <div className="add-btn text-center">
          <button>
            <i className="ri-shopping-cart-fill mx-2"></i>ADD TO CARD
          </button>
        </div>
      </div>
    </>
  );
};

export default Card;
