"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { configData } from "@/redux/Action/Config";

const ReturnPolicy = () => {
  const [returnPolicyContent, setReturnPolicyContent] = useState(""); // State to hold the API content
  const dispatch = useDispatch();

  const { loading, error, config } = useSelector((state) => state.config);

  useEffect(() => {
    dispatch(configData());
  }, [dispatch]);

  useEffect(() => {
    if (config && config.return_policy) {
      // Assuming the content is available in `config.return_policy.content` from API response
      setReturnPolicyContent(config.return_policy.content);
    }
  }, [config]);

  // console.log("Return Policy Content:", returnPolicyContent);/

  return (
    <div className="return-policy-container container">
      <div className="return-policy-wrapper">
        {/* <h1 className="return-policy-title">Return Policy</h1>
        <p className="return-policy-description">
          Thank you for shopping with us! We value your satisfaction and strive to ensure a smooth return process. Please read the following policy carefully to understand how returns are handled.
        </p>

        <hr className="divider" /> */}

        {/* Injecting content fetched from the API dynamically */}
        <section className="return-policy-section">
          <div
            className="return-policy-dynamic-content"
            dangerouslySetInnerHTML={{ __html: returnPolicyContent }} // Set HTML content safely
          />
        </section>

        {/* You can keep the other static sections or update them as needed */}
        <section className="return-policy-section">
          <h2 className="section-title">Eligibility for Returns</h2>
          <ul className="section-list">
            <li>The product must be unused and in the same condition as you received it.</li>
            <li>The item must be returned in its original packaging.</li>
            <li>You have 30 days from the date of purchase to initiate a return.</li>
          </ul>
        </section>

        <section className="return-policy-section">
          <h2 className="section-title">How to Initiate a Return</h2>
          <ol className="section-list">
            <li>Log in to your account and navigate to the "Orders" section.</li>
            <li>Select the item you wish to return and click on "Request Return."</li>
            <li>Follow the instructions to generate a return shipping label.</li>
          </ol>
        </section>

        <section className="return-policy-section">
          <h2 className="section-title">Exceptions to Returns</h2>
          <p className="section-paragraph">
            Some items are non-returnable due to hygiene and safety concerns, including:
          </p>
          <ul className="section-list">
            <li>Personal care items.</li>
            <li>Customized or personalized products.</li>
            <li>Perishable goods.</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default ReturnPolicy;
