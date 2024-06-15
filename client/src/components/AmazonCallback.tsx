import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { userApi } from '../services/api'; // Import userApi from api.ts

const AmazonCallback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const hash = window.location.hash;
    const token = new URLSearchParams(hash.substring(1)).get('access_token');

    if (token) {
      userApi.amazonLogin(
        token,
        (resp: any) => {
          localStorage.setItem('user-token', resp.token);
          localStorage.setItem('userId', resp.userId);
          navigate(`/genvision/${resp.userId}`);
          toast.success('Login successful');
        },
        (err: any) => {
          toast.error(err.message);
        },
      );
    } else {
      toast.error('Kindle login failed');
    }
  }, [navigate]);

  return <div>Loading...</div>;
};

export default AmazonCallback;
