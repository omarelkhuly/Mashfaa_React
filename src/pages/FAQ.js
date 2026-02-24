// src/pages/FAQ.js
import React, { useEffect, useState } from "react";
import Banner from "../components/Banner/Banner";
import { getFaqApi } from "../api/faq";
import { faqStatic } from "../Data/faqStatic";
import { useTranslation } from "react-i18next";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import backgroundFaq from '../assets/backgrond_FAQ.jpg';
import "./FAQ.css";

const FAQ = () => {
  const { t, i18n } = useTranslation();
  const [faq, setFaq] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeIndex, setActiveIndex] = useState(null);

  const isLoggedIn = !!localStorage.getItem("token");
  const lang = i18n.language;

  useEffect(() => {
    const loadFaq = async () => {
      try {
        if (isLoggedIn) {
          const res = await getFaqApi();
          setFaq(res?.data?.data || []);
        } else {
          setFaq(faqStatic[lang]);
        }
      } catch (error) {
        setFaq(faqStatic[lang]);
      } finally {
        setLoading(false);
      }
    };

    loadFaq();
  }, [isLoggedIn, lang]);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <>
      <Banner />

      <section className="section-area section-sp2 faq-section"
        style={{
          backgroundImage: `url(${backgroundFaq})`
        }}
      >
        <div className="faq-overlay">
          <div className="container">

            <h2 className="mb-4 white">{t("faq")}</h2>

            {loading && <p>{t("loading")}</p>}

            {!loading &&
              faq.map((item, index) => (
                <div
                  key={index}
                  className={`faq-item ${activeIndex === index ? "active" : ""}`}
                >
                  <div
                    className="faq-question"
                    onClick={() => toggleFAQ(index)}
                  >
                    <h5>{item.question}</h5>

                    <span
                      className={`faq-icon ${activeIndex === index ? "rotate" : ""
                        }`}
                    >
                      <FontAwesomeIcon icon={faPlus} />
                    </span>
                  </div>

                  <div
                    className={`faq-answer ${activeIndex === index ? "show" : ""
                      }`}
                  >
                    <div className="faq-content">
                      <p>{item.answer}</p>
                    </div>
                  </div>
                </div>
              ))}

          </div>
        </div>
      </section >
    </>
  );
};

export default FAQ;
