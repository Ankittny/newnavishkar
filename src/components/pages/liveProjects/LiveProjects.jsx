"use client";
import ProductBanner from "@/components/ProductBanner";
import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Button, Divider } from "@mui/material";
import Certificate from "@/components/Certificate";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";
import RelatedProduct from "@/components/RelatedProduct";
import Link from "next/link";
import Filter from "@/components/Filter";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import BoysToys from "@/components/BoysToys";
import OurAchievement from "@/components/OurAchievment";
import Form from "react-bootstrap/Form";
import { Modal, Row, Col } from "react-bootstrap";
import { InnovationEnqueryData } from "@/redux/Action/InnovationEnquery";
import Swal from "sweetalert2"; // Import SweetAlert2

const LiveProjects = () => {
  const [show, setShow] = useState(false);
  const [labData, setLabData] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [loading, setLoading] = useState(false); // For button state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contact_no: "",
    class_branch: "",
    parent_name: "",
    parent_contact_no: "",
    school_college_name: "",
    enquiry: "",
  });

  const router = useRouter();
  const dispatch = useDispatch();

  const handleClose = () => {
    setShow(false);
    setFormData({
      name: "",
      email: "",
      contact_no: "",
      class_branch: "",
      parent_name: "",
      parent_contact_no: "",
      school_college_name: "",
      enquiry: "",
    });
  };

  const projects = [
    { id: 1, name: "Line Following Robot", imageUrl: "/labs/lab1.png" },
    { id: 2, name: "Simon Memory Game", imageUrl: "/labs/lab1.png" },
    // Add more projects as needed
  ];

  const handleShow = (project) => {
    setSelectedProject(project);
    setShow(true);
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async () => {
    const requiredFields = ["name", "email", "contact_no", "enquiry"];
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
      const response = await dispatch(InnovationEnqueryData(formData)); // Await
      if (response && response.status) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.message || "Enquiry successfully submitted.",
        });
        handleClose();
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
  

  return (
    <>
      <ProductBanner
       
        linkText="Live Demo"
        linkUrl="/demo"
        imageUrl={"/labs/4.png"}
      />

      <div className="container mt-5">
        <div className="row detail-nav">
          <div className="col-lg-3">
            <BoysToys />
          </div>

          <div className="col-lg-9">
            <div className="mt-2 live-project-heading">
              <h3>Navishkar The Leading Brand In Education</h3>
            </div>

            <div className="row">
              {projects.map((project) => (
                <div className="col-lg-6" key={project.id}>
                  <div className="complete-project gap-4">
                    <div className="imag-complete">
                      <Image
                        src={project.imageUrl}
                        alt={project.name}
                        width={100}
                        height={100}
                      />
                    </div>
                    <div className="d-flex flex-column justify-content-center align-items-center mt-4">
                      <h5 className="live-project-name">{project.name}</h5>
                      <Button
                        variant="contained"
                        className="enroll-now"
                        onClick={() => handleShow(project)} // Pass project to handleShow
                      >
                        Enroll Now
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title> <h1 className="text-center">Enroll for {selectedProject?.name}</h1></Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Row>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    // placeholder="Enter your first name"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    // placeholder="name@example.com"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              <Col md={12}>
                <Form.Group className="mb-3" controlId="formContact">
                  <Form.Label>Contact Number</Form.Label>
                  <Form.Control
                    type="number"
                    name="contact_no"
                    value={formData.contact_no}
                    onChange={handleChange}
                    // placeholder="Enter your contact number"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formClass">
                  <Form.Label>Class/Branch</Form.Label>
                  <Form.Control
                    type="text"
                    name="class_branch"
                    value={formData.class_branch}
                    onChange={handleChange}
                    // placeholder="Enter your class or branch name"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formParentName">
                  <Form.Label>Parent Name</Form.Label>
                  <Form.Control
                    type="text"
                    name="parent_name"
                    value={formData.parent_name}
                    onChange={handleChange}
                    // placeholder="Enter your parent name"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formParentNum">
                  <Form.Label>Parent Number</Form.Label>
                  <Form.Control
                    type="number"
                    name="parent_contact_no"
                    value={formData.parent_contact_no}
                    onChange={handleChange}
                    // placeholder="Enter your parent number"
                  />
                </Form.Group>
              </Col>
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formSchool">
                  <Form.Label>School/College</Form.Label>
                  <Form.Control
                    type="text"
                    name="school_college_name"
                    value={formData.school_college_name}
                    onChange={handleChange}
                    // placeholder="Enter your school or college name"
                  />
                </Form.Group>
              </Col>
            </Row>
            <Row>
             
              <Col md={12}>
                <Form.Group className="mb-3" controlId="formEnquiry">
                  <Form.Label>Enquiry</Form.Label>
                  <Form.Select
                    name="enquiry"
                    value={formData.enquiry}
                    onChange={handleChange}
                  >
                    <option value="">-Select-</option>
                    <option value="live">Live project</option>
                    <option value="complete">Completed Projects</option>
                    <option value="toy">Toy</option>
                    <option value="workshop">Workshop</option>
                    <option value="labs">Activity Labs</option>
                  </Form.Select>
                </Form.Group>
                <Button variant="primary " className="varient-btn btn btn-primary text-white" onClick={handleSubmit}>
            Submit
          </Button>
              </Col>
            </Row>
          </Form>
        </Modal.Body>
      
      </Modal>

      <div className="row">
        <div className="col-lg-12 mt-3 mb-3">
          <div className="text-center ">
            <h1 className="reletedHead">Related Live Projects</h1>
          </div>
        </div>
        <div className="col-lg-12">
          <Swiper
          centeredSlides={true}
            navigation={false}
            modules={[Autoplay, Navigation]} // Importing Autoplay module
            className="mySwiper"
            autoplay={{
              delay: 3000, // Adjust delay as needed
              disableOnInteraction: false,
            }}
            loop={true}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 50,
              },
            }}
          >
            <SwiperSlide>
              <RelatedProduct />
            </SwiperSlide>
            <SwiperSlide>
              <RelatedProduct />
            </SwiperSlide>
            <SwiperSlide>
              <RelatedProduct />
            </SwiperSlide>
            <SwiperSlide>
              <RelatedProduct />
            </SwiperSlide>
            <SwiperSlide>
              <RelatedProduct />
            </SwiperSlide>
            <SwiperSlide>
              <RelatedProduct />
            </SwiperSlide>
          </Swiper>
        </div>
      </div>

      <OurAchievement />
    </>
  );
};

export default LiveProjects;