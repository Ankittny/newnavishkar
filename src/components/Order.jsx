import { IoImagesSharp } from "react-icons/io5";
import { FaEye } from "react-icons/fa";
import { RiDownload2Line } from "react-icons/ri";
import React from 'react'
import Link from "next/link";

const Order = () => {
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
                    <span>status</span>
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
                        1 Items
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
                <div className=" font-bold price-bold"> ₹922.00 </div>
                </td>
                <td>
                  <div className="icon-invoice d-flex gap-3 align-items-center">
                    <Link href="/"> 
                     <FaEye />
                     </Link>
                  <RiDownload2Line />
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </>
  )
}

export default Order
