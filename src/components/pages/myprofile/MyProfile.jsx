
"use client";
import Profile from "@/components/auth/Profile";
import Order from "@/components/Order";
import React, { useState } from "react";
import { CgProfile, CgLogOut } from "react-icons/cg";
import { FaFirstOrderAlt } from "react-icons/fa";
import { RiCoupon2Line } from "react-icons/ri";
const NAVIGATION = [
  { segment: "Profile", title: "Profile", icon: <CgProfile /> },
  { segment: "Orders", title: "Orders", icon: <FaFirstOrderAlt /> },
  { segment: "Coupon", title: "Coupon", icon: <RiCoupon2Line /> },
  { segment: "Logout", title: "Logout", icon: <CgLogOut /> },
];
const MyProfile = () => {
  const [activeSection, setActiveSection] = useState("Profile");
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
              onClick={() => setActiveSection(item.segment)}
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
        {activeSection === "Profile" && <Profile/>}
        {activeSection === "Orders" && <Order/>}
        {activeSection === "Logout" && <h1>Logging out...</h1>}
        {activeSection === "Coupon" && <h1>Coupon</h1>}
      </div>
    </div>
  );
};
export default MyProfile;






