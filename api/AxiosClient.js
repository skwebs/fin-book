import axios from "axios";

axios.defaults.baseURL =
  process.env.REACT_APP_API_URL || "http://localhost:3000/api";
axios.defaults.headers.common["Content-Type"] = "application/json";
axios.defaults.headers.common["Accept"] = "application/json";
