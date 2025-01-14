"use client";
import ProductBanner from "@/components/ProductBanner";
import Image from "next/image";
import React, { useState } from "react";

function Innovation() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    class: "",
    parentname: "",
    parentphone: "",
    school: "",
    enquiry: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });

    // Example API call
    try {
      const response = await fetch("/api/submit", {
        method: "POST",
        body: formDataToSend,
      });
      const result = await response.json();
      console.log(result);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  return (
    <div>
      <ProductBanner
        title={"Innovation"}
        description={"jdvbcksbdjcvbskdcbjsncjk"} // Use the category description
        linkText="Live Demo"
        linkUrl="/demo"
        imageUrl={"/labs/labBanner.png"}
      />

      <div className="container mt-5">
        <div className="row">
          <div className="col-md-6">
            <div className="innovation-title-text">
              <Image
                src="/innovation/inno.png"
                alt="innovation"
                width={500}
                height={500}
                className=""
              />
            </div>
          </div>
          <div className="col-md-6">
            <div>
              <h1>Live Project Enroll</h1>
            </div>
            <div className="mt-3">
              <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="name" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
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
                  <div className="col-md-6">
                    <label htmlFor="phone" className="form-label">
                      Phone
                    </label>
                    <input
                      type="number"
                      placeholder="Contact Number"
                      className="form-control"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="class" className="form-label">
                      Class / Branch
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Class or Branch"
                      id="class"
                      name="class"
                      value={formData.class}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="parentname" className="form-label">
                      Parent Name
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Parent Name"
                      className="form-control"
                      id="parentname"
                      name="parentname"
                      value={formData.parentname}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
                    <label htmlFor="parentphone" className="form-label">
                      Parent Number
                    </label>
                    <input
                      type="number"
                      placeholder="Enter Parent Number"
                      className="form-control"
                      id="parentphone"
                      name="parentphone"
                      value={formData.parentphone}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="row mb-3">
                  <div className="col-md-6">
                    <label htmlFor="school" className="form-label">
                      School / College
                    </label>
                    <input
                      type="text"
                      placeholder="Enter School or College name"
                      className="form-control"
                      id="school"
                      name="school"
                      value={formData.school}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="col-md-6">
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
                      <option value="" disabled>
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

                <button type="submit" className="btn btn-primary w-100 mt-3 ">
                  Submit
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
