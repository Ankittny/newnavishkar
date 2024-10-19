"use client";

import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { incrementQuantity, decrementQuantity } from "../../../redux/Reducer/Cart"; 

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);

  const handleDecrement = (id) => {
    dispatch(decrementQuantity(id));
  };

  const handleIncrement = (id) => {
    dispatch(incrementQuantity(id));
  };

  // Ensure price and quantity are valid numbers to avoid NaN errors
  const calculateTotalPrice = (items) => {
    return items.reduce((acc, item) => {
      const price = parseFloat(item.price);
      const quantity = parseInt(item.quantity, 10);

      // Ensure both price and quantity are valid numbers
      if (!isNaN(price) && !isNaN(quantity)) {
        return acc + price * quantity;
      }
      return acc;
    }, 0);
  };

  const totalPrice = calculateTotalPrice(cartItems);

  return (
    <div className="container">
      <div className="cart-container">
       
        <div className="cart-items">
          <h2>Shopping Cart</h2>
          {cartItems.length === 0 ? (
            <p>Your cart is empty</p>
          ) : (
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
                    <td>₹{(parseFloat(item.price) * parseInt(item.quantity, 10)).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}

          {/* Optional Order Note and Zip Code */}
          <div className="additional-info">
            <label>
              Order Note (Optional):
              <input type="text" placeholder="Add a note" />
            </label>
            <label>
              Zip code*:
              <input type="text" placeholder="Enter your zip code" required />
            </label>
          </div>
        </div>

        
        <div className="order-summary">
          <h3>Order Summary</h3>
          <div className="summary-details">
            <p>Sub total: ₹{totalPrice.toFixed(2)}</p>
            <p>Shipping: ₹100.00</p>
            <p>Discount on product: - ₹50.00</p>

            {/* Coupon Code */}
            <div className="coupon">
              <input type="text" placeholder="Coupon code" />
              <button>APPLY</button>
            </div>

            <hr />

            <p>Total: ₹{totalPrice.toFixed(2) -100 - 50}</p>
          </div>

          <button className="checkout-button">Proceed to Checkout</button>
          <button className="continue-shopping">Continue Shopping</button>

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


