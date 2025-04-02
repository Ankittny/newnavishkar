

import Image from "next/image";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/Reducer/Cart"; // Import the addToCart action
import axios from "axios";
import toast from "react-hot-toast"; // Import toaster
import { LuShoppingCart } from "react-icons/lu";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa"; // Import star icons
import Tooltip from '@mui/material/Tooltip';

const Card = ({ imageUrl, name, discount, price, discount_type, onClick, id, current_stock,rating }) => {
  console.log("Rating", rating);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false); // State to handle loader
  const token = localStorage.getItem("authAdminToken");


  

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
        "https://admin.navishkar.com/api/v1/cart/add",
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
        stars.push(<FaStar key={i} style={{color:'#175A95'}} />);
      } else if (rating >= i - 0.5) {
        stars.push(<FaStarHalfAlt key={i} style={{color:'#175A95'}} />);
      } else {
        stars.push(<FaRegStar key={i} style={{color:'#175A95'}}/>);
      }
    }
    return stars;
  };

  return (
    <div className="play-role-title title-access">
      <div className="play-kit-title play-cubric">
        <Image src={imageUrl} alt={"Product"} width={200} height={200} onClick={onClick} className="curser" />
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
          <Tooltip title="Add to Cart" arrow> 
            <button onClick={handleAddToCart} className="d-flex align-items-center justify-content-center gap-2">
              {loading ? <span>Loading...</span> : (
                <>

                  <LuShoppingCart size={"20px"} />

                </>
              )}

            </button>
          </Tooltip>
        ) : (
          <p className="text-danger fw-bold mb-0">Out of Stock</p>
        )}


       {/* Display dynamic rating on the right side */}
       <div className="d-flex align-items-center gap-1">
          {renderStars(rating)}
          {/* <span className="text-muted">({totalReviews})</span> */}
        </div>

      </div>


    </div>
  );
};

export default Card;
