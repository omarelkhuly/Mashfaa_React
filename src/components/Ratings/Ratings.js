import React from 'react';
import './Ratings.css';
import { useTranslation } from "react-i18next";

const Ratings = () => {
    const { t } = useTranslation();

    const ratingsData = [
        { number: 120, title: t("yearsWithYou"), desc: t("yearsDesc") },
        { number: 400, title: t("awards"), desc: t("awardsDesc") },
        { number: 250, title: t("doctors"), desc: t("doctorsDesc") },
        { number: 800, title: t("satisfiedClients"), desc: t("clientsDesc") },
    ];

    return (
        <section className="section-sp1 service-wraper2">
            <div className="container">
                <div className="row">
                    {ratingsData.map((item, idx) => (
                        <div className="col-xl-3 col-sm-6 mb-30" key={idx}>
                            <div className="feature-container feature-bx3">
                                <h2 className="counter text-secondary">{item.number}</h2>
                                <h5 className="ttr-title">{item.title}</h5>
                                <p>{item.desc}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

export default Ratings;
