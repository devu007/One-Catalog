// src/api.ts
import { api } from './api';

// Declare localStorage interface if not provided by the environment
declare global {
  interface Window {
    localStorage: Storage;
  }
}

interface ApiResponse<T> {
  data: T;
}

export const productApi = {
  createProduct: (productData: any, onSuccess: Function, onError: Function) => {
    api.post<ApiResponse<any>>('/createProduct', productData)
      .then((resp) => onSuccess && onSuccess(resp.data))
      .catch((err) => onError && onError(err.response?.data));
  },
  updateProduct: (productId: string, productData: any, onSuccess: Function, onError: Function) => {
    api.put<ApiResponse<any>>(`/updateProduct/${productId}`, productData)
      .then((resp) => onSuccess && onSuccess(resp.data))
      .catch((err) => onError && onError(err.response?.data));
  },
  getProduct: (productId: string, onSuccess: Function, onError: Function) => {
    api.get<ApiResponse<any>>(`/getProduct/${productId}`)
      .then((resp) => onSuccess && onSuccess(resp.data))
      .catch((err) => onError && onError(err.response?.data));
  },
  getProducts: (onSuccess: Function, onError: Function) => {
    api.get<ApiResponse<any>>('/getProducts')
      .then((resp) => onSuccess && onSuccess(resp.data))
      .catch((err) => onError && onError(err.response?.data));
  },
  deleteProduct: (productId: string, onSuccess: Function, onError: Function) => {
    api.delete<ApiResponse<any>>(`/deleteProduct/${productId}`)
      .then((resp) => onSuccess && onSuccess(resp.data))
      .catch((err) => onError && onError(err.response?.data));
  },
};
