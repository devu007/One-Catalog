// api/removeBackground.ts
import axios, { AxiosRequestConfig } from 'axios';
import FormData from 'form-data';
// import { createReadStream } from 'fs';

const removeBackground = async (imageFile: File) => {
  try {
    const data = new FormData();
    
    data.append('image_file', imageFile);
    const apiKey = process.env.REACT_APP_CLIP_DROP_API_KEY;

    const config: AxiosRequestConfig = {
      method: 'post',
      url: 'https://clipdrop-api.co/remove-background/v1',
      headers: {
        'x-api-key': apiKey,
        ...data.getHeaders(),
      },
      data: data,
    };

    const response = await axios(config);
    return response
  } catch (error) {
    console.error('Error in removeBackground API call:', error);
    throw error;
  }
};

export default removeBackground;
