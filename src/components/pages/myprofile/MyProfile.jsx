
// "use client";
// import Profile from "@/components/auth/Profile";
// import Order from "@/components/Order";
// import { useRouter } from "next/navigation";
// import React, { useEffect, useState } from "react";
// import { CgProfile, CgLogOut } from "react-icons/cg";
// import { FaFirstOrderAlt } from "react-icons/fa";
// import { RiCoupon2Line } from "react-icons/ri";
// import axios from "axios"; // ✅ Import axios


// const NAVIGATION = [
//   { segment: "Profile", title: "Profile", icon: <CgProfile /> },
//   { segment: "Orders", title: "Orders", icon: <FaFirstOrderAlt /> },
//   { segment: "Coupon", title: "Coupon", icon: <RiCoupon2Line /> },
//   { segment: "Logout", title: "Logout", icon: <CgLogOut /> },
// ];
// const MyProfile = () => {
//   const [activeSection, setActiveSection] = useState("Profile");
//  const [isLoggedIn, setIsLoggedIn] = useState(false);  // Local state for login status
//  const router = useRouter(); // ✅ Initialize router
//  const [coupons, setCoupons] = useState([]);


//  const logout = () => {
//   localStorage.removeItem("authAdminToken"); // ✅ Remove token
//   setIsLoggedIn(false);
//   router.push("/"); // ✅ Redirect to home page
// };

// const fetchCoupons = async () => {
//     try {
//       const result = await axios.get("/coupon/list");
//       setCoupons(result.data.coupons);
//     } catch (err) {
//       console.error("Error fetching coupons:", err);
//     }
//   };

//   useEffect(() => {
//     fetchCoupons();
//   }, []);

// useEffect(() => {
//   const token = localStorage.getItem("authAdminToken");
//   setIsLoggedIn(!!token);
// }, []);


//   return (
//     <div style={{ display: "flex", height: "100vh" }}>
//       {/* Sidebar */}
//       <nav
//         className="linear-nav"
//         style={{
//           width: "300px",
//           padding: "20px",
//         }}
//       >
//         <ul style={{ listStyle: "none", padding: 0 }}>
//           {NAVIGATION.map((item, index) => (
//             <li
//               key={index}
//               onClick={() => {
//                 if (item.segment === "Logout") {
//                   logout(); // ✅ Call logout function
//                 } else {
//                   setActiveSection(item.segment);
//                 }
//               }}
//               style={{
//                 padding: "10px",
//                 cursor: "pointer",
//                 background: activeSection === item.segment ? "#fff" : "none",
//                 color: activeSection === item.segment ? "#000" : "#000",
//                 borderRadius: activeSection === item.segment ? "5px" : "5px",
//               }}
//             >
//               {item.icon} {item.title}
//             </li>
//           ))}
//         </ul>
//       </nav>
//       {/* Main Content */}
//       <div style={{ flex: 1, padding: "20px" }}>
//         {activeSection === "Profile" && <Profile/>}
//         {activeSection === "Orders" && <Order/>}
//         {activeSection === "Logout" && <h1>Logout Successfull</h1>}
//         {activeSection === "Coupon" && <h1>Coupon</h1>}
//       </div>
//     </div>
//   );
// };
// export default MyProfile;


"use client";
import Profile from "@/components/auth/Profile";
import Order from "@/components/Order";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import axiosInstance from "@/utils/axios";
import { CgProfile, CgLogOut } from "react-icons/cg";
import { FaFirstOrderAlt } from "react-icons/fa";
import { FaRegCopy } from "react-icons/fa";
import { RiCoupon2Line } from "react-icons/ri";
import Swal from "sweetalert2";

const NAVIGATION = [
  { segment: "Profile", title: "Profile", icon: <CgProfile /> },
  { segment: "Orders", title: "Orders", icon: <FaFirstOrderAlt /> },
  { segment: "Coupon", title: "Coupon", icon: <RiCoupon2Line /> },
  { segment: "Logout", title: "Logout", icon: <CgLogOut /> },
];

const MyProfile = () => {
  const [activeSection, setActiveSection] = useState("Profile");
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [coupons, setCoupons] = useState([]);
  const router = useRouter();

  
  const axios = axiosInstance;

  const logout = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "Do you really want to log out?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, Logout",
      cancelButtonText: "Cancel",
    }).then((result) => {
      if (result.isConfirmed) {
        localStorage.removeItem("authAdminToken"); // ✅ Remove token
        setIsLoggedIn(false);
        router.push("/"); // ✅ Redirect to home page
      }
    });
  };

  const fetchCoupons = async () => {
    try {
      const result = await axios.get("/coupon/list");
      setCoupons(result.data.coupons);

    } catch (err) {
      console.error("Error fetching coupons:", err);
    }
  };

  console.log("COUPONS", coupons);

  useEffect(() => {
    const token = localStorage.getItem("authAdminToken");
    setIsLoggedIn(!!token);
  }, []);

  useEffect(() => {
    if (activeSection === "Coupon") {
      fetchCoupons();
    }
  }, [activeSection]); // ✅ Fetch coupons when "Coupon" section is selected


  const copyCouponCode = (code) => {
    navigator.clipboard.writeText(code);
    alert(`Coupon Code "${code}" copied!`);
  };

  const formatDate = (dateString) => {
    if (!dateString) return "Limited Time";

    const date = new Date(dateString);
    const day = date.getDate().toString().padStart(2, "0");
    const month = (date.getMonth() + 1).toString().padStart(2, "0"); // Months are 0-based
    const year = date.getFullYear().toString().slice(-2); // Get last 2 digits of the year

    return `${day}-${month}-${year}`;
  };


  return (
    <div style={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <nav
        className="linear-nav"
        style={{
          width: "300px",
          padding: "20px",
        }}
      >
        <ul style={{ listStyle: "none", padding: 0 }}>
          {NAVIGATION.map((item, index) => (
            <li
              key={index}
              onClick={() => {
                if (item.segment === "Logout") {
                  logout();
                } else {
                  setActiveSection(item.segment);
                }
              }}
              style={{
                padding: "10px",
                cursor: "pointer",
                background: activeSection === item.segment ? "#fff" : "none",
                color: activeSection === item.segment ? "#000" : "#000",
                borderRadius: activeSection === item.segment ? "5px" : "5px",
              }}
            >
              {item.icon} {item.title}
            </li>
          ))}
        </ul>
      </nav>

      {/* Main Content */}
      <div style={{ flex: 1, padding: "20px" }}>
        {activeSection === "Profile" && <Profile />}
        {activeSection === "Orders" && <Order/>}
        {activeSection === "Logout" && <h1>Logout Successful</h1>}
        {activeSection === "Coupon" && (
          <div>
            <h1 style={{ textAlign: "center", marginBottom: "20px" }}>
              Available Coupons
            </h1>
            {coupons.length > 0 ? (
              <div style={styles.couponContainer}>
                {coupons.map((coupon) => (
                  <div key={coupon.id} style={styles.couponCard}>
                    <div style={styles.discountBadge}>
                      {coupon.discount_type === "amount" ? `₹${coupon.discount} OFF` : `${coupon.discount}% OFF`}
                    </div>
                    <p style={styles.couponTitle}>{coupon.title || "Special Offer"}</p>
                    <p style={styles.expiry}>
                      Expiry: {formatDate(coupon.expire_date) || "Limited Time"}
                    </p>

                    <p>Min Purchase: ₹{coupon.min_purchase}</p>
                    <div style={styles.couponCodeContainer}>
                      <span style={styles.couponCode}>{coupon.code}</span>
                      <FaRegCopy
                        style={styles.copyIcon}
                        onClick={() => copyCouponCode(coupon.code)}
                      />
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <p style={{ textAlign: "center", fontSize: "18px" }}>
                No coupons available.
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  );
};


const styles = {
  couponContainer: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)", // 3 Coupons per row
    gap: "20px",
    padding: "20px",
  },
  couponCard: {
    backgroundColor: "#fff",
    borderRadius: "10px",
    padding: "15px",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    textAlign: "center",
    position: "relative",
    border: "2px dashed #175A95",
  },
  discountBadge: {
    position: "absolute",
    top: "-10px",
    left: "10px",
    backgroundColor: "#ff6b6b",
    color: "#fff",
    padding: "5px 10px",
    borderRadius: "5px",
    fontWeight: "bold",
    fontSize: "14px",
  },
  couponTitle: {
    fontSize: "18px",
    fontWeight: "bold",
    color: "#175A95",
    margin: "10px 0",
  },
  expiry: {
    fontSize: "14px",
    color: "#666",
    marginBottom: "10px",
  },
  couponCodeContainer: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "10px",
    backgroundColor: "#f4f4f4",
    padding: "10px",
    borderRadius: "5px",
    fontWeight: "bold",
    fontSize: "16px",
  },
  couponCode: {
    fontFamily: "monospace",
    letterSpacing: "1px",
    color: "#175A95",
  },
  copyIcon: {
    cursor: "pointer",
    color: "#333",
    fontSize: "18px",
  },
};
export default MyProfile;






