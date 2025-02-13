"use client"
import Link from 'next/link';
import React from 'react'
import { IoSearch } from "react-icons/io5";

const BoysToys = () => {
    return (
        <>
            <div className="leading-left-title">
                <div className="two-kids-title">
                    <img src="./product/children-holding-blank-banner-1.png" alt="children" />
                </div>
                <div className="lab-position">

                <div className="left-search-title">
                    <p>Search</p>

                    <hr />
                    <div className="all-left-search d-flex align-items-center">
                        <input type="text" placeholder="Search Products" className="search-bar" />
                        <IoSearch className="serch-media" />
                    </div>
                </div>
                    {/* <div className="lab-left-title">
                        <p>Labs</p>
                        <hr />
                        <div className="left-list-title">
                            <ul>
                                <li><a href="">AI Labs</a></li>
                                <li><a href="">AR/VR Labs</a></li>
                                <li><a href="">Language Lab</a></li>
                                <li><a href="">Psychometric Labs.</a></li>
                                <li><a href="">Robotics Labs</a></li>
                                <li><a href="">Toddler Labs</a></li>
                            </ul>
                        </div>
                    </div> */}
                </div>
                
                <div className="left-product-title mt-3">
                    <p>Categories</p>

                    <hr />
                    <div className="left-p-title ">
                        <ul> STEM
                            <li><a href="">Stem Toys</a></li>
                            <li><a href="">Stem Projects</a></li>
                        </ul>
                        <hr/>
                        <ul> ROBOTICS
                            <li ><a href="">Robotics Project Kit</a></li>
                            <li><a href="">Robotics Toys</a></li>
                        </ul>
                        <hr/>
                        <ul> DIY KITS
                            <li ><a href="">Jigsaa Puzzle</a></li>
                            <li><a href="">Drones</a></li>
                        </ul>
                        <hr/>
                        <ul> BATTERY OPERATED
                            <li ><a href="">Minos</a></li>
                            <li><a href="">24 In One</a></li>
                            <li><a href="">Obstacle Challenger</a></li>
                            <li><a href="">Drone</a></li>
                           
                        </ul>
                        <hr/>
                        <ul> NONE-BATTERY OPERATED
                            <li ><a href="">Motonova </a></li>
                            <li><a href="">Jigsaa Puzzle</a></li>
                        </ul>
                    </div>

                    <button className='btn '>
                        <Link href="/complete-project">
                        Completed Project
                        </Link>
                    </button>
                </div>
                
            </div>
        </>

    )
};

export default BoysToys;
