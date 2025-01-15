"use client";
import React, { useEffect, useState } from "react";
import { configData } from "@/redux/Action/Config";
import { useDispatch, useSelector } from "react-redux";

const PrivacyPolicy = () => {
  const dispatch = useDispatch();
  const [privacyPolicy, setPrivacyPolicy] = useState([]);

  const { loading, error, config } = useSelector((state) => state.config);

  useEffect(() => {
    dispatch(configData());
  }, [dispatch]);

  useEffect(()=>{
    if(config && config.privacy_policy){
      setPrivacyPolicy(config.privacy_policy)
    }
  },[config])

  console.log("Privacy Policy",privacyPolicy)


  return (
    <div className="privacy-policy-container container">
      <div className="privacy-policy-wrapper">
        <h1 className="privacy-policy-title">Privacy Policy</h1>
        <p className="privacy-policy-description text-center">
          At Skylab Solution Indiia Privet Limited, we are committed to
          protecting your personal information and your right to privacy. <br /> This
          Privacy Policy outlines how we collect, use, and protect your data.
        </p>

        <hr className="divider" />

        <section className="privacy-policy-section">
          <h2 className="section-title"> 1. Information We Collect</h2>
          <ul className="section-list">
            <li>
              Personal information such as name, email, phone number, and
              address.
            </li>
            <li>Payment details when you make purchases.</li>
            <li>Browsing behavior on our website.</li>
          </ul>
        </section>

        <section className="privacy-policy-section">
          <h2 className="section-title"> 2. How We Use Your Information</h2>
          <p className="section-paragraph">
            We use the information collected to provide better services,
            including:
          </p>
          <ul className="section-list">
            <li>Processing your orders and managing your account.</li>
            <li>Sending promotional offers and updates.</li>
            <li>Improving our website and user experience.</li>
          </ul>
        </section>

        <section className="privacy-policy-section">
          <h2 className="section-title"> 3. Sharing Your Information</h2>
          <p className="section-paragraph">
            We do not sell your personal information to third parties. However,
            we may share your data with trusted partners for purposes such as:
          </p>
          <ul className="section-list">
            <li>Payment processing and delivery services.</li>
            <li>Compliance with legal obligations.</li>
            <li>Improving our advertising campaigns.</li>
          </ul>
        </section>

        <section className="privacy-policy-section">
          <h2 className="section-title"> 4. Your Privacy Choices</h2>
          <p className="section-paragraph">
            You have the right to access, modify, or delete your personal
            information. To exercise these rights, contact us at
            navishkar@gmail.com.
          </p>
        </section>

        {/* <div className="privacy-policy-footer">
          <button className="support-button">Contact Us</button>
        </div> */}
      </div>
    </div>
  );
};

export default PrivacyPolicy;
