import axios from 'axios';

const BASE_URL = 'http://localhost:3002/api'; 

export const userApi = {
  amazonLogin: async (token: string, onSuccess: (resp: any) => void, onError: (err: any) => void) => {
    try {
      const response = await axios.post(`${BASE_URL}/auth/amazon`, { token });
      onSuccess(response.data);
    } catch (error: any) {
      onError(error.response.data);
    }
  },
};
