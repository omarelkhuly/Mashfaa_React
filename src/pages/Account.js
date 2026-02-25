import React, { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import {
  getProfileApi,
  updateProfileApi,
  changePasswordApi,
} from "../api/auth";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUser,
  faEnvelope,
  faPhone,
  faEdit,
  faSave,
  faLock,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import "./Account.css";

const Account = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [imagePreview, setImagePreview] = useState(null);

  const [showPasswordModal, setShowPasswordModal] = useState(false);
  const [passwordData, setPasswordData] = useState({
    old_password: "",
    password: "",
    password_confirmation: "",
  });

  const [passwordErrors, setPasswordErrors] = useState({});
  const [passwordLoading, setPasswordLoading] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await getProfileApi();
      if (res.data.status) {
        setProfile(res.data.data);
        setImagePreview(res.data.data.logo);
      }
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getValue = (field) => {
    if (!field) return "";
    if (typeof field === "object") {
      return field[lang] || field.en || "";
    }
    return field;
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "logo") {
      setProfile({ ...profile, logo: files[0] });
      setImagePreview(URL.createObjectURL(files[0]));
    } else {
      setProfile({ ...profile, [name]: value });
    }
  };

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
      alert("Profile updated successfully");
    } catch (err) {
      alert("Error updating profile");
    }
  };

  /* ================= CHANGE PASSWORD ================= */

  const handlePasswordChange = async (e) => {
    e.preventDefault();
    setPasswordLoading(true);
    setPasswordErrors({});

    if (passwordData.password !== passwordData.password_confirmation) {
      setPasswordErrors({
        password_confirmation: "Passwords do not match",
      });
      setPasswordLoading(false);
      return;
    }

    try {
      await changePasswordApi(passwordData);

      alert("Password changed successfully");
      setShowPasswordModal(false);
      setPasswordData({
        old_password: "",
        password: "",
        password_confirmation: "",
      });
    } catch (err) {
      if (err.response?.data?.errors) {
        setPasswordErrors(err.response.data.errors);
      } else {
        alert("Error changing password");
      }
    } finally {
      setPasswordLoading(false);
    }
  };

  if (loading) return <div className="profile-loading">Loading...</div>;

  return (
    <div className="account-wrapper">
      <div className="container mt-5 pt-5">

        <div className="profile-header">
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
            <input type="file" name="logo" hidden onChange={handleChange} />
          </label>
        </div>

        <div className="profile-title text-center mt-3">
          <h2>{getValue(profile?.name)}</h2>
        </div>

        <div className="row mt-4">
          <div className="col-lg-8 mx-auto">
            <div className="profile-card">

              <form onSubmit={handleSubmit}>
                <input
                  type="text"
                  name="name"
                  value={getValue(profile?.name)}
                  onChange={handleChange}
                  className="form-control mb-3"
                />

                <input
                  type="email"
                  value={profile?.email || ""}
                  disabled
                  className="form-control mb-3"
                />

                <input
                  type="text"
                  name="phone"
                  value={profile?.phone || ""}
                  onChange={handleChange}
                  className="form-control mb-3"
                />

                <button type="submit" className="btn-save">
                  <FontAwesomeIcon icon={faSave} className="me-2" />
                  Save Changes
                </button>
              </form>

              {/* 🔐 Change Password */}
              <button
                className="btn-change-password mt-3"
                onClick={() => setShowPasswordModal(true)}
              >
                <FontAwesomeIcon icon={faLock} className="me-2" />
                Change Password
              </button>
            </div>
          </div>
        </div>

        {/* ===== Password Modal ===== */}
        {showPasswordModal && (
          <div className="password-modal">
            <div className="password-box">
              <div className="modal-header">
                <h4>Change Password</h4>
                <FontAwesomeIcon
                  icon={faTimes}
                  className="close-icon"
                  onClick={() => setShowPasswordModal(false)}
                />
              </div>

              <form onSubmit={handlePasswordChange}>
                <input
                  type="password"
                  placeholder="Old Password"
                  className="form-control mb-2"
                  value={passwordData.old_password}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      old_password: e.target.value,
                    })
                  }
                />
                <small className="error-text">
                  {passwordErrors.old_password}
                </small>

                <input
                  type="password"
                  placeholder="New Password"
                  className="form-control mb-2"
                  value={passwordData.password}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      password: e.target.value,
                    })
                  }
                />
                <small className="error-text">
                  {passwordErrors.password}
                </small>

                <input
                  type="password"
                  placeholder="Confirm Password"
                  className="form-control mb-3"
                  value={passwordData.password_confirmation}
                  onChange={(e) =>
                    setPasswordData({
                      ...passwordData,
                      password_confirmation: e.target.value,
                    })
                  }
                />
                <small className="error-text">
                  {passwordErrors.password_confirmation}
                </small>

                <button
                  type="submit"
                  className="btn-save w-100"
                  disabled={passwordLoading}
                >
                  {passwordLoading ? "Updating..." : "Update Password"}
                </button>
              </form>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Account;