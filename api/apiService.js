// import axios from "axios";
import api from "./axios";

// const api = axios.create({
//   baseURL: "https://accounting.anshumemorial.in", // Replace with your API base URL
//   headers: {
//     "Content-Type": "application/json",
//   },
// });

export const login = async (data) => {
  return api.post("/api/login", data);
};

export default api;
