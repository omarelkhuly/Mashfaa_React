// src/components/Nav/Navbar.js
import React, { useState, useEffect } from 'react';
import { useTheme } from "../../Data/ThemeContext";
import { Navbar, Container, NavDropdown, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronRight, faMoon, faSun, faGlobe, faUser, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import { Link, useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Logo from '../../assets/logo.png';
import SearchBar from '../ModealSearch/ModealSearch';
import './Nav.css';

const ContainerNav = ({ serviceType, blogType }) => {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";
  const navigate = useNavigate();

  const [showPages, setShowPages] = useState(false);
  const [showServices, setShowServices] = useState(false);
  const [showBlog, setShowBlog] = useState(false);
  const { darkMode, setDarkMode } = useTheme();

  // حالة تسجيل الدخول
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));

  // تطبيق الوضع الليلي أو النهاري
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add("dark-theme");
      document.body.classList.remove("light-theme");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-theme");
      document.body.classList.add("light-theme");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  // تبديل اللغة و RTL/LTR
  const toggleLang = () => {
    const newLang = i18n.language === "en" ? "ar" : "en";
    i18n.changeLanguage(newLang);
    localStorage.setItem("lang", newLang);
    document.documentElement.dir = newLang === "ar" ? "rtl" : "ltr";
  };

  // الاستماع لحدث تسجيل الدخول لتحديث Navbar
  useEffect(() => {
    const handleLoginEvent = () => setIsLoggedIn(true);
    window.addEventListener("userLogin", handleLoginEvent);
    return () => window.removeEventListener("userLogin", handleLoginEvent);
  }, []);

  // تسجيل الخروج
  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/home");
  };

  return (
    <Navbar expand="lg" className={isRTL ? "rtl-nav" : "ltr-nav"}>
      <Container className="nav-container">

        {/* LOGO */}
        <Navbar.Brand>
          <Link to="/home">
            <img className="logo_image" src={Logo} alt="Logo" />
          </Link>
        </Navbar.Brand>

        {/* أيقونات الموبايل */}
        <div className="mobile-icons">
          <button className="mobile_icon" onClick={() => setDarkMode(!darkMode)}>
            <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
          </button>
          <button className="mobile_icon" onClick={toggleLang}>
            <FontAwesomeIcon icon={faGlobe} />
          </button>
          <button className="mobile_icon" onClick={isLoggedIn ? handleLogout : () => navigate("/Login")}>
            <FontAwesomeIcon icon={isLoggedIn ? faRightFromBracket : faUser} />
          </button>
        </div>  

        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <div className="menu-icon"><span></span><span></span><span></span></div>
        </Navbar.Toggle>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className={`align-items-center ${isRTL ? "ms-auto text-end" : "me-auto text-start"}`}>
            <Link to="/home" className="nav-link">{t("home")}</Link>

            {/* PAGES */}
            <NavDropdown title={t("pages")} show={showPages} onMouseEnter={() => setShowPages(true)} onMouseLeave={() => setShowPages(false)}>
              <NavDropdown.Item as={Link} to="/About">{t("about")}</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/Team">{t("team")}</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/FAQ">FAQ</NavDropdown.Item>
              <NavDropdown.Item as={Link} to="/Reservation">{t("booking")}</NavDropdown.Item>
            </NavDropdown>

            {/* SERVICES */}
            <NavDropdown title={t("services")} show={showServices} onMouseEnter={() => setShowServices(true)} onMouseLeave={() => setShowServices(false)}>
              <NavDropdown.Item as={Link} to="/Services">{t("services")}</NavDropdown.Item>
              <NavDropdown.Item as={Link} to={`/servicesDetails/${serviceType || 'default'}`}>{t("services")} Details</NavDropdown.Item>
            </NavDropdown>

            {/* BLOGS */}
            <NavDropdown title={t("blogs")} show={showBlog} onMouseEnter={() => setShowBlog(true)} onMouseLeave={() => setShowBlog(false)}>
              <NavDropdown.Item as={Link} to="/Blog">{t("blogs")}</NavDropdown.Item>
              <NavDropdown.Item as={Link} to={`/BlogsDetails/${blogType || 'default'}`}>{t("blogs")} Details</NavDropdown.Item>
            </NavDropdown>

            <button className="icon-btn" onClick={() => setDarkMode(!darkMode)}>
              <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
            </button>

            <button className="icon-btn" onClick={toggleLang}>
              <FontAwesomeIcon icon={faGlobe} />
            </button>

            <button className="icon-btn" onClick={isLoggedIn ? handleLogout : () => navigate("/Login")}>
              <FontAwesomeIcon icon={isLoggedIn ? faRightFromBracket : faUser} />
            </button>

            <Link to="/Contact" className="btn nav-link">{t("contact")}</Link>
            <SearchBar />
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default ContainerNav;
