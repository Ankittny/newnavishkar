"use client"
import React, { useState } from 'react';
import ProductBanner from './ProductBanner';
import Image from 'next/image';
import { Modal, Button, Form, Row, Col } from 'react-bootstrap';
// import './PartnerWithUs.css';

const PartnerWithUs = () => {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <ProductBanner imageUrl={'/product/productDetailBanner.png'} />

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
              <Image src={'/PWS/pwu1.png'} height={100} width={100} alt="pws" />
            </div>
            <div className="partner-other-int">
              <h2>Partner with Us</h2>
              <p>
                Are you ready to embark on an educational journey that challenges orthodox ways and embraces innovations? Navishkar invites you to join us in revolutionising the education industry. With a dedication to providing a comprehensive educational solution where creativity knows no bounds, we offer a transformative experience for schools looking to cultivate students who can Imagine and Innovate.
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
                  <Form.Control type="text" placeholder="Enter your organization name" />
                </Form.Group>
              </Col>
              {/* Location */}
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formLocation">
                  <Form.Label>Location</Form.Label>
                  <Form.Control type="text" placeholder="Enter your location" />
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
              {/* Official Email */}
              <Col md={6}>
                <Form.Group className="mb-3" controlId="formEmail">
                  <Form.Label>Official Email</Form.Label>
                  <Form.Control type="email" placeholder="Enter your official email" />
                </Form.Group>
              </Col>
            </Row>
            <Row>
              {/* Query Description */}
              <Col md={12}>
                <Form.Group className="mb-3" controlId="formQuery">
                  <Form.Label>Query Description</Form.Label>
                  <Form.Control as="textarea" rows={4} placeholder="Enter your query description" />
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
    </>
  );
};

export default PartnerWithUs;
