"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const Payment = () => {
  const router = useRouter();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [paymentMethod, setPaymentMethod] = useState("creditCard");
  const [cardDetails, setCardDetails] = useState({
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    nameOnCard: "",
  });

  const calculateTotalPrice = (items) => {
    return items.reduce((acc, item) => {
      const price = parseFloat(item.price);
      const quantity = parseInt(item.quantity, 10);

      if (!isNaN(price) && !isNaN(quantity)) {
        return acc + price * quantity;
      }
      return acc;
    }, 0);
  };

  const totalPrice = calculateTotalPrice(cartItems);
  const shipping = 100;
  const discount = 50;
  const finalPrice = (totalPrice - discount + shipping).toFixed(2);

  const handlePaymentSubmit = (e) => {
    e.preventDefault();
    router.push("/confirmation");
  };

  const handleCardDetailsChange = (e) => {
    setCardDetails({
      ...cardDetails,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="container">
<div className="payment-page">
      <h2 className="payment-title">Payment Information</h2>

      <div className="payment-container">
        <div className="order-summary">
          <h3>Order Summary</h3>
          <p>Sub Total: ₹{totalPrice.toFixed(2)}</p>
          <p>Shipping: ₹{shipping.toFixed(2)}</p>
          <p>Discount: -₹{discount.toFixed(2)}</p>
          <hr />
          <p>Total: ₹{finalPrice}</p>
        </div>

        <div className="payment-methods">
          <h3>Choose Payment Method</h3>
          <label className="payment-label">
            <input
              type="radio"
              name="paymentMethod"
              value="creditCard"
              checked={paymentMethod === "creditCard"}
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            Credit Card
          </label>
          <label className="payment-label">
            <input
              type="radio"
              name="paymentMethod"
              value="paypal"
              onChange={(e) => setPaymentMethod(e.target.value)}
            />
            PayPal
          </label>
        </div>

        {paymentMethod === "creditCard" && (
          <form onSubmit={handlePaymentSubmit} className="card-details-form">
            <h3>Credit Card Details</h3>
            <div className="form-group">
              <label>Card Number</label>
              <input
                type="text"
                name="cardNumber"
                placeholder="1234 5678 9101 1121"
                value={cardDetails.cardNumber}
                onChange={handleCardDetailsChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Expiry Date</label>
              <input
                type="text"
                name="expiryDate"
                placeholder="MM/YY"
                value={cardDetails.expiryDate}
                onChange={handleCardDetailsChange}
                required
              />
            </div>
            <div className="form-group">
              <label>CVV</label>
              <input
                type="text"
                name="cvv"
                placeholder="123"
                value={cardDetails.cvv}
                onChange={handleCardDetailsChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Name on Card</label>
              <input
                type="text"
                name="nameOnCard"
                placeholder="John Doe"
                value={cardDetails.nameOnCard}
                onChange={handleCardDetailsChange}
                required
              />
            </div>
            <button type="submit" className="submit-payment-button">
              Submit Payment
            </button>
          </form>
        )}

        {paymentMethod === "paypal" && (
          <button onClick={handlePaymentSubmit} className="submit-payment-button">
            Pay with PayPal
          </button>
        )}
      </div>
    </div>
    </div>
  );
};

export default Payment;
