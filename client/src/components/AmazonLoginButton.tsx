import React from 'react';

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

  return <button onClick={handleAmazonLogin}>Login with Kindle</button>;
};

export default AmazonLoginButton;
