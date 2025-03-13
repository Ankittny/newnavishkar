"use client";
import React, { useEffect, useState } from "react";
import "../../../styles/_about.scss";
import OurAchievement from "@/components/OurAchievment";
import { Swiper, SwiperSlide } from 'swiper/react';
import Footer from "@/components/Footer";
import { Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';

// import './styles.css';

// import required modules
import { EffectCoverflow, Pagination } from 'swiper/modules';
import { useDispatch, useSelector } from "react-redux";
import { configData } from "@/redux/Action/Config";

const AboutUs = () => {

    const dispatch = useDispatch();
    const [aboutUs,setAboutUs]=useState([])

    const { loading, error, config } = useSelector((state) => state.config);

    useEffect(() => {
        dispatch(configData());
      }, [dispatch]);


       useEffect(()=>{
          if(config && config.about_us){
            setAboutUs(config.about_us)
          }
        },[config])

        console.log("About Us",aboutUs)


    return (
        <>
            <section>
                <div className="productBanner">
                    <img
                        src="team/about.png"
                        alt="Product Image"
                        loading="lazy"
                        width="100%"
                    />
                    <div className="navi-title"></div>
                </div>
            </section>

            <section className="who-section py-lg-5">
                <div className="container">
                    <div className="who-content">
                        <div className="who-text mt-lg-5">
                            <h1>Who We Are ?</h1>
                            <p>
                                We are one of the most innovative, creative, and researching
                                pool of minds gathered for a common goal. The aim of the team is
                                to transform the system of education in line & length of new
                                education guidelines. No doubt with little faster than
                                competitors just to be in the market better than others. The
                                team tries and brings the dreams of Y & Z generation in reality.
                                Child psychology for learning, the pedagogy of MoE and the most
                                vital operations required by our education system is
                                Experiential Learning. We, with guarantee are inculcating this
                                instinct in K-12 students, which students are enjoying at their
                                best.
                            </p>
                        </div>
                        <div className="who-image">
                            <div className="robot-image"></div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="why-us-section my-lg-4">
                <div className="container">
                    <div className="row align-items-center">
                        <div className="col-lg-5">
                            <div className="robot-animation text-center">
                                <img
                                    src="product/giphy.gif"
                                    alt="Robot Assistant"
                                    className="img-fluid robot-gif"
                                />
                            </div>
                        </div>

                        <div className="col-lg-7 ps-md-5">
                            <div className="contents-wrapper">
                                <div className="title-badge">
                                    <h1 className=" fw-bold mb-3 p-3">Why Us?</h1>
                                </div>

                                <h4 className="text-uppercase fw-bold mb-4">
                                    PIONEERS IN SEGMENT
                                </h4>

                                <div className="description">
                                    <p className="mb-4">
                                        We are an education vertical of a technology driven company,
                                        ITL who are pioneers in providing Artificial Intelligence
                                        and IoT based solutions to corporate and government bodies.
                                        With robotics, AI, ML and other in-demand technologies,
                                        Intelli Tinkering delivers solutions to new-age problems.
                                    </p>

                                    <p>
                                        At Intelli Tinkering, we combine education and technology
                                        for students to have a technical aptitude along with logical
                                        skills. We promote and encourage the newly thriving skills
                                        to be embedded into the education curriculum.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="driving-innovations py-lg-5">
                <div className="container">
                    <div className="contents-wrappers">
                        {/* Content Column */}
                        <div className="content-col">
                            <div className="innovation-title">
                                <h1>DRIVING INNOVATIONS</h1>
                                <p>
                                    We are proactively involved in research and development in the
                                    field of introducing technology into Primary and Secondary
                                    Education(K12). It is said, modern problems require modern
                                    solutions, building upon that we nurture young minds to have
                                    an analytical and solution-oriented approach for the problems.
                                    When young and fertile minds are fed with the right direction
                                    and data, they bloom with productivity and purpose, we aim to
                                    embed these skills of creativity, innovations and excellence
                                    in students.
                                </p>
                                <p>Core Values :</p>
                            </div>
                        </div>

                        {/* Image Column */}
                        <div className="content-col">
                            <div className="innovation-image">
                                <img
                                    src="/product/drone file.gif"
                                    alt="Educational Innovation Drone Technology"
                                    loading="lazy"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="DIGNITY-title py-lg-5">
                    <div className="container">
                        <div className="row">
                            <div className="col-lg-3">
                                <div className="dignity-version-end ">
                                    <img src="product/image 5.png" />
                                </div>
                                <p className="st-high-pkt text-center">Excellence</p>
                            </div>
                            <div className="col-lg-3">
                                <div className="dignity-version-end">
                                    <img src="product/image 6.png" />
                                </div>
                                <p className="st-high-pkt text-center"> Ethics And Dignity</p>
                            </div>
                            <div className="col-lg-3">
                                <div className="dignity-version-end ">
                                    <img src="product/image 7.png" />
                                </div>
                                <p className="st-high-pkt text-center">Students Focus</p>
                            </div>
                            <div className="col-lg-3">
                                <div className="dignity-version-end ">
                                    <img src="product/image 8.png" />
                                </div>
                                <p className="st-high-pkt text-center">Diversity</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <div className="excellence-wrapper">
                {/* Excellence Section */}
                <div className="content-section white-bg">
                    <div className="content-container d-flex">
                        <div className="content-block left-aligned">
                            <h2 className="with-colon">Excellence</h2>
                            <p>
                                With persistent Learning and improvement, we strive for
                                excellence in our academic pursuits committed to innovative
                                teaching
                            </p>
                        </div>

                        <div>
                            <img src="team/Excelance.png" alt="excellence"/>
                        </div>
                    </div>
                </div>

                {/* Ethics and Dignity Section */}
                <section className="content-section light-bg">
                    <div className="content-container d-flex">
                    <div>
                            <img src="team/ethics.png" alt="excellence"/>
                        </div>
                        <div className="content-block right-aligned">
                            <h2>Ethics and Dignity</h2>
                            <p>
                                We are committed to highest standards of honesty, fairness,
                                respect and professional and scholarly ethics
                            </p>
                        </div>
                    </div>
                </section>

                {/* Student Focus Section */}
                <section className="content-section white-bg">
                    <div className="content-container d-flex">
                        <div className="content-block left-aligned">
                            <h2>Student Focus</h2>
                            <p>
                                We are committed to fostering innovative learning skill
                                development for life making them self inspired learners. We
                                believe in growing together
                            </p>
                        </div>

                        <div>
                            <img src="team/student.png" alt="excellence"/>
                        </div>
                    </div>
                </section>

                {/* Diversity Section */}
                <section className="content-section light-bg">
                    <div className="content-container d-flex">
                    <div>
                            <img src="team/divercity.png" alt="excellence"/>
                        </div>
                        <div className="content-block right-aligned">
                            <h2>Diversity</h2>
                            <p>
                                We are committed to impart knowledge to one and all and empower
                                the generations with skill enhancement
                            </p>
                        </div>
                    </div>
                </section>
            </div>

            <section>
                <div className="vision-title">
                    <div className="heading-mission pt-4">
                        <h3>Our Vision & Mission</h3>
                    </div>

                    <div className="container">
                        {/* Vision Section */}
                        <div className="row align-items-center">
                            <div className="col-lg-6">
                                <div className="vision-heading">
                                    <h3>Vision</h3>
                                    <p>
                                        To provide the holistic AI learnings solutions to the
                                        schools those carter to various levels of involvement from
                                        student centric classroom implementation. The AI powered by
                                        STEAM (Science Technology Engineering Arts Math) to resource
                                        expansion through incessant development programs.
                                    </p>
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="vision-image-title">
                                    <img
                                        src="product/woman-using.png"
                                        alt="Woman using binoculars"
                                    />
                                </div>
                            </div>
                        </div>

                        {/* Mission Section */}
                        <div className="row align-items-center">
                            <div className="col-lg-6">
                                <div className="vision-image-title">
                                    <img
                                        src="product/happy-child.png"
                                        alt="Children with creative props"
                                    />
                                </div>
                            </div>
                            <div className="col-lg-6">
                                <div className="vision-heading">
                                    <h3>Mission</h3>
                                    <p>
                                        To inculcate creativity & innovation in the K12 students
                                        around the globe to be ready for AI revolution through
                                        educational solutions. To revolutionize the perception of
                                        education for K12 students globally by embedding AI
                                        solutions, IoT, ML and trending technologies. To bring out
                                        the best AI knowledge to X & Y generation backed by
                                        comprehensive AI researchers and innovators.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className="executive-team">
                <div className="section-title">
                    <h2>Leadership Team</h2>
                </div>

                <div className="team-container">

                <div className="team-member right-align">
                        
                        <div className="member-info">
                            <h3 className="name">Mr. Santosh Kumar Pandey</h3>
                            <p className="position">(Founder & CEO)</p>
                            <p className="description">
                            Mr. Santosh is a seasoned serial entrepreneur and engineer,
                             boasting two decades of valuable experience in the IT industry. 
                             With a strong domain expertise, he champions the philosophy of delivering
                              simple yet impactful solutions that cater to the needs of users. 
                              Throughout his career, Mr. Santosh has spearheaded numerous successful
                               ventures, overseeing the development and implementation of cutting-edge
                                technology projects. Despite his educational background in mechanical engineering, 
                                Mr. Santosh finds great fulfillment in working on initiatives that positively impact 
                                society and empower diverse communities, aiming to enhance and enrich lives.
                            </p>
                        </div>
                        <div className="member-image">
                            <img src="/team/santosh.png" alt="Mr. Ajit Kumar Swain" />
                        </div>
                    </div>
                    {/* Second Team Member */}
                    <div className="team-member left-align">
                        
                        <div className="member-info">
                            <h3 className="name">Mr. Deepak Sharma</h3>
                            <p className="position">(Director)</p>
                            <p className="description">
                            Mr. Deepak is an experienced Chartered Accountant and an IIM-Ahmedabad Graduate, with 30+ 
                            years of experience in the Financial Sector. He possesses strong domain
                             expertise in establishing new business lines such as Leasing, Hire Purchase, 
                             Individual Credit Ratings, Credit Information Sharing Platforms and IT driven Business Management
                              methodologies. Deepak specializes in ensuring regulatory and financial compliances.
                            </p>
                        </div>

                        <div className="member-image">
                            <img src="/team/deepak.png" alt="Mr. Deepak Sharma" />
                        </div>
                    </div>

                    
                
                    {/* Third Team Member */}
                    <div className="team-member left-align">
                        <div className="member-image">
                            <img src="/team/vedu.png" alt="Mr. Sunil Kumar Swain" />
                        </div>
                        <div className="member-info">
                            <h3 className="name">Miss.Vedulu Rhakho</h3>
                            <p className="position">(Board of Director)</p>
                            <p className="description">
                            Vedulu Rhakho is a pivotal figure in our organization, contributing approximately 90% towards our growth and success. As a core advisor and key decision-maker, his strategic insights and leadership have been instrumental in shaping our vision and driving impactful initiatives. His extensive expertise and dedication have guided the organization in achieving remarkable milestones. With a strong focus on innovation and excellence, Vedulu Rhakho continues to inspire growth and success.
                            </p>
                        </div>
                    </div>
                </div>
            </section>


            <section>
                <div className="client-title">
                    <div className="container">
                        <div className="row">
                            <div className="col-12">
                                <div className="clients-subject-heading">
                                    <h3>Client Voices of Satisfaction</h3>
                                    <p>Listen to delighted clients who’ve experienced struktura’s Struktura’s
                                        esceptional craftsmanship and professionalism</p>
                                </div>
                            </div>
                            <div className="col-lg-8">
                                <div className="classic-slider">
                                    <Swiper
                                        effect={'coverflow'}
                                        grabCursor={true}
                                        centeredSlides={true}
                                        slidesPerView={'auto'}
                                        coverflowEffect={{
                                            rotate: 50,
                                            stretch: 0,
                                            depth: 100,
                                            modifier: 1,
                                            slideShadows: true,
                                        }}
                                        autoplay={{
                                            delay: 2500,
                                            disableOnInteraction: false,
                                        }}

                                        pagination={true}
                                        modules={[EffectCoverflow, Pagination, Autoplay]}
                                        className="mySwiper"
                                    >
                                        <SwiperSlide>
                                            <div className="slider-faze1">
                                                <h3>“ Their commitment to quality and attention to
                                                    detail is unmatched</h3>
                                                <p>I’ve had the pleasure of collaborating with Struktura on multiple projects, and i must say
                                                    their commitment to quality and attention to detail is unmatched, Their team’s expertise
                                                    in construction  has truly elevated the success of my developments. </p>

                                                <span className="fw-bold">Medison Johnson</span>
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className="slider-faze1">
                                                <h3>“ Their commitment to quality and attention to
                                                    detail is unmatched</h3>
                                                <p>I’ve had the pleasure of collaborating with Struktura on multiple projects, and i must say
                                                    their commitment to quality and attention to detail is unmatched, Their team’s expertise
                                                    in construction  has truly elevated the success of my developments. </p>

                                                <span className="fw-bold">Medison Johnson</span>
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className="slider-faze1">
                                                <h3>“ Their commitment to quality and attention to
                                                    detail is unmatched</h3>
                                                <p>I’ve had the pleasure of collaborating with Struktura on multiple projects, and i must say
                                                    their commitment to quality and attention to detail is unmatched, Their team’s expertise
                                                    in construction  has truly elevated the success of my developments. </p>

                                                <span className="fw-bold">Medison Johnson</span>
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className="slider-faze1">
                                                <h3>“ Their commitment to quality and attention to
                                                    detail is unmatched</h3>
                                                <p>I’ve had the pleasure of collaborating with Struktura on multiple projects, and i must say
                                                    their commitment to quality and attention to detail is unmatched, Their team’s expertise
                                                    in construction  has truly elevated the success of my developments. </p>

                                                <span className="fw-bold">Medison Johnson</span>
                                            </div>
                                        </SwiperSlide>
                                        <SwiperSlide>
                                            <div className="slider-faze1">
                                                <h3>“ Their commitment to quality and attention to
                                                    detail is unmatched</h3>
                                                <p>I’ve had the pleasure of collaborating with Struktura on multiple projects, and i must say
                                                    their commitment to quality and attention to detail is unmatched, Their team’s expertise
                                                    in construction  has truly elevated the success of my developments. </p>

                                                <span className="fw-bold">Medison Johnson</span>
                                            </div>
                                        </SwiperSlide>
                                    </Swiper>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="happy-client-suggestion">
                                    <img src="product/Rectangle 5 (1).jpg" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
            <section>
                <OurAchievement />
            </section>
            <section>
                <Footer />
            </section>
        </>
    );
};

export default AboutUs;
