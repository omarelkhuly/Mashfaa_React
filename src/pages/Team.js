import React from "react";
import { Link } from "react-router-dom";
import Banner from "../components/Banner/Banner";
import { useTranslation } from "react-i18next";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faLinkedin, faInstagram } from "@fortawesome/free-brands-svg-icons";

import DoctorOne from "../assets/doctor1.jpg";
import DoctorTwo from "../assets/doctor2.jpeg";
import DoctorThree from "../assets/doctor3.jpeg";
import DoctorFour from "../assets/doctor4.jpeg";
import DoctorFive from "../assets/doctor5.jpeg";
import DoctorSix from "../assets/doctor6.jpeg";

const Team = () => {
    const { t } = useTranslation();

    const doctors = [
        {
            img: DoctorOne,
            name: "Dr. Addition Smith",
            role: t("dentist")
        },
        {
            img: DoctorTwo,
            name: "Dr. Mahfuz Riad",
            role: t("chiropractor")
        },
        {
            img: DoctorThree,
            name: "Dr. David Benjamin",
            role: t("cardiologist")
        },
        {
            img: DoctorFour,
            name: "Dr. Addition Smith",
            role: t("dentist")
        },
        {
            img: DoctorFive,
            name: "Dr. Mahfuz Riad",
            role: t("chiropractor")
        },
        {
            img: DoctorSix,
            name: "Dr. David Benjamin",
            role: t("cardiologist")
        }
    ];

    return (
        <>
            <Banner />
            <section className="section-area team-wraper">
                <div className="container">
                    <div className="row">
                        {doctors.map((doctor, index) => (
                            <div className="col-lg-4 col-sm-6" key={index}>
                                <div className="team-member mb-30">
                                    <div className="team-media">
                                        <img src={doctor.img} alt={doctor.name} />
                                    </div>

                                    <div className="team-info">
                                        <div className="team-info-comntent">
                                            <h4 className="title">
                                                <Link
                                                    to={`/BlogDetailsSpicial/${encodeURIComponent(
                                                        doctor.name
                                                    )}`}
                                                >
                                                    {doctor.name}
                                                </Link>
                                            </h4>
                                            <span className="text-secondary">
                                                {doctor.role}
                                            </span>
                                        </div>

                                        <ul className="social-media mt-3">
                                            <li>
                                                <a href="https://twitter.com/" target="_blank" rel="noreferrer">
                                                    <FontAwesomeIcon icon={faTwitter} className="icon twitter" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer">
                                                    <FontAwesomeIcon icon={faLinkedin} className="icon linkedin" />
                                                </a>
                                            </li>
                                            <li>
                                                <a href="https://www.instagram.com/" target="_blank" rel="noreferrer">
                                                    <FontAwesomeIcon icon={faInstagram} className="icon instagram" />
                                                </a>
                                            </li>
                                        </ul>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </>
    );
};

export default Team;
