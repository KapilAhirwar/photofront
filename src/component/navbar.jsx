// src/components/Navbar.jsx

import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex items-center justify-between shadow-md">
      <div className="text-xl font-bold">
        PhotoConvert
      </div>
      <ul className="hidden md:flex gap-6 text-sm font-medium">
        <li><a href="#resize" className="hover:text-blue-400">Resize</a></li>
        <li><a href="#convert" className="hover:text-blue-400">Convert</a></li>
        <li><a href="#about" className="hover:text-blue-400">About</a></li>
      </ul>
      <button className="md:hidden text-white focus:outline-none">
        <svg className="w-6 h-6 fill-current" viewBox="0 0 24 24">
          <path d="M4 5h16M4 12h16M4 19h16" />
        </svg>
      </button>
    </nav>
  );
};

export default Navbar;
