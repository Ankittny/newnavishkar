
import Image from "next/image";
import React from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/Reducer/Cart"; // Import the addToCart action
import axios from "axios";


const Card = ({ imageUrl, name, discount, price, discount_type, onClick, id }) => {
  const dispatch = useDispatch();

  // Calculate the actual price based on the discount type
  const percentageDiscountAmount = (price * discount) / 100;
  const flatDiscountAmount = discount_type === "flat" ? discount : 0;
  const ActualPrice = discount_type === "percent"
    ? price - percentageDiscountAmount
    : price - flatDiscountAmount;

  const handleAddToCart = async () => {
  const token = localStorage.getItem("authToken") || "";
  try {
    const response = await axios.post(
      "https://navishkar.overseaseducationlane.com/api/v1/cart/add",
      {
        id: id,
        quantity: 1,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, // Include token in the Authorization header
        },
      }
    );

    if (response.status === 200) {
      // Log success for this item (optional)
      console.log("Item added successfully:", id);
    } else {
      // Handle errors here (show a message, etc.)
      console.error("Error with item", id, response.data.message || "Error sending data");
    }
  } catch (error) {
    console.error("Error sending cart data:", error);
  }

  dispatch(addToCart({ name, price: ActualPrice, imageUrl, id }));
};

  return (
    <div className="play-role-title title-access">
      <div className="play-kit-title play-cubric">
        <Image src={imageUrl} alt={"Product"}  width={300} height={200} onClick={onClick} className="curser" />
      </div>
      <div className="playkit-action action-inject">
        <div className="kit-down">
          <p>{name}</p>
        </div>
        <div className="button mt-4 d-flex gap-3 align-items-center justify-content-center">
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
        <button onClick={() => handleAddToCart({ id, quantity: 1 })}>ADD TO CART</button>
      </div>
    </div>

  );
};

export default Card;
