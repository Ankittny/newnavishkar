"use client";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { incrementQuantity, decrementQuantity, fetchCartData,clearCart } from "../../../redux/Reducer/Cart";
import { useRouter } from "next/navigation";
import axiosInstance from "@/utils/axios";
import { MdAutoDelete } from "react-icons/md";

const axios = axiosInstance;


const CartComponent = () => {
  const token = useSelector((state) => state.auth.token);
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  
  const router = useRouter();

  useEffect(() => {
    if (token) {
      dispatch(fetchCartData(token));
    }
  }, [dispatch, token]);



const handleDecrement = async (id, currentQuantity) => {
  if (currentQuantity > 1) {  // Ensure quantity doesn't go below 1
    const newQuantity = currentQuantity - 1;  // Decrement the quantity by 1

    try {
      const response = await axios.put(
        "/cart/update",  // Replace with your backend URL
        {
          token: token,             // Send the token for authentication
          key: id,            // Send the product ID
          quantity: newQuantity    // Send the new quantity
        },
        {
          headers: {
            Authorization: `Bearer ${token}` // Send the token in the request header for authentication
          }
        }
      );

      // Assuming the API response provides the updated cart data
      const updatedCartData = response.data.updatedCartItems; // Adjust according to actual response structure

      // Dispatch action to update Redux state with the new quantity
      dispatch(decrementQuantity(id));  // Dispatch the product ID to decrement the quantity

      console.log("Quantity updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  }
};




  const handleIncrement = async (id, currentQuantity) => {
    const newQuantity = currentQuantity + 1;  // Increment the quantity by 1
    
    try {
      const response = await axios.put(
        "/cart/update",  // Replace with your backend URL
        {
          token: token,             // Send the token for authentication
          key: id,            // Send the product ID
          quantity: newQuantity    // Send the new quantity
        },
        {
          headers: {
            Authorization: `Bearer ${token}` // Send the token in the request header for authentication
          }
        }
      );
  
      // Assuming the API response provides the updated cart data
      const updatedCartData = response.data.updatedCartItems; // Adjust according to actual response structure
  
      // Dispatch action to update Redux state with the new quantity
      dispatch(incrementQuantity(id));  // Dispatch the product ID to increment the quantity
      
      console.log("Quantity updated successfully:", response.data);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };
  
  
  const clear = async (id) => {
    try {
      const response = await axios.delete(
        "/cart/remove",  // Replace with your backend URL
        {
          data: { token: token, key: id },  // Send the token and product ID for authentication
          headers: {
            Authorization: `Bearer ${token}` // Send the token in the request header for authentication
          }
        }
      );
  
      // Assuming the API response provides the updated cart data
      const updatedCartData = response.data.updatedCartItems; // Adjust according to actual response structure
  
      // Dispatch action to update Redux state with the new quantity
      dispatch(clearCart(id));  // Dispatch the product ID to remove it from the cart
      
      console.log("Item removed successfully:", response.data);
    } catch (error) {
      console.error("Error removing item:", error);
    }
  }




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
                    <th></th>
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
                    <th></th>
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
                        <button onClick={() => handleDecrement(item.id,item.quantity)}>-</button>
                        <span>{parseInt(item.quantity, 10)}</span>
                        <button onClick={() => handleIncrement(item.id, item.quantity)}>+</button>
                      </td>
                      <td>
                        ₹{(parseFloat(item.price) * parseInt(item.quantity, 10)).toFixed(2)}
                      </td>
                      <td onClick={()=>clear(item.id)} style={{ cursor: "pointer" }}>
                        <MdAutoDelete size={30}/>
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
export default CartComponent;






