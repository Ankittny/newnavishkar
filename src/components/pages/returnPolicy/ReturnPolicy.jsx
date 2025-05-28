"use client";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { configData } from "@/redux/Action/Config";

const ReturnPolicy = () => {
  const [returnPolicyContent, setReturnPolicyContent] = useState("");
  const dispatch = useDispatch();

  const { loading, error, config } = useSelector((state) => state.config || {});

  useEffect(() => {
    dispatch(configData());
  }, [dispatch]);

  useEffect(() => {
    if (config?.return_policy?.content) {
      setReturnPolicyContent(config.return_policy.content);
    }
  }, [config]);

  return (
    <div className="return-policy-container container py-12 px-4 text-gray-800">
      <div className="return-policy-wrapper max-w-4xl mx-auto bg-white rounded-xl shadow-md p-8 space-y-8">
        <h1 className="text-3xl font-bold text-center">📦 Return & Refund Policy</h1>

        <p className="text-lg text-center">
          Thank you for shopping with us! We value your satisfaction and strive to ensure a smooth return process. 
          Please read the policy below to understand how returns are handled.
        </p>

        <hr className="my-4 border-gray-300" />

        {/* Show loading, error, or content from API */}
        <section className="return-policy-section">
          <h2 className="text-2xl font-semibold mb-2">Our Official Return Policy</h2>
          {loading && <p className="text-blue-600">Loading return policy...</p>}
          {error && <p className="text-red-600">Error: {error}</p>}
          {!loading && !error && returnPolicyContent ? (
            <div
              className="return-policy-dynamic-content text-base leading-relaxed"
              dangerouslySetInnerHTML={{ __html: returnPolicyContent }}
            />
          ) : (
            !loading && !error && (
              <p className="text-gray-500 italic">No return policy content available from the server.</p>
            )
          )}
        </section>

        {/* Static Fallback/Additional Sections */}
        <section className="return-policy-section">
          <h2 className="text-2xl font-semibold mb-2">Eligibility for Returns</h2>
          <ul className="list-disc ml-6 space-y-1 text-base">
            <li>The product must be unused and in the same condition as you received it.</li>
            <li>The item must be returned in its original packaging.</li>
            <li>You have 30 days from the date of purchase to initiate a return.</li>
          </ul>
        </section>

        <section className="return-policy-section">
          <h2 className="text-2xl font-semibold mb-2">How to Initiate a Return</h2>
          <ol className="list-decimal ml-6 space-y-1 text-base">
            <li>Log in to your account and navigate to the "Orders" section.</li>
            <li>Select the item you wish to return and click on "Request Return."</li>
            <li>Follow the instructions to generate a return shipping label.</li>
          </ol>
        </section>

        <section className="return-policy-section">
          <h2 className="text-2xl font-semibold mb-2">Exceptions to Returns</h2>
          <p className="text-base mb-2">
            Some items are non-returnable due to hygiene and safety concerns, including:
          </p>
          <ul className="list-disc ml-6 space-y-1 text-base">
            <li>Personal care items</li>
            <li>Customized or personalized products</li>
            <li>Perishable goods</li>
          </ul>
        </section>
      </div>
    </div>
  );
};

export default ReturnPolicy;
