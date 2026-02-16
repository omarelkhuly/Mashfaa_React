import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import { useLocation, Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import "./Banner.css";

const Banner = ({ serviceType, blogType, doctorName }) => {
  const location = useLocation();
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  // تحديد اسم الصفحة حسب المسار
  const getPageName = () => {
    if (serviceType) return serviceType;
    if (blogType) return blogType;
    if (doctorName) return doctorName;

    switch (location.pathname) {
      case "/About":
        return t("about");
      case "/Team":
        return t("team");
      case "/FAQ":
        return t("faq");
      case "/Reservation":
        return t("booking");
      case "/Error":
        return "404";
      case "/Services":
        return t("services");
      case "/Blog":
        return t("blogs");
      case "/Contact":
        return t("contact");
      case "/DetailsPage":
        return t("booking");
      default:
        return "";
    }
  };

  return (
    <div className="container">
      <div
        className={`page-banner-entry text-center page_banner_entry ${
          lang === "ar" ? "rtl" : ""
        }`}
      >
        <h1 className="banner_text">{getPageName()}</h1>

        <nav aria-label="breadcrumb" className="breadcrumb-row breadcrumb_row">
          <ul className="breadcrumb">
            <li className="breadcrumb_item">
              <Link to="/Home">
                <FontAwesomeIcon className="banner_icon" icon={faHome} />
                <span>{t("home")}</span>
              </Link>
            </li>

            <li className="breadcrumb_item active" aria-current="page">
              <span>{getPageName()}</span>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default Banner;
