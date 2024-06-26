import React from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ThemeProvider } from './components/theme-provider.tsx';
import UploadImage from './components/uploadimage.tsx';
import './index.css';
import { BaseLayout } from './layouts';
import EditImage from './components/editimage.tsx';
import Mockup from './components/mockup.tsx';
import SocialMedia from './components/socialmedia.tsx';
import Model from './components/3dmodel.tsx';
import Prompt from './components/prompt.tsx';
import Login from './components/loginpage.tsx';
import Dashboard from './components/dashboard.tsx';
import LandingPage from './components/landingPage.tsx';
import Text from './components/text.tsx';
import { I18nextProvider } from 'react-i18next';
import i18next from 'i18next';
import Mockup2 from './components/mockup2.tsx';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import ProfilePage from './components/profilePage.tsx';
import { KindeProvider } from '@kinde-oss/kinde-auth-react';
import KindeCallback from './components/KindeCallback.tsx';

i18next.init({
  interpolation: { escapeValue: false }, // React already does escaping
});

const router = createBrowserRouter([
  {
    path: '/',
    element: <LandingPage />,
  },
  {
    path: '/genvision',
    element: <LandingPage />,
  },
  {
    path: '/login',
    element: <Login isKinde={true} />,
  },
  {
    path: '/callback',
    element: <KindeCallback />,
  },
  {
    path: '/genvision/:userId',
    element: <Dashboard />,
  },
  {
    path: '/genvision/:userId/upload-image',
    element: <UploadImage />,
  },
  {
    path: '/genvision/:userId/:productId',
    element: <BaseLayout />,
    errorElement: <h1>error insight</h1>,
    children: [
      {
        index: true,
      },
      {
        path: '/genvision/:userId/:productId/profile',
        element: <ProfilePage />,
      },
      {
        path: '/genvision/:userId/:productId/upload-image',
        element: <UploadImage />,
      },
      {
        path: '/genvision/:userId/:productId/edit',
        element: <EditImage />,
      },
      {
        path: '/genvision/:userId/:productId/mockup/1',
        element: <Mockup />,
      },
      {
        path: '/genvision/:userId/:productId/mockup/2',
        element: <Mockup2 />,
      },
      {
        path: '/genvision/:userId/:productId/text',
        element: <Text />,
      },
      {
        path: '/genvision/:userId/:productId/social-media',
        element: <SocialMedia />,
      },
      {
        path: '/genvision/:userId/:productId/3d-model',
        element: <Model />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <KindeProvider
      domain={import.meta.env.VITE_KINDE_DOMAIN}
      clientId={import.meta.env.VITE_KINDE_CLIENT_ID}
      redirectUri={import.meta.env.VITE_KINDE_REDIRECT_URI}
      logoutUri={import.meta.env.VITE_KINDE_LOGOUT_REDIRECT_URI}
    >
      <div>
        <ToastContainer
          position="top-right"
          autoClose={2500}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
        />
      </div>
      <I18nextProvider i18n={i18next}>
        <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
          <RouterProvider router={router} />
        </ThemeProvider>
      </I18nextProvider>
    </KindeProvider>
  </React.StrictMode>,
);
