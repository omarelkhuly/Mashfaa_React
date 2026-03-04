// src/components/dashboard/Header.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import { useTheme } from "../../Data/ThemeContext";

const Header = () => {
  const { darkMode, setDarkMode } = useTheme();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <header className="dashboard-header">

      {/* Language Icon */}
      <div className="header-icon">🌍</div>

      {/* Account Icon */}
      <div className="header-icon">👤</div>

      {/* زرار الثيم */}
      <button onClick={toggleTheme}>
        {darkMode ? "☀️" : "🌙"}
      </button>

      {/* زرار تسجيل الخروج */}
      <button onClick={handleLogout}>
        Logout
      </button>

    </header>
  );
};

export default Header;