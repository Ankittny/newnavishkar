



"use client";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  incrementQuantity,
  decrementQuantity,
  fetchCartData,
  clearCart
} from "../../../redux/Reducer/Cart";
import { useRouter } from "next/navigation";
import axiosInstance from "@/utils/axios";
import { MdAutoDelete } from "react-icons/md";
import Image from "next/image";
import { Button } from "@mui/material";
import toast from "react-hot-toast";

const axios = axiosInstance;

const CartComponent = () => {
  const token = useSelector((state) => state.auth.token);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [coupons, setCoupons] = useState([]);
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [selectedCoupon, setSelectedCoupon] = useState(null);

  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    if (token) {
      dispatch(fetchCartData(token));
    }
  }, [dispatch, token]);

  const handleDecrement = async (id, currentQuantity) => {
    if (currentQuantity > 1) {
      try {
        await axios.put("/cart/update", { token, key: id, quantity: currentQuantity - 1 });
        dispatch(decrementQuantity(id));
        dispatch(fetchCartData(token));
      } catch (error) {
        console.error("Error updating quantity:", error);
      }
    }
  };

  const handleIncrement = async (id, currentQuantity) => {
    try {
      await axios.put("/cart/update", { token, key: id, quantity: currentQuantity + 1 });
      dispatch(incrementQuantity(id));
      dispatch(fetchCartData(token));
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const handleClear = async (id) => {
    try {
      await axios.delete("/cart/remove", {
        data: { token, key: id },
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch(clearCart(id));
      dispatch(fetchCartData(token));
      toast.success("Item deleted successfully!");
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("Failed to delete item!"); // Show error message in case of failure
    }
  };

  const calculateSubTotal = () => cartItems.reduce(
    (acc, item) => acc + parseFloat(item.price) * parseInt(item.quantity, 10), 0
  );

  const calculateTotalDiscount = () => cartItems.reduce(
    (acc, item) => acc + (parseFloat(item.discount) || 0) * parseInt(item.quantity, 10), 0
  );

  const subTotal = calculateSubTotal();
  const totalDiscount = calculateTotalDiscount();
  const grandTotal = subTotal - totalDiscount - appliedDiscount;

  const fetchCoupons = async () => {
    try {
      const result = await axios.get("/coupon/list");
      setCoupons(result.data.coupons);
    } catch (err) {
      console.error("Error fetching coupons:", err);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  // Function to apply the coupon with min_purchase check
  const applyCoupon = (coupon) => {
    if (subTotal < coupon.min_purchase) {
      alert(`Minimum purchase amount for this coupon is ₹${coupon.min_purchase}`);
      return;
    }

    let discountValue = 0;
    if (coupon.discount_type === "amount") {
      discountValue = parseFloat(coupon.discount);
    } else if (coupon.discount_type === "percentage") {
      discountValue = (subTotal * parseFloat(coupon.discount)) / 100;
    }

    console.log("Calculated Discount:", discountValue); // Debugging
    setAppliedDiscount(discountValue);
    setSelectedCoupon(coupon);
  };

  // Function to cancel the applied coupon
  const cancelCoupon = () => {
    setAppliedDiscount(0);
    setSelectedCoupon(null);
  };

  const handleProceedToCheckout = () => {
    localStorage.setItem("couponCode", selectedCoupon ? selectedCoupon.code : "");
    localStorage.setItem("totalAmount", grandTotal.toFixed(2));
    localStorage.setItem("discountValue", appliedDiscount ? appliedDiscount.toFixed(2) : "0");
    router.push("/cart/payments");
  };


 

  console.log("Applied Discount Before Checkout:", appliedDiscount);
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
              <table className="cart-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Unit Price</th>
                    <th>Qty</th>
                    <th>Total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {cartItems.map((item) => (
                    <tr key={item.id}>
                      <td className="cart-item">
                        <Image src={item.product?.thumbnail_full_url?.path} alt={item.name} width={100} height={100} />
                        <p>{item.name}</p>
                      </td>
                      <td>₹{(parseFloat(item.price) - parseFloat(item.discount)).toFixed(2)}</td>
                      <td className="quantity-controls">
                        <button onClick={() => handleDecrement(item.id, item.quantity)}>-</button>
                        <span>{parseInt(item.quantity, 10)}</span>
                        <button onClick={() => handleIncrement(item.id, item.quantity)}>+</button>
                      </td>
                      <td>₹{((parseFloat(item.price) - parseFloat(item.discount)) * parseInt(item.quantity, 10)).toFixed(2)}</td>

                      <td onClick={() => handleClear(item.id)} style={{ cursor: "pointer" }}>
                        <MdAutoDelete size={30} />
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
            <p className="d-flex justify-content-between">Sub Total <span>₹{subTotal.toFixed(2)}</span></p>
            <p className="d-flex justify-content-between">Shipping </p>
            <p className="d-flex justify-content-between">Discount on product <span>₹{totalDiscount.toFixed(2)}</span></p>

            {selectedCoupon && (
              <p className="d-flex justify-content-between">Applied Coupon Discount: <span>₹{appliedDiscount.toFixed(2)}</span></p>
            )}

            <div className="row">
              {coupons.map((coupon) => (
                <div className="col-md-12" key={coupon.id}>
                  <div className="coupon-card">
                    <p className="coupon-text">{coupon.code} (Min: ₹{coupon.min_purchase})</p>
                    {subTotal >= coupon.min_purchase ? (
                      selectedCoupon?.id === coupon.id ? (
                        <Button className="cancel-btn" onClick={cancelCoupon}>Remove</Button>
                      ) : (
                        <Button className="apply-btn" onClick={() => applyCoupon(coupon)}>Apply</Button>
                      )
                    ) : (
                      <Button className="apply-btn" disabled>Min ₹{coupon.min_purchase} Required</Button>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <hr />
            <p className=""><strong>Total Payable Amount: ₹{grandTotal.toFixed(2)}</strong></p>
          </div>

          <button className="checkout-button" onClick={handleProceedToCheckout}>
            Proceed to Checkout
          </button>
          <button className="continue-shopping" onClick={() => router.push("/")}>
            Continue Shopping
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartComponent;

