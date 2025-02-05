"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const ProductBanner = ({ title, description, linkText, linkUrl, imageUrl }) => {
  return (
    <section>
      <div className="productBanner">
        {imageUrl && (
          <Image
            src={imageUrl}
            width={1000}
            height={400}
            alt="Product Image"
            className="product-image"
          />
        )}
        <div className="navi-title">
          {title && <h1>{title}</h1>}
          {description && <p>{description}</p>}
          {linkText && linkUrl && (
            <button className="mt-3">
              <Link href={linkUrl}>{linkText}</Link>
            </button>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductBanner;



// "use client";
// import Image from "next/image";
// import Link from "next/link";
// import React, { useState } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Navigation, Pagination } from "swiper/modules";

// // Import Swiper styles
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";

// const ProductBanner = ({ slidesData }) => {
//   const [activeIndex, setActiveIndex] = useState(0);

//   return (
//     <section>
//       <div className="productBanner">
//         {/* Swiper Slider */}
//         <Swiper
//           modules={[Autoplay, Navigation, Pagination]}
//           spaceBetween={10}
//           slidesPerView={1}
//           loop={true}
//           autoplay={{
//             delay: 6000, // 15 seconds
//             disableOnInteraction: false,
//           }}
//           // pagination={{ clickable: true }}
//           // navigation
//           onSlideChange={(swiper) => setActiveIndex(swiper.realIndex)}
//         >
//           {slidesData?.map((slide, index) => (
//             <SwiperSlide key={index}>
//               <Image
//                 src={slide.imageUrl}
//                 width={1000}
//                 height={400}
//                 alt={`Slide ${index + 1}`}
//                 className="product-image"
//               />
//             </SwiperSlide>
//           ))}
//         </Swiper>

//         {/* Content that updates with the slide */}
//         <div className="navi-title">
//           <h1>{slidesData[activeIndex]?.title}</h1>
//           <p>{slidesData[activeIndex]?.description}</p>
//           {slidesData[activeIndex]?.linkText && slidesData[activeIndex]?.linkUrl && (
//             <button className="mt-3">
//               <Link href={slidesData[activeIndex]?.linkUrl}>
//                 {slidesData[activeIndex]?.linkText}
//               </Link>
//             </button>
//           )}
//         </div>
//       </div>
//     </section>
//   );
// };

// export default ProductBanner;
