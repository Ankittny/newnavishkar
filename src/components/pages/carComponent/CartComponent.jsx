"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { incrementQuantity, decrementQuantity } from "../../../redux/Reducer/Cart";
import { useRouter } from "next/navigation";
import axios from "axios";


const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  
  const router = useRouter();

  const handleDecrement = (id) => {
    dispatch(decrementQuantity(id));
  };
  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id));
  };
  const calculateSubTotal = (items) => {
    return items.reduce((acc, item) => {
      const price = parseFloat(item.price);
      const quantity = parseInt(item.quantity, 10);
      if (!isNaN(price) && !isNaN(quantity)) {
        return acc + price * quantity;
      }
      return acc;
    }, 0);
  };
  const subTotal = calculateSubTotal(cartItems);
  const shippingCost = 100;
  const discount = 50;
  const grandTotal = subTotal + shippingCost - discount;
  const handleProceedToCheckout = async () => {
    // Get the token from localStorage or Redux (depending on where it's stored)
    const token = localStorage.getItem("authToken") || ""; // Replace with your token storage logic
  
    try {
      // Iterate over each cart item and send a separate API request for each item
      for (let item of cartItems) {
        const itemData = {
          [String('id')]: item.id, // Explicitly make the key 'id' a string
          [String('quantity')]: item.quantity // Explicitly make the key 'quantity' a string
        };
  
        // Send each item data to the API using axios
        const response = await axios.post(
          "https://navishkar.overseaseducationlane.com/api/v1/cart/add", 
          { 
            itemData // Send only the item id and quantity
          },
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`, // Include token in the Authorization header
            }
          }
        );
  
        if (response.status === 200) {
          // Log success for this item (optional)
          console.log("Item added successfully:", item.id);
        } else {
          // Handle errors here (show a message, etc.)
          console.error("Error with item", item.id, response.data.message || "Error sending data");
        }
      }
  
      // Once all items have been processed, navigate to the payment page
      router.push("/cart/payments");
  
    } catch (error) {
      console.error("Error sending cart data:", error);
    }
  };
  

  const handleContinueShopping = () => {
    router.push("/");
  };




  return (
    <div className="container">
      <div className="cart-container">
        <div className="cart-items">
          <h2>Shopping Cart</h2>
          {cartItems.length === 0 ? (
            <div className="card-process-number text-center py-5 mt-5">
              <img src="/product/empty-cart.svg" alt="Empty Cart" />
              <p className="text-center">Your cart is empty</p>
            </div>
          ) : (
            <>
              <table className="process-card">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Unit Price</th>
                    <th>Qty</th>
                    <th>Total</th>
                  </tr>
                </thead>
              </table>
              <table className="cart-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Unit Price</th>
                    <th>Qty</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id}>
                      <td className="cart-item">
                        <img src={item.imageUrl} alt={item.name} width={100} />
                        <p>{item.name}</p>
                      </td>
                      <td>₹{parseFloat(item.price).toFixed(2)}</td>
                      <td className="quantity-controls">
                        <button onClick={() => handleDecrement(item.id)}>-</button>
                        <span>{parseInt(item.quantity, 10)}</span>
                        <button onClick={() => handleIncrement(item.id)}>+</button>
                      </td>
                      <td>
                        ₹{(parseFloat(item.price) * parseInt(item.quantity, 10)).toFixed(2)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </>
          )}
        </div>
        <div className="order-summary">
          <h3>Order Summary</h3>
          <div className="summary-details">
            <p>Sub Total: ₹{subTotal.toFixed(2)}</p>
            <p>Shipping: ₹{shippingCost.toFixed(2)}</p>
            <p>Discount on Product: - ₹{discount.toFixed(2)}</p>
            <div className="coupon">
              <input type="text" placeholder="Coupon code" />
              <button>APPLY</button>
            </div>
            <hr />
            <p>
              <strong>Total: ₹{grandTotal.toFixed(2)}</strong>
            </p>
          </div>
          <button className="checkout-button" onClick={handleProceedToCheckout}>
            Proceed to Checkout
          </button>
          <button className="continue-shopping" onClick={handleContinueShopping}>
            Continue Shopping
          </button>
          <div className="policy-icons">
            <p>Fast Delivery all across the country</p>
            <p>Safe Payment</p>
            <p>7 Days Return Policy</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Cart;






