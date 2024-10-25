"use client";
import React, { useState } from "react";
import "../styles/_navbar.scss";
import Link from "next/link";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isSearchBarVisible, setSearchBarVisible] = useState(false);
  const router = useRouter();

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleSearchBar = () => {
    setSearchBarVisible(!isSearchBarVisible);
  };

  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  console.log("LOGIN",isLoggedIn)
  const cartCount = useSelector((state) => state.cart.cartCount) || 0;

  const handleCartClick = () => {
    if (isLoggedIn) {
      router.push("/login"); // Redirect to login if not logged in
    } else {
      router.push("/cart"); // Redirect to cart if logged in
    }
  };


  return (
    <>
      <header>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
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
              className={`collapse navbar-collapse ${
                isMobileMenuOpen ? "show" : ""
              }`}
              id="navbarNav"
            >
              <ul className="navbar-nav ms-auto">
                <li className="nav-item">
                  <Link href="/products" passHref className="nav-link">
                    Product
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/labs" passHref className="nav-link">
                    Labs
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/partner-with-us" passHref className="nav-link">
                    Partner With Us
                  </Link>
                </li>
                <li className="nav-item">
                  <Link href="/contact-us" passHref className="nav-link">
                    Contact Us
                  </Link>
                </li>
              </ul>
            </div>

            {/* Icons Section (Wishlist, Search, Cart, Profile) */}
            <div className="d-flex align-items-center">
              {isSearchBarVisible && (
                <div className="search-bar-container">
                  <input
                    type="text"
                    placeholder="Search..."
                    className="form-control"
                  />
                </div>
              )}
              <div className="nav-link mx-2" onClick={toggleSearchBar}>
                <Image
                  src={"/icons/search.png"}
                  width={100}
                  height={100}
                  alt="Search"
                  className="icon"
                />
              </div>

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

              <Link href="/profile" passHref className="nav-link mx-2">
                <Image
                  src={"/icons/profile.png"}
                  width={100}
                  height={100}
                  alt="Wishlist"
                  className="icon"
                />
              </Link>
            </div>
          </div>
        </nav>

        {/* Search Bar */}
      </header>
    </>
  );
};

export default Navbar;

