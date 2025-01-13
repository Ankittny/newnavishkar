import React from "react";

const TermsCondition = () => {
  return (
    <div className="terms-container container">
      <div className="terms-wrapper">
        <h1 className="terms-title">Terms and Conditions</h1>
        <p className="terms-description">
          Welcome to Skylabs Solution India Private Limited. These terms and conditions outline the rules and regulations for using our website. By accessing this website, you agree to these terms and conditions in full.
        </p>

        <hr className="divider" />

        <section className="terms-section">
          <h2 className="section-title">Use of Our Website</h2>
          <ul className="section-list">
            <li>You must be at least 18 years old to use this website.</li>
            <li>You agree not to misuse the website for any unlawful or prohibited activities.</li>
            <li>All content on this website is for personal, non-commercial use only.</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2 className="section-title">Intellectual Property Rights</h2>
          <p className="section-paragraph">
            Unless stated otherwise, we or our licensors own the intellectual property rights for all material on this website. You may view and download content for personal use, but you must not:
          </p>
          <ul className="section-list">
            <li>Republish material from this website.</li>
            <li>Sell, rent, or sub-license material from this website.</li>
            <li>Reproduce, duplicate, or copy material for commercial purposes.</li>
          </ul>
        </section>

        <section className="terms-section">
          <h2 className="section-title">Limitation of Liability</h2>
          <p className="section-paragraph">
            We shall not be held responsible for any damages that arise from the use of our website. This includes, but is not limited to, direct, indirect, incidental, or consequential damages.
          </p>
        </section>

        <section className="terms-section">
          <h2 className="section-title">Changes to These Terms</h2>
          <p className="section-paragraph">
            We reserve the right to update these terms and conditions at any time. Changes will be effective immediately upon posting on this website. Please check this page regularly to stay informed.
          </p>
        </section>

        {/* <div className="terms-footer">
          <button className="support-button">Contact Us</button>
        </div> */}
      </div>
    </div>
  );
};

export default TermsCondition;
