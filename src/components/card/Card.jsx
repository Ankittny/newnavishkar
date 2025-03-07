import Image from "next/image";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/Reducer/Cart"; // Import the addToCart action
import axios from "axios";
import toast from "react-hot-toast"; // Import toaster


const Card = ({ imageUrl, name, discount, price, discount_type, onClick, id,current_stock }) => {
  console.log("Discount", discount)
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

    const token = localStorage.getItem("authAdminToken");
    console.log("tiokeN", token)
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
        toast.success("Product added successfully! ✅");
        console.log("Item added successfully:", id);
      } else {
        // Handle errors here (show a message, etc.)
        toast.error(response.data.message || "Error adding product! ❌"); // Show error toaster
      }
    } catch (error) {
      toast.error("Failed to add product to cart! ❌"); // Show error toaster
      console.error("Error sending cart data:", error);
    }

    dispatch(addToCart({ name, price: ActualPrice, imageUrl, id }));
    setLoading(false); // Hide loader
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
          {/* Display discount for percentage and flat types */}
          {/* Display discount for percentage and flat types */}
          {discount_type === "percent" ? (
            <div className="ex-btn">Save {discount}%</div>
          ) : flatDiscountAmount > 0 ? ( // Check if discount is greater than 0
            <div className="save-btn">Save ₹{flatDiscountAmount}</div>
          ) : null}

          <div className="price-text">
            <span>₹{ActualPrice}</span>
          </div>
          <div className="overline-text">
            <p>₹{price}</p>
          </div>
        </div>
      </div>
      <div className="add-btn text-center mb-2">
        {/* <button onClick={() => handleAddToCart({ id, quantity: 1 })}>ADD TO BAG</button> */}
        {current_stock > 0 ? (
          <button onClick={() => handleAddToCart({ id, quantity: 1 })}>
              {loading ? <span className="">Loading</span> : "ADD TO BAG"}
          </button>
        ) : (
          <p className="text-danger fw-bold">Out of Stock</p>
        )}
      </div>
    </div>

  );
};

export default Card;

