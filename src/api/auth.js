// src/api/auth.js
import api from "./axios";

// REGISTER
export const registerApi = (data) => {
  return api.post("/register", data, {
    headers: {
      "Content-Type": "multipart/form-data",
      "Accept-Language": "en",
    },
  });
};

// LOGIN
export const loginApi = (data) => {
  return api.post("/login", data, {
    headers: {
      "Content-Type": "application/json",
      "Accept-Language": "en",
    },
  });
};
