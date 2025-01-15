"use client";
import React, { useState } from "react";
import ProductBanner from "./ProductBanner";
import Image from "next/image";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { partnerBeData } from "@/redux/Action/PartnerBe";
import Swal from "sweetalert2";
// import './PartnerWithUs.css';

const PartnerWithUs = () => {
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    oraganization_name: "",
    location: "",
    contact_number: "",
    official_email: "",
    querry_description: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
    const requiredFields = [
      "oraganization_name",
      "location",
      "contact_number",
      "official_email",
      "querry_description",
    ];

    const isValid = requiredFields.every((field) => formData[field]);

    if (!isValid) {
      Swal.fire({
        icon: "warning",
        title: "Validation Error",
        text: "Please fill in all required fields.",
      });
      return;
    }

    setLoading(true);

    try {
      const response = await dispatch(partnerBeData(formData));
      if (response && response.status) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.message || "Enquiry successfully submitted.",
        });
        setFormData({
          oraganization_name: "",
          location: "",
          contact_number: "",
          official_email: "",
          querry_description: "",
        }); // Reset form

        setShow(false)
      } else {
        throw new Error(response?.message || "Failed to submit enquiry.");
      }
    } catch (error) {
      console.error("Submission Error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Failed to submit enquiry. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <ProductBanner imageUrl={"/product/productDetailBanner.png"} />

      <div className="partners-title">
        <div className="container">
          <div className="partner-heading text-center">
            <h1>Partner with Us</h1>

            <button className="partner-button" onClick={handleShow}>
              Be Partner With Us
            </button>
          </div>
          <div className="classic-partner-title">
            <div className="partner d-flex">
              <Image src={"/PWS/pwu1.png"} height={100} width={100} alt="pws" />
            </div>
            <div className="partner-other-int">
              <h2>Partner with Us</h2>
              <p>
                Are you ready to embark on an educational journey that
                challenges orthodox ways and embraces innovations? Navishkar
                invites you to join us in revolutionising the education
                industry. With a dedication to providing a comprehensive
                educational solution where creativity knows no bounds, we offer
                a transformative experience for schools looking to cultivate
                students who can Imagine and Innovate.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Modal */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Partner with Us</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              {/* Organization Name */}
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formOrganization">
                  <Form.Label>Organization Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="oraganization_name"
                    value={formData.oraganization_name}
                    onChange={handleChange}
                    placeholder="Enter your Oragnization Name"
                  />
                </Form.Group>
              </Col>
              {/* Location */}
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formLocation">
                  <Form.Label>Location</Form.Label>
                  <Form.Control 
                  type="text" 
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter your location"
                   />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              {/* Contact Number */}
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formContact">
                  <Form.Label>Contact Number</Form.Label>
                  <Form.Control
                    type="number"
                    name="contact_number"
                    value={formData.contact_number}
                    onChange={handleChange}
                    placeholder="Enter your contact number"
                  />
                </Form.Group>
              </Col>
              {/* Official Email */}
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Official Email</Form.Label>
                  <Form.Control
                    type="email"
                    name="official_email"
                    value={formData.official_email}
                    onChange={handleChange}
                    placeholder="Enter your official email"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              {/* Query Description */}
              <Col md={12}>
                <Form.Group className="mb-3" controlId="formQuery">
                  <Form.Label>Query Description</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={4}
                    name="querry_description"
                    value={formData.querry_description}
                    onChange={handleChange}
                    placeholder="Enter your query description"
                  />
                </Form.Group>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Submit
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default PartnerWithUs;
