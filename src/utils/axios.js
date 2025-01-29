// import axios from "axios";
// import { API_URL } from "../config/config";

// const authToken = localStorage.getItem("authAdminToken") || "defaultString";

// const axiosInstance = axios.create({
//   baseURL: API_URL,
//   headers: {
//     "Content-Type": "application/json",
//     Authorization: `Bearer ${authToken}`,
//   },
// });

// export default axiosInstance;


import axios from "axios";
import { API_URL } from "../config/config";

// Retrieve token from localStorage or use default
const getAuthToken = () => {
  if (typeof window !== "undefined") {
    const token = localStorage.getItem("authAdminToken");
    return token ? token : "defaultString"; // Use "defaultString" if user is not logged in
  }
  return "defaultString"; // Ensure safe handling in SSR
};
// Create axios instance with dynamic Authorization header
const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${getAuthToken()}`, // Default token or token from localStorage
  },
});

// Axios Interceptor to dynamically set the Authorization token
axiosInstance.interceptors.request.use(
  (config) => {
    const token = getAuthToken(); // Get the token (either default or logged-in user token)
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`; // Dynamically set the token in headers
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;