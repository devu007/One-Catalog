import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/navbar';
import KindeCallback from './components/KindeCallback';
import Login from './components/loginpage';
import Home from './components/Home';
import Dashboard from './components/dashboard';
import UploadImage from './components/uploadimage';
import PrivateRoute from './PrivateRoute';

export default function App() {
  return (
    <Router>
      <div className="flex overflow-auto">
        <div className="flex-grow">
          <div className="p-4">
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/callback" element={<KindeCallback />} />
              <Route path="/login" element={<Login isKinde={true} />} />
              <Route
                path="/genvision/:userId"
                element={
                  <PrivateRoute>
                    <Dashboard />
                  </PrivateRoute>
                }
              />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}
