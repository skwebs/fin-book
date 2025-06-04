import axios from "axios";
import * as SecureStore from "expo-secure-store";
const api = axios.create({
  baseURL: "https://accounting.anshumemorial.in", // Replace with your Laravel API URL
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = SecureStore.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
