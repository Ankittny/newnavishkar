import { useState } from "react";
import axiosInstance from "@/utils/axios";
import axios from "axios";
import Swal from "sweetalert2";
import { useRouter } from "next/navigation";

export default function RazorpayButton({ totalAmount,couponCode, addressId,discountAmount}) {
  const [loading, setLoading] = useState(false);
  const router = useRouter(); // Initialize router


  const handlePayment = async () => {

    if (!addressId) {
      Swal.fire({
        icon: "warning",
        title: "Address Required",
        text: "Please select an shipping address before proceeding with payment.",
        confirmButtonText: "OK",
      });
      return;
    }

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
        alert("Razorpay SDK failed to load..");
        setLoading(false);
        return;
      }

      // 3️⃣ Open Razorpay Payment Window
      const options = {
        key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
        amount: paymentData.amount,
        currency: paymentData.currency,
        name: "Tinkering Intelli labs Pvt Ltd.",
        description: "Order Payment",
        order_id: paymentData.id,
        handler: async function (response) {
          // alert(`Payment Successful! Payment ID: ${response.razorpay_payment_id}`);
         
          console.log("this is test =======================>",addressId);
          // 4️⃣ Now Place Order AFTER Payment Success
          const orderResponse = await axiosInstance.get("/customer/order/place", {
            params: {
              address_id: addressId,
              customer_id: localStorage.getItem("userid"),
              coupon_code: couponCode,
              coupon_discount: discountAmount,
              billing_address_id: addressId,
              order_note: "",
              guest_id: localStorage.getItem("userid"),
              is_guest: 0,
              is_check_create_account: false,
              password: "",
              payment_status: 'paid',
              payment_id: response.razorpay_payment_id, // ✅ Attach payment ID
              razorpay_signature: response.razorpay_signature,
            },
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          });

          console.log("Order Confirmed:", orderResponse.data);
          router.push("/thankyou");
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



