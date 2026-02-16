import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTwitter, faLinkedin, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";

import DoctorOne from "../../assets/doctor1.jpg";
import DoctorTwo from "../../assets/doctor2.jpeg";
import DoctorThree from "../../assets/doctor3.jpeg";

import "./DoctorTeam.css";

const DoctorTeam = () => {
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
        }
    ];

    return (
        <section className="section-area section-sp3 team-wraper">
            <div className="container">
                <div className="heading-bx text-center">
                    <h6 className="title-ext">{t("sectionSubTitle")}</h6>
                    <h2 className="title">{t("sectionTitle")}</h2>
                </div>

                <div className="row justify-content-center">
                    {doctors.map((doctor, index) => (
                        <div className="col-lg-4 col-sm-6 mb-30" key={index}>
                            <div className="team-member">
                                <div className="team-media">
                                    <img
                                        src={doctor.img}
                                        alt={doctor.name}
                                    />
                                </div>

                                <div className="team-info">
                                    <div className="team-info-content">
                                        <h4 className="title textDo">
                                            <Link
                                                to={`/BlogDetailsSpicial/${encodeURIComponent(
                                                    doctor.name
                                                )}`}
                                            >
                                                {doctor.name}
                                            </Link>
                                        </h4>

                                        <span className="spanDo">
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
    );
};

export default DoctorTeam;
