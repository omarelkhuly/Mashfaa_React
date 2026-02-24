// src/components/Nav/Navbar.js
// src/components/Nav/Navbar.js
import React, { useState, useEffect } from 'react';
import { useTheme } from "../../Data/ThemeContext";
import { Navbar, Container, NavDropdown, Nav } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronRight,
  faMoon,
  faSun,
  faGlobe,
  faUser,
  faRightFromBracket,
  faIdCard,
  faUserCog,
  faSignOutAlt,
  faBars
} from '@fortawesome/free-solid-svg-icons';
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

  // الاستماع لحدث تغيير حالة المصادقة (Auth Change)
  useEffect(() => {
    const handleAuthChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    window.addEventListener("authChange", handleAuthChange);
    setIsLoggedIn(!!localStorage.getItem("token"));

    return () => window.removeEventListener("authChange", handleAuthChange);
  }, []);

  // تسجيل الخروج
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("isLoggedIn");
    setIsLoggedIn(false);
    navigate("/home");
    window.dispatchEvent(new Event("authChange"));
  };

  function CustomNavbar() {
    const [expanded, setExpanded] = useState(false);

    return (
      <Navbar expand="lg" expanded={expanded} className={isRTL ? "rtl-nav" : "ltr-nav"}>
        <Container className="nav-container">

          {/* LOGO */}
          <Navbar.Brand className="logo_style_nav">
            <Link onClick={() => setExpanded(false)} to="/home">
              <img className="logo_image" src={Logo} alt="Logo" />
            </Link>
          </Navbar.Brand>

          {/* ================= أيقونات الموبايل ================= */}
          <div className="mobile-icons">
            {/* الوضع الليلي */}
            <button className="mobile_icon" onClick={() => setDarkMode(!darkMode)}>
              <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
            </button>

            {/* اللغة */}
            <button className="mobile_icon" onClick={toggleLang}>
              <FontAwesomeIcon icon={faGlobe} />
            </button>

            {/* الملف الشخصي / تسجيل الدخول */}
            {isLoggedIn ? (
              <NavDropdown
                title={<FontAwesomeIcon icon={faUser} />}
                id="mobile-profile-dropdown"
                align="end"
                className="mobile-profile-dropdown"
              >
                <NavDropdown.Item as={Link} onClick={() => setExpanded(false)} to="/profile">
                  <FontAwesomeIcon icon={faIdCard} className="me-2" />
                  {t("profile")}
                </NavDropdown.Item>
                <NavDropdown.Item as={Link} onClick={() => setExpanded(false)} to="/account">
                  <FontAwesomeIcon icon={faUserCog} className="me-2" />
                  {t("account")}
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item onClick={handleLogout}>
                  <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                  {t("logout")}
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <button className="mobile_icon" onClick={() => navigate("/Login")}>
                <FontAwesomeIcon icon={faUser} />
              </button>
            )}
          </div>

          {/* قائمة الموبايل */}
          <Navbar.Toggle aria-controls="basic-navbar-nav" 
          className="mobile-toggle" onClick={() => setExpanded(expanded ? false : "expanded")}>
            <div className="menu-icon"><span></span><span></span><span></span></div>
          </Navbar.Toggle>

          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className={`align-items-center ${isRTL ? "ms-auto text-end" : "me-auto text-start"}`}>

              {/* الصفحة الرئيسية */}
              <Link onClick={() => setExpanded(false)} to="/home" className="nav-link">{t("home")}</Link>

              {/* PAGES */}
              <NavDropdown
                title={t("pages")}
                show={showPages}
                onMouseEnter={() => setShowPages(true)}
                onMouseLeave={() => setShowPages(false)}
                onClick={() => setShowPages(!showPages)} // للـ mobile
              >
                <NavDropdown.Item as={Link} onClick={() => setExpanded(false)} to="/About">{t("about")}</NavDropdown.Item>
                <NavDropdown.Item as={Link} onClick={() => setExpanded(false)} to="/Team">{t("team")}</NavDropdown.Item>
                <NavDropdown.Item as={Link} onClick={() => setExpanded(false)} to="/FAQ">FAQ</NavDropdown.Item>
              </NavDropdown>

              {/* SERVICES */}
              <NavDropdown
                title={t("services")}
                show={showServices}
                onMouseEnter={() => setShowServices(true)}
                onMouseLeave={() => setShowServices(false)}
                onClick={() => setShowServices(!showServices)} // للـ mobile
              >
                <NavDropdown.Item as={Link} onClick={() => setExpanded(false)} to="/Services">{t("services")}</NavDropdown.Item>
                <NavDropdown.Item as={Link} onClick={() => setExpanded(false)} to={`/servicesDetails/${serviceType || 'default'}`}>{t("services")} Details</NavDropdown.Item>
              </NavDropdown>

              {/* booking */}
              <Link onClick={() => setExpanded(false)} to="/Reservation" className="nav-link">{t("booking")}</Link>

              {/* BLOGS */}
              <NavDropdown
                title={t("blogs")}
                show={showBlog}
                onMouseEnter={() => setShowBlog(true)}
                onMouseLeave={() => setShowBlog(false)}
                onClick={() => setShowBlog(!showBlog)} // للـ mobile
              >
                <NavDropdown.Item as={Link} onClick={() => setExpanded(false)} to="/Blog">{t("blogs")}</NavDropdown.Item>
                <NavDropdown.Item as={Link} onClick={() => setExpanded(false)} to={`/BlogsDetails/${blogType || 'default'}`}>{t("blogs")} Details</NavDropdown.Item>
              </NavDropdown>

              {/* الأزرار الثابتة */}
              <button className="icon-btn" onClick={() => setDarkMode(!darkMode)}>
                <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
              </button>

              <button className="icon-btn" onClick={toggleLang}>
                <FontAwesomeIcon icon={faGlobe} />
              </button>

              {/* القائمة المنسدلة للملف الشخصي (Desktop) */}
              {isLoggedIn ? (
                <NavDropdown
                  // <FontAwesomeIcon icon={faUser} size="lg" />
                  title={<> <span className="ms-1">{t("profile")}</span></>}
                  id="profile-dropdown"
                  align={isRTL ? "start" : "end"}
                  className="profile-dropdown d-none d-lg-block"
                >
                  <NavDropdown.Item as={Link} onClick={() => setExpanded(false)} to="/profile">
                    <FontAwesomeIcon icon={faIdCard} className="me-2" />
                    {t("profile")}
                  </NavDropdown.Item>
                  <NavDropdown.Item as={Link} onClick={() => setExpanded(false)} to="/account">
                    <FontAwesomeIcon icon={faUserCog} className="me-2" />
                    {t("account")}
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={handleLogout}>
                    <FontAwesomeIcon icon={faSignOutAlt} className="me-2" />
                    {t("logout")}
                  </NavDropdown.Item>
                </NavDropdown>
              ) : (
                <Link onClick={() => setExpanded(false)} to="/Login" className="btn nav-link login-btn d-none d-lg-block">{t("login")}</Link>
              )}

              <Link onClick={() => setExpanded(false)} to="/Contact" className="btn nav-link">{t("contact")}</Link>
              <SearchBar />
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    );
  }
    return <CustomNavbar />;
  };

  export default ContainerNav;
