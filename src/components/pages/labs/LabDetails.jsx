"use client"
import ProductBanner from "@/components/ProductBanner";
import React, { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import Filter from "@/components/Filter";
import RelatedProduct from "@/components/RelatedProduct";
import OurAchievement from "@/components/OurAchievment";
import { useDispatch,useSelector } from "react-redux";
import { useParams, useRouter } from "next/navigation";
import BoysToys from "@/components/BoysToys";
import { WorkshopDataDetails } from "@/redux/Action/Workshop";



const LabDetails = () => {
  const dispatch = useDispatch()
  const router = useRouter();

  const { labsid } = useParams(); 
   console.log("labsid ID:", labsid);

  const { loading, worskDetails, error } = useSelector((state) => state.workshop);

   useEffect(() => {
      dispatch(WorkshopDataDetails(labsid)); // Pass the slug to the action
    }, [dispatch, labsid]);

  console.log("DIHBSCKJASKCNJS",worskDetails)

  
  return (
    <>
      <ProductBanner imageUrl={worskDetails.image_path} />

      <div className="container mb-3 mt-5">
        <div className="row">
          <div className="col-lg-3 mt-5">
            <BoysToys/>
          </div>

          <div className="col-lg-5">
            <div class="relation-title right-sight-title-brand">
              <h3>Navishkar The Leading Brand</h3>
              <div class="mt-3">
                <Image
                  src={worskDetails.image_path}
                  width={100}
                  height={100}
                  className="toddlet-tab-img"
                  alt="elec"
                />
              </div>
            </div>
            <div class="role-ai-title">
              <div class="artical-tag-role">
                <h4>{worskDetails.title}</h4>
                <p>
                  {worskDetails.description}
                </p>
              </div>
              <div class="artical-tag-role">
                <h4>Bridging the Skill Gap</h4>
                <p>
                  {" "}
                  In a society that never stops evolving, a daunting skill gap
                  can hinder progress. But fear not! STEAM education emerges as
                  a powerful bridge connecting these two worlds. By fostering
                  creativity, igniting critical thinking, and nurturing
                  collaboration, STEAM equips learners with the
                  interdisciplinary skills needed to thrive in a dynamic,
                  technology-driven environment. .
                </p>
              </div>
              <div class="artical-tag-role">
                <h4>Fostering Innovation and Entrepreneurship</h4>
                <p>
                  {" "}
                  The world where audacious ideas are celebrated, where
                  out-of-the-box thinking propels progress, and where innovation
                  reigns supreme. STEAM education embraces this spirit by
                  seamlessly blending arts with STEM subjects. It dares students
                  to break free from the shackles of convention. With STEAM,
                  learners become the trailblazers who shape the future through
                  groundbreaking ideas and revolutionary initiatives..
                </p>
              </div>
              <div class="artical-tag-role">
                <h4>Encouraging a Multidisciplinary Approach</h4>
                <p>
                  {" "}
                  STEAM education is a gateway to a journey that reveals the
                  interconnectedness of different fields. By embracing a
                  multidisciplinary approach, students gain the tools to
                  revolutionize the world through holistic problem-solving,
                  incorporating creativity and critical thinking across
                  disciplines..
                </p>
              </div>
            </div>
          </div>

          <div className="col-lg-4">
          <div class="relation-title retation-int right-sight-title-brand">
          <h4>Related Labs</h4>
          </div>
            <div class="relation-title-left left-right-tr right-sight-title-brand">
        
              <div class="toddler d-flex gap-4 mt-3">
                <div class="imag-toddler">
                  <Image
                    src={"/labs/related1.png"}
                    height={100}
                    width={100}
                    alt="link"
                  />
                </div>
                <div class="labs-toddler ">
                  <span>Empowering students in the age of AI.</span>
                  <div class="an-int">
                    <Link href="">Read more</Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

        <div className="row">
        <div className="col-lg-12 mt-3 mb-3 ">
          <div className="text-center ">
            <h1 className="reletedHead">Related Products</h1>
          </div>
        </div>
        <RelatedProduct />
        </div>

        <OurAchievement />
    </>
  );
};

export default LabDetails;
