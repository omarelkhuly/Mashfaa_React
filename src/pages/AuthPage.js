// src/pages/AuthPage.js
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faUser,
  faPhone,
  faArrowRight,
  faGlobe,
  faCity,
} from "@fortawesome/free-solid-svg-icons";
import { loginApi, registerApi } from "../api/auth";
import axios from "axios";
import LoginImg from "../assets/frontImg.jpeg";
import RegisterImg from "../assets/backImg.png";
import "./Auth.css";

const AuthPage = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const location = useLocation();
  const isRTL = i18n.language === "ar";

  const [mode, setMode] = useState("login");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [registerData, setRegisterData] = useState({
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
    phone: "",
    country_id: "",
    city_id: "",
    provider_type: "clinic",
  });

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);

  /* ================= URL MODE ================= */
  useEffect(() => {
    if (location.pathname === "/register") {
      setMode("register");
    } else {
      setMode("login");
    }
  }, [location.pathname]);

  /* ================= RTL ================= */
  useEffect(() => {
    document.documentElement.dir = isRTL ? "rtl" : "ltr";
  }, [isRTL]);

  /* ================= Fetch Countries ================= */
  useEffect(() => {
    axios
      .get("https://tabybak.com/api/provider/v1/countries/")
      .then((res) => {
        if (res.data.status) setCountries(res.data.data);
      });
  }, []);

  /* ================= Fetch Cities ================= */
  useEffect(() => {
    if (!registerData.country_id) return;

    axios
      .get(
        `https://tabybak.com/api/provider/v1/cities/${registerData.country_id}`
      )
      .then((res) => {
        if (res.data.status) setCities(res.data.data);
      });
  }, [registerData.country_id]);

  /* ================= LOGIN ================= */
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await loginApi(loginData);
      const token = res?.data?.token;

      if (token) {
        localStorage.setItem("token", token);
        localStorage.setItem("isLoggedIn", "true");
        window.dispatchEvent(new Event("authChange"));
        setSuccessMessage("Login Successful ✅");

        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    } catch {
      alert(t("loginFail"));
    }

    setLoading(false);
  };

  /* ================= REGISTER ================= */
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (registerData.password !== registerData.password_confirmation) {
      alert(t("passwordMismatch"));
      setLoading(false);
      return;
    }

    try {
      const formData = new FormData();
      Object.entries(registerData).forEach(([k, v]) =>
        formData.append(k, v)
      );

      const res = await registerApi(formData);

      if (res.data.status) {
        setSuccessMessage("Account Created Successfully 🎉");
        setTimeout(() => {
          navigate("/login");
        }, 1500);
      }
    } catch {
      alert(t("registerFail"));
    }

    setLoading(false);
  };

  return (
    <div className="auth-wrapper icon_auth">
      <div className={`auth-card ${mode === "register" ? "flip" : ""}`}>

        {/* LOGIN */}
        <div className="auth-face auth-front">
          <div className="form-side">
            <form onSubmit={handleLogin}>
              <h2 className="addres_color">{t("loginTitle")}</h2>

              <Input
                icon={faEnvelope}
                type="email"
                placeholder={t("email")}
                onChange={(e) =>
                  setLoginData({ ...loginData, email: e.target.value })
                }
              />

              <Input
                icon={faLock}
                type="password"
                placeholder={t("password")}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
              />

              <button className="primary-btn">
                {loading ? "..." : t("loginButton")}
              </button>

              <p className="switch-text">
                {t("noAccount")}{" "}
                <span onClick={() => navigate("/register")}>
                  {t("createAccount")}{" "}
                  <FontAwesomeIcon icon={faArrowRight} />
                </span>
              </p>
            </form>
          </div>

          <div className="image-side">
            <img src={LoginImg} alt="login" />
          </div>
        </div>

        {/* REGISTER */}
        <div className="auth-face auth-back">
          <div className="image-side">
            <img src={RegisterImg} alt="register" />
          </div>

          <div className="form-side">
            <form onSubmit={handleRegister}>
              <h2>{t("registerTitle")}</h2>

              <Input
                icon={faUser}
                placeholder={t("name")}
                onChange={(e) =>
                  setRegisterData({ ...registerData, name: e.target.value })
                }
              />

              <Input
                icon={faEnvelope}
                type="email"
                placeholder={t("email")}
                onChange={(e) =>
                  setRegisterData({ ...registerData, email: e.target.value })
                }
              />

              <Input
                icon={faPhone}
                placeholder={t("phone")}
                onChange={(e) =>
                  setRegisterData({ ...registerData, phone: e.target.value })
                }
              />

              {/* Country */}
              <Select
                icon={faGlobe}
                value={registerData.country_id}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    country_id: e.target.value,
                    city_id: "",
                  })
                }
              >
                <option value="">{t("selectCountry")}</option>
                {countries.map((c) => (
                  <option key={c.id} value={c.id}>
                    {i18n.language === "ar" ? c.name_ar || c.name : c.name}
                  </option>
                ))}
              </Select>

              {/* City */}
              <Select
                icon={faCity}
                value={registerData.city_id}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    city_id: e.target.value,
                  })
                }
              >
                <option value="">{t("selectCity")}</option>
                {cities.map((c) => (
                  <option key={c.id} value={c.id}>
                    {i18n.language === "ar" ? c.name_ar || c.name : c.name}
                  </option>
                ))}
              </Select>


              <Input
                icon={faLock}
                type="password"
                placeholder={t("password")}
                onChange={(e) =>
                  setRegisterData({ ...registerData, password: e.target.value })
                }
              />

              <Input
                icon={faLock}
                type="password"
                placeholder={t("confirmPassword")}
                onChange={(e) =>
                  setRegisterData({
                    ...registerData,
                    password_confirmation: e.target.value,
                  })
                }
              />

              <button className="primary-btn">
                {loading ? "..." : t("registerButton")}
              </button>

              <p className="switch-text">
                {t("haveAccount")}{" "}
                <span onClick={() => navigate("/login")}>
                  {t("loginTitle")}
                </span>
              </p>
            </form>
          </div>
        </div>
      </div>

      {successMessage && (
        <div className="success-alert">
          {successMessage}
        </div>
      )}
    </div>
  );
};

/* INPUT */
const Input = ({ icon, ...props }) => (
  <div className="input-group">
    <FontAwesomeIcon icon={icon} className="input-icon" />
    <input {...props} required />
  </div>
);

/* SELECT */
const Select = ({ icon, children, ...props }) => (
  <div className="input-group">
    <FontAwesomeIcon icon={icon} className="input-icon" />
    <select {...props} required>
      {children}
    </select>
  </div>
);

export default AuthPage;
