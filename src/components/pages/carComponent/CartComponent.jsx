"use client";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { incrementQuantity, decrementQuantity } from "../../../redux/Reducer/Cart";
import { useRouter } from "next/navigation";
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
  const handleProceedToCheckout = () => {
    router.push("/cart/payments");
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






