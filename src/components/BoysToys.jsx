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
                    <div className="lab-left-title">
                        <p>Lab</p>
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
                    </div>
                </div>
                <div className="left-search-title mt-3">
                    <p>Search</p>

                    <hr />
                    <div className="all-left-search d-flex align-items-center">
                        <input type="text" placeholder="Search Lab" className="search-bar" />
                        <IoSearch className="serch-media" />
                    </div>
                </div>
                <div className="left-product-title mt-3">
                    <p>Product</p>

                    <hr />
                    <div className="left-p-title ">
                        <ul>
                            <li><a href="">24-IN-1 Robot Carnival</a></li>
                            <li><a href="">2MINOS</a></li>
                            <li><a href="">Motonova</a></li>
                            <li><a href="">Obstacle Challenger-COLLINS</a></li>

                        </ul>
                    </div>
                </div>
            </div>
        </>

    )
};

export default BoysToys;
