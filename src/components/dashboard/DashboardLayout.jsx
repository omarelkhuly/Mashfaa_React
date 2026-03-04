// src/components/dashboard/DashboardLayout.jsx
import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import Header from "./Header";

const DashboardLayout = () => {
  return (
    <div className="dashboard-wrapper">
      <Sidebar />
      <div className="dashboard-content">
        <Header />
        <main>
          <Outlet />
          </main>
      </div>
    </div>
  );
};

export default DashboardLayout;