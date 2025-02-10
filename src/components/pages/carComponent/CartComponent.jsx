

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

const axios = axiosInstance;

const CartComponent = () => {
  const token = useSelector((state) => state.auth.token);
  const cartItems = useSelector((state) => state.cart.cartItems);
  const [coupons, setCoupons] = useState([]);
  const [appliedDiscount, setAppliedDiscount] = useState(0);
  const [selectedCoupon, setSelectedCoupon] = useState(null); // Store applied coupon

  console.log("Cart Items", cartItems);

  console.log("Cart Items", cartItems);
  const dispatch = useDispatch();
  const router = useRouter();

  // Fetch cart data when token is available
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
        dispatch(fetchCartData(token)); // Refresh cart data
      } catch (error) {
        console.error("Error updating quantity:", error);
      }
    }
  };

  const handleIncrement = async (id, currentQuantity) => {
    try {
      await axios.put("/cart/update", { token, key: id, quantity: currentQuantity + 1 });
      dispatch(incrementQuantity(id));
      dispatch(fetchCartData(token)); // Refresh cart data
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
      dispatch(fetchCartData(token)); // Refresh cart data
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  const calculateSubTotal = () => cartItems.reduce(
    (acc, item) => acc + parseFloat(item.price) * parseInt(item.quantity, 10), 0
  );

  const subTotal = calculateSubTotal();
  // const shippingCost = 100;
  const discount = 50;
  const grandTotal = subTotal + - discount;


  const fetchCoupons = async () => {
    try {
      const result = await axios.get("/coupon/list");
      console.log("Coupons:", result.data);
      setCoupons(result.data.coupons); // Update state with the "coupons" array
    } catch (err) {
      setError("Failed to fetch coupons");
      console.error("Error fetching coupons:", err);
    }
  };


  useEffect(() => {
    fetchCoupons();
  }, []); // Only run once when component mounts


  // Function to apply the coupon
  const applyCoupon = (coupon) => {
    let discountValue = 0;
    if (coupon.discount_type === "amunt") {
      discountValue = parseFloat(coupon.discount);
    } else if (coupon.discount_type === "percentage") {
      discountValue = (subTotal * parseFloat(coupon.discount)) / 100;
    }

    setAppliedDiscount(discountValue);
    setSelectedCoupon(coupon);
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
                      <td>₹{parseFloat(item.price).toFixed(2)}</td>
                      <td className="quantity-controls">
                        <button onClick={() => handleDecrement(item.id, item.quantity)}>-</button>
                        <span>{parseInt(item.quantity, 10)}</span>
                        <button onClick={() => handleIncrement(item.id, item.quantity)}>+</button>
                      </td>
                      <td>₹{(parseFloat(item.price) * parseInt(item.quantity, 10)).toFixed(2)}</td>
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
            <p>Sub Total: ₹{subTotal.toFixed(2)}</p>
            <p>Shipping:  </p>
            <p>Discount on product: ₹{discount.toFixed(2)}</p>


            {/* Show discount only if applied */}
            {selectedCoupon && (
              <p>Apply Coupen Discount : {appliedDiscount}</p>
            )}
            <div className="row">
              {coupons.map((coupon) => (
                <div className="col-md-12" key={coupon.id}>
                  <div className="coupon-card">
                    <p className="coupon-text">{coupon.code}</p>
                    <Button className="apply-btn" onClick={() => applyCoupon(coupon)}>Apply</Button>
                  </div>
                </div>
              ))}
            </div>



            <hr />
            <p><strong>Total: ₹{grandTotal.toFixed(2)}</strong></p>

            {/* <div className="coupon"><input type="text" placeholder="Coupon code" /><button>APPLY</button></div> */}
          </div>

          <button className="checkout-button" onClick={() => router.push("/cart/payments")}>
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



