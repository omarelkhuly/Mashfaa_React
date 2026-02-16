// src/pages/Rigister.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { registerApi } from "../api/auth";
import { useTranslation } from "react-i18next";
import RegisterImg from '../assets/backImg.jpg';
import axios from "axios";
import "./Auth.css";

const Rigister = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);

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

  useEffect(() => {
    axios
      .get("https://tabybak.com/api/provider/v1/countries/")
      .then((res) => {
        if (res.data.status) setCountries(res.data.data);
      });
  }, []);

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

  const handleRegister = async (e) => {
    e.preventDefault();

    if (registerData.password !== registerData.password_confirmation) {
      alert(t("passwordMismatch"));
      return;
    }

    try {
      const formData = new FormData();
      Object.entries(registerData).forEach(([k, v]) =>
        formData.append(k, v)
      );

      const res = await registerApi(formData);

      if (res.data.status) {
        alert(t("registerSuccess"));
        navigate("/login");
      }
    } catch {
      alert(t("registerError"));
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="container">
        <div className="cover">
          <div className="back">
            <img src={RegisterImg} alt="" />
            <div className="text">
              <span className="text-1">{t("joinUs")}</span>
              <span className="text-2">{t("startNow")}</span>
            </div>
          </div>
        </div>

        <div className="forms">
          <div className="form-content">
            <div className="signup-form">
              <div className="title">{t("registerTitle")}</div>

              <form onSubmit={handleRegister}>
                <div className="input-boxes">

                  <div className="input-box">
                    <i className="fas fa-user"></i>
                    <input
                      placeholder={t("name")}
                      onChange={(e) =>
                        setRegisterData({ ...registerData, name: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="input-box">
                    <i className="fas fa-envelope"></i>
                    <input
                      type="email"
                      placeholder={t("email")}
                      onChange={(e) =>
                        setRegisterData({ ...registerData, email: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="input-box">
                    <i className="fas fa-lock"></i>
                    <input
                      type="password"
                      placeholder={t("password")}
                      onChange={(e) =>
                        setRegisterData({ ...registerData, password: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="input-box">
                    <select
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
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="input-box">
                    <select
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
                          {c.name}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="button input-box">
                    <input type="submit" value={t("registerButton")} />
                  </div>

                  <div className="text sign-up-text">
                    {t("haveAccount")}{" "}
                    <span onClick={() => navigate("/login")}>
                      {t("loginTitle")}
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

export default Rigister;
