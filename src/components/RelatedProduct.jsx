import Image from "next/image";
import React, { useEffect } from "react";
import Link from "next/link";
import { relatedProductData } from "@/redux/Action/RelatedProduct";
import { useDispatch, useSelector } from "react-redux";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import { Navigation, Autoplay } from "swiper/modules";

const RelatedProduct = ({ productId }) => {
  const dispatch = useDispatch();
  const { loading, error, relatedProd } = useSelector(
    (state) => state.relatedProduct
  );

  useEffect(() => {
    if (productId) {
      dispatch(relatedProductData(productId));
    }
  }, [dispatch, productId]);

  return (
    <>
      {/* Title Section */}
      <div className="row">
        <div className="col-12">
          <div className="shop-by-title text-center">
            <h5>
              RELATED <span>PRODUCT</span>
            </h5>
          </div>
        </div>
      </div>

      {/* Swiper Container */}
      <div className="ReletedslideContainer">
        {loading && <p>Loading related products...</p>}
        {error && <p className="error">{error}</p>}
        {!loading && !error && relatedProd.length === 0 && (
          <p>No related products found.</p>
        )}

        {!loading && !error && relatedProd.length > 0 && (
          <Swiper
            centeredSlides={true}
            navigation={true}
            modules={[Autoplay, Navigation]}
            className="mySwiper"
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
            }}
            loop={true}
            breakpoints={{
              640: {
                slidesPerView: 2,
                spaceBetween: 20,
              },
              768: {
                slidesPerView: 4,
                spaceBetween: 40,
              },
              1024: {
                slidesPerView: 4,
                spaceBetween: 50,
              },
            }}
          >
            {relatedProd.map((product, index) => (
              <SwiperSlide key={index}>
                <div className="related-product-card">
                  <Image
                    src={product.thumbnail_full_url?.path || "/placeholder.png"} // Replace with actual field
                    height={200}
                    width={200}
                    alt={product.name || `Related Product ${index + 1}`}
                  />
                  <div className="card-body">
                    <h5 className="product-name">{product.name}</h5>
                    <p className="product-price">Price: ${product.unit_price}</p>
                    <button className="btnPrimary">
                      <Link href={`/products/${product.slug}`}>View Product</Link>
                    </button>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </>
  );
};

export default RelatedProduct;
