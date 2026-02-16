// src/pages/Login.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { loginApi } from "../api/auth";
import { useTranslation } from "react-i18next";
import LoginImg from '../assets/frontImg.jpg';
import "./Auth.css";

const Login = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert(t("loginRequired"));
      return;
    }

    try {
      const res = await loginApi({ email, password });
      const token = res?.data?.token || "mock-token";
      localStorage.setItem("token", token);

      window.dispatchEvent(new CustomEvent("userLogin"));
      alert(t("loginSuccess"));
      navigate("/home");
    } catch (error) {
      alert(t("loginFail"));
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="container">
        <div className="cover">
          <div className="front">
            <img src={LoginImg} alt="" />
            <div className="text">
              <span className="text-1">{t("welcomeBack")}</span>
              <span className="text-2">{t("loginNow")}</span>
            </div>
          </div>
        </div>

        <div className="forms">
          <div className="form-content">
            <div className="login-form">
              <div className="title">{t("loginTitle")}</div>

              <form onSubmit={handleLogin}>
                <div className="input-boxes">
                  <div className="input-box">
                    <i className="fas fa-envelope"></i>
                    <input
                      type="email"
                      placeholder={t("email")}
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>

                  <div className="input-box">
                    <i className="fas fa-lock"></i>
                    <input
                      type="password"
                      placeholder={t("password")}
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                  </div>

                  <div className="button input-box">
                    <input type="submit" value={t("loginButton")} />
                  </div>

                  <div className="text sign-up-text">
                    {t("noAccount")}{" "}
                    <span onClick={() => navigate("/register")}>
                      {t("createAccount")}
                    </span>
                  </div>
                </div>
              </form>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
