// src/components/dashboard/StatCard.jsx
import React from "react";

const StatCard = ({ title, value, icon, isTab, onClick }) => (
  <div
    className={`stat-card ${isTab ? "tab-card" : ""}`}
    onClick={onClick}
  >
    <div className="stat-icon">{icon}</div>

    <div className="stat-info">
      <h4>{title}</h4>
      {value && <p>{value}</p>}
    </div>
  </div>
);

export default StatCard;