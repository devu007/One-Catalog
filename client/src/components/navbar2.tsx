import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { logo2 } from '../assets/logo'; // Updated import statement for logo2
import { useTranslation } from 'react-i18next';
import { useKindeAuth } from '@kinde-oss/kinde-auth-react';
import { UserOutlined, DollarCircleOutlined } from '@ant-design/icons'; // Updated icon import
import { Button, Dropdown, Menu, Tooltip } from 'antd'; // Ant Design components

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { i18n } = useTranslation();
  const { logout } = useKindeAuth(); // Import the logout function
  const [isOpen, setIsOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false); // State for profile menu
  const languages = ['en', 'fr', 'hi', 'bn'];
  const creditScore = 750; // Example credit score, you can replace it with actual data

  const handleLogOut = async () => {
    try {
      await logout(); // Call the logout function from useKindeAuth
      localStorage.removeItem('user-token');
      localStorage.removeItem('userId');
      navigate('/');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
    setIsOpen(false);
  };

  const profileMenu = (
    <Menu>
      <Menu.Item onClick={() => navigate('/manage-accounts')}>
        Manage Accounts
      </Menu.Item>
      <Menu.Item onClick={() => navigate('/products')}>Contact us</Menu.Item>
      <Menu.Item onClick={handleLogOut}>Log Out</Menu.Item>
    </Menu>
  );

  const languageMenu = (
    <Menu>
      {languages.map(lng => (
        <Menu.Item key={lng} onClick={() => changeLanguage(lng)}>
          {lng}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <nav
      className="mt-2 navbar-hover-glow"
      style={{
        borderBottom: '1px solid #ccc',
        paddingTop: '10px',
        marginRight: '10px',
        marginLeft: '10px',
      }}
    >
      <div style={{ marginLeft: '40px' }}>
        <img
          className="inline-block align-middle pb-8"
          src={logo2}
          alt="Gen_Vision"
        />
        <div className="float-right flex items-center">
          <div className="flex items-center mr-4">
            <DollarCircleOutlined
              className="text-gray-500"
              style={{ fontSize: '24px' }}
            />
            <span className="ml-2 text-gray-700 font-inter">
              <span className="text-lg">{creditScore}</span>
              <span className="text-sm ml-1">credit</span>
            </span>
            <Tooltip title="1 credit = 1 mockup generation">
              <span
                className="ml-1 flex items-center justify-center text-white bg-gray-500 rounded-full"
                style={{
                  width: '16px',
                  height: '16px',
                  fontSize: '12px',
                  lineHeight: '16px',
                  cursor: 'pointer',
                }}
              >
                ?
              </span>
            </Tooltip>
          </div>
          <Button
            type="primary"
            style={{
              backgroundColor: 'white',
              borderColor: '#9400d3',
              borderWidth: '2px',
              color: '#9400d3',
              marginLeft: '10px',
              marginRight: '10px',
            }}
            onClick={() => navigate('/upgrade-plan')}
          >
            Upgrade Plan
          </Button>
          <Dropdown overlay={profileMenu} trigger={['click']}>
            <Button
              icon={<UserOutlined />}
              className="ml-4"
              style={{
                marginRight: '10px',
              }}
            />
          </Dropdown>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
