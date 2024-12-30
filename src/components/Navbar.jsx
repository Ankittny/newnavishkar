"use client";
import React, { useState } from "react";
import "../styles/_navbar.scss";
import Link from "next/link";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const dispatch = useDispatch();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const cartCount = useSelector((state) => state.cart.cartCount) || 0;

  const handleCartClick = () => {
    if (isLoggedIn) {
      router.push("/cart");
    } else {
      router.push("/login");
    }
  };

  return (
    <header>
      <nav className="navbar navbar-expand-lg navbar-light">
        <div className="container">
          {/* Logo */}
          <Link href="/" passHref className="navbar-brand">
            <Image
              src={"/logo.png"}
              alt="Logo"
              className="logoImage"
              width={100}
              height={100}
            />
          </Link>

          {/* Hamburger Icon for Mobile */}
          <button
            className="navbar-toggler"
            type="button"
            onClick={toggleMobileMenu}
            aria-controls="navbarNav"
            aria-expanded={isMobileMenuOpen}
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Navigation Links */}
          <div
            className={`collapse navbar-collapse ${isMobileMenuOpen ? "show" : ""}`}
            id="navbarNav"
          >
            <ul className="navbar-nav ms-auto">
              {/* N-Shop with Dropdown */}
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="nShopDropdown"
                  role="button"
                  aria-expanded="false"
                >
                  N-Shop
                </Link>
                <ul className="dropdown-menu" aria-labelledby="nShopDropdown">
                  <li>
                    <Link href="/products" passHref className="dropdown-item">
                      Products
                    </Link>
                  </li>
                  <li>
                    <Link href="/projects" passHref className="dropdown-item">
                      Projects
                    </Link>
                  </li>
                </ul>
              </li>

              {/* K-Shop without Dropdown */}
            
              {/* Other Links */}
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="nShopDropdown"
                  role="button"
                  aria-expanded="false"
                >
                  K-12 Offering
                </Link>
                <ul className="dropdown-menu" aria-labelledby="nShopDropdown">
                  <li>
                    <Link href="/workshop" passHref className="dropdown-item">
                      Workshops
                    </Link>
                  </li>
                  <li>
                    <Link href="/labs" passHref className="dropdown-item">
                      N-Labs
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle"
                  href="#"
                  id="nShopDropdown"
                  role="button"
                  aria-expanded="false"
                >
                  Projects
                </Link>
                <ul className="dropdown-menu" aria-labelledby="nShopDropdown">
                  <li>
                    <Link href="/complete-project" passHref className="dropdown-item">
                      Completed Project
                    </Link>
                  </li>
                  <li>
                    <Link href="/live-projects" passHref className="dropdown-item">
                      Live Projects
                    </Link>
                  </li>
                </ul>
              </li>
              <li className="nav-item">
                <Link href="/partner-with-us" passHref className="nav-link">
                  Partner With Us
                </Link>
              </li>
              <li className="nav-item">
                <Link href="/contactus" passHref className="nav-link">
                Innovation
                </Link>
              </li>
            </ul>
          </div>

          {/* Cart and Profile Section */}
          <div className="d-flex align-items-center">
            <div className="nav-link mx-2" onClick={handleCartClick}>
              <Image
                src={"/icons/cart.png"}
                width={100}
                height={100}
                alt="Cart"
                className="icon"
              />
              <span className="cart-count-badge">{cartCount}</span>
            </div>

            {isLoggedIn ? (
              <button className="btn btn-link nav-link mx-2">Logout</button>
            ) : (
              <Link href="/login" passHref className="nav-link mx-2">
                <Image
                  src={"/icons/profile.png"}
                  width={100}
                  height={100}
                  alt="Profile"
                  className="icon"
                />
              </Link>
            )}
          </div>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
