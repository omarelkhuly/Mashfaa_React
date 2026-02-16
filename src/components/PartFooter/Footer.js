import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useTranslation } from "react-i18next";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
    faFacebookF,
    faTwitter,
    faInstagram,
    faLinkedinIn
} from '@fortawesome/free-brands-svg-icons';
import { faPhone } from '@fortawesome/free-solid-svg-icons';

import Logo from '../../assets/logo.png';
import './footer.css';

const ContainerFooter = () => {
    const navigate = useNavigate();
    const { t } = useTranslation();

    const handleBlogClick = (blogType) => {
        navigate(`/BlogsDetails/${blogType}`);
    };

    return (
        <footer>
            <div className='container'>
                <div className='row'>

                    {/* Logo & Info */}
                    <div className='col-xl-3 col-lg-3 col-md-6'>
                        <div className="widget widget_info">
                            <div className="footer_logo">
                                <Link to="/Home">
                                    <img src={Logo} alt='LOGO' />
                                </Link>
                            </div>

                            <div className="ft_contact">
                                <p className='p_foo'>
                                    {t("footerDesc")}
                                </p>

                                <div className="contact_bx">
                                    <div className="icone_footer">
                                        <FontAwesomeIcon icon={faPhone} className="icon_footer" />
                                    </div>
                                    <div className="contact-number">
                                        <span>{t("contactUs")}</span>
                                        <h4 className="number">+01 123 456 7890</h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className='col-xl-3 col-lg-3 col-6'>
                        <div className="widget footer_widget ml-50">
                            <h3 className="footer_title">{t("quickLinks")}</h3>
                            <ul>
                                <li><Link to="/about">{t("about")}</Link></li>
                                <li><Link to="/Services">{t("services")}</Link></li>
                                <li><Link to="/Reservation">{t("booking")}</Link></li>
                                <li><Link to="/FAQ">{t("faq")}</Link></li>
                                <li><Link to="/Blog">{t("blogs")}</Link></li>
                                <li><Link to="/Team">{t("ourTeam")}</Link></li>
                            </ul>
                        </div>
                    </div>

                    {/* Services */}
                    <div className='col-xl-3 col-lg-3 col-6'>
                        <div className="widget footer_widget">
                            <h3 className="footer_title">{t("ourServices")}</h3>
                            <ul>
                                <li>
                                    <button className='btn'  onClick={() => handleBlogClick('Dental Care')}>
                                        {t("serviceDental")}
                                    </button>
                                </li>
                                <li>
                                    <button className='btn'  onClick={() => handleBlogClick('Special Surgeon')}>
                                        {t("serviceSurgeon")}
                                    </button>
                                </li>
                                <li>
                                    <button className='btn'  onClick={() => handleBlogClick('Skin Surgeon')}>
                                        {t("serviceSkin")}
                                    </button>
                                </li>
                                <li>
                                    <button className='btn'  onClick={() => handleBlogClick('Understand Health')}>
                                        {t("serviceHealth")}
                                    </button>
                                </li>
                                <li>
                                    <button className='btn'  onClick={() => handleBlogClick('Dentist Regularly')}>
                                        {t("serviceDentist")}
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Subscribe */}
                    <div className='col-xl-3 col-lg-3 col-md-6'>
                        <div className="widget widget_form">
                            <h3 className="footer_title">{t("subscribe")}</h3>

                            <form className="subscribe-form">
                                <div className="input-group">
                                    <input
                                        type="email"
                                        className="form-control"
                                        placeholder={t("emailAddress")}
                                        required
                                    />
                                </div>

                                <button type="submit" className="btn btn_new1 shadow w-100">
                                    {t("subscribeNow")}
                                </button>
                            </form>

                            <div className="footer-social-link">
                                <ul>
                                    <li><a className='link_icon_color' href="https://facebook.com" target="_blank" rel="noreferrer">
                                        <FontAwesomeIcon icon={faFacebookF} />
                                    </a></li>
                                    <li><a className='link_icon_color' href="https://twitter.com" target="_blank" rel="noreferrer">
                                        <FontAwesomeIcon icon={faTwitter} />
                                    </a></li>
                                    <li><a className='link_icon_color' href="https://instagram.com" target="_blank" rel="noreferrer">
                                        <FontAwesomeIcon icon={faInstagram} />
                                    </a></li>
                                    <li><a className='link_icon_color' href="https://linkedin.com" target="_blank" rel="noreferrer">
                                        <FontAwesomeIcon icon={faLinkedinIn} />
                                    </a></li>
                                </ul>
                            </div>

                        </div>
                    </div>

                </div>
            </div>
        </footer>
    );
};

export default ContainerFooter;
