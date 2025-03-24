import React from 'react';
import { FiSearch, FiInfo, FiMenu, FiBell } from 'react-icons/fi';

const Header = () => {
  return (
    <header className="sticky top-0 z-10 bg-white border-b border-gray-200">
      <div className="flex items-center justify-between h-16 px-4">
        {/* Search Bar */}
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiSearch className="text-gray-400" />
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Search..."
          />
        </div>

        {/* Right Side Icons */}
        <div className="flex items-center space-x-4 ml-4">
          <button className="p-2 rounded-full hover:bg-gray-100">
            <FiInfo className="text-gray-600 text-xl" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <FiBell className="text-gray-600 text-xl" />
          </button>
          <button className="p-2 rounded-full hover:bg-gray-100">
            <FiMenu className="text-gray-600 text-xl" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;