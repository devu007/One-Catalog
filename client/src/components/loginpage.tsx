import { useEffect } from 'react';
import { BrandLogo } from './sidebar';
import { useNavigate } from 'react-router-dom';
import { useKindeAuth } from '@kinde-oss/kinde-auth-react';
import { toast } from 'react-toastify';

interface LoginProps {
  isKinde: boolean;
}

export default function Login({ isKinde }: LoginProps) {
  const { login, register, isAuthenticated } = useKindeAuth();
  const navigate = useNavigate();

  const handleKindeLogin = async (type: 'login' | 'register') => {
    try {
      if (type === 'login') {
        await login();
      } else {
        await register();
      }
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      const userId = localStorage.getItem('userId');
      if (userId) {
        navigate(`/genvision/${userId}`);
      } else {
        navigate('/'); // Redirect to home or dashboard if already authenticated
      }
    }
  }, [isAuthenticated, navigate]);

  return (
    <div className="flex min-h-screen items-center justify-center p-7 box-content">
      <div className="flex flex-col flex-grow-1 items-center justify-start shadow-md p-3">
        <div className="flex flex-col flex-grow-1 items-center justify-start p-3">
          <BrandLogo />
          <h1 className="my-5 text-[#000000] mb-5 text-xl font-semibold">
            Gen Vision
          </h1>
          <h6 className="text-sm">Log in to Kinde to continue to Gen Vision</h6>
          <div className="flex space-x-3 mt-5">
            <button
              onClick={() => handleKindeLogin('register')}
              type="button"
              className="bg-zinc-900 text-white px-3 py-2 rounded"
            >
              Sign up
            </button>
            <button
              onClick={() => handleKindeLogin('login')}
              type="button"
              className="bg-zinc-900 text-white px-3 py-2 rounded"
            >
              Sign In
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
