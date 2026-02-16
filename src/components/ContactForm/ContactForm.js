// src/components/ContactForm/ContactForm.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import './ContactForm.css';

const ContactForm = () => {
    const navigate = useNavigate();
    const { t, i18n } = useTranslation();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        message: ""
    });

    const [errors, setErrors] = useState({});
    const [showSuccess, setShowSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    const validateForm = () => {
        const nameRegex = /^[a-zA-Z\s]{3,}$/;
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        let newErrors = {};

        if (!nameRegex.test(formData.name)) {
            newErrors.name = t("errorName");
        }

        if (!emailRegex.test(formData.email)) {
            newErrors.email = t("errorEmail");
        }

        if (!formData.message.trim()) {
            newErrors.message = t("errorMessage");
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!validateForm()) return;

        try {
            setLoading(true);

            const res = await axios.post(
                "https://tabybak.com/api/provider/v1/contact-us",
                formData,
                {
                    headers: {
                        "Accept-Language": i18n.language,
                        "Content-Type": "application/json"
                    }
                }
            );

            if (res.data.status) {
                setShowSuccess(true);
                setFormData({ name: "", email: "", message: "" });

                setTimeout(() => {
                    setShowSuccess(false);
                    navigate("/home");
                }, 5000);
            }

        } catch (err) {
            alert(t("errorGeneral"));
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            {showSuccess && (
                <div className="success-message">
                    {t("successMessage")}
                </div>
            )}

            <form className="contact-form" onSubmit={handleSubmit}>
                <label>{t("name")}</label>
                <input
                    className="input_contact"
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                />
                {errors.name && <small className="text-danger">{errors.name}</small>}

                <label>{t("email")}</label>
                <input
                    className="input_contact"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
                {errors.email && <small className="text-danger">{errors.email}</small>}

                <label>{t("message")}</label>
                <textarea
                    className="input_contact"
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                />
                {errors.message && <small className="text-danger">{errors.message}</small>}

                <button className="submit_button" type="submit" disabled={loading}>
                    {loading ? t("sending") : t("sendMessage")}
                </button>
            </form>
        </div>
    );
};

export default ContactForm;
