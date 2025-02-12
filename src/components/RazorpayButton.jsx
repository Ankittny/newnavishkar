import { useState } from "react";
import axiosInstance from "@/utils/axios";
import axios from "axios";
// import { useRouter } from "next/navigation";

export default function RazorpayButton({ totalAmount,couponCode, addressId }) {
  const [loading, setLoading] = useState(false);
  // const router = useRouter(); // Initialize router


  const handlePayment = async () => {
    setLoading(true);
    const token = localStorage.getItem("authAdminToken");

    try {
      // 1️⃣ Call Razorpay API to Create Order FIRST
      const razorpayResponse = await axios.post(
        "/api/razorpay",
        { amount: totalAmount }, // Amount in rupees
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const paymentData = razorpayResponse.data;

      // 2️⃣ Load Razorpay Script
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
        setLoading(false);
        return;
      }

      // 3️⃣ Open Razorpay Payment Window
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: paymentData.amount,
        currency: paymentData.currency,
        name: "Skylabs Solutions",
        description: "Order Payment",
        order_id: paymentData.id,
        handler: async function (response) {
          alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);

          // 4️⃣ Now Place Order AFTER Payment Success
          const orderResponse = await axiosInstance.get(
            "/customer/order/place",
            {
              address_id: addressId,
              coupon_code: couponCode,
              coupon_discount: 0,
              billing_address_id: addressId,
              order_note: "",
              guest_id: false,
              is_guest: 0,
              is_check_create_account: true,
              password: "",
              payment_id: response.razorpay_payment_id, // ✅ Attach payment ID
              razorpay_signature: response.razorpay_signature,
            },
            {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
              },
            }
          );

          console.log("Order Confirmed:", orderResponse.data);
          // router.push("/");
        },
        prefill: {
          name: `${addressId?.firstName} ${addressId?.lastName}`,
          email: addressId?.email,
          contact: addressId?.phone,
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



