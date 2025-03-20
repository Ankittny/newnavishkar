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
import { orderLists, orderGetById, orderDetails } from "@/redux/Action/OrderList";
import { Divider } from "@mui/material";
import { Button } from "react-bootstrap";
import Pagination from 'react-bootstrap/Pagination';


const Order = () => {
  const [showModal, setShowModal] = useState(false);
  const [value, setValue] = useState("1");

  const [selectedOrder, setSelectedOrder] = useState(null);
  const dispatch = useDispatch();
  const { loading, error, orderList, orderDetailsById, orderDetail } = useSelector((state) => state.order)

  // for paginations
  const [currentPage, setCurrentPage] = useState(1);
  const ordersPerPage = 8; // Show only 8 orders per page

  // Calculate pagination data
  const indexOfLastOrder = currentPage * ordersPerPage;
  const indexOfFirstOrder = indexOfLastOrder - ordersPerPage;
  const currentOrders = orderList?.orders?.slice(indexOfFirstOrder, indexOfLastOrder) || [];
  const totalPages = Math.ceil((orderList?.orders?.length || 0) / ordersPerPage);

  // Handle page change
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };



  const handleChange = (event, newValue) => {
    setValue(newValue);
  };


  const handleCloseModal = () => {
    setShowModal(false);
    setSelectedOrder(null);
  };



  const handleShowOrderDetails = async (order) => {
    setSelectedOrder(order); // Set the selected order immediately
    setShowModal(true); // Show the modal immediately
    try {
      await dispatch(orderGetById(order.id)); // Fetch detailed data
      await dispatch(orderDetails(order.id));
    } catch (error) {
      console.error("Error fetching order details:", error);
    }
  };



  // const productName = orderDetail.length > 0 ? orderDetail[0]?.product_details?.name : "No Product Name";
  // console.log("product namd",productName)

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
          <table className='table_table_detail'>
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
              {currentOrders?.map((order, index) => (
                <tr key={order.id}>
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
                      {order.order_status.toUpperCase()}
                    </span>
                  </td>
                  <td>
                    <div className="font-bold price-bold"> ₹{order.order_amount.toFixed(2)} </div>
                  </td>
                  <td>
                    <div className="icon-invoice d-flex gap-3 align-items-center">
                      <FaEye onClick={() => handleShowOrderDetails(order)} style={{ cursor: "pointer" }} />
                      {/* <RiDownload2Line /> */}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination Component */}
      {totalPages > 1 && (
        <Pagination className="justify-content-center mt-3">
          <Pagination.Prev
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          />
          {[...Array(totalPages)].map((_, index) => (
            <Pagination.Item
              key={index + 1}
              active={index + 1 === currentPage}
              onClick={() => handlePageChange(index + 1)}
            >
              {index + 1}
            </Pagination.Item>
          ))}
          <Pagination.Next
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          />
        </Pagination>
      )}
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
                        Order #{orderDetailsById?.id}
                      </h4>
                      <span
                        className={`fs-12 font-semibold rounded badge __badge 
                      ${orderDetailsById?.order_status === 'confirmed' ? 'badge-soft-success border-soft-success text-success' :
                            orderDetailsById?.order_status === 'pending' ? 'badge-soft-warning border-soft-warning text-warning' :
                              'badge-soft-danger border-soft-danger text-danger'}`
                        }
                      >
                        {orderDetailsById?.order_status || "Status Not Available"}
                      </span>
                    </div>
                    <div className="text-secondary-50 fs-12 font-semibold mt-1">
                      {new Date(orderDetailsById?.created_at).toLocaleDateString()} {new Date(orderDetailsById?.created_at).toLocaleTimeString()}
                    </div>
                    <div className="date fs-12 font-semibold text-secondary-50 text-body mb-3 mt-2">
                      {orderDetailsById?.date}
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
                      <TabPanel value="1" sx={{ display: value === "1" ? "block" : "none" }}>
                        <table className="tablemoney">
                          <thead>
                            <tr className="gap-5">
                              <td className="">
                                <div className="py-2 mb-2">
                                  <h6 className="fs-13 font-bold text-capitalize "><strong>Payment Information:</strong></h6>
                                </div>
                                <div className="fs-12">
                                  <span className="text-muted text-capitalize">Payment status </span>:
                                  <span className={orderDetailsById?.payment_status === "paid" ? "text-success" : "text-danger"}>
                                    {orderDetailsById?.payment_status}
                                  </span>
                                </div>
                                <div className="mt-2 fs-12 mb-3 text-start">
                                  <span className="text-muted text-capitalize">Payment method</span>:
                                  <span className="text-primary text-capitalize">{orderDetailsById?.payment_method}</span>
                                </div>
                              </td>

                              <td>
                                <div className="py-2 mb-2">
                                  <h6 className="fs-13 font-bold text-capitalize"><strong>Shipping address:</strong></h6>
                                </div>
                                <div className="text-start">
                                  <div className="second-tr-td mb-2">Name : {orderDetailsById?.shipping_address_data?.contact_person_name}</div>
                                  <div className="second-tr-td mb-2">Phone : {orderDetailsById?.shipping_address_data?.phone}</div>
                                  <div className="second-tr-td mb-2">City: {orderDetailsById?.shipping_address_data?.city}</div>
                                  <div className="second-tr-td mb-2">Zip: {orderDetailsById?.shipping_address_data?.zip}</div>
                                  <div className="second-tr-td">Address : {orderDetailsById?.shipping_address_data?.address}</div>
                                </div>
                              </td>
                              <td>
                                <div className="py-2 mb-2">
                                  <h6 className="fs-13 font-bold text-capitalize"><strong>Billing address:</strong></h6>
                                </div>
                                <div className="text-start">
                                  <div className="second-tr-td mb-2">Name : {orderDetailsById?.billing_address_data?.contact_person_name}</div>
                                  <div className="second-tr-td mb-2">Phone : {orderDetailsById?.billing_address_data?.phone}</div>
                                  <div className="second-tr-td mb-2">City: {orderDetailsById?.billing_address_data?.city}</div>
                                  <div className="second-tr-td mb-2">Zip: {orderDetailsById?.billing_address_data?.zip}</div>
                                  <div className="second-tr-td">Address : {orderDetailsById?.billing_address_data?.address}</div>
                                </div>
                              </td>
                            </tr>
                          </thead>
                        
                        </table>
                      </TabPanel>

                      {/* Product Details  */}
                      {value === "1" && (
                        <div className='table-responsive mt-2'>
                          <table className='table_table'>
                            <thead>
                              <tr>
                                <td>
                                  <div className='tdbolder'>
                                    <span>Order Details</span>
                                  </div>
                                </td>

                                <td>
                                  <div className='tdbolder'>
                                    <span>Qty</span>
                                  </div>
                                </td>
                                <td>
                                  <div className='tdbolder'>
                                    <span>Price</span>
                                  </div>
                                </td>
                              </tr>
                            </thead>
                            <tbody>

                              {orderDetail.length > 0 ? (
                                orderDetail.map((order, index) => (
                                  <tr key={index}>
                                    <td>
                                      <img
                                        src={order?.product_details?.thumbnail_full_url?.path || "default-image.jpg"}
                                        alt={order?.product_details?.name}
                                        style={{ width: "140px", height: "90px", borderRadius: "5px" }}
                                      />
                                      <span className="mx-4">{order?.product_details?.name || "No Product Name"}</span>
                                    </td>
                                    <td>{order?.qty || 0}</td>
                                    <td>₹{order?.price || 0}</td>
                                  </tr>
                                ))
                              ) : (
                                <tr>
                                  <td colSpan="3" style={{ textAlign: "center" }}>No Orders Found</td>
                                </tr>
                              )}
                            </tbody>
                          </table>

                          <div className="orderdetailbottom mt-3">
                            <div className="d-flex justify-content-between">
                              <p>Item</p>
                              <span>{orderDetail[0]?.qty}</span>
                            </div>
                            <div className="d-flex justify-content-between">
                              <p>Subtotal</p>
                              <span>{orderDetail[0]?.price}</span>
                            </div>
                            <div className="d-flex justify-content-between">
                              <p>Tax Fee</p>
                              <span>{orderDetail[0]?.tax}</span>
                            </div>
                            <div className="d-flex justify-content-between">
                              <p>Shipping Fee</p>
                              <span>{orderDetail[0]?.shipping_cost}</span>
                            </div>
                            <div className="d-flex justify-content-between">
                              <p>Discount on Product</p>
                              <span>{orderDetail[0]?.discount}</span>
                            </div>
                            <div className="d-flex justify-content-between">
                              <p>Coupen Discount</p>
                              <span>{orderDetail[0]?.order?.discount_amount}</span>
                            </div>

                            <div className="d-flex justify-content-between">
                              <p>Total Amount</p>
                              <span>{ }</span>
                            </div>
                            <Divider sx={{ borderColor: "#175A95", borderWidth: "2px" }} />

                            <button className="changing-number w-100" >Cancle Order</button>
                          </div>
                        </div>
                      )}


<TabPanel value="2" sx={{ display: value === "2" ? "block" : "none" }}>
                        <div className="w-100 p-3">
                          <MDBContainer className="py-5 h-100">
                            <MDBRow className="justify-content-center align-items-center h-100">
                              <MDBCol size="12">
                                <MDBCard className="card-stepper text-black" style={{ borderRadius: "16px" }}>
                                  <MDBCardBody className="p-5">
                                    <ul id="progressbar-2" className="d-flex justify-content-between mx-0 mt-0 mb-5 px-0 pt-0 pb-2">
                                      <li className={`step0 ${orderDetailsById?.tracking?.step1 ? "active" : "text-muted"} text-center`} id="step1"></li>
                                      <li className={`step0 ${orderDetailsById?.tracking?.step2 ? "active" : "text-muted"} text-center`} id="step2"></li>
                                      <li className={`step0 ${orderDetailsById?.tracking?.step3 ? "active" : "text-muted"} text-center`} id="step3"></li>
                                      <li className={`step0 ${orderDetailsById?.tracking?.step4 ? "active" : "text-muted"} text-center`} id="step4"></li>
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
            )
            }
          </div >
        </div >
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
