import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { getProfileApi, updateProfileApi } from "../api/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faPhone,
  faEdit,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import "./Account.css";

const Account = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);

  useEffect(() => {
    fetchProfile();
  }, []);

  /* ================= GET PROFILE ================= */
  const fetchProfile = async () => {
    try {
      const res = await getProfileApi();
      if (res.data.status) {
        setProfile(res.data.data);
        setImagePreview(res.data.data.logo);
      }
    } catch (err) {
      console.error("Error fetching profile:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ================= HELPER FOR TRANSLATED FIELDS ================= */
  const getValue = (field) => {
    if (!field) return "";
    if (typeof field === "object") {
      return field[lang] || field.en || "";
    }
    return field;
  };

  /* ================= HANDLE CHANGE ================= */
  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "logo") {
      setProfile({ ...profile, logo: files[0] });
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setProfile({ ...profile, [name]: value });
    }
  };

  /* ================= UPDATE PROFILE ================= */
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();

    formData.append("name", getValue(profile.name));
    formData.append("phone", profile.phone || "");

    if (profile.logo instanceof File) {
      formData.append("logo", profile.logo);
    }

    try {
      await updateProfileApi(formData);
      alert(t("account.savedSuccess"));
    } catch (err) {
      console.error(err);
      alert(t("account.savedError"));
    }
  };

  /* ================= LOADING ================= */
  if (loading) {
    return (
      <div className="profile-loading">
        <div className="spinner"></div>
      </div>
    );
  }

  return (
    <div className="account-wrapper">
      <div className="container mt-5 pt-5">

        {/* Cover Section */}
        <div className="profile-header">
          <div className="profile-cover">
            <div className="cover-gradient"></div>
          </div>

          <div className="profile-avatar">
            {imagePreview ? (
              <img src={imagePreview} alt="avatar" />
            ) : (
              <div className="avatar-placeholder">
                <FontAwesomeIcon icon={faUser} size="2x" />
              </div>
            )}
          </div>

          <label className="edit-btn">
            <FontAwesomeIcon icon={faEdit} />
            <input
              type="file"
              name="logo"
              hidden
              onChange={handleChange}
            />
          </label>
        </div>

        {/* Title */}
        <div className="profile-title text-center mt-3">
          <h2>{getValue(profile?.name)}</h2>
        </div>

        {/* Info Card */}
        <div className="row mt-4">
          <div className="col-lg-8 mx-auto">
            <div className="profile-card">
              <h4 className="card-title">
                <FontAwesomeIcon icon={faUser} className="me-2" />
                {t("account.personalInfo")}
              </h4>

              <form onSubmit={handleSubmit}>
                {/* Name */}
                <div className="info-item">
                  <div className="info-icon">
                    <FontAwesomeIcon icon={faUser} />
                  </div>
                  <div className="info-content">
                    <span className="info-label">
                      {t("account.name")}
                    </span>
                    <input
                      type="text"
                      name="name"
                      value={getValue(profile?.name)}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="info-item">
                  <div className="info-icon">
                    <FontAwesomeIcon icon={faEnvelope} />
                  </div>
                  <div className="info-content">
                    <span className="info-label">
                      {t("account.email")}
                    </span>
                    <input
                      type="email"
                      value={profile?.email || ""}
                      disabled
                      className="form-control"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="info-item">
                  <div className="info-icon">
                    <FontAwesomeIcon icon={faPhone} />
                  </div>
                  <div className="info-content">
                    <span className="info-label">
                      {t("account.phone")}
                    </span>
                    <input
                      type="text"
                      name="phone"
                      value={profile?.phone || ""}
                      onChange={handleChange}
                      className="form-control"
                    />
                  </div>
                </div>

                {/* Save Button */}
                <button type="submit" className="btn-save mt-3">
                  <FontAwesomeIcon icon={faSave} className="me-2" />
                  {t("account.saveChanges")}
                </button>
              </form>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Account;