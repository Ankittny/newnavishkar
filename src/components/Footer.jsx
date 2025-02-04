import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Image from "next/image";
import Link from "next/link";
import { FaFacebookSquare } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaLinkedin } from "react-icons/fa6";
import { FaYoutubeSquare } from "react-icons/fa";
import { FaInstagramSquare } from "react-icons/fa";
import { FaWhatsappSquare } from "react-icons/fa";
const Footer = () => {
  return (
    <>
      {/* Footer Section */}
      <section className="">
        <div className={`footer_namiskar py-5 text-white`}>
          <div className="container">
            <div className="row">
              <div className="col-lg-12  mb-4">
                <div className="footer-logo">
                  <Image
                    src={"/logo_second.png"}
                    alt="logo"
                    width={150}
                    height={50}
                    className="img-fluid"
                  />
                </div>
              </div>

              {/* About Us */}
              <div className="col-lg-3 mb-4">
                <div className="ct_contact_us">
                  <h3>About Us</h3>
                  <p>
                    Derived from the words "Nav" stands for new and "Avishkar"
                    stands for discovery, we are passionately committed to
                    providing high-quality STEAM education for young minds.
                  </p>
                </div>
              </div>

              {/* Quick Links */}
              <div className="col-lg-3 mb-4">
                <div className="ct_contact_us">
                  <h3>Quick Links</h3>
                  <ul className="list-unstyled">
                    <li>
                      <Link href="https://skycompiler.skylabsapp.com/py/" target="_blank">Compiler</Link>
                    </li>
                    <li>
                      <Link href="/aboutus">About Us</Link>
                    </li>
                    <li>
                      <Link href={"/contactus"}>Contact Us</Link>
                    </li>
                    {/* <li>
                      <Link href={"/aboutus"}>Our Team</Link>
                    </li> */}
                    <li>
                      <Link href={"/labs"}>N-Labs</Link>
                    </li>
                    <li>
                      <Link href={"/products"}>Products</Link>
                    </li>
                    <li>
                      <Link href={"/partner-with-us"}>Partner With Us</Link>
                    </li>
                    <li>
                      <Link href={"/complete-project"}>
                      Projects
                      </Link>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Follow Us */}
              <div className="col-lg-3 mb-4">
                <div className="ct_contact_us">
                  <h3>Important Links</h3>
                  <ul className="list-unstyled">
                    <li>
                      <Link href={"/return-policy"}>Return Policy Page</Link>
                    </li>
                    <li>
                      <Link href={"/privacy-policy"}>Privacy Policy Page</Link>
                    </li>
                    {/* <li>Shipping and Delivery</li> */}
                    <li>
                      <Link href={"/terms-condition"}>Terms & Conditions</Link>
                    </li>
                    <li>Customized Solution</li>
                    {/* <li>Equipment</li>
                    <li>Comprehensive Curriculum</li>
                    <li>Expertise and Experience</li> */}
                  </ul>
                </div>
              </div>

              {/* Contact Us */}
              <div className="col-lg-3 mb-4">
                <div className="ct_contact_us">
                  <h3>Contact Us</h3>
                  <ul className="list-unstyled">
                    <li>
                      A 12-13, 2nd Floor, Sector 16, Gautam Buddha Nagar Noida,
                      Uttar Pradesh 201301
                    </li>
                    <li>info@navishkar.com</li>
                    <li>+91 81303 31254</li>
                  </ul>
                </div>
                <div className="social-icons">
                  <ul className="d-flex gap-3" style={{ paddingLeft: "0px" }}>
                    <li style={{ listStyle: "none" }}>
                      <Link href={"https://www.facebook.com/navishkar1/"}>
                        <FaFacebookSquare size={30} />
                      </Link>
                    </li>
                    <li style={{ listStyle: "none" }}>
                      <Link href={"https://x.com/navishkar_edu"}>
                        <FaXTwitter size={30} />
                      </Link>
                    </li>
                    <li style={{ listStyle: "none" }}>
                      <Link href={"https://www.linkedin.com/company/94801673/admin/dashboard/"}>
                        <FaLinkedin size={30} />
                      </Link>
                    </li>
                    <li style={{ listStyle: "none" }}>
                      <Link href={"https://www.youtube.com/@Navishkar1"}>
                        <FaYoutubeSquare size={30} />
                      </Link>
                    </li>
                    <li style={{ listStyle: "none" }}>
                      <Link href={"https://www.instagram.com/navishkar_edu/"}>
                        <FaInstagramSquare size={30} />
                      </Link>
                    </li>
                    <li style={{ listStyle: "none" }}>
                      <Link href={""}>
                        <FaWhatsappSquare size={30} />
                      </Link>
                    </li>
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
          <h5 className="">
            Copyrights © 2024. All rights reserved by{" "}
            <span>Tinkering Intelli Labs Pvt. Ltd.</span>
          </h5>
        </div>
      </section>
    </>
  );
};

export default Footer;
