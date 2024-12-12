
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/Reducer/Cart"; // Import the addToCart action

const Card = ({ imageUrl, name, discount, price, discount_type, onClick, id }) => {
  const dispatch = useDispatch();

  // Calculate the actual price based on the discount type
  const percentageDiscountAmount = (price * discount) / 100;
  const flatDiscountAmount = discount_type === "flat" ? discount : 0;
  const ActualPrice = discount_type === "percent" 
    ? price - percentageDiscountAmount 
    : price - flatDiscountAmount;

  const handleAddToCart = () => {
    dispatch(addToCart({ name, price: ActualPrice, imageUrl, id }));
  };

  return (
    <div className="play-role-title title-access">
      <div className="play-kit-title play-cubric">
        <Image src={imageUrl} alt="image" width={300} height={200} onClick={onClick} className="curser" />
      </div>
      <div className="playkit-action action-inject">
        <div className="kit-down">
          <p>{name}</p>
        </div>
        <div className="button mt-4 d-flex gap-3 align-items-center">
          {/* Display discount for percentage and flat types */}
          {discount_type === "percent" ? (
            <div className="ex-btn">-{discount}%</div>
          ) : (
            <div className="save-btn">Save ₹{flatDiscountAmount}</div>
          )}
          
          <div className="price-text">
            <span>₹{ActualPrice}</span>
          </div>
          <div className="overline-text">
            <p>₹{price}</p>
          </div>
        </div>
      </div>
      <div className="add-btn text-center">
        <button onClick={handleAddToCart}>ADD TO CART</button>
      </div>
    </div>
  );
};

export default Card;
