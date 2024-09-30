import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Image from 'next/image';
// import second_logo from "../../assets/logo_second.png";


const Footer = () => {
  return (
    <>
     {/* Footer Section */}
    <section>
        <div className={`footer_namiskar py-5 text-white`} >
          <div className="container">
            <div className="row">
              <div className="col-lg-12  mb-4">
                <div className="footer-logo">
                  <Image src='/logo_second.png' alt="logo" width={150} height={50} className="img-fluid" />
                </div>
              </div>

              {/* About Us */}
              <div className="col-lg-3 mb-4">
                <div className='ct_contact_us'>
                  <h3>About Us</h3>
                  <p>
                    Derived from the words "Nav" stands for new and "Avishkar" stands for discovery,
                    we are passionately committed to providing high-quality STEAM education for young minds.
                  </p>
                </div>
              </div>

              {/* Quick Links */}
              <div className="col-lg-3 mb-4">
                <div className='ct_contact_us'>
                  <h3>Quick Links</h3>
                  <ul className="list-unstyled">
                    <li>Compiler</li>
                    <li>About Us</li>
                    <li>Contact Us</li>
                    <li>Our Team</li>
                    <li>Labs</li>
                    <li>Products</li>
                    <li>Partner With Us</li>
                  </ul>
                </div>
              </div>

              {/* Follow Us */}
              <div className="col-lg-3 mb-4">
                <div className='ct_contact_us'>
                  <h3>Follow Us</h3>
                  <ul className="list-unstyled">
                    <li>Return Policy Page</li>
                    <li>Shipping and Delivery</li>
                    <li>Terms & Conditions</li>
                    <li>Customized Solution</li>
                    <li>Equipment</li>
                    <li>Comprehensive Curriculum</li>
                    <li>Expertise and Experience</li>
                  </ul>
                </div>
              </div>

              {/* Contact Us */}
              <div className="col-lg-3 mb-4">
                <div  className='ct_contact_us'>
                  <h3>Contact Us</h3>
                  <ul className="list-unstyled">
                    <li><i className="ri-home-line mx-2"></i>A 12-13, 2nd Floor, Sector 16, Gautam Buddha Nagar Noida, Uttar Pradesh 201301</li>
                    <li><i className="ri-mail-line mx-2"></i>info@navishkar.com</li>
                    <li><i className="ri-phone-fill mx-2"></i>+91 81303 31254</li>
                  </ul>
                </div>
                <div className="social-icons">
                  <ul className="d-flex gap-3">
                    <li><i className="ri-facebook-line"></i></li>
                    <li><i className="ri-twitter-line"></i></li>
                    <li><i className="ri-linkedin-line"></i></li>
                    <li><i className="ri-youtube-line"></i></li>
                    <li><i className="ri-instagram-line"></i></li>
                    <li><i className="ri-whatsapp-line"></i></li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

  {/* Footer Bottom Section */}
      <section>
        <div className={`down_footer text-center py-3 bg-light `}>
          <h5 className=''>Copyrights © 2024. All rights reserved by <span>Tinkering Intelli Labs Pvt. Ltd.</span></h5>
        </div>
      </section>
    </>
  )
}

export default Footer