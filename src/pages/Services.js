import React from 'react';
import "./Services.css";
import { Link } from 'react-router-dom';
import { useTranslation } from "react-i18next";

import Stethoscope from '../assets/stethoscope.png';
import FirstAidKit from '../assets/first-aid-kit.png';
import Syringe from '../assets/syringe.png';
import MedicineBottle from '../assets/MedicineBottle.png';
import Ambulance from '../assets/Ambulance.png';
import QualifiedDoctors from '../assets/QualifiedDoctors.png';

import DoctorTeam from "../components/DoctorTeam/DoctorTeam";
import Ratings from '../components/Ratings/Ratings';
import Banner from '../components/Banner/Banner';

const Services = () => {
    const { t } = useTranslation();

    const servicesList = [
        { img: Stethoscope, title: t("diagnostics"), link: "/ServicesDetails/Diagnostics" },
        { img: FirstAidKit, title: t("treatment"), link: "/ServicesDetails/Treatment" },
        { img: Syringe, title: t("surgery"), link: "/ServicesDetails/Surgery" },
        { img: MedicineBottle, title: t("emergency"), link: "/ServicesDetails/Emergency" },
        { img: Ambulance, title: t("vaccine"), link: "/ServicesDetails/Vaccine" },
        { img: QualifiedDoctors, title: t("qualifiedDoctors"), link: "/ServicesDetails/QualifiedDoctors" },
    ];

    return (
        <>
            <Banner />
            <section className="section-area">
                <div className="container">
                    <div className="row">
                        {servicesList.map((service, idx) => (
                            <div className="col-lg-4 col-md-6 mb-30" key={idx}>
                                <div className="feature-container feature-bx2 feature1">
                                    <div className="feature-box-xl mb-20">
                                        <span className="icon-cell">
                                            <img alt={service.title} src={service.img} />
                                        </span>
                                    </div>
                                    <div className="icon-content">
                                        <h3 className="ttr-title">{service.title}</h3>
                                        <p>{t("desc")}</p>
                                        <Link to={service.link} className="btn btn-primary light">{t("viewMore")}</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
            <Ratings/>
            <DoctorTeam/>
        </>
    );
}

export default Services;
