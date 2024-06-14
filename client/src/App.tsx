import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import NavBar from './components/navbar';
import Pricing from './components/plans-page';
import UploadImage from './components/uploadimage';
import { ModeToggle } from './components/mode-toggle';
import AmazonCallback from './components/AmazonCallback';

export default function App() {
  return (
    <Router>
      <div className="flex overflow-auto">
        <div className="flex-grow">
          <div className="p-4">
            <NavBar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/callback" element={<AmazonCallback />} />
            </Routes>
          </div>
        </div>
      </div>
    </Router>
  );
}

function Home() {
  return (
    <>
      <UploadImage />
      <ModeToggle />
      <Pricing />
    </>
  );
}
