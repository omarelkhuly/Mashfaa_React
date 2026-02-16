import React from 'react';
import './Contact.css';
import Banner from '../components/Banner/Banner';
import ContactForm from '../components/ContactForm/ContactForm';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useTranslation } from "react-i18next";

import { 
  faMap, 
  faIdBadge, 
  faGlobe,
  faPhone,
  faEnvelope,
  faLocationDot
} from '@fortawesome/free-solid-svg-icons';

import { 
  faTwitter, 
  faInstagram, 
  faLinkedinIn  
} from '@fortawesome/free-brands-svg-icons';

const Contact = () => {
  const { t } = useTranslation();

  return (
    <>
      <Banner />

      <section id="contact-full">
        <h3>{t("contactTitle")}</h3>

        <div className="row">
          <div className="col-lg-6 mb-30">
            <ContactForm />
          </div>

          <div className="col-lg-6 mb-30">
            <div className="contact-info contact_info ovpr-dark">
              <div className="info-inner info_inner">
                <h4 className="title mb-30">
                  {t("contactInfoTitle")}
                </h4>

                <div className="icon-box">
                  <h6 className="title">
                    <FontAwesomeIcon icon={faMap} />
                    {t("location")}
                  </h6>
                  <p>
                    2005 Stokes Isle Apt. 896, Venaville 10010, USA
                  </p>
                </div>

                <div className="icon-box">
                  <h6 className="title">
                    <FontAwesomeIcon icon={faIdBadge} />
                    {t("emailPhone")}
                  </h6>
                  <a 
                    href="mailto:silvertriangle11@gmail.com"
                    className="text-white"
                  >
                    silvertriangle11@gmail.com
                  </a>
                  <p>(+68) 120034509</p>
                </div>

                <div className="icon-box">
                  <h6 className="title">
                    <FontAwesomeIcon icon={faGlobe} />
                    {t("followUs")}
                  </h6>

                  <ul className="social-media social_media">
                    <li>
                      <a 
                        href="https://twitter.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FontAwesomeIcon icon={faTwitter} />
                      </a>
                    </li>

                    <li>
                      <a 
                        href="https://www.linkedin.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FontAwesomeIcon icon={faLinkedinIn} />
                      </a>
                    </li>

                    <li>
                      <a 
                        href="https://www.instagram.com/"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FontAwesomeIcon icon={faInstagram} />
                      </a>
                    </li>
                  </ul>
                </div>

              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-area section-sp1">
        <div className="container">
          <div className="row">

            {/* Contact Number */}
            <div className="col-lg-4 col-md-6 mb-30">
              <div className="feature-container feature-bx4 feature4">
                <div className="icon-md feature-icon">
                  <FontAwesomeIcon className="iconclass" icon={faPhone} />
                </div>

                <div className="icon-content">
                  <h5 className="ttr-title">
                    {t("contactNumber")}
                  </h5>
                  <p>+001 123 456</p>
                  <p>+002 3424 44 00</p>
                </div>
              </div>
            </div>

            {/* Email Address */}
            <div className="col-lg-4 col-md-6 mb-30">
              <div className="feature-container feature-bx4 feature3">
                <div className="icon-md feature-icon">
                  <FontAwesomeIcon className="iconclass" icon={faEnvelope} />
                </div>

                <div className="icon-content">
                  <h5 className="ttr-title">
                    {t("emailAddress")}
                  </h5>
                  <p>info@yourdomain.com</p>
                  <p>example@support.com</p>
                </div>
              </div>
            </div>

            {/* Address */}
            <div className="col-lg-4 col-md-6 mb-30">
              <div className="feature-container feature-bx4 feature2">
                <div className="icon-md feature-icon">
                  <FontAwesomeIcon className="iconclass" icon={faLocationDot} />
                </div>

                <div className="icon-content">
                  <h5 className="ttr-title">
                    {t("address")}
                  </h5>
                  <p>
                    2005 Stokes Isle Apt. 896, Venaville 10010, USA
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
};

export default Contact;
