import api from "@/api/axios";
export const login = async (data) => {
  return api.post("/api/login", data);
};
export const register = async (data) => {
  return api.post("/api/register", data);
};
export const logout = async () => {
  return api.post("/api/logout");
};
