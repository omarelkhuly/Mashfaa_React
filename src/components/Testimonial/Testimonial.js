import React from 'react';
import './Testimonial.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Slider from "react-slick";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight, faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { useTranslation } from "react-i18next";

import ImgTestimonialLight from '../../assets/bgImgTestimonial.png';
import ImgTestimonialDark from '../../assets/bgImgTestimonial_dark.png';

import DoctorOne from "../../assets/doctor1.jpg";
import DoctorTwo from "../../assets/doctor2.jpeg";
import DoctorThree from "../../assets/doctor3.jpeg";
import DoctorFour from "../../assets/doctor4.jpeg";
import DoctorFive from '../../assets/doctor5.jpeg';
import DoctorSix from "../../assets/doctor6.jpeg";

const NextArrow = ({ onClick }) => (
    <div
        className="swiper-button-next test-btn-next"
        onClick={onClick}
        style={{
            position: "absolute",
            top: "100px",
            right: "auto",
            left: "40px",
            transform: "translateY(-50%)",
            cursor: "pointer",
            zIndex: 1,
            color: "#fff",
            fontSize: "24px",
            backgroundColor: "var(--main-color)",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}
    >
        <FontAwesomeIcon icon={faArrowRight} />
    </div>
);

const PrevArrow = ({ onClick }) => (
    <div
        className="swiper-button-prev test-btn-prev"
        onClick={onClick}
        style={{
            position: "absolute",
            top: "100px",
            left: "-25px",
            transform: "translateY(-50%)",
            cursor: "pointer",
            zIndex: 1,
            color: "#fff",
            fontSize: "24px",
            backgroundColor: "var(--main-color)",
            borderRadius: "50%",
            width: "40px",
            height: "40px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}
    >
        <FontAwesomeIcon icon={faArrowLeft} />
    </div>
);

const Testimonial = ({ darkMode }) => {
    const { t } = useTranslation();

    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />
    };

    // اختر صورة الخلفية حسب الوضع
    const bgImg = darkMode ? ImgTestimonialDark : ImgTestimonialLight;

    return (
        <section className='section-area section-sp3 testimonial-wraper'>
            <div className='container'>
                <div className="heading-bx text-center">
                    <h6 className="title-ext text-secondary">
                        {t("testimonial_title", "Testimonial")}
                    </h6>
                    <h2 className="title m-b0">
                        {t("testimonial_text", "See What Are The Patients Saying About us")}
                    </h2>
                </div>
                <div className='row align-items-center'>
                    <div className="col-lg-6 text-center">
                        <div className="thumb-wraper">
                            <img className="bg-img" src={bgImg} alt="description" />
                            <ul>
                                {[DoctorOne, DoctorTwo, DoctorThree, DoctorFour, DoctorFive, DoctorSix].map((doc, idx) => (
                                    <li key={idx} data-member={idx + 1}>
                                        <a href="/react/">
                                            <img src={doc} alt={`doctor${idx + 1}`} />
                                        </a>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div className='col-lg-6'>
                        <Slider {...settings}>
                            {[1, 2, 3, 4, 5, 6].map(num => (
                                <div key={num}>
                                    <h3>{num}</h3>
                                </div>
                            ))}
                        </Slider>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Testimonial;
