// src/pages/AuthPage.js
import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useNavigate, useLocation } from "react-router-dom";
import { successAlert, errorAlert } from "../alerts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEnvelope,
  faLock,
  faUser,
  faPhone,
  faArrowRight,
  faGlobe,
  faCity,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";
import {
  loginApi,
  registerApi,
  forgetPasswordApi,
  resetPasswordApi,
} from "../api/auth";
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
  const [emailForReset, setEmailForReset] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

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
        if (res.data.status) {
          const countriesData = Array.isArray(res.data.data)
            ? res.data.data
            : res.data.data?.data || [];

          setCountries(countriesData);
        }
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
        if (res.data.status) {
          const citiesData = Array.isArray(res.data.data)
            ? res.data.data
            : res.data.data?.data || [];

          setCities(citiesData);
        }
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
        successAlert(t("loginSuccess") || "Login Successful ✅");

        setTimeout(() => {
          navigate("/");
        }, 1500);
      }
    } catch (err) {
      errorAlert(t("loginFail") || "Login Failed ❌");
    }

    setLoading(false);
  };

  /* ================= REGISTER ================= */
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (registerData.password !== registerData.password_confirmation) {
      errorAlert(t("passwordMismatch") || "Passwords do not match ❌");
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
        const token = res?.data?.token || res?.data?.data?.token;

        if (token) {
          localStorage.setItem("token", token);
          localStorage.setItem("isLoggedIn", "true");
          window.dispatchEvent(new Event("authChange"));
        }

        successAlert("Account Created Successfully 🎉");

        setTimeout(() => {
          navigate("/dashboard");
        }, 1000);
      }

    } catch (err) {
      errorAlert(t("registerFail") || "Registration Failed ❌");
    }

    setLoading(false);
  };

  /* ================= FORGET PASSWORD ================= */
  const handleForgetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await forgetPasswordApi(emailForReset);

      if (res.data.status) {
        successAlert("Pin Code Sent To Your Email ✅");
        setMode("reset");
      }
    } catch (err) {
      errorAlert(t("failedToSendPinCode") || "Failed to send Pin Code ❌");
    }

    setLoading(false);
  };

  /* ================= RESET PASSWORD ================= */
  const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await resetPasswordApi({
        email: emailForReset,
        pin_code: pinCode,
        password: newPassword,
        password_confirmation: newPassword,
      });

      if (res.data.status) {
        successAlert("Password Reset Successfully 🎉");
        setMode("login");
      }
    } catch (err) {
      errorAlert(t("resetPasswordFailed") || "Reset Failed ❌");
    }

    setLoading(false);
  };

  return (
    <div className="auth-wrapper icon_auth">
      <div className={`auth-card ${mode === "register" ? "flip" : ""}`}>
        {/* LOGIN */}
        <div className="auth-face auth-front">
          <div className="form-side">
            {mode === "login" && (
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
                <a
                  href="#"
                  className="switch-text"
                  onClick={(e) => {
                    e.preventDefault();
                    setMode("forget");
                  }}
                >
                  {t("forgetPassword")}
                </a>

                <p className="switch-text">
                  {t("noAccount")}{" "}
                  <span onClick={() => navigate("/register")}>
                    {t("createAccount")}{" "}
                    <FontAwesomeIcon icon={faArrowRight} />
                  </span>
                </p>
              </form>
            )}
            {mode === "forget" && (
              <form onSubmit={handleForgetPassword}>
                <h2>{t("forgetPassword")}</h2>

                <Input
                  icon={faEnvelope}
                  type="email"
                  placeholder={t("email")}
                  onChange={(e) => setEmailForReset(e.target.value)}
                />

                <button className="primary-btn">
                  {loading ? "..." : t("sendCode")}
                </button>

                <a
                  href="#"
                  className="switch-text"
                  onClick={(e) => {
                    e.preventDefault();
                    setMode("login");
                  }}
                >
                  {t("backToLogin")}
                </a>
              </form>
            )}
            {mode === "reset" && (
              <form onSubmit={handleResetPassword}>
                <h2>Reset Password</h2>

                <Input
                  icon={faLock}
                  placeholder="Pin Code"
                  onChange={(e) => setPinCode(e.target.value)}
                />

                <Input
                  icon={faLock}
                  type="password"
                  placeholder="New Password"
                  onChange={(e) => setNewPassword(e.target.value)}
                />

                <button className="primary-btn">
                  {loading ? "..." : "Reset Password"}
                </button>
              </form>
            )}
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
    </div>
  );
};

/* INPUT */
const Input = ({ icon, type = "text", ...props }) => {
  const [showPassword, setShowPassword] = useState(false);

  const isPassword = type === "password";

  return (
    <div className="input-group" style={{ position: "relative" }}>
      <FontAwesomeIcon icon={icon} className="input-icon" />

      <input
        {...props}
        type={isPassword ? (showPassword ? "text" : "password") : type}
        required
      />

      {isPassword && (
        <FontAwesomeIcon
          icon={showPassword ? faEyeSlash : faEye}
          onClick={() => setShowPassword(!showPassword)}
          className="password_toggle"
        />
      )}
    </div>
  );
};

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