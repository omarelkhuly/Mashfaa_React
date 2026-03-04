// src/components/Booking/Booking.js
import React, { useState, useEffect } from "react";
import { Dropdown } from "react-bootstrap";
import { departments, doctors } from "../../Data/DataBooks";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "react-i18next";
import axios from "axios";
import backgrondBooking from "../../assets/backgrounnd_booking.jpg";
import "./Appointment.css";

const Booking = () => {
  const navigate = useNavigate();
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === "ar";

  const token = localStorage.getItem("token");

  const [selectedDepartment, setSelectedDepartment] = useState("");
  const [selectedDoctor, setSelectedDoctor] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedCity, setSelectedCity] = useState("");

  const [countries, setCountries] = useState([]);
  const [cities, setCities] = useState([]);

  const [formData, setFormData] = useState({ name: "", phone: "", date: "" });
  const [errors, setErrors] = useState({ name: "", phone: "" });

  // ✅ fetch countries
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
      })
      .catch((err) => console.log(err));
  }, []);

  // ✅ fetch cities when country changes
  useEffect(() => {
    if (!selectedCountry) return;

    axios
      .get(
        `https://tabybak.com/api/provider/v1/cities/${selectedCountry}`
      )
      .then((res) => {
        if (res.data.status) {
          const citiesData = Array.isArray(res.data.data)
            ? res.data.data
            : res.data.data?.data || [];

          setCities(citiesData);
        }
      })
      .catch((err) => console.log(err));
  }, [selectedCountry]);

  const validateForm = () => {
    const nameRegex = /^[a-zA-Z\s]{3,}$/;
    const phoneRegex =
      /^(\+?\d{1,4}[-.\s]?)?(\(?\d{3}\)?[-.\s]?)?\d{3}[-.\s]?\d{4}$/;

    let nameError = "";
    let phoneError = "";

    if (!nameRegex.test(formData.name)) nameError = t("nameError");
    if (!phoneRegex.test(formData.phone)) phoneError = t("phoneError");

    setErrors({ name: nameError, phone: phoneError });
    return !nameError && !phoneError;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (validateForm()) {

      const countryObj = countries.find(
        (c) => Number(c.id) === Number(selectedCountry)
      );

      const cityObj = cities.find(
        (c) => Number(c.id) === Number(selectedCity)
      );

      navigate("/DetailsPage", {
        state: {
          ...formData,
          department: selectedDepartment,
          doctor: selectedDoctor,
          country: countryObj?.name || selectedCountry,
          city: cityObj?.name || selectedCity,
        },
      });
    }
  };

  return (
    <section
      className="section_book"
      style={{ backgroundImage: `url(${backgrondBooking})` }}
    >
      <div className="overlay"></div>

      <div className="container">
        <form onSubmit={handleSubmit}>
          <div className={`booking-grid ${isRTL ? "rtl" : ""}`}>

            {/* INPUT SIDE زي ما هو بدون تغيير */}
            <div className="booking-inputs">

              <div className="form-group input_div">
                <input
                  type="text"
                  className="form-control"
                  placeholder={t("yourName")}
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  required
                />
                {errors.name && (
                  <small className="text-danger">{errors.name}</small>
                )}
              </div>

              <div className="form-group input_div">
                <input
                  type="tel"
                  className="form-control"
                  placeholder={t("phoneNumbers")}
                  value={formData.phone}
                  onChange={(e) =>
                    setFormData({ ...formData, phone: e.target.value })
                  }
                  required
                />
                {errors.phone && (
                  <small className="text-danger">{errors.phone}</small>
                )}
              </div>

              <div className="form-group input_div">
                <input
                  type="date"
                  className="form-control control_date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  required
                />
              </div>

            </div>

            <div className="booking-selects">

              {/* COUNTRIES */}
              <div className="form-group custom-dropdown">
                <Dropdown onSelect={(e) => setSelectedCountry(e)}>
                  <Dropdown.Toggle variant="light">
                    {selectedCountry
                      ? countries.find(c => c.id == selectedCountry)?.name
                      : t("selectCountry")}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {countries.map((country) => (
                      <Dropdown.Item
                        key={country.id}
                        eventKey={country.id}
                      >
                        {country.name}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </div>

              {/* CITIES */}
              <div className="form-group custom-dropdown">
                <Dropdown
                  onSelect={(e) => setSelectedCity(e)}
                  disabled={!selectedCountry}
                >
                  <Dropdown.Toggle variant="light">
                    {selectedCity
                      ? cities.find(c => c.id == selectedCity)?.name
                      : t("selectCity")}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {cities.map((city) => (
                      <Dropdown.Item
                        key={city.id}
                        eventKey={city.id}
                      >
                        {city.name}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </div>

              {/* باقي dropdowns زي ما هم */}
              <div className="form-group custom-dropdown">
                <Dropdown onSelect={(e) => setSelectedDepartment(e)}>
                  <Dropdown.Toggle variant="light">
                    {selectedDepartment || t("selectDepartment")}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {departments.map((dept) => (
                      <Dropdown.Item key={dept.id} eventKey={dept.name}>
                        {dept.name}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </div>

              <div className="form-group custom-dropdown">
                <Dropdown onSelect={(e) => setSelectedDoctor(e)}>
                  <Dropdown.Toggle variant="light">
                    {selectedDoctor || t("selectDoctor")}
                  </Dropdown.Toggle>
                  <Dropdown.Menu>
                    {doctors.map((doc) => (
                      <Dropdown.Item key={doc.id} eventKey={doc.name}>
                        {doc.name}
                      </Dropdown.Item>
                    ))}
                  </Dropdown.Menu>
                </Dropdown>
              </div>

            </div>
          </div>

          <button
            type="submit"
            className="btn btn-secondary btn_secondary btn-lg booking-btn"
          >
            {t("appointmentNow")}
          </button>

        </form>
      </div>
    </section>
  );
};

export default Booking;