import { IoImagesSharp } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import { RiDownload2Line } from "react-icons/ri";
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';
import { TiHomeOutline } from "react-icons/ti";
import { GrBus } from "react-icons/gr";
import DoneIcon from '@mui/icons-material/Done';
// import { BiSolidBus } from "react-icons/bi";
// import { MdOutlineWatchLater } from "react-icons/md";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBRow,
  MDBTypography,
}
  from "mdb-react-ui-kit";
import Link from "next/link";

const Order = () => {
  const [showModal, setShowModal] = useState(false);
  const [value, setValue] = React.useState('1');
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <div className='order-apply-title'>
        <div className='order-title'>
          <h1>My Order</h1>
        </div>
        <div className='table-responsive'>
          <table className='table_table'>
            <thead>
              <tr>
                <td>
                  <div className='tdbolder'>
                    <span>Order List</span>
                  </div>
                </td>
                <td>
                  <div className='tdbolder'>
                    <span>Status</span>
                  </div>
                </td>
                <td>
                  <div className='tdbolder'>
                    <span>Total</span>
                  </div>
                </td>
                <td>
                  <div className='tdbolder'>
                    <span>Action</span>
                  </div>
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td className='bodt-tr'>
                  <div className='media-order d-flex gap-2'>
                    <IoImagesSharp />
                    <div className="cont text-start">
                      <h6 className="font-weight-bold m-0 mb-1"> Order #100069 </h6>
                      <span className="fs-12 font-weight-medium">
                        1 Item
                      </span>
                      <div className="text-secondary-50 fs-12 font-semibold mt-1">
                        13 Feb, 2025 11:47 PM
                      </div>
                    </div>
                  </div>
                </td>
                <td>
                  <span className="bodt-tr tr-order-trading">
                    Confirmed
                  </span>
                </td>
                <td>
                  <div className="font-bold price-bold"> ₹922.00 </div>
                </td>
                <td>
                  <div className="icon-invoice d-flex gap-3 align-items-center">
                    <FaEye onClick={() => setShowModal(true)} style={{ cursor: "pointer" }} />
                    <RiDownload2Line />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal Component */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="d-flex align-items-start justify-content-between gap-2">
              <div>
                <div className="d-flex align-items-center gap-2 text-capitalize">
                  <h4 className="text-capitalize mb-0 mobile-fs-14 fs-18 font-bold">Order #100069 </h4>
                  <span className="fs-12 font-semibold rounded badge __badge badge-soft-success border-soft-success">
                    confirmed
                  </span>
                </div>
                <div className="date fs-12 font-semibold text-secondary-50 text-body mb-3 mt-2">
                  13 Feb, 2025 11:47 PM
                </div>
              </div>

              {/* <button class="profile-aside-btn btn btn--primary px-2 rounded px-2 py-1 d-lg-none">
                <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 15 15" fill="none">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M7 9.81219C7 9.41419 6.842 9.03269 6.5605 8.75169C6.2795 8.47019 5.898 8.31219 5.5 8.31219C4.507 8.31219 2.993 8.31219 2 8.31219C1.602 8.31219 1.2205 8.47019 0.939499 8.75169C0.657999 9.03269 0.5 9.41419 0.5 9.81219V13.3122C0.5 13.7102 0.657999 14.0917 0.939499 14.3727C1.2205 14.6542 1.602 14.8122 2 14.8122H5.5C5.898 14.8122 6.2795 14.6542 6.5605 14.3727C6.842 14.0917 7 13.7102 7 13.3122V9.81219ZM14.5 9.81219C14.5 9.41419 14.342 9.03269 14.0605 8.75169C13.7795 8.47019 13.398 8.31219 13 8.31219C12.007 8.31219 10.493 8.31219 9.5 8.31219C9.102 8.31219 8.7205 8.47019 8.4395 8.75169C8.158 9.03269 8 9.41419 8 9.81219V13.3122C8 13.7102 8.158 14.0917 8.4395 14.3727C8.7205 14.6542 9.102 14.8122 9.5 14.8122H13C13.398 14.8122 13.7795 14.6542 14.0605 14.3727C14.342 14.0917 14.5 13.7102 14.5 13.3122V9.81219ZM12.3105 7.20869L14.3965 5.12269C14.982 4.53719 14.982 3.58719 14.3965 3.00169L12.3105 0.915687C11.725 0.330188 10.775 0.330188 10.1895 0.915687L8.1035 3.00169C7.518 3.58719 7.518 4.53719 8.1035 5.12269L10.1895 7.20869C10.775 7.79419 11.725 7.79419 12.3105 7.20869ZM7 2.31219C7 1.91419 6.842 1.53269 6.5605 1.25169C6.2795 0.970186 5.898 0.812187 5.5 0.812187C4.507 0.812187 2.993 0.812187 2 0.812187C1.602 0.812187 1.2205 0.970186 0.939499 1.25169C0.657999 1.53269 0.5 1.91419 0.5 2.31219V5.81219C0.5 6.21019 0.657999 6.59169 0.939499 6.87269C1.2205 7.15419 1.602 7.31219 2 7.31219H5.5C5.898 7.31219 6.2795 7.15419 6.5605 6.87269C6.842 6.59169 7 6.21019 7 5.81219V2.31219Z" fill="white"></path>
                </svg>
              </button> */}
            </div>
            <div className="tabing-group">
              <Box sx={{ width: '100%', typography: 'body1' }}>
                <TabContext value={value}>
                  <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                    <TabList onChange={handleChange} aria-label="lab API tabs example">
                      <Tab label="Order Summary" value="1" />
                      <Tab label="Track Order" value="2" />
                    </TabList>
                  </Box>
                  <TabPanel value="1">
                    <table className="tablemoney">
                      <thead>
                        <tr>
                          <td>
                            <div className="order-div">
                              <div className="order-div-td">
                                <h6>Payment info</h6>
                              </div>
                              <div className="fs-12">
                                <span className="text-muted text-capitalize">Payment status</span>
                                :
                                <span className="text-danger text-capitalize">unpaid</span>
                              </div>
                              <div className="mt-2 fs-12 mb-3 text-start">
                                <span className="text-muted text-capitalize">Payment method</span>
                                :
                                <span className="text-primary text-capitalize">Cash on delivery</span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className=" py-2 mb-2">
                              <h6 className="fs-13 font-bold text-capitalize">
                                <strong>Shipping address:</strong>
                              </h6>
                            </div>
                            <div className="text-start">
                              <div className="second-tr-td mb-2">
                                <span className="">Name : ankit daksh </span>
                              </div>
                              <div className="second-tr-td mb-2">
                                <span className="">Phone : +918791136048 </span>
                              </div>
                              <div className="second-tr-td mb-2">
                                <span className="">City / Zip : Noida, 201301 </span>
                              </div>
                              <div className="second-tr-td">
                                <span className="">Address : dsfdsgds </span>
                              </div>
                            </div>
                          </td>
                          <td>
                            <div className=" py-2 mb-2">
                              <h6 className="fs-13 font-bold text-capitalize">
                                <strong>Billing address:</strong>
                              </h6>
                            </div>
                            <div className="text-start">
                              <div className="second-tr-td mb-2">
                                <span className="">Name : ankit daksh </span>
                              </div>
                              <div className="second-tr-td mb-2">
                                <span className="">Phone : +918791136048 </span>
                              </div>
                              <div className="second-tr-td mb-2">
                                <span className="">City / Zip : Noida, 201301 </span>
                              </div>
                              <div className="second-tr-td">
                                <span className="">Address : dsfdsgds </span>
                              </div>
                            </div>
                          </td>
                        </tr>
                      </thead>
                    </table>
                  </TabPanel>
                  <TabPanel value="2">
                    {/* <div class="card border-0">
                   <div className="shipment-body">
                     <div className="loading-ship">
                     <BiSolidBus />
                      <span>Order placed</span> <br />
                      <MdOutlineWatchLater /> <span>04:47 AM, 14 Feb 2025</span>
                     </div>
                     <div className="loading-ship">
                     <BiSolidBus />
                      <span>Order confirmed</span> <br />
                      <MdOutlineWatchLater /> <span>07:00 PM, 31 Dec 1969</span>
                     </div>
                     <div className="loading-ship">
                     <BiSolidBus />
                      <span>Order confirmed</span> <br />
                      <MdOutlineWatchLater /> Preparing shipment
                     </div>
                     <div className="loading-ship">
                     <BiSolidBus />Order is on the way
                      <span>Order confirmed</span> <br />
                    
                     </div>
                     <div className="loading-ship">
                     <BiSolidBus />
                      <span>Order confirmed</span> <br />
                      <MdOutlineWatchLater />Order Shipped 
                     </div>
                   </div>
                  </div> */}
                    <div className="w-100 p-3">
                      <MDBContainer className="py-5 h-100">
                        <MDBRow className="justify-content-center align-items-center h-100">
                          <MDBCol size="12">
                            <MDBCard
                              className="card-stepper text-black"
                              style={{ borderRadius: "16px" }}
                            >
                              <MDBCardBody className="p-5">
                                {/* <div className="d-flex justify-content-between align-items-center mb-5">
                                  <div>
                                    <MDBTypography tag="h5" className="mb-0">
                                      INVOICE{" "}
                                      <span className="text-primary font-weight-bold">
                                        #Y34XDHR
                                      </span>
                                    </MDBTypography>
                                  </div>
                                  <div className="text-end">
                                    <p className="mb-0">
                                      Expected Arrival <span>01/12/19</span>
                                    </p>
                                    <p className="mb-0">
                                      USPS{" "}
                                      <span className="font-weight-bold">
                                        234094567242423422898
                                      </span>
                                    </p>
                                  </div>
                                </div> */}
                   git             <ul
                                  id="progressbar-2"
                                  className="d-flex justify-content-between mx-0 mt-0 mb-5 px-0 pt-0 pb-2"
                                >
                                  <li className="step0 active text-center" id="step1"></li>
                                  < li className="step0 active text-center" id="step2"></li>
                                  <li className="step0 active text-center" id="step3"></li>
                                  <li className="step0 text-muted text-end" id="step4"></li>
                                </ul>

                                <div className="d-flex justify-content-between">
                                  <div className="d-lg-flex fcx align-items-center">
                                    <GrBus />
                                    <div>
                                      <p className="fw-bold mb-1 text-start mx-4">Order Placed</p>
                                      {/* <p className="fw-bold mb-0">Placed</p> */}
                                    </div>
                                  </div>
                                  <div className="d-lg-flex fcx align-items-center">
                                    <GrBus />
                                    <div>
                                      <p className="fw-bold mb-1 text-start mx-4">Order confirmed</p>
                                      {/* <p className="fw-bold mb-0">confirmed</p> */}
                                    </div>
                                  </div>
                                  <div className="d-lg-flex fcx align-items-center ">
                                    <GrBus />
                                    <div>
                                      <p className="fw-bold mb-1 text-start mx-4">Order on the Way</p>
                                      {/* <p className="fw-bold mb-0">on the Way</p> */}
                                    </div>
                                  </div>
                                  <div className="d-lg-flex fcx align-items-center">

                                    <TiHomeOutline />
                                    <div>
                                      <p className="fw-bold mb-1 text-start mx-4">Order Shipped</p>
                                      {/* <p className="fw-bold mb-0">Shipped</p> */}
                                    </div>
                                  </div>
                                </div>
                              </MDBCardBody>
                            </MDBCard>
                          </MDBCol>
                        </MDBRow>
                      </MDBContainer>
                    </div>

                  </TabPanel>

                </TabContext>
              </Box>
            </div>

            <button className="changing-number" onClick={() => setShowModal(false)}>Close</button>
          </div>
        </div>
      )}

      {/* Modal Styles */}
      <style jsx>{`
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .modal-content {
          background: white;
          padding: 20px;
          border-radius: 10px;
          text-align: center;
          max-width: 400px;
          width: 100%;
        }
        button {
          margin-top: 10px;
          padding: 10px 20px;
          border: none;
          background: #007bff;
          color: white;
          cursor: pointer;
          border-radius: 5px;
        }
      `}</style>
    </>
  );
}

export default Order;
