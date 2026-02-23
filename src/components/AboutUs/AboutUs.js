// src/components/AboutUs/AboutUs.js
import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from 'axios';

import AboutTopLeft from '../../assets/about_us1.jpg';
import AboutTopRight from '../../assets/about_us2.jpg';
import AboutBottomLeft from '../../assets/about_us3.jpg';

import SharpeImgOne from "../../assets/sharpe1.png";
import SharpeImgTwo from "../../assets/sharpe2.png";
import SharpeImgThree from "../../assets/sharpe3.png";
import SharpeImgFour from "../../assets/sharpe4.png";

import './AboutUs.css';

const AboutUs = () => {
  const { t } = useTranslation();
  const [aboutData, setAboutData] = useState("");

  useEffect(() => {
    const fetchAboutUs = async () => {
      try {
        const res = await axios.get('https://tabybak.com/api/provider/v1/about-us', {
          headers: { 'Accept-Language': 'ar' } // أو 'en' حسب اللغة
        });
        if (res.data.status) {
          setAboutData(res.data.data?.content || "");
        }
      } catch (error) {
        console.error("Failed to fetch About Us:", error);
      }
    };

    fetchAboutUs();
  }, []);

  return (
    <div className="container">
      <div className="row align-items-center">

        {/* Images */}
        <div className="col-lg-6 mb-30">
          <div className="about-thumb-area">
            <ul>
              <li><img className="about-thumb1" src={AboutTopLeft} alt="about" /></li>
              <li><img className="about-thumb2" src={AboutTopRight} alt="about" /></li>
              <li><img className="about-thumb3" src={AboutBottomLeft} alt="about" /></li>
              <li>
                <div className="exp-bx">
                  20
                  <span>{t("experience")}</span>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Content */}
        <div className="col-lg-6 mb-30">
          <div className="heading-bx">
            <h6 className="title-ext text_secondary">{t("titleSmall")}</h6>
            <h2 className="title_about1">{t("titleAbout")}</h2>
            <p className="title_about2">{aboutData || t("description")}</p>
          </div>

          <div className="row">
            {[SharpeImgOne, SharpeImgTwo, SharpeImgThree, SharpeImgFour].map((img, idx) => (
              <div className="col-lg-6 col-sm-6 mb-30 style_mr" key={idx}>
                <div className={`feature-container feature-bx1 feature${idx+1}`}>
                  <div className="icon-md">
                    <span className="icon-cell">
                      <img src={img} alt={`feature${idx+1}`} />
                    </span>
                  </div>
                  <div className="icon-content">
                    <h4 className="ttr-title">
                      {idx === 0 ? t("emergency") :
                       idx === 1 ? t("doctors") :
                       idx === 2 ? t("professionals") :
                       t("treatment")}
                    </h4>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Link className="btn shadow" to="/services">{t("readMore")}</Link>
        </div>

      </div>
    </div>
  );
};

export default AboutUs;
