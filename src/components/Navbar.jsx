"use client";
import React, { useEffect, useState } from "react";
import "../styles/_navbar.scss";
import Link from "next/link";
import Image from "next/image";
import "bootstrap/dist/css/bootstrap.min.css";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { move } from "formik";
import { navbarCategoriesData } from "@/redux/Action/NavbarCategories";
import { fetchCartData } from "@/redux/Reducer/Cart";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);  // Local state for login status
  const [cartCount , setCartCount] = useState(0);
  const [isRedirecting, setIsRedirecting] = useState(false); // New state for loader
  const router = useRouter();
  const dispatch = useDispatch();
 

  // const cartCount = useSelector((state) => state.cart.cartCount) || 0;
  // const cartCount = useSelector((state) => state.cart.cartCount) || 0;
  const { loading, navbarCategories, error } = useSelector((state) => state.navbarCategories);

  const cartCount1 = useSelector((state) => state.cart.cartCount) || 0;
  useEffect(() => {
    setCartCount(cartCount1);
  }, [cartCount1]);

  useEffect(() => {
    const token = localStorage.getItem("authAdminToken");
    setIsLoggedIn(!!token);

    // Fetch navbar categories
    dispatch(navbarCategoriesData());

    // Fetch cart data if user is logged in
    if (token) {
      dispatch(fetchCartData(token));
    }
  }, [dispatch]);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleCartClick = () => {
    if (isLoggedIn) {
      router.push("/cart");
    } else {
      router.push("/login");
    }
  };

  const handleCategoryClick = (slug) => {
    setIsRedirecting(true); // Show loader
    setTimeout(() => {
      router.push(`/${slug}`); // Redirect after delay
      setIsRedirecting(false); // Hide loader
    }, 2000);
  };

  // Handle loader for specific pages
 
  return (
  <>

     {isRedirecting && (
      <div className="loader-overlay-navbar ">
        <div className="loader-navbar"></div>
      </div>
    )}
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
            className={`collapse navbar-collapse justify-content-center ${isMobileMenuOpen ? "show" : ""}`}
            id="navbarNav"
          >
            <ul className="navbar-nav  d-flex gap-4">
              {/* N-Shop with Dropdown */}
              <li className="nav-item dropdown">
                <Link
                  className="nav-link dropdown-toggle "
                  href="#"
                  id="nShopDropdown"
                  role="button"
                  aria-expanded="false"
                  
                >
                  N-Shop
                  </Link>
                 <ul className="dropdown-menu" aria-labelledby="nShopDropdown">
                  {loading ? (
                    <li>Loading...</li>
                  ) : error ? (
                    <li>Error loading categories</li>
                  ) : (
                    navbarCategories
                      .filter((category) => category.type === "n-shop")
                      .map((category) => (
                        <li key={category.slug}>
                          <button
                              onClick={() => handleCategoryClick(category.slug)}
                              className="dropdown-item"
                            >
                              {category.name}
                            </button>
                        </li>
                      ))
                  )}
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
                  {loading ? (
                    <li>Loading...</li>
                  ) : error ? (
                    <li>Error loading categories</li>
                  ) : (
                    navbarCategories
                      .filter((category) => category.type === "K-12 Offering")
                      .map((category) => (
                        <li key={category.slug}>
                          <button
                              onClick={() => handleCategoryClick(category.slug)}
                              className="dropdown-item"
                            >
                              {category.name}
                            </button>
                        </li>
                      ))
                  )}
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
                  <li>
                    <Link href="/upcoming" passHref className="dropdown-item">
                      Upcoming Projects
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
                <Link href="/innovation" passHref className="nav-link">
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
            {cartCount > 0 && <span className="cart-count-badge">{cartCount}</span>}
            </div>
            {isLoggedIn ? (
              <button  className="btn btn-link nav-link mx-2">
                <Link href={'/myprofile'}>
                MyProfile</Link>
                </button>
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
    </>
  );
};
export default Navbar;
