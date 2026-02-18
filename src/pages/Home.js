// src/pages/Home.js
import React from 'react';
import './home.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRight } from '@fortawesome/free-solid-svg-icons';
import { Link } from "react-router-dom";

// استيراد مكونات Swiper
import { Swiper, SwiperSlide } from "swiper/react";
// استيراد أنماط Swiper
import "swiper/css";
import "swiper/css/pagination";
// استيراد وحدة Pagination

import { Pagination } from "swiper/modules";
import Booking from '../components/Booking/Booking';
import AboutUs from '../components/AboutUs/AboutUs';
import ContactForm from '../components/ContactForm/ContactForm';
import ImgOne from '../assets/bg_img.png';

import iconHome from '../assets/iconhome.png';

import bachgroundHome from '../assets/backgrond_home.jpg';
import bachgroundContect from '../assets/backgrond_contact.jpg';
import backgroundAppointment from '../assets/backgrond_appointment.jpg';

import Stethoscope from '../assets/stethoscope.png'
import FirstAidKit from '../assets/first-aid-kit.png';
import Syringe from '../assets/syringe.png';
import MedicineBottle from '../assets/MedicineBottle.png';
import Ambulance from '../assets/Ambulance.png';
import { useTranslation } from "react-i18next";
const Home = () => {
    const { t } = useTranslation();
    return (
        <>
            <header>
                <div
                    className="hom_sectio_bg"
                    style={{ backgroundImage: `url(${bachgroundHome})` }}>
                    <div className='container'>
                        <div className='row'>
                            <div className='col-lg-7 col-md-6 col-sm-7 height_col'>
                                <h5>{t("headerSubtitle")}</h5>
                                <h2>{t("headerTitle")}</h2>
                                <button className='btn'>
                                    <Link to="/about">{t("readMore")}</Link>
                                </button>
                            </div>

                            <div className='col-lg-5 col-md-6 col-sm-5'>
                                <div className='img_bg_one'>
                                    <img src={iconHome} alt='bg-img' className='imgOne' />
                                </div>
                            </div>
                        </div>
                        {/* <img src={iconHome} alt='icon-home' className='icon-home subscriber' /> */}
                    </div>
                </div>
            </header >
            <AboutUs />
            <section
                id="contact-section"
                className="contact_bg_section"
                style={{ backgroundImage: `url(${bachgroundContect})` }}
            >
                <div className="contact-overlay">
                    <h3 className='addres_color'>{t("contact")}</h3>
                    <ContactForm />
                </div>
            </section>
            <section className="section-area section_area section-sp5 work-area">
                <div className="container-sm">
                    <div className="heading-bx text-center">
                        <h6 className="title_ext1">{t("workingProcess")}</h6>
                        <h2 className="title_ext2">{t("howItWorks")}</h2>
                    </div>

                    <div className="row justify-content-center">
                        {[
                            { num: "01", title: t("step1Title"), desc: t("stepDesc") },
                            { num: "02", title: t("step2Title"), desc: t("stepDesc") },
                            { num: "03", title: t("step3Title"), desc: t("stepDesc") },
                        ].map((step, idx) => (
                            <div className="col-lg-4 col-sm-6 mb-30" key={idx}>
                                <div className={`work-bx ${idx === 1 ? "active" : ""}`}>
                                    <div className="work-num-bx">{step.num}</div>
                                    <div className="work-content">
                                        <h5 className="title text-secondary mb-10">{step.title}</h5>
                                        <p>{step.desc}</p>
                                    </div>
                                    <Link to="/services" className="btn btn-primary btn_primary lights light">
                                        <span>{t("viewMore")}</span>
                                        <FontAwesomeIcon icon={faArrowRight} className='btn-icon-bx' />
                                    </Link>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <section className='section-area section-sp1 service-wraper service_wraper'>
                <div className="container">
                    <div className="row align-items-center">
                        {/* قائمة العناصر الثابتة */}
                        <div className="col-xl-4 col-lg-7 mb-30">
                            <div className="heading-bx">
                                <h6 className="title-ext">{t("services")}</h6>
                                <h2 className="title">{t("servicesTitle")}</h2>
                                <p>{t("servicesDesc")}</p>
                            </div>
                            <Link to="/services" className="btn btn-secondary btn_secondary btn-lg shadow">
                                {t("allServices")}
                            </Link>
                        </div>

                        {/* قسم شريط التمرير */}
                        <div className="col-xl-8 col-lg-12 col-md-12 mb-15">
                            <Swiper
                                spaceBetween={20}
                                pagination={{ clickable: true }}
                                modules={[Pagination]}
                                className="mySwiper"

                                breakpoints={{
                                    0: {
                                        slidesPerView: 1,   // موبايل صغير
                                    },
                                    576: {
                                        slidesPerView: 1,   // موبايل
                                    },
                                    768: {
                                        slidesPerView: 2,   // تابلت
                                    },
                                    992: {
                                        slidesPerView: 2,   // لابتوب صغير
                                    },
                                    1200: {
                                        slidesPerView: 3,   // ديسكتوب
                                    },
                                }}
                            >
                                {[
                                    { img: Stethoscope, title: t("diagnostics"), link: "/ServicesDetails/Diagnostics" },
                                    { img: MedicineBottle, title: t("treatment"), link: "/ServicesDetails/Treatment" },
                                    { img: FirstAidKit, title: t("surgery"), link: "/ServicesDetails/Surgery" },
                                    { img: Syringe, title: t("vaccine"), link: "/ServicesDetails/Vaccine" },
                                    { img: Ambulance, title: t("emergency"), link: "/ServicesDetails/Emergency" },
                                ].map((feat, idx) => (
                                    <SwiperSlide key={idx}>
                                        <div className="feature-container feature-bx2 feature1">
                                            <div className="feature-box-xl mb-20">
                                                <span className="icon-cell">
                                                    <img alt={feat.title} src={feat.img} />
                                                </span>
                                            </div>
                                            <div className="icon-content">
                                                <h3 className="ttr-title">{feat.title}</h3>
                                                <p>{t("desc")}</p>
                                                <Link to={feat.link} className="btn btn-primary light">
                                                    {t("viewMore")}
                                                </Link>
                                            </div>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </div>
                </div>
            </section>
            <section
                className="section-area account-wraper1 appointment_bg_section"
                style={{ backgroundImage: `url(${backgroundAppointment})` }}
            >
                <div className="appointment-overlay">
                    <div className="container">
                        <div className="row justify-content-center align-items-center text-center">
                            <div className="col-xl-6 col-lg-8 col-md-10">
                                <div className="appointment-form form-wraper centered-form">
                                    <h3 className="title">{t("appointmentNow")}</h3>
                                    <Booking />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Home;