// src/services/authService.ts
import axios from 'axios';

const API_BASE_URL = 'https://onecatalog.kinde.com'; // Replace with the actual Kinde API URL

const authService = {
  register: async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/register`, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  login: async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/login`, {
        email,
        password,
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },

  refreshToken: async (refreshToken: string) => {
    try {
      const response = await axios.post(`${API_BASE_URL}/refresh-token`, {
        refresh_token: refreshToken,
      });
      return response.data;
    } catch (error) {
      throw error.response.data;
    }
  },
};

export default authService;
