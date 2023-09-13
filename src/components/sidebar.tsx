import { frame, logo, logout } from '../assets/logo';
import { ModeToggle } from './mode-toggle';

function Sidebar() {
  return (
    <div className="flex flex-col  h-screen w-20 shadow-lg shadow-[#dbdbde] bg-[#FFF]">
      <div className="flex items-center justify-center h-16 bg-[#FFF]">
        <img src={logo} alt="Logo" className="w-10 h-8" />
      </div>
      <div className="flex items-center justify-center  mx-3 my-5 h-16 rounded-lg bg-[#F1EEFA]">
        <img src={frame} alt="Another Image" className="w-9 h-9 " />
      </div>
      <nav className="flex-grow"></nav>
      <ModeToggle />
      <button className="w-12 h-12 p-3 mb-2 mx-auto rounded-full hover:bg-slate-100 dark:hover:bg-red-400">
        <img src={logout} alt="Logout" className="h-full w-full" />
      </button>
    </div>
  );
}

export default Sidebar;
