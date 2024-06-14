import React from 'react';

interface AmazonLoginButtonProps {
  onSuccess: (token: string) => void;
}

const AmazonLoginButton: React.FC<AmazonLoginButtonProps> = ({ onSuccess }) => {
  const handleAmazonLogin = () => {
    const clientId = 'a04f5a87ea1c423586a89c7339c079db';
    const redirectUri = 'http://localhost:3000/callback';
    const responseType = 'token';
    const scope = 'profile';

    const authUrl = `https://onecatalog.kinde.com/oauth2/authorize?client_id=${clientId}&scope=${scope}&response_type=${responseType}&redirect_uri=${redirectUri}`;
    window.location.href = authUrl;
  };

  return <button onClick={handleAmazonLogin}>Login with Kindle</button>;
};

export default AmazonLoginButton;
