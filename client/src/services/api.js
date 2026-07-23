import axios from "axios";

const api = axios.create({
  baseURL: "https://site--brandspire-crm--gnbmjcfsyzsx.code.run/api",
  withCredentials: true,
});

/* ===========================================================
   Attach JWT Token Automatically
=========================================================== */

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export default api;