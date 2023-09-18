const NavBar = () => {
  return (
    <div className="bg-[#FFFFFF] py-1 px-2 flex justify-between items-center">
      <div className="flex items-center space-x-4">
        <a
          href="#"
          className="text-Black font-semibold tracking-wide px-2 py-1 hover:text-[#623FC4] hover:bg-[#F1EEFA] hover:rounded-md"
        >
          Edit Image
        </a>
        <a
          href="#"
          className="text-Black font-semibold tracking-wide px-2 py-1 hover:text-[#623FC4] hover:bg-[#F1EEFA] hover:rounded-md"
        >
          Mockup
        </a>
        <a
          href="#"
          className="text-Black font-semibold tracking-wide px-2 py-1 hover:text-[#623FC4] hover:bg-[#F1EEFA] hover:rounded-md"
        >
          Text
        </a>
        <a
          href="#"
          className="text-Black font-semibold tracking-wide px-2 py-1 hover:text-[#623FC4] hover:bg-[#F1EEFA] hover:rounded-md"
        >
          Social Media
        </a>
        <a
          href="#"
          className="text-Black font-semibold tracking-wide px-2 py-1 hover:text-[#623FC4] hover:bg-[#F1EEFA] hover:rounded-md"
        >
          3D Model
        </a>
      </div>
      <div className="flex space-x-4">
        <button className="bg-white hover:bg-[#623FC4] hover:text-white text-Black py-2 px-4 rounded">
          Download all
        </button>
        <button className="bg-[#623FC4] hover:bg-white hover:text-black text-white py-2 px-4 rounded">
          Generate all
        </button>
      </div>
    </div>
  );
};

export default NavBar;
