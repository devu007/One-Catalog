import React, { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useKindeAuth } from '@kinde-oss/kinde-auth-react';

interface PrivateRouteProps {
  children: JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const { isAuthenticated, getToken, user, login } = useKindeAuth();
  const [checkingAuth, setCheckingAuth] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      if (!localStorage.getItem('user-token')) {
        try {
          await login(); // Initiate Kinde login if not authenticated
        } catch (error: any) {
          toast.error('Authentication failed: ' + error.message);
        } finally {
          setCheckingAuth(false);
        }
      } else {
        try {
          const token = await getToken();
          if (token && user) {
            setCheckingAuth(false);
            navigate(`/genvision/${user.id}`); // Redirect to user's dashboard
          } else {
            throw new Error('Token or user information is missing');
          }
        } catch (error: any) {
          toast.error('Authentication failed: ' + error.message);
          setCheckingAuth(false);
        }
      }
    };

    checkAuth();
  }, [getToken, user, login, navigate]);

  if (checkingAuth) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
