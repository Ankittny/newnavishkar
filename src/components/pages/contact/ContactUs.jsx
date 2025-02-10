"use client"
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Swal from "sweetalert2";
import Image from "next/image";
import ProductBanner from "@/components/ProductBanner";
import OurAchievement from "@/components/OurAchievment";
import { contactUsData } from "@/redux/Action/ContactUs";


const ContactUs = () => {
  const dispatch = useDispatch();
  const { loading, success, error } = useSelector((state) => state.contact);

  // State for form inputs
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile_number:"",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(contactUsData(formData));
  };

  // Handle Success and Error after dispatch
  useEffect(() => {
    if (success) {
      Swal.fire("Success!", "Your message has been sent successfully!", "success");
      setFormData({
        name: "",
        email: "",
        mobile_number: "",
        subject: "",
        message: "",
      });
    } else if (error) {
      Swal.fire("Error!", error, "error");
    }
  }, [success, error]); // Trigger this effect when success or error changes



  return (
    <div>
      <ProductBanner
        title="Young Innovators"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elitvashcb biiwuhiwq uidh ih uhi iui"
        imageUrl="/labs/labBanner.png"
      />

      <section className="mt-4">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <div className="image-container text-center">
                <Image
                  src="/Contact/contact.png"
                  alt="contact"
                  width={550}
                  height={560}
                />
              </div>
            </div>

            <div className="col-lg-6">
              <div className="form-container bg-light p-4 rounded shadow">
                <h2 className="text-center mb-4">Get in Touch</h2>
                <form onSubmit={handleSubmit}>
                  <div className="row mb-3">
                    <div className="col-md-6">
                      <input
                        type="text"
                        name="name"
                        placeholder="Enter Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        required
                        className="form-control control-now"
                      />
                    </div>
                    <div className="col-md-6">
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="form-control"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-6">
                      <input
                        type="text"
                        name="subject"
                        placeholder="Subject"
                        value={formData.subject}
                        onChange={handleChange}
                        className="form-control"
                      />
                    </div>

                    <div className="col-md-6">
                     <input
                     type="number"
                     name="mobile_number"
                     placeholder="Enter Your Mobile Number"
                     value={formData.mobile_number}
                     onChange={handleChange}
                     className="form-control"
                      />
                    </div>
                  </div>

                  <div className="row mb-3">
                    <div className="col-md-12">
                      <textarea
                        name="message"
                        placeholder="Message"
                        value={formData.message}
                        onChange={handleChange}
                        rows="4"
                        className="form-control"
                      ></textarea>
                    </div>
                  </div>
                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                    disabled={loading}
                  >
                    {loading ? "Sending..." : "Send"}
                  </button>
                </form>


                <div className="contact-info mt-4">
                  <div className="d-flex justify-content-between align-items-center  p-3 rounded">
                    <div className="info-item text-center">
                      <i className="fas fa-envelope mb-2"></i>
                      <p>Email</p>
                      <p>
                        <strong>info@navishkar.com</strong>
                      </p>
                    </div>
                    <div className="info-item text-center">
                      <i className="fas fa-phone mb-2"></i>
                      <p>Phone</p>
                      <p>
                        <strong>+123 456 7890</strong>
                      </p>
                    </div>
                    <div className="info-item text-center">
                      <i className="fas fa-map-marker-alt mb-2"></i>
                      <p>Address</p>
                      <p>
                        <strong>A17 Sector-4 Noida Uttarpradesh 201301</strong>
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mt-5">
        <div className="row mt-4">
          <div className="col-lg-12">
            <div className="map-container rounded shadow">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m13!1m8!1m3!1d7007.59605926379!2d77.32094400000001!3d28.575827!3m2!1i1024!2i768!4f13.1!3m2!1m1!2zMjjCsDM0JzMzLjAiTiA3N8KwMTknMTUuNCJF!5e0!3m2!1sen!2sus!4v1738841065596!5m2!1sen!2sus"
                width="100%"
                height="450"
                // frameborder="0"
                // style={{"border:0"}}
                // allowfullscreen=""
                aria-hidden="false"
                // tabindex="0"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      <section>
        <OurAchievement />
      </section>
    </div>
  );
};

export default ContactUs;


