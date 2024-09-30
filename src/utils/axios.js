import axios from "axios";
import { API_URL } from "../config/config";

// const authToken = localStorage.getItem("authAdminToken");
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    // Authorization: `Bearer ${authToken}`,
  },
});

export default axiosInstance;
