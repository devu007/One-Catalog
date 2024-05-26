import axios, { AxiosInstance } from "axios";
import { toast } from "react-toastify";
export const api: AxiosInstance = axios.create({
    baseURL: "https://one-catalog-server.onrender.com/user",
  });
  
  api.interceptors.request.use((config) => {
    const token = localStorage.getItem("user-token");
    if (token) {
      config.headers.Authorization = token;
    }
    return config;
  });
  
  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response && error.response.status === 401) {
        localStorage.removeItem("user-token");
        toast.error('401 UnAuthorized');
      }
      return Promise.reject(error);
    }
  );