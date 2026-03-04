// src/App.js
import './App.css';
import './index.css';
import React, { useEffect } from "react";
import './i18n';
import { useTranslation } from "react-i18next";
import { ThemeProvider } from "./Data/ThemeContext";
import { Route, BrowserRouter, Routes, Navigate } from 'react-router-dom';

import Home from "./pages/Home";
import About from "./pages/about";
import Contact from './pages/Contact';
import Reservation from './pages/Reservation';
import Blogs from './pages/Blog';
import BlogsDetails from './pages/BlogsDetails';
import BlogDetailsSpicial from './pages/BlogDetailsSpicial';
import Services from './pages/Services';
import Team from './pages/Team';
import PageNotFound from './pages/FAQ';
import AuthPage from './pages/AuthPage';
import Account from './pages/Account';
import Profile from './pages/Profile';
import DetailsPage from './components/Booking/DetailsPage';
import ServicesDetails from './pages/ServicesDetails';
import SearchBar from './components/ModealSearch/ModealSearch';
import Layouts from './components/Layout/Layouts';
import DashboardLayout from "./components/dashboard/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import ProfileDash from "./pages/profileDash";

function App() {
  const { t, i18n } = useTranslation();

  useEffect(() => {
    document.title = t("siteTitle");
  }, [i18n.language, t]);

  return (
    <ThemeProvider>
      <BrowserRouter>
        <Routes>

          {/* Redirect */}
          <Route path="/" element={<Navigate to="/home" />} />

          {/*Dashboard Protected */}

          <Route
            path="/dashboard/*"
            element={
              localStorage.getItem("token")
                ? <DashboardLayout />
                : <Navigate to="/Login" replace />
            }
          >
            <Route index element={<Dashboard />} />
            <Route path="profile" element={<ProfileDash />} />
          </Route>
          {/* Layout Wrapper */}
          <Route element={<Layouts />}>

            <Route path="/home" element={<Home />} />
            <Route path="/About" element={<About />} />
            <Route path="/Contact" element={<Contact />} />
            <Route path="/Reservation" element={<Reservation />} />
            <Route path="/Blog" element={<Blogs />} />
            <Route path="/BlogsDetails/:blogType" element={<BlogsDetails />} />
            <Route path="/BlogDetailsSpicial/:doctorName" element={<BlogDetailsSpicial />} />
            <Route path="/SearchBar" element={<SearchBar />} />
            <Route path="/Services" element={<Services />} />
            <Route path="/DetailsPage" element={<DetailsPage />} />
            <Route path="/Team" element={<Team />} />
            <Route path="/FAQ" element={<PageNotFound />} />
            <Route path="/servicesDetails/:serviceType" element={<ServicesDetails />} />
            <Route path="/Register" element={<AuthPage />} />
            <Route path="/Login" element={<AuthPage />} />
            <Route path="/account" element={<Account />} />
            <Route path="/profile" element={<Profile />} />

          </Route>

        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
