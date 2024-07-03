import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useKindeAuth } from '@kinde-oss/kinde-auth-react';

const KindeCallback: React.FC = () => {
  const navigate = useNavigate();
  const { getToken, user, isAuthenticated, isLoading } = useKindeAuth();

  useEffect(() => {
    const handleAuthCallback = async () => {
      try {
        if (isAuthenticated) {
          const token = await getToken();
          if (token && user) {
            const userId = user.id;
            localStorage.setItem('user-token', token);
            localStorage.setItem('userId', userId);
            toast.success('Login successful');
            navigate(`/genvision/${userId}`);
          } else {
            throw new Error('Token or user information is missing');
          }
        } else if (!isLoading) {
          throw new Error('User is not authenticated');
        }
      } catch (error: any) {
        console.error('Error during auth callback:', error);
        toast.error('Login failed: ' + error.message);
        navigate('/login');
      }
    };

    handleAuthCallback();
  }, [isAuthenticated, isLoading, getToken, user, navigate]);

  return <div>Loading...</div>;
};

export default KindeCallback;
