import axios from "axios";

const baseURL = `${import.meta.env.VITE_BACKEND_URL}`;

const getToken = () => window.localStorage.getItem("token");

const axiosInstance = axios.create({
  baseURL,
  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${getToken()}`,
  },
})

export default axiosInstance