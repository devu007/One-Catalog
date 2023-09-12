import { logo, logout, frame } from '../assets/logo';

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
      <div className="py-8 ">
        <img
          src={logout}
          alt="Logout"
          className="w-6 h-6 mx-auto  cursor-pointer"
        />
      </div>
    </div>
  );
}

export default Sidebar;
