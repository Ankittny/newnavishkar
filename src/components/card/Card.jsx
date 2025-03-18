

import Image from "next/image";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/Reducer/Cart"; // Import the addToCart action
import axios from "axios";
import toast from "react-hot-toast"; // Import toaster
import { LuShoppingCart } from "react-icons/lu";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"; // Import star icons

const Card = ({ imageUrl, name, discount, price, discount_type, onClick, id, current_stock }) => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false); // State to handle loader
  const token = localStorage.getItem("authAdminToken");


  // Dummy rating data (change as needed)
  const rating = 4.5; // Example rating
  const totalReviews = 120; // Example total reviews

  // Calculate the actual price based on the discount type
  const percentageDiscountAmount = (price * discount) / 100;
  const flatDiscountAmount = discount_type === "flat" ? discount : 0;
  const ActualPrice = discount_type === "percent"
    ? price - percentageDiscountAmount
    : price - flatDiscountAmount;

  const handleAddToCart = async () => {
    if (loading) return; // Prevent multiple clicks
    setLoading(true); // Show loader

    try {
      const response = await axios.post(
        "https://navishkar.overseaseducationlane.com/api/v1/cart/add",
        { id: id, quantity: 1 },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Include token in the Authorization header
          },
        }
      );

      if (response.status === 200) {
        toast.success("Product added successfully! ✅");
      } else {
        toast.error(response.data.message || "Error adding product! ❌");
      }
    } catch (error) {
      toast.error("Failed to add product to cart! ❌");
      console.error("Error sending cart data:", error);
    }

    dispatch(addToCart({ name, price: ActualPrice, imageUrl, id }));
    setLoading(false); // Hide loader
  };




  const renderStars = (rating) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (rating >= i) {
        stars.push(<FaStar key={i} className="text-warning" />); // Full star
      } else if (rating >= i - 0.5) {
        stars.push(<FaStarHalfAlt key={i} className="text-warning" />); // Half star
      } else {
        stars.push(<FaRegStar key={i} className="text-warning" />); // Empty star
      }
    }
    return stars;
  };

  return (
    <div className="play-role-title title-access">
      <div className="play-kit-title play-cubric">
        <Image src={imageUrl} alt={"Product"} width={300} height={200} onClick={onClick} className="curser" />
      </div>
      <div className="playkit-action action-inject">
        <div className="kit-down">
          <p>{name}</p>
        </div>
        <div className="button mt-3 d-flex gap-3 justify-content-center">
          {/* Show discount info only if discount is greater than 0 */}
          {discount > 0 && (
            <>
              {discount_type === "percent" ? (
                <div className="ex-btn">Save {discount}%</div>
              ) : (
                <div className="save-btn">Save ₹{flatDiscountAmount}</div>
              )}
              <div className="price-text">
                <span>₹{ActualPrice}</span>
              </div>
              <div className="overline-text">
                <p>₹{price}</p>
              </div>
            </>
          )}
          {/* If there's no discount, show only the original price */}
          {discount === 0 && (
            <div className="price-text">
              <span>₹{price}</span>
            </div>
          )}
        </div>
      </div>
      <div className="add-btn text-center mb-2">
        {current_stock > 0 ? (
          <button onClick={handleAddToCart} className="d-flex align-items-center justify-content-center gap-2">
           {loading ? <span>Loading...</span> : (
        <>
          <LuShoppingCart />
          ADD TO BAG
        </>
      )}
          </button>
        ) : (
          <p className="text-danger fw-bold">Out of Stock</p>
        )}


        {/* Display rating on the right side */}
        <div className="d-flex align-items-center justify-content-end gap-1">
          {renderStars(rating)}
          <span className="text-muted">({totalReviews})</span>
        </div>
  
      </div>
    
    
    </div>
  );
};

export default Card;
