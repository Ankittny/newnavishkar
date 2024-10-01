"use client"
import React, { useState } from 'react';
import "../styles/_navbar.scss"
import Link from 'next/link';
import Image from 'next/image';
import 'bootstrap/dist/css/bootstrap.min.css';

// import wisthlist from "../../assets/icons/wishlist.png";
// import cart from "../../assets/icons/cart.png";
// import search from "../../assets/icons/search.png";
// import profile from "../../assets/icons/profile.png";

const Navbar = () => {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
    const toggleMobileMenu = () => {
        setMobileMenuOpen(!isMobileMenuOpen);
    };
  return (
    <>
    <header>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container">
                    {/* Logo */}
                    <Link href="/" passHref className="navbar-brand">
                        <Image src={'/logo.png'} alt='Logo' className='logoImage' width={100} height={100}/>

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
                    <div className={`collapse navbar-collapse ${isMobileMenuOpen ? 'show' : ''}`} id="navbarNav">
                        <ul className="navbar-nav ms-auto">
                            <li className="nav-item">
                                <Link href="/products" passHref className="nav-link">
                                    Shop
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
                        <Link href="/wishlist" passHref className="nav-link mx-2">
                        <Image src={'/icons/search.png'} width={100} height={100}  alt="Wishlist" className='icon' />
                        </Link>

                        <Link href="/cart" passHref className="nav-link mx-2">
                        <Image src={'/icons/cart.png'} width={100} height={100}  alt="Wishlist" className='icon' />
                        </Link>

                        <Link href="/profile" passHref className="nav-link mx-2">
                        <Image src={'/icons/profile.png'} width={100} height={100}  alt="Wishlist" className='icon' />
                        </Link>
                    </div>
                </div>
            </nav>
        </header></>
  )
}

export default Navbar