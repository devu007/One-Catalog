
import { api } from "./api";

interface ApiResponse<T> {
    data: T;
  }
  interface aiPayload{
    imageUrl : string;
    prompt:string;
  }


  export const imageApi = {
    analyseProduct: (payload: aiPayload, onSuccess: Function,onError :Function) => {
      api.post<ApiResponse<any>>("/analyze-product", payload).then((resp) => onSuccess && onSuccess(resp.data)).catch(err => onError && onError(err.response?.data));
    },
    getDescription: (payload: any, onSuccess: Function ,onError :Function) => {
      api.post<ApiResponse<any>>("/get-description", payload).then((resp) => onSuccess && onSuccess(resp.data)).catch(err => onError && onError(err.response?.data));
    },
    getPrefilledData :(onSuccess: Function,onError :Function) => {
      api.post<ApiResponse<any>>("/get-prefill-data").then((resp) => onSuccess && onSuccess(resp.data)).catch(err => onError && onError(err.response?.data));
    },
    imageUpscale: (payload: any, onSuccess: Function,onError :Function) => {
        api.post<ApiResponse<any>>("/image-upscale", payload).then((resp) => onSuccess && onSuccess(resp.data)).catch(err => onError && onError(err.response?.data));
      },
    removeBackground: async (payload: any) => {
        return await api.post<ApiResponse<any>>("/remove-background',", payload);
      },
    uploadImage :(onSuccess: Function,onError :Function) => {
        api.get<ApiResponse<any>>("/upload-image").then((resp) => onSuccess && onSuccess(resp.data)).catch(err => onError && onError(err.response?.data));
      }
    }