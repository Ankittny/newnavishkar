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

const LiveProjects = () => {
  const [show, setShow] = useState(false);
  const [labData, setLabData] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null); 
  
  const router = useRouter();
  const dispatch = useDispatch();

  const handleClose = () => setShow(false);
  const handleShow = (project) => {
    setSelectedProject(project); // Set the selected project
    setShow(true);
  };

  // Placeholder for fetching lab data
  const fetchLabData = async () => {};

  useEffect(() => {
    fetchLabData();
  }, []);

  const projects = [
    { id: 1, name: "Line Following Robot", imageUrl: "/labs/lab1.png" },
    { id: 2, name: "Simon Memory Game", imageUrl: "/labs/lab1.png" },
    // Add more projects as needed
  ];

  return (
    <>
      <ProductBanner
        title="Navishkar - Kids Toy Store"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit..."
        linkText="Live Demo"
        linkUrl="/demo"
        imageUrl={"/labs/labBanner.png"}
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
        <Modal.Title>Enroll for {selectedProject?.name}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Row>
            {/* First Name Field */}
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formName">
                <Form.Label>Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your first name" />
              </Form.Group>
            </Col>

            {/* Email Field */}
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formEmail">
                <Form.Label>Email address</Form.Label>
                <Form.Control type="email" placeholder="name@example.com" />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            {/* Contact Number */}
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formContact">
                <Form.Label>Contact Number</Form.Label>
                <Form.Control type="number" placeholder="Enter your contact number" />
              </Form.Group>
            </Col>

            {/* Class/Branch */}
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formClass">
                <Form.Label>Class/Branch</Form.Label>
                <Form.Control type="text" placeholder="Enter your class or branch name" />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            {/* Parent Name */}
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formParentName">
                <Form.Label>Parent Name</Form.Label>
                <Form.Control type="text" placeholder="Enter your parent name" />
              </Form.Group>
            </Col>

            {/* Parent Number */}
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formParentNum">
                <Form.Label>Parent Number</Form.Label>
                <Form.Control type="number" placeholder="Enter your parent number" />
              </Form.Group>
            </Col>
          </Row>

          <Row>
            {/* School/College */}
            <Col md={6}>
              <Form.Group className="mb-3" controlId="formSchool">
                <Form.Label>School/College</Form.Label>
                <Form.Control type="text" placeholder="Enter your school or college name" />
              </Form.Group>
            </Col>

            {/* Enquiry */}
            <Col md={6}>
  <Form.Group className="mb-3" controlId="formEnquiry">
    <Form.Label>Enquiry</Form.Label>
    <Form.Select>
      <option value="">-Select-</option>
      <option value="live">Live project </option>
      <option value="complete">Completed Projects</option>
      <option value="toy">Toy</option>
      <option value="workshop">Workshop</option>
      <option value="labs">Activity Labs</option>
    </Form.Select>
  </Form.Group>
</Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleClose}>
          Submit
        </Button>
      </Modal.Footer>
    </Modal>

      <div className="row">
        <div className="col-lg-12 mt-3 mb-3">
          <div className="text-center">
            <h1 className="reletedHead">Related Products</h1>
          </div>
        </div>
        <div className="col-lg-12">
          <Swiper
            navigation={false}
            modules={[Autoplay, Navigation]}
            className="mySwiper"
            autoplay={{
              delay: 3000,
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
            {/* Add more SwiperSlides as needed */}
          </Swiper>
        </div>
      </div>

      <OurAchievement />
    </>
  );
};

export default LiveProjects;
