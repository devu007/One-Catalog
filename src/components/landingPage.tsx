// LandingPage.tsx
import React from 'react';
import { useNavigate } from 'react-router-dom';import {
    Button,
  } from "@material-tailwind/react";
import { logo } from '../assets/logo';

const LandingPage: React.FC = () => {
  const navigate = useNavigate();

  const handleNavigateToLoginPage= () => {
    navigate('/genvision/login');
  };

  return (
    <div className="flex min-h-screen justify-center items-center">
  <div className="text-center">
    <div className="flex-1 justify-center items-center bg-[#FFF] dark:bg-blue-500">
      <img
        className="inline-block align-middle p-4 pb-8"
        src={logo}
        alt="Gen_Vision"
      />
      <h1 className="mb-1 text-2xl font-bold text-[#170F49]">
        Welcome to Gen Vision
      </h1>
    </div>
    <p className="mb-4">Catalog digitalization made easy</p>
    <Button
      className="text-white bg-[#623FC4] text-lg px-6 py-3"
      placeholder="a"
      variant="outlined"
      onClick={handleNavigateToLoginPage}
    >
      Let's Begin
    </Button>
  </div>
</div>

  );
};

export default LandingPage;
