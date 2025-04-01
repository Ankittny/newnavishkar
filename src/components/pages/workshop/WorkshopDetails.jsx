"use client";
import BoysToys from '@/components/BoysToys';
import OurAchievement from '@/components/OurAchievment';
import ProductBanner from '@/components/ProductBanner';
import RelatedProduct from '@/components/RelatedProduct';
import Image from 'next/image';
import Link from 'next/link';
import React, { useEffect } from 'react';
import { WorkshopDataDetails } from "@/redux/Action/Workshop";
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useRouter } from 'next/navigation';

const WorkshopDetails = () => {

  const { workshopid } = useParams(); // Retrieve dynamic route parameter
  // console.log("Workshop ID:", workshopid);


  const dispatch = useDispatch();
  const { loading, worskDetails, error } = useSelector((state) => state.workshop);

  console.log("DIHBSCKJASKCNJS",worskDetails)

  useEffect(() => {
    dispatch(WorkshopDataDetails(workshopid)); // Pass the slug to the action
  }, [dispatch, workshopid]);

  return (
    <>
      {/* <ProductBanner imageUrl={worskDetails.image_path} /> */}

      <div className="container mb-3 mt-5">
        <div className="row">
          <div className="col-lg-3 mt-5">
            <BoysToys />
          </div>

          <div className="col-lg-5">
            <div className="relation-title right-sight-title-brand">
              <h3>Navishkar The Leading Brand</h3>
              <div className="mt-3">
                <Image
                  src={worskDetails.image_path}
                  width={200}
                  height={100}
                  className="toddlet-tab-img"
                  alt="elec"
                />
              </div>
            </div>
            <div className="role-ai-title mt-3"> 
              <div className="artical-tag-role">
                <h4>{worskDetails.title}</h4>
                <p>
                  {worskDetails.description}
                </p>
              </div>
              {/* Additional Content */}
            </div>
          </div>

          <div className="col-lg-4">
            <div className="relation-title retation-int right-sight-title-brand">
              <h4>Related Labs</h4>
            </div>
            <div className="relation-title-left left-right-tr right-sight-title-brand">
              <div className="toddler d-flex gap-4 mt-3">
                <div className="imag-toddler">
                  <Image
                    src={"/labs/related1.png"}
                    height={100}
                    width={100}
                    alt="link"
                  />
                </div>
                <div className="labs-toddler">
                  <span>Empowering students in the age of AI.</span>
                  <div className="an-int">
                    <Link href="">Read more</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="row">
        {/* <div className="col-lg-12 mt-3 mb-3">
          <div className="text-center">
            <h1 className="reletedHead">Related Products</h1>
          </div>
        </div> */}
        <RelatedProduct name={"Workshop"}/>
      </div>

      <OurAchievement />
    </>
  );
};

export default WorkshopDetails;
