import React from 'react';
import kindle48 from '../assets/icons/kindle48.png'; // Add Kindle icon

interface AmazonLoginButtonProps {
  onSuccess: (token: string) => void;
}

const AmazonLoginButton: React.FC<AmazonLoginButtonProps> = ({ onSuccess }) => {
  const handleAmazonLogin = () => {
    const clientId = process.env.KINDE_CLIENT_ID;
    const redirectUri = process.env.KINDE_REDIRECT_URI;
    const responseType = 'token';
    const scope = 'profile';

    const authUrl = `${process.env.KINDE_DOMAIN}/oauth2/authorize?client_id=${clientId}&scope=${scope}&response_type=${responseType}&redirect_uri=${redirectUri}`;
    window.location.href = authUrl;
  };

  return (
    <button
      className="border border-[#C2C8D0] my-2 p-1 w-full flex flex-row items-center justify-around disabled"
      onClick={handleAmazonLogin}
    >
      <img className="w-8 h-8 mr-2" src={kindle48} alt="Kindle" />
      <h6>Continue with Kindle</h6>
    </button>
  );
};

export default AmazonLoginButton;
