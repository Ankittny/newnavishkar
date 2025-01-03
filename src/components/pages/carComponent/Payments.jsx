"use client";

import React, { useState } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";



const Payment = () => {
  const router = useRouter();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [paymentMethod, setPaymentMethod] = useState("COD");
  const [shippingDetails, setShippingDetails] = useState({
    firstName: "",
    lastName: "",
    phone: "",
    email: "",
    pincode: "",
    addressLine1: "",
    addressLine2: "",
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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handlePaymentSubmit = async (e) => {
    e.preventDefault();

    if (paymentMethod === "RazorPay") {
      // Redirect to RazorPay page or handle RazorPay payment here
      router.push("/razorpay");
    } else {
      // Handle COD payment logic and send email
      const emailContent = {
        shippingDetails,
        cartItems,
        totalPrice: finalPrice,
      };

      // Call your email API here (e.g., using fetch or axios)
      try {
        const response = await fetch("/api/send-email", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(emailContent),
        });

        if (response.ok) {
          // Successfully sent email
          router.push("/confirmation");
        } else {
          // Handle error
          console.error("Error sending email:", response.statusText);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };

  return (
    <div className="container">
      <div className="payment-page">
        <h2 className="payment-title text-center mt-3">Payment Information</h2>
        <div className="payment-container mt-4">
          <div className="row">
           
            <div className="col-lg-7">
              {/* Conditionally render the shipping address input for COD */}
              {paymentMethod === "COD" && (
                <div className="shipping-address">
                  <h4>Shipping Address</h4>
                  <div className="row">
                    <div className="col-lg-6">
                      <input
                        type="text"
                        name="firstName"
                        placeholder="First Name"
                        value={shippingDetails.firstName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="col-lg-6">
                      <input
                        type="text"
                        name="lastName"
                        placeholder="Last Name"
                        value={shippingDetails.lastName}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                

                  <div className="col-lg-6">
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    value={shippingDetails.phone}
                    onChange={handleInputChange}
                    required
                  />
                  </div>
                  <div className="col-lg-6">
                  <input
                    type="email"
                    name="email"
                    placeholder="Email Address"
                    value={shippingDetails.email}
                    onChange={handleInputChange}
                    required
                  />
                  </div>
                  <div className="col-lg-6">
                  <input
                    type="text"
                    name="pincode"
                    placeholder="Pincode"
                    value={shippingDetails.pincode}
                    onChange={handleInputChange}
                    required
                  />
                  </div>
                  <div className="col-lg-6">
                  <input
                    type="text"
                    name="addressLine1"
                    placeholder="Address Line 1"
                    value={shippingDetails.addressLine1}
                    onChange={handleInputChange}
                    required
                  />
                  </div>
                  <div className="col-lg-12">
                  <input
                    type="text"
                    name="addressLine2"
                    placeholder="Address Line 2"
                    value={shippingDetails.addressLine2}
                    onChange={handleInputChange}
                  />
                </div>
                </div>
                </div>
              )}
               <div className="text-center">
              <button onClick={handlePaymentSubmit} className="submit-payment-button mt-3">
                {paymentMethod === "RazorPay" ? "Pay with RazorPay" : "Confirm Order"}
              </button>
              </div>
            </div>
            <div className="col-lg-5">
              <div className="order-summary">
                <h3>Order Summary</h3>
                <p>Sub Total: ₹{totalPrice.toFixed(2)}</p>
                <p>Shipping: ₹{shipping.toFixed(2)}</p>
                <p>Discount: -₹{discount.toFixed(2)}</p>
                <hr />
                <p>Total: ₹{finalPrice}</p>
              </div>
              <div className="payment-methods mt-3">
            <h3>Choose Payment Method</h3>
            <label className="payment-label">
              <input
                className="mx-2"
                type="radio"
                name="paymentMethod"
                value="COD"
                checked={paymentMethod === "COD"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              COD
            </label>
            <label className="payment-label">
              <input
                className="mx-2"
                type="radio"
                name="paymentMethod"
                value="RazorPay"
                checked={paymentMethod === "RazorPay"}
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              RazorPay
            </label>
          </div>
            </div>
          </div>



          
        </div>
      </div>
    </div>
  );
};

export default Payment;
