import axios, { AxiosInstance } from "axios";
import { toast } from "react-toastify";
export const api: AxiosInstance = axios.create({
    baseURL: "http://localhost:3002/user",
  });
  
 api.interceptors.request.use((config) => {
  const token = localStorage.getItem("user-token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
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

  export const userApi = {
    amazonLogin: async (token: string, onSuccess: (resp: any) => void, onError: (err: any) => void) => {
      try {
        const response = await axios.post(`${api}/auth/amazon`, { token });
        onSuccess(response.data);
      } catch (error: any) {
        onError(error.response.data);
      }
    },
  };