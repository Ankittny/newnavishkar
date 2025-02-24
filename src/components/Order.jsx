import { IoImagesSharp } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import { RiDownload2Line } from "react-icons/ri";
import React, { useEffect, useState } from 'react';
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
import { useDispatch, useSelector } from "react-redux";
import { orderLists, orderGetById } from "@/redux/Action/OrderList";

const Order = () => {
  const [showModal, setShowModal] = useState(false);
  const [value, setValue] = useState("1");

  const [selectedOrder, setSelectedOrder] = useState(null);
  const dispatch = useDispatch();
  const { loading, error, orderList, orderDetails } = useSelector((state) => state.order)

  // console.log("ShaluList", orderList)
  // console.log("ShaluDetails", orderDetails)

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };


  // const handleShowOrderDetails = (order) => {
  //   setSelectedOrder(order);
  //   setShowModal(true);
  //   dispatch(orderGetById(order.id)); // Ensure this action is properly fetching details
  // };

  const handleShowOrderDetails = async (order) => {
    setSelectedOrder(order); // Set the selected order immediately
    setShowModal(true); // Show the modal immediately
    try {
      await dispatch(orderGetById(order.id)); // Fetch detailed data
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };

  useEffect(() => {
    dispatch(orderLists());
  }, [dispatch])

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
              {orderList?.orders?.map((order, index) => (
                <tr key={order.id}   >
                  <td className='bodt-tr '>
                    <div className='media-order d-flex gap-2'>
                      <IoImagesSharp />
                      <div className="cont text-start">
                        <h6 className="font-weight-bold m-0 mb-1"> Order #{order.id} </h6>
                        {/* <span className="fs-12 font-weight-medium">
                          {order.items_count} Item{order.items_count > 1 ? 's' : ''}
                        </span> */}
                        <div className="text-secondary-50 fs-12 font-semibold mt-1">
                          {new Date(order.created_at).toLocaleDateString()} {new Date(order.created_at).toLocaleTimeString()}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="bodt-tr tr-order-trading">
                      {order.order_status}
                    </span>
                  </td>
                  <td>
                    <div className="font-bold price-bold"> ₹{order.order_amount.toFixed(2)} </div>
                  </td>
                  <td>
                    <div className="icon-invoice d-flex gap-3 align-items-center">
                      <FaEye onClick={() => handleShowOrderDetails(order)} style={{ cursor: "pointer" }} />
                      <RiDownload2Line />
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>
      </div>

      {/* Modal Component */}
      {showModal && (
  <div className="modal-overlay">
    <div className="modal-content">
      {loading ? (
        <p className="text-center">Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          <div className="d-flex align-items-start justify-content-between gap-2">
            <div>
              <div className="d-flex align-items-center gap-2 text-capitalize">
                <h4 className="text-capitalize mb-0 mobile-fs-14 fs-18 font-bold">
                  Order #{orderDetails?.id}
                </h4>
                <span
                  className={`fs-12 font-semibold rounded badge __badge 
                      ${orderDetails?.order_status === 'confirmed' ? 'badge-soft-success border-soft-success text-success' :
                      orderDetails?.order_status === 'pending' ? 'badge-soft-warning border-soft-warning text-warning' :
                        'badge-soft-danger border-soft-danger text-danger'}`
                  }
                >
                  {orderDetails?.order_status || "Status Not Available"}
                </span>
              </div>
              <div className="text-secondary-50 fs-12 font-semibold mt-1">
                {new Date(orderDetails?.created_at).toLocaleDateString()} {new Date(orderDetails?.created_at).toLocaleTimeString()}
              </div>
              <div className="date fs-12 font-semibold text-secondary-50 text-body mb-3 mt-2">
                {orderDetails?.date}
              </div>
            </div>
          </div>
          <div className="tabing-group">
            <Box sx={{ width: "100%", typography: "body1" }}>
              <TabContext value={value}>
                <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
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
                          <div className="py-2 mb-2">
                            <h6 className="fs-13 font-bold text-capitalize"><strong>Payment Information:</strong></h6>
                          </div>
                            <div className="fs-12">
                              <span className="text-muted text-capitalize">Payment status</span>:
                              <span className={orderDetails?.payment_status === "paid" ? "text-success" : "text-danger"}>
                                {orderDetails?.payment_status}
                              </span>
                            </div>
                            <div className="mt-2 fs-12 mb-3 text-start">
                              <span className="text-muted text-capitalize">Payment method</span>:
                              <span className="text-primary text-capitalize">{orderDetails?.payment_method}</span>
                            </div>
                          
                        </td>
                        <td>
                          <div className="py-2 mb-2">
                            <h6 className="fs-13 font-bold text-capitalize"><strong>Shipping address:</strong></h6>
                          </div>
                          <div className="text-start">
                            <div className="second-tr-td mb-2">Name : {orderDetails?.shipping_address_data?.contact_person_name}</div>
                            <div className="second-tr-td mb-2">Phone : {orderDetails?.shipping_address_data?.phone}</div>
                            <div className="second-tr-td mb-2">City: {orderDetails?.shipping_address_data?.city}</div>
                            <div className="second-tr-td mb-2">Zip: {orderDetails?.shipping_address_data?.zip}</div>
                            <div className="second-tr-td">Address : {orderDetails?.shipping_address_data?.address}</div>
                          </div>
                        </td>
                        <td>
                          <div className="py-2 mb-2">
                            <h6 className="fs-13 font-bold text-capitalize"><strong>Billing address:</strong></h6>
                          </div>
                          <div className="text-start">
                            <div className="second-tr-td mb-2">Name : {orderDetails?.billing_address_data?.contact_person_name}</div>
                            <div className="second-tr-td mb-2">Phone : {orderDetails?.billing_address_data?.phone}</div>
                            <div className="second-tr-td mb-2">City: {orderDetails?.billing_address_data?.city}</div>
                            <div className="second-tr-td mb-2">Zip: {orderDetails?.billing_address_data?.zip}</div>
                            <div className="second-tr-td">Address : {orderDetails?.billing_address_data?.address}</div>
                          </div>
                        </td>
                      </tr>
                    </thead>
                  </table>
                </TabPanel>

             {/* Product Details  */}
             <div className="mt-4">
                
             </div>



                <TabPanel value="2">
                  <div className="w-100 p-3">
                    <MDBContainer className="py-5 h-100">
                      <MDBRow className="justify-content-center align-items-center h-100">
                        <MDBCol size="12">
                          <MDBCard className="card-stepper text-black" style={{ borderRadius: "16px" }}>
                            <MDBCardBody className="p-5">
                              <ul id="progressbar-2" className="d-flex justify-content-between mx-0 mt-0 mb-5 px-0 pt-0 pb-2">
                                <li className={`step0 ${orderDetails?.tracking?.step1 ? "active" : "text-muted"} text-center`} id="step1"></li>
                                <li className={`step0 ${orderDetails?.tracking?.step2 ? "active" : "text-muted"} text-center`} id="step2"></li>
                                <li className={`step0 ${orderDetails?.tracking?.step3 ? "active" : "text-muted"} text-center`} id="step3"></li>
                                <li className={`step0 ${orderDetails?.tracking?.step4 ? "active" : "text-muted"} text-center`} id="step4"></li>
                              </ul>

                              <div className="d-flex justify-content-between">
                                <div className="d-lg-flex fcx align-items-center">
                                  <GrBus />
                                  <div>
                                    <p className="fw-bold mb-1 text-start mx-4">Order Placed</p>
                                  </div>
                                </div>
                                <div className="d-lg-flex fcx align-items-center">
                                  <GrBus />
                                  <div>
                                    <p className="fw-bold mb-1 text-start mx-4">Order Confirmed</p>
                                  </div>
                                </div>
                                <div className="d-lg-flex fcx align-items-center">
                                  <GrBus />
                                  <div>
                                    <p className="fw-bold mb-1 text-start mx-4">Order on the Way</p>
                                  </div>
                                </div>
                                <div className="d-lg-flex fcx align-items-center">
                                  <TiHomeOutline />
                                  <div>
                                    <p className="fw-bold mb-1 text-start mx-4">Order Shipped</p>
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
          <button className="changing-number" onClick={() => handleCloseModal()}>Close</button>
        </>
      )}
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
