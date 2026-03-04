// src/pages/Dashboard.js
import React, { useEffect } from "react";
import DashboardLayout from "../components/dashboard/DashboardLayout";
import StatCard from "../components/dashboard/StatCard";

const Dashboard = () => {
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      window.location.href = "/login";
    }
  }, []);

  return (
    <>
      
      {/* الكروت الأساسية */}
      <div className="dashboard-stats">
        <StatCard title="Users" value="120" icon="👤" />
        <StatCard title="Revenue" value="$5,430" icon="💰" />
        <StatCard title="Orders" value="87" icon="🛒" />
        <StatCard title="Visits" value="1,234" icon="📈" />
      </div>

      {/* التابات الجديدة */}
      <div className="dashboard-tabs">
        <StatCard title="Doctor" icon="👨‍⚕️" isTab />
        <StatCard title="Medicine" icon="💊" isTab />
        <StatCard title="Report" icon="📋" isTab />
        <StatCard title="Nurse" icon="👩‍⚕️" isTab />
        <StatCard title="Language" icon="🌍" isTab />
      </div>

      <div className="dashboard-content-section">
        {/* هنا ممكن تحط جدول أو رسوم بيانية */}
      </div>

    </>
  );
};

export default Dashboard;