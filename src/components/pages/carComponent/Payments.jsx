"use client";

import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import RazorpayButton from "@/components/RazorpayButton";
import { AddressData, getAddressData, updateAddressData, deleteAddressData } from "@/redux/Action/Address";
import { Modal, Button } from "react-bootstrap";

const Payment = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.cartItems);
  const { loading, error, AddressDetails } = useSelector((state) => state.address);

  const [showModal, setShowModal] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [couponCode, setCouponCode] = useState("");
  const [totalAmount, setTotalAmount] = useState(0);
  const [discountAmount, setDiscountAmount] = useState(0);


  const [shippingDetails, setShippingDetails] = useState({
    id: '',
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

  // Fetch Address Data
  useEffect(() => {
    dispatch(getAddressData());

    // Get stored values from localStorage
    const storedCoupon = localStorage.getItem("couponCode") || "";
    const storedAmount = localStorage.getItem("totalAmount") || "0";
    const discountMoney = localStorage.getItem("discountValue") || "0";

    console.log("Stored Coupon:", storedCoupon);
    console.log("Stored Amount:", storedAmount);
    console.log("Stored Discount:", discountMoney);

    setCouponCode(storedCoupon);
   setTotalAmount(parseFloat(storedAmount));
   setDiscountAmount(parseFloat(discountMoney));
   
  }, [dispatch]);

  // Handle Input Change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setShippingDetails((prevDetails) => ({
      ...prevDetails,
      [name]: value,
    }));
  };

  // Handle Address Submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (shippingDetails.id) {
      dispatch(updateAddressData(shippingDetails));
    } else {
      dispatch(AddressData({ ...shippingDetails }));
    }

    setShowModal(false);
    setShippingDetails({
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
  };

  // Handle Edit Address
  const handleEdit = (address) => {
    setShippingDetails(address);
    setIsEditing(true);
    setShowModal(true);
  };

  // Handle Delete Address
  const handleDelete = (addressId) => {
    const address = AddressDetails.find((addr) => addr.id === addressId);
    if (address) {
      dispatch(deleteAddressData(address.customer_id, address.id));
    }
  };

  const calculateTotalDiscount = () => cartItems.reduce(
    (acc, item) => acc + (parseFloat(item.discount) || 0) * parseInt(item.quantity, 10), 0
  );

  const totalDiscount = calculateTotalDiscount()
  // Calculate Final Amount
  // const shipping = 100;
  // const discount = 50;
  // const finalPrice = (totalAmount - discount ).toFixed(2);

  return (
    <div className="container">
      <div className="payment-page">
        <h2 className="payment-title text-center mt-3">Payment Information</h2>
        <div className="payment-container mt-4">
          <div className="row">
            {/* Address Selection */}
            <div className="col-lg-7">
              <Button variant="primary" onClick={() => setShowModal(true)}>Add New Address</Button>
              {Array.isArray(AddressDetails) && AddressDetails.length > 0 ? (
                AddressDetails.map((address) => (
                  <div key={address.id} className="saved-address d-flex align-items-center mt-3 border p-3 rounded">
                    <input
                      type="radio"
                      name="selectedAddress"
                      className="address-radio mr-2"
                      checked={selectedAddress === address.id}
                      onChange={() => setSelectedAddress(address.id)}
                    />
                    <div className="address-details mx-3 flex-grow-1">
                      <p><strong>{address.contact_person_name}</strong></p>
                      <p>{address.address}, {address.city}, {address.zip}, {address.country}</p>
                      <p>Phone: {address.phone}</p>
                    </div>
                    <div className="d-flex gap-3">
                      <Button variant="warning" className="edit-address mr-2" onClick={() => handleEdit(address)}>Edit</Button>
                      <Button variant="danger" onClick={() => handleDelete(address.id)}>Delete</Button>
                    </div>
                  </div>
                ))
              ) : (
                <p className="mt-3">No saved addresses available.</p>
              )}
            </div>

            {/* Order Summary & Payment */}
            <div className="col-lg-5">
              <div className="order-summary">
                <h3>Order Summary</h3>
                <p>Sub Total: ₹{totalAmount.toFixed(2)}</p>
                {/* <p>Shipping: ₹{shipping.toFixed(2)}</p> */}
                <p className="d-flex justify-content-between">Discount on product <span>₹{totalDiscount.toFixed(2)}</span></p>
                <p className="">Coupon Code Apply <b>({ couponCode })</b><span className="">{discountAmount}</span></p>
                <hr />
                <p>Total: ₹{totalAmount.toFixed(2)}</p>
              </div>
              <div className="payment-methods mt-3">
                <h3>Pay with Razorpay</h3>
                <RazorpayButton totalAmount={totalAmount} couponCode={couponCode} discountAmount={discountAmount}   addressId={selectedAddress} />
              </div>
            </div>
          </div>
        </div>
      </div>
      
      {/* Address Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>{isEditing ? "Edit Address" : "Add New Address"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={handleSubmit}>
            <input type="text" name="contact_person_name" placeholder="Full Name" value={shippingDetails.contact_person_name} onChange={handleInputChange} required className="form-control mb-2" />
            <input type="text" name="phone" placeholder="Phone Number" value={shippingDetails.phone} onChange={handleInputChange} required className="form-control mb-2" />
            <input type="text" name="address" placeholder="Address" value={shippingDetails.address} onChange={handleInputChange} required className="form-control mb-2" />
            <input type="text" name="city" placeholder="City" value={shippingDetails.city} onChange={handleInputChange} required className="form-control mb-2" />
            <input type="text" name="zip" placeholder="Zip Code" value={shippingDetails.zip} onChange={handleInputChange} required className="form-control mb-2" />
            <input type="text" name="country" placeholder="Country" value={shippingDetails.country} onChange={handleInputChange} required className="form-control mb-2" />
            <Button type="submit" className="mt-3 w-100">{isEditing ? "Update Address" : "Save Address"}</Button>
          </form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default Payment;
