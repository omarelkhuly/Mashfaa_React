// src/api/axios.js
import axios from "axios";

// إنشاء instance
const api = axios.create({
  baseURL: "https://tabybak.com/api/provider/v1", 
  headers: {
    Accept: "application/json",
  },
});

// ===== Interceptor لإضافة الـ Token تلقائيًا =====
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;
