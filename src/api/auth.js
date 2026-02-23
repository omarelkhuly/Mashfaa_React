// src/api/auth.js
import api from "./axios";

/* ================= REGISTER ================= */
export const registerApi = (data) => {
  return api.post("/register", data, {
    headers: {
      "Content-Type": "multipart/form-data",
      "Accept-Language": "en",
    },
  });
};

/* ================= LOGIN ================= */
export const loginApi = (data) => {
  return api.post("/login", data, {
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": "en",
    },
  });
};

/* ================= GET PROFILE ================= */
export const getProfileApi = () => {
  return api.get("/profile", {
    headers: {
      "Accept-Language": "en",
    },
  });
};

/* ================= UPDATE PROFILE ================= */
export const updateProfileApi = (data) => {
  return api.post("/profile", data, {
    headers: {
      "Content-Type": "multipart/form-data",
      "Accept-Language": "en",
    },
  });
};

/* ================= LOGOUT ================= */
export const logoutApi = () => {
  return api.post("/logout", {}, {
    headers: {
      "Accept-Language": "en",
    },
  });
};

/* ================= FORGET PASSWORD ================= */
export const forgetPasswordApi = (email) => {
  return api.post(`/forget-password?email=${email}`, null, {
    headers: {
      "Accept-Language": "en",
    },
  });
};

/* ================= RESET PASSWORD ================= */
export const resetPasswordApi = (data) => {
  return api.post("/reset-password", data, {
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": "en",
    },
  });
};

/* ================= CHANGE PASSWORD ================= */
export const changePasswordApi = (data) => {
  return api.post("/change-password", data, {
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": "en",
    },
  });
};