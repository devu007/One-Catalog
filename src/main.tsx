import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  RouterProvider,
  createBrowserRouter,
  useNavigate,
} from 'react-router-dom';
import NavBar from './components/navbar.tsx';
import { ThemeProvider } from './components/theme-provider.tsx';
import UploadImage from './components/uploadimage.tsx';
import './index.css';
import { BaseLayout } from './layouts';
import EditImage from './components/editimage.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <BaseLayout />,
    errorElement: <h1>error insight</h1>,
    children: [
      {
        index: true,
        element: <MeraElement />,
      },
      { path: 'upload', element: <UploadImage /> },
      { path: 'edit', element: <EditImage /> },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <RouterProvider router={router} />
    </ThemeProvider>
  </React.StrictMode>,
);

function MeraElement() {
  const navigate = useNavigate();
  return (
    <div className="dark:bg-blue-500 flex-1 h-full flex p-4 justify-center items-center">
      <button
        type="button"
        className="p-2 px-4 m-1 mx-4 rounded bg-blue-400 text-white"
        onClick={() => navigate('/upload')}
      >
        Go to upload
      </button>
      <button
        type="button"
        className="p-2 px-4 m-1 mx-4 rounded bg-slate-400 text-white"
        onClick={() => navigate('/edit')}
      >
        Go to edit
      </button>
    </div>
  );
}
