import ProductBanner from "@/components/ProductBanner";
import React from "react";
import Image from "next/image";
// import Related1 from "../../../../assets/labs/related1.png";
import Link from "next/link";
import Filter from "@/components/Filter";
import RelatedProduct from "@/components/RelatedProduct";
// import ToddlarLabs from "../../../../assets/labs/tadlarlabs.png";

const LabDetails = () => {
  return (
    <>
      <ProductBanner imageUrl={"/labs/labDetailBanner.png"} />

      <div className="container">
        <div className="row">
          <div className="col-4">
            <Filter />
          </div>

          <div className="col-4">
            <div class="relation-title right-sight-title-brand">
              <h3>Navishkar The Leading Brand</h3>
              <div class="mt-3">
                <Image
                  src={"/labs/tadlarlabs.png"}
                  width={100}
                  height={100}
                  className="toddlet-tab-img"
                  alt="elec"
                />
              </div>
            </div>
            <div class="role-ai-title">
              <div class="artical-tag-role">
                <h4>Role of Artificial Intelligence (AI) in STEAM education</h4>
                <p>
                  {" "}
                  Let us delve into the enthralling realm of STEAM education. In
                  today's fast-paced world, education is a critical tool for
                  success. But what if we could unlock education's true
                  potential by mixing art and STEAM? STEAM is an acronym for
                  Science, Technology, Engineering, Arts, and Mathematics. It
                  provides unlimited options and a dynamic learning experience
                  by using art. Students gain a broad view of the world while
                  also developing creativity and critical thinking skills. STEAM
                  goes above and beyond STEM in terms of developing a
                  well-rounded personality. Art influences students' educational
                  experiences through fostering creativity, problem-solving, and
                  the exploration of diverse views. So, let’s delve into
                  additional benefits of STEAM Education.
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

          <div className="col-4">
            <h4>Related Labs</h4>
            <div class="relation-title-left right-sight-title-brand">
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

      <RelatedProduct />
    </>
  );
};

export default LabDetails;
