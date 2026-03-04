// src/pages/profileDash.js
import React, { useState } from "react";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import "./ProfileDash.css";

const ProfileDash = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    specialty: "",
    experience: "",
    address: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Doctor Data:", formData);
    alert("Doctor Added Successfully ✅");
  };

  return (
    <>
      <div className="doctor-form-wrapper">
        <h2 className="form-title">Add New Doctor</h2>

        <form className="doctor-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Doctor Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Specialty</label>
            <input
              type="text"
              name="specialty"
              value={formData.specialty}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Years of Experience</label>
            <input
              type="number"
              name="experience"
              value={formData.experience}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-group">
            <label>Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              rows="3"
              required
            />
          </div>

          <button type="submit" className="submit-btn">
            Add Doctor
          </button>
        </form>
      </div>
    </>
  );
};

export default ProfileDash;