"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RazorpayButton from "@/components/RazorpayButton";
import { AddressData, getAddressData } from "@/redux/Action/Address";

const Payment = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { loading, error, AddressDetails } = useSelector((state) => state.address);

  console.log(AddressDetails);

  const [shippingDetails, setShippingDetails] = useState({
    contact_person_name: "",
    address_type: "Home",
    address: "",
    city: "",
    zip: "",
    country: "",
    phone: "",
    latitude: "10",
    longitude: "10",
    is_billing: true,
  });

  useEffect(() => {
    dispatch(getAddressData());
  }, [dispatch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(AddressData(shippingDetails));
  };

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


  const savedAddress = AddressDetails && AddressDetails[0];
  const addressId = savedAddress ? savedAddress.id : null;


  return (
    <div className="container">
      <div className="payment-page">
        <h2 className="payment-title text-center mt-3">Payment Information</h2>
        <div className="payment-container mt-4">
          <div className="row">
            <div className="col-lg-7">
              <form className="shipping-address" onSubmit={handleSubmit}>
                <h4>Shipping Address</h4>
                <div className="row">
                  <div className="col-lg-6">
                    <input type="text" name="contact_person_name" placeholder="Full Name" value={shippingDetails.contact_person_name} onChange={handleInputChange} required />
                  </div>
                  <div className="col-lg-6">
                    <input type="text" name="phone" placeholder="Phone Number" value={shippingDetails.phone} onChange={handleInputChange} required />
                  </div>
                  <div className="col-lg-6">
                    <input type="text" name="address" placeholder="Address" value={shippingDetails.address} onChange={handleInputChange} required />
                  </div>
                  <div className="col-lg-6">
                    <input type="text" name="city" placeholder="City" value={shippingDetails.city} onChange={handleInputChange} required />
                  </div>
                  <div className="col-lg-6">
                    <input type="text" name="zip" placeholder="Zip Code" value={shippingDetails.zip} onChange={handleInputChange} required />
                  </div>
                  <div className="col-lg-6">
                    <input type="text" name="country" placeholder="Country" value={shippingDetails.country} onChange={handleInputChange} required />
                  </div>
                </div>
                <button type="submit" className="submit-btn mt-3 p-2 w-100">Save Address</button>
              </form>
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
              {savedAddress && (
                <div className="order-summary mt-3">
                  <h4>Saved Address</h4>
                  <p>{savedAddress.contact_person_name}</p>
                  <p>{savedAddress.address}, {savedAddress.city}, {savedAddress.zip}, {savedAddress.country}</p>
                  <p>Phone: {savedAddress.phone}</p>
                  
                </div>
              )}
              <div className="payment-methods mt-3">
                <h3>Pay with Razorpay</h3>
                <RazorpayButton totalAmount={finalPrice} addressId={addressId} />

              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Payment;