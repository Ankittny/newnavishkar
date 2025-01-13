import React from "react";

const ReturnPolicy = () => {
  return (
    <div className="return-policy-container container">
      <div className="return-policy-wrapper">
        <h1 className="return-policy-title">Return Policy</h1>
        <p className="return-policy-description">
          Thank you for shopping with us! We value your satisfaction and strive to ensure a smooth return process. Please read the following policy carefully to understand how returns are handled.
        </p>

        <hr className="divider" />

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

        {/* <section className="return-policy-section">
          <h2 className="section-title">Refund Process</h2>
          <p className="section-paragraph">
            Once we receive your returned item, it will be inspected within 3-5 business days. If approved, your refund will be processed to your original payment method within 7-10 business days.
          </p>
        </section> */}

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

        {/* <div className="return-policy-footer">
          <button className="support-button">Contact Support</button>
        </div> */}
      </div>
    </div>
  );
};

export default ReturnPolicy;
