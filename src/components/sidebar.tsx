import { frame, logo, logout } from '../assets/logo';
import { ModeToggle } from './mode-toggle';

function Sidebar() {
  return (
    <div className="flex flex-col  h-screen w-20 shadow-lg shadow-[#dbdbde] dark:shadow-slate-900">
      <div className="flex items-center justify-center h-16 ">
        <img src={logo} alt="Logo" className="w-10 h-8" />
      </div>
      <div className="flex items-center justify-center  m-3 rounded-lg bg-[#F1EEFA99]">
        <img src={frame} alt="Another Image" className="w-9 h-9 m-2" />
      </div>
      <nav className="flex-grow"></nav>
      <ModeToggle />
      <button className="w-12 h-12 p-3 mb-2 mx-auto rounded-full bg-slate-200 hover:bg-slate-100 dark:hover:bg-slate-300">
        <img src={logout} alt="Logout" className="h-full w-full" />
      </button>
    </div>
  );
}

export default Sidebar;
