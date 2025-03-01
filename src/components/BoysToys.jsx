

// "use client";
// import { categories } from '@/redux/Action/category';
// import Link from 'next/link';
// import React, { useEffect, useState } from 'react';
// import { IoSearch } from "react-icons/io5";
// import { useDispatch, useSelector } from 'react-redux';

// const BoysToys = () => {
 
//   const [categoryData, setCategoryData] = useState([]);
//   const dispatch = useDispatch();
//   const { category } = useSelector((state) => state.category);

//   useEffect(() => {
//     dispatch(categories());
//   }, [dispatch]);

//   useEffect(() => {
//     if (category && category.length > 0) {
//       setCategoryData(category);
//     }
//   }, [category]);

//   return (
//     <>
//       <div className="leading-left-title">
//         <div className="two-kids-title">
//           <img src="./product/children-holding-blank-banner-1.png" alt="children" />
//         </div>
//         <div className="lab-position">
//           <div className="left-search-title">
//             <p>Search</p>
//             <hr />
//             <div className="all-left-search d-flex align-items-center">
//               <input type="text" placeholder="Search Products" className="search-bar" />
//               <IoSearch className="serch-media" />
//             </div>
//           </div>
//         </div>

//         <div className="left-product-title mt-3">
//           <p>Categories</p>
//           <div className="left-p-title">
//             {categoryData.map((cat) => (
//               <div key={cat.id}>
//                 <ul>
//                   {/* <strong>{cat.name.toUpperCase()}</strong>  */}
//                   {cat.childes && cat.childes.length > 0 ? (
//                     cat.childes.map((child) => (
//                       <li key={child.id}>
//                         <strong>
//                           <hr/>
//                         {child.name}
                        
//                         </strong>
//                         {/* Check if this child has its own subcategories */}
//                         {child.childes && child.childes.length > 0 && (
//                           <ul>
//                             {child.childes.map((subChild) => (
//                               <li key={subChild.id}>
//                                 <Link href={`/${subChild.slug}`}>{subChild.name}</Link>
//                               </li>
//                             ))}
//                           </ul>
//                         )}
//                       </li>
//                     ))
//                   ) : (
//                     <li></li>
//                   )}
//                 </ul>
//                 {/* <hr /> */}
//               </div>
//             ))}
//           </div>
//           <button className="btn">
//             <Link href="/live-projects">Live Project</Link>
//           </button>
//         </div>
//       </div>
//     </>
//   );
// };

// export default BoysToys;


"use client";
import { categories } from '@/redux/Action/category';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { IoSearch } from "react-icons/io5";
import { useDispatch, useSelector } from 'react-redux';

const BoysToys = ({ onSubcategoryClick }) => {
  const [categoryData, setCategoryData] = useState([]);
  const dispatch = useDispatch();
  const { category } = useSelector((state) => state.category);

  useEffect(() => {
    dispatch(categories());
  }, [dispatch]);

  useEffect(() => {
    if (category && category.length > 0) {
      setCategoryData(category);
    }
  }, [category]);

  const handleSubcategoryClick = (subcategorySlug) => {
    if (onSubcategoryClick) {
      onSubcategoryClick(subcategorySlug);
    }
  };

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
        </div>

        <div className="left-product-title mt-3">
          <p>Categories</p>
          <div className="left-p-title">
            {categoryData.map((cat) => (
              <div key={cat.id}>
                <ul>
                  {cat.childes && cat.childes.length > 0 ? (
                    cat.childes.map((child) => (
                      <li key={child.id}>
                        <strong>
                          <hr />
                          {child.name}
                        </strong>
                        {child.childes && child.childes.length > 0 && (
                          <ul>
                            {child.childes.map((subChild) => (
                              <li key={subChild.id}>
                                {/* <Link href={`/${subChild.slug}`} onClick={() => handleSubcategoryClick(subChild.slug)}>
                                  {subChild.name}
                                </Link> */}
                                {subChild.name}
                              </li>
                            ))}
                          </ul>
                        )}
                      </li>
                    ))
                  ) : (
                    <li></li>
                  )}
                </ul>
              </div>
            ))}
          </div>
          <button className="btn">
            <Link href="/live-projects">Live Project</Link>
          </button>
        </div>
      </div>
    </>
  );
};

export default BoysToys;

