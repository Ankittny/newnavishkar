"use client";
import ProductBanner from "@/components/ProductBanner";
import Image from "next/image";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { InnovationEnqueryData } from "@/redux/Action/InnovationEnquery";
import Swal from "sweetalert2";

function Innovation() {
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

  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload
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
      const response = await dispatch(InnovationEnqueryData(formData));
      if (response && response.status) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: response.message || "Enquiry successfully submitted.",
        });
        setFormData({
          name: "",
          email: "",
          contact_no: "",
          class_branch: "",
          parent_name: "",
          parent_contact_no: "",
          school_college_name: "",
          enquiry: "",
        }); // Reset form
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
    <div>
      <ProductBanner
        title={"Innovation"}
        description={"jdvbcksbdjcvbskdcbjsncjk"}
        linkText="Live Demo"
        linkUrl="/demo"
        imageUrl={"/labs/labBanner.png"}
      />

      <div className="container mt-5">
        <div className="row">
          <div className="col-lg-6">
            <Image
              src="/innovation/inno.png"
              alt="innovation"
              width={550}
              height={520}
              className="inno-nectonical"
            />
          </div>
          <div className="col-lg-6">
            <div className="project-enroll">
              <h1>Book a Live Demo</h1>
              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      // placeholder="Name"
                      className="form-control"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                    />
                  </div>


                  <div className="col-md-6">
                    <label htmlFor="email" className="form-label">
                      Email
                    </label>
                    <input
                      type="email"
                      // placeholder="Email"
                      className="form-control"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-12">
                    <label htmlFor="contact_no" className="form-label">
                      Contact No
                    </label>
                    <input
                      type="number"
                      // placeholder="Contact Number"
                      className="form-control"
                      id="contact_no"
                      name="contact_no"
                      value={formData.contact_no}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="class_branch" className="form-label">
                      Class / Branch
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      // placeholder="Enter Class or Branch"
                      id="class_branch"
                      name="class_branch"
                      value={formData.class_branch}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="parent_name" className="form-label">
                      Parent Name
                    </label>
                    <input
                      type="text"
                      // placeholder="Enter Parent Name"
                      className="form-control"
                      id="parent_name"
                      name="parent_name"
                      value={formData.parent_name}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="row mb-3">

                  <div className="col-md-6">
                    <label htmlFor="parent_contact_no" className="form-label">
                      Parent Contact No
                    </label>
                    <input
                      type="number"
                      // placeholder="Enter Parent Number"
                      className="form-control"
                      id="parent_contact_no"
                      name="parent_contact_no"
                      value={formData.parent_contact_no}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="school_college_name" className="form-label">
                      School / College
                    </label>
                    <input
                      type="text"
                      // placeholder="Enter School or College name"
                      className="form-control"
                      id="school_college_name"
                      name="school_college_name"
                      value={formData.school_college_name}
                      onChange={handleChange}
                    />
                  </div>
                </div>

                <div className="row mb-3">

                  <div className="col-md-12">
                    <label htmlFor="enquiry" className="form-label">
                      Enquiry
                    </label>
                    <select
                      className="form-select"
                      id="enquiry"
                      name="enquiry"
                      value={formData.enquiry}
                      onChange={handleChange}
                      required
                    >
                      <option value="" >
                        Select Status
                      </option>
                      <option value="live">Live Project</option>
                      <option value="complete">Complete Project</option>
                      <option value="toy">Toy</option>
                      <option value="workshop">Workshop</option>
                      <option value="labs">Activity Labs</option>
                    </select>
                  </div>
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100 mt-3"
                  disabled={loading}
                >
                  {loading ? "Submitting..." : "Submit"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Innovation;