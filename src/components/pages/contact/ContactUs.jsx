import ProductBanner from "@/components/ProductBanner";
import React from "react";
import CallIcon from "@mui/icons-material/Call";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmailIcon from "@mui/icons-material/Email";

const ContactUs = () => {
  return (
    <div>
      <ProductBanner
        title="Young Innovators"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elitvashcb biiwuhiwq uidh ih uhi iui "
        //  linkText="Live Demo"
        //  linkUrl="/demo"
        imageUrl={"/labs/labBanner.png"}
      />

      <section>
        <div className="container mt-4">
          <div className="row">
            <div className="col-lg-4 text-center">
              <div className="contact-box">
                <div>
                  <CallIcon fontSize="large" />
                  <p>91+ 9090909090</p>
                </div>
              </div>
            </div>

            <div className="col-lg-4 text-center">
              <div className="contact-box">
                <div>
                  <LocationOnIcon fontSize="large" />
                  <p className="p-0">A-12/13 second floor</p>
                  <p>Noida sector 16 201301</p>
                </div>
              </div>
            </div>
            <div className="col-lg-4 text-center">
              <div className="contact-box">
                <div>
                  <EmailIcon fontSize="large" />
                  <p>info@gmail.com</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="container">
          <div className="row">
            <div className="col-lg-6">
              <div>
                <img src="" alt="" />
              </div>
            </div>
            <div className="col-lg-6">
              <div>
                <div className="row">
                  <div className="col-12">
                    <h1>Get In Touch</h1>
                  </div>
                </div>
                <div className="row">
                  <div className="col-lg-6">
                    <input
                      type="text"
                      placeholder=""
                      required
                      className="full-width"
                    />
                  </div>
                  <div className="col-lg-6">
                    <input type="text" placeholder="" required />
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-12">
                    <select>
                      <option>asefse</option>
                    </select>
                  </div>
                </div>

                <div className="row">
                  <div className="col-lg-12">
                    <textarea></textarea>
                  </div>
                </div>

                <button>Send</button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactUs;
