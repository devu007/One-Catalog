
import { api } from './api';
interface ApiResponse<T> {
  data: T;
}

interface ErrorApiResponse {
  status: number;
}

interface LoginPayload {
  username: string;
  password: string;
}

// Declare localStorage interface if not provided by the environment
declare global {
  interface Window {
    localStorage: Storage;
  }
}

export const userApi = {
  register: (payload: LoginPayload, onSuccess: Function,onError :Function) => {
    api.post<ApiResponse<any>>("/user/register", payload).then((resp) => onSuccess && onSuccess(resp.data)).catch(err => onError && onError(err.response?.data));
  },
  login: (payload: LoginPayload, onSuccess: Function ,onError :Function) => {
    api.post<ApiResponse<any>>("/user/login", payload).then((resp) => onSuccess && onSuccess(resp.data)).catch(err => onError && onError(err.response?.data));
  },
  refreshLogin :(onSuccess: Function,onError :Function) => {
    api.get<ApiResponse<any>>("/user/refreshLogin").then((resp) => onSuccess && onSuccess(resp.data)).catch(err => onError && onError(err.response?.data));
  },
};
