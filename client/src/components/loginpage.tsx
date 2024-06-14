import { BrandLogo } from './sidebar';
import linkedIn48 from '../assets/icons/linkedIn48.png';
import microsoft48 from '../assets/icons/microsoft48.png';
import google48 from '../assets/icons/google48.png';
import github48 from '../assets/icons/github48.png';
import kindle48 from '../assets/icons/kindle48.png'; // Add Kindle icon
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { userApi } from '@/services/loginApi';
import { toast } from 'react-toastify';
import { generateUserId } from '@/lib/utils';
import AmazonLoginButton from './AmazonLoginButton';

interface login {
  isOauth: boolean;
}

export default function Login({ isOauth }: login) {
  const [emailId, setEmailId] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [isRegister, setIsRegister] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem('user-token')) {
      userApi.refreshLogin(
        (resp: any) => {
          localStorage.setItem('user-token', resp.token);
          const userId = localStorage.getItem('userId');
          navigate(`/genvision/${userId}`);
        },
        (err: any) => {
          localStorage.removeItem('user-token');
          localStorage.removeItem('userId');
          toast.error(err.message);
        },
      );
    }
  }, [navigate]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    let payload = {
      username: emailId,
      password: password,
    };
    const userId = generateUserId(emailId);
    if (isRegister) {
      userApi.register(
        payload,
        (resp: any) => {
          localStorage.setItem('user-token', resp.token);
          localStorage.setItem('userId', userId);
          navigate(`/genvision/${userId}`);
          toast.success(resp.message);
        },
        (err: any) => {
          toast.error(err.message);
        },
      );
    } else {
      userApi.login(
        payload,
        (resp: any) => {
          localStorage.setItem('user-token', resp.token);
          localStorage.setItem('userId', userId);
          navigate(`/genvision/${userId}`);
          toast.success(resp.message);
        },
        (err: any) => {
          toast.error(err.message);
        },
      );
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center p-7 box-content">
      <div className="flex flex-col flex-grow-1 items-center justify-start shadow-md p-3">
        <div className="flex flex-col flex-grow-1 items-center justify-start p-3">
          <BrandLogo />
          <h1 className="my-5 text-[#000000] mb-5 text-xl font-semibold">
            Gen Vision
          </h1>
          <h6 className="text-sm">Log in to Auth0 to continue to Auth0</h6>
          <h6 className="text-sm">Dashboard.</h6>
          <form className="w-full my-3 flex flex-col" onSubmit={handleSubmit}>
            <input
              className="border border-[#C2C8D0] p-3 rounded-sm mb-5"
              type="text"
              value={emailId}
              onChange={e => setEmailId(e.target.value)}
              placeholder="Email Address"
            />
            <input
              className="border border-[#C2C8D0] p-3 rounded-sm mb-5"
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="Password"
            />
            <button
              className="bg-[#623FC4] items-center p-3.5 mb-5 justify-center font-semibold rounded-md cursor-pointer text-white"
              type="submit"
            >
              {isRegister ? 'Register' : 'Login'}
            </button>
          </form>
          <h6 className="text-xs">
            {isRegister ? (
              <span>
                Have an account !!{' '}
                <span
                  className="text-cyan-500 cursor-pointer"
                  onClick={() => setIsRegister(prev => !prev)}
                >
                  SignIn
                </span>
              </span>
            ) : (
              <span>
                Don’t have an account?{' '}
                <span
                  className="text-cyan-500 cursor-pointer"
                  onClick={() => setIsRegister(prev => !prev)}
                >
                  Register
                </span>
              </span>
            )}
          </h6>
        </div>
        {isOauth && (
          <div className="h-full">
            <button className="border border-[#C2C8D0] my-2 p-1 w-full flex flex-row items-center justify-around disabled">
              <img src={linkedIn48} alt="LinkedIn" />
              <h6>Continue with LinkedIn</h6>
            </button>
            <button className="border border-[#C2C8D0] my-2 p-1 w-full flex flex-row items-center justify-around disabled">
              <img src={microsoft48} alt="Microsoft" />
              <h6>Continue with Microsoft</h6>
            </button>
            <button className="border border-[#C2C8D0] my-2 p-1 w-full flex flex-row items-center justify-around disabled">
              <img src={github48} alt="GitHub" />
              <h6>Continue with GitHub</h6>
            </button>
            <button className="border border-[#C2C8D0] my-2 p-1 w-full flex flex-row items-center justify-around disabled">
              <img src={google48} alt="Google" />
              <h6>Continue with Google</h6>
            </button>
            <AmazonLoginButton onSuccess={() => {}} />
          </div>
        )}
      </div>
    </div>
  );
}
