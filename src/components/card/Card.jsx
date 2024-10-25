
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/Reducer/Cart"; // Import the addToCart action

const Card = ({ imageUrl, name, discount, price, discount_type, onClick,id }) => {
  const dispatch = useDispatch();
  const percentage = (price * discount) / 100;
  const ActualPrice = price - percentage;

  const handleAddToCart = () => {
    dispatch(addToCart({ name, price: ActualPrice, imageUrl,id}));
  };

  return (
    <div className="play-role-title title-access">
      <div className="play-kit-title play-cubric">
        <Image src={imageUrl} alt="image" width={300} height={200} onClick={onClick} className="curser"/>
      </div>
      <div className="playkit-action action-inject">
        <div className="kit-down">
          <p>{name}</p>
        </div>
        {discount_type === "percent" ? (
          <div className="buttton mt-4 d-flex gap-3">
            <div className="ex-btn">-{discount}%</div>
            <div className="price-text">
              <span>₹{ActualPrice}</span>
            </div>
            <div className="overline-text">
              <p>₹{price}</p>
            </div>
          </div>
        ) : (
          <div className="buttton mt-4 d-flex gap-3">
            <div className="price-text">
              <span>₹{ActualPrice}</span>
            </div>
            <div className="overline-text">
              <p>₹{price}</p>
            </div>
          </div>
        )}
      </div>
      <div className="add-btn text-center">
        <button onClick={handleAddToCart}>ADD TO CART</button>
      </div>
    </div>
  );
};

export default Card;