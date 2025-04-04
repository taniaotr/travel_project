import React, { useState } from "react";
import logo from "../assets/logo.svg"; 

const Header = (props) => {
  const {onStart, onLogoClick} = props;
  const [menuOpen, setMenuOpen] = useState(false);  

  return (
    <header className="fixed top-0 left-0 w-full bg-white shadow-md z-50">
      <div className="container mx-auto px-18 py-4 flex justify-between items-center">
        <button className="cursor-pointer flex items-center gap-2 text-xl font-bold text-gray-800 font-inter" onClick={onLogoClick}>
          <img src={logo} alt=" TravelAI" className="h-6" />
          TravelAI
        </button>

        <nav className="hidden md:flex gap-6 font-medium text-gray-600 ml-auto">
          <a className="hover:text-gray-900 cursor-pointer">Про нас</a>
          <a className="hover:text-gray-900 cursor-pointer">Як це працює</a>
        </nav>

        <button
          className="hidden md:block btn text-white rounded-full px-6 ml-10 bg-[#205CDE] hover:bg-[#1A4CAF]"
          onClick={onStart}
        >
          Почати планування
        </button>

        <button
          className="md:hidden text-gray-600 focus:outline-none"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          click
        </button>
      </div>
      
      {menuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <nav className="flex flex-col p-4 gap-4 text-gray-600">
            <a className="hover:text-gray-900 cursor-pointer">Про нас</a>
            <a className="hover:text-gray-900 cursor-pointer">Як працює</a>
            <button className="btn bg-primary text-white rounded-full px-6"
            >
              Почати планування
            </button>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Header;
