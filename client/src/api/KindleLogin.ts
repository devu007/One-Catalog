import axios, { AxiosInstance } from 'axios';
import { toast } from 'react-toastify';

const BASE_URL = 'https://one-catalog-server.onrender.com/user';

export const api: AxiosInstance = axios.create({
  baseURL: BASE_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('user-token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      localStorage.removeItem('user-token');
      toast.error('401 Unauthorized');
    }
    return Promise.reject(error);
  }
);

export const userApi = {
  amazonLogin: async (token: string): Promise<any> => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/amazon`, { token });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};
