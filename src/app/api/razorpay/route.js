import Razorpay from "razorpay";
import crypto from "crypto";
import { NextResponse } from "next/server";

const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

// ✅ Step 1: Create Razorpay Order (Before Payment)
export async function POST(req) {
  try {
    const { amount } = await req.json();

    if (!amount) {
      return NextResponse.json({ error: "Amount is required" }, { status: 400 });
    }

    const options = {
      amount: amount * 100, // Convert INR to paise
      currency: "INR",
      receipt: `order_rcptid_${Date.now()}`,
      payment_capture: 1, // Auto capture payment
    };

    const order = await razorpay.orders.create(options);

    return NextResponse.json(order, { status: 200 });
  } catch (error) {
    console.error("Razorpay Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

// ✅ Step 2: Verify Payment & Store Order in DB
export async function PUT(req) {
  try {
    const { razorpay_order_id, razorpay_payment_id, razorpay_signature } = await req.json();

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return NextResponse.json({ error: "Invalid Payment Data" }, { status: 400 });
    }

    const generatedSignature = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
      .update(`${razorpay_order_id}|${razorpay_payment_id}`)
      .digest("hex");

    if (generatedSignature !== razorpay_signature) {
      return NextResponse.json({ error: "Payment Verification Failed" }, { status: 400 });
    }

    // ✅ Save order to database (example)
    const savedOrder = {
      order_id: razorpay_order_id,
      payment_id: razorpay_payment_id,
      status: "Paid",
      timestamp: new Date(),
    };

    return NextResponse.json({ message: "Payment Verified & Order Stored", order: savedOrder }, { status: 200 });
  } catch (error) {
    console.error("Payment Verification Error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}