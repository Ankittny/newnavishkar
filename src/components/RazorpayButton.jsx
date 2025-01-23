import { useState } from "react";
import axiosInstance from "@/utils/axios";
import axios from "axios";

export default function RazorpayButton({ totalAmount, addressId, shippingDetails }) {
  const token = localStorage.getItem("token");
  const [loading, setLoading] = useState(false);

  const handlePayment = async () => {
    setLoading(true);

    try {
      // 1️⃣ Send Shipping Address & Order Details BEFORE Payment
      const orderResponse = await axiosInstance.get(
        "/customer/order/place",
        {
          address_id: addressId,
          coupon_code: "32543",
          coupon_discount: 200,
          billing_address_id: addressId,
          order_note: "This is test",
          guest_id: false,
          is_guest: 0,
          is_check_create_account: true,
          password: "ankit176@",
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const orderData = orderResponse.data;

      // 2️⃣ Call Razorpay API to Create Order
      const razorpayResponse = await axios.post("/api/razorpay", 
        { amount: totalAmount }, // Amount in rupees
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const paymentData = razorpayResponse.data;

      // 3️⃣ Load Razorpay Script
      const loadRazorpay = (src) =>
        new Promise((resolve) => {
          const script = document.createElement("script");
          script.src = src;
          script.onload = () => resolve(true);
          script.onerror = () => resolve(false);
          document.body.appendChild(script);
        });

      const isLoaded = await loadRazorpay("https://checkout.razorpay.com/v1/checkout.js");

      if (!isLoaded) {
        alert("Razorpay SDK failed to load.");
        return;
      }

      // 4️⃣ Open Razorpay Payment Window
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: paymentData.amount,
        currency: paymentData.currency,
        name: "Skylabs Solutions",
        description: "Order Payment",
        order_id: paymentData.id,
        handler: async function (response) {
          alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);

          // ✅ Send payment confirmation to the backend
          await axiosInstance.post("/customer/order/confirm", {
            order_id: orderData.id,
            payment_id: response.razorpay_payment_id,
            signature: response.razorpay_signature,
          });
        },
        prefill: {
          name: `${shippingDetails?.firstName} ${shippingDetails?.lastName}`,
          email: shippingDetails?.email,
          contact: shippingDetails?.phone,
        },
        theme: { color: "#3399cc" },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed. Please try again.");
    }

    setLoading(false);
  };

  return (
    <button onClick={handlePayment} disabled={loading} className="btn btn-primary">
      {loading ? "Processing..." : "Pay with Razorpay"}
    </button>
  );
}