// FAQ.js
import React, { useEffect, useState } from "react";
import Banner from "../components/Banner/Banner";
import { getFaqApi } from "../api/faq";
import { faqStatic } from "../Data/faqStatic";
import { useTranslation } from "react-i18next";

const FAQ = () => {
  const { t, i18n } = useTranslation();
  const [faq, setFaq] = useState([]);
  const [loading, setLoading] = useState(true);

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
        console.error(error);
        setFaq(faqStatic[lang]);
      } finally {   
        setLoading(false);
      }
    };

    loadFaq();
  }, [isLoggedIn, lang]);

  return (
    <>
      <Banner />

      <section className="section-area section-sp2">
        <div className="container">

          <h2 className="mb-4">{t("faq")}</h2>

          {loading && <p>{t("loading")}</p>}

          {!loading && faq.length === 0 && (
            <p>{t("noFaq")}</p>
          )}

          {!loading &&
            faq.map((item, index) => (
              <div key={index} className="mb-4">
                <h5>{item.question}</h5>
                <p>{item.answer}</p>
              </div>
            ))}

        </div>
      </section>
    </>
  );
};

export default FAQ;
