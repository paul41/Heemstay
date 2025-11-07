import axios from "axios";

// Create Axios instance
const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api",
  withCredentials: true, // optional: if using cookies
});

// Attach token to every request if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Optional: Global error handling
api.interceptors.response.use(
  (response) => response,
  (error) => {
    // You can log or toast errors here
    return Promise.reject(error);
  }
);

export default api;
