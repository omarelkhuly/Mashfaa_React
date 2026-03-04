// src/components/dashboard/Sidebar.jsx
import React from "react";
import { NavLink, Link } from "react-router-dom"; // ✅ أضف Link هنا
import Logo from '../../assets/logo.png';
import { Navbar } from 'react-bootstrap';

const Sidebar = () => {
  const links = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Profile", path: "/dashboard/profile" },
    { name: "Settings", path: "/dashboard/settings" },
    { name: "Reports", path: "/dashboard/reports" },
  ];

  return (
    <aside className="dashboard-sidebar">
      <div className="sidebar-logo">
        {/* LOGO */}
        <Navbar.Brand className="logo_style_nav">
          <Link  to="/home">
            <img className="logo_image" src={Logo} alt="Logo" />
          </Link>
        </Navbar.Brand>
      </div>
      <nav style={{ background: "none" }}>
        {links.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className={({ isActive }) =>
              isActive ? "sidebar-link active" : "sidebar-link"
            }
          >
            {link.name}
          </NavLink>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;