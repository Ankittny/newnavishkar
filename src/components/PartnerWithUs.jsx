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
          <div className="classic-partner-title">
            <div className=" partners d-flex flex-row-reverse">
              <Image src={"/PWS/Step-Learning.png"} height={100} width={100} alt="pws" />
            </div>
            <div className="partner-others-int">
              <h2>Customized Solutions for Our Partners
              </h2>
              <p>
                We recognize every school has unique goals and aspirations they have.
                That's why we provide  personalized solutions that are designed to meet
                your specific needs and objectives. <br /> Our partnership is not a conventional approach
                instead, it is focused on collaboration to create <br /> an educational experience that
                perfectly aligns with your school's vision and mission.
              </p>
            </div>
          </div>
          <div className="classic-partner-title">
            <div className="partner d-flex">
              <Image src={"/PWS/compare.png"} height={100} width={100} alt="pws" />
            </div>
            <div className="partner-other-int">
              <h2>Products Catered to Cover All Learning Avenues</h2>
              <p>
                We have a comprehensive product range that is specifically designed to
                support every stage of the le-arning journey. Our immersive Navishkar K-8 Kits are
                created to engage young minds through hands-on exploration, while our Robotics Kits inspire
                curiosity in science and technology. With our diverse offerings, we strive to cater to all
                aspects of STEAM education. By partnering with us, you'll have access to an extensive range
                of resources that enhance every student's educational experience.
              </p>
            </div>
          </div>
          <div className="classic-partner-title">
            <div className=" partners d-flex flex-row-reverse">
              <Image src={"/PWS/navishkar-01.png"} height={100} width={100} alt="pws" />
            </div>
            <div className="partner-others-int">
              <h2>State-of-the-Art Equipment to Build High-End Labs
              </h2>
              <p>
                Upgrade your school with cutting-edge educational technology and equipment
                from  Navishkar. <br/> We offer tools and kits that empower students through experiential
                learning.  These tools cater to <br /> students, allowing them to  explore, experiment, and innovate
                in high-end labs. With our commitment to excellence, your school will be at the forefront of
                STEAM-powered education.
              </p>
            </div>
          </div>
          <div className="classic-partner-title">
            <div className="partner d-flex">
              <Image src={"/PWS/pwu1.png"} height={100} width={100} alt="pws" />
            </div>
            <div className="partner-other-int">
              <h2>Comprehensive Curriculum for Step-by-Step Learning</h2>
              <p>
                Our curriculum is designed with meticulous attention to detail,
                following the NEP 2020 guidelines. By choosing to collaborate with us,
                your school will be at the forefront of implementing hands-on educational approach.
                Our comprehensive curriculum guarantees that your students receive a holistic education,
                equipping them with the necessary skills for a future packed with possibilities.
              </p>
            </div>
          </div>
          <div className="classic-partner-title">
            <div className=" partners d-flex flex-row-reverse">
              <Image src={"/PWS/CoverAllLearningAvenues.png"} height={100} width={100} alt="pws" />
            </div>
            <div className="partner-others-int">
              <h2>Proper Teacher Training for Easy Transition

              </h2>
              <p>
                We understand that embracing a new educational approach can be difficult.
                That's why <br /> Navishkar provides comprehensive teacher training programs to help
                your educators effectively implement our educational solutions. Our objective is
                to ensure a smooth transition and equip <br /> your teachers with the necessary tools to
                deliver high-quality STEAM education
              </p>
            </div>
          </div>
          <div className="classic-partner-title">
            <div className="partner d-flex">
              <Image src={"/PWS/SUpport.png"} height={100} width={100} alt="pws" />
            </div>
            <div className="partner-other-int">
              <h2>Excellent After-Sales Support

              </h2>
              <p>
                We are committed to providing excellent after-sales assistance to address
                any questions, concerns, or needs that may arise. Our goal is to ensure a seamless
                and successful integration of our educational solutions into your school.
                By partnering with Navishkar, your school will not only enhance its educational
                offerings but also position itself as a STEAM-powered institution. Join us in
                Nurturing Curiosity, Igniting Innovation, and revolutionising education. Together,
                let's lead the way towards a brighter tomorrow where learning has no limits. Partner
                with us!
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
                    // placeholder="Enter your Oragnization Name"
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
                    // placeholder="Enter your location"
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
                    // placeholder="Enter your contact number"
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
                    // placeholder="Enter your official email"
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
                    // placeholder="Enter your query description"
                  />
                </Form.Group>
                <Button variant="primary" onClick={handleSubmit} className="varient-btn">
            Submit
          </Button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default PartnerWithUs;
