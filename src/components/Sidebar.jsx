import { Link } from 'react-router-dom';
import {
  FiHome,
  FiCheckSquare,
  FiInbox,
  FiCalendar,
  FiFolder,
  FiUsers,
  FiClock,
  FiDollarSign,
  FiUserPlus,
  FiBarChart2,
  FiSettings,
  FiHelpCircle,
  FiLogOut,
} from "react-icons/fi";

const Sidebar = () => {
  return (
    <div className="w-64 h-full bg-white text-gray-800 flex flex-col border-r border-gray-200">
      {/* Company Logo and Name */}
      <div className="p-4 border-b border-gray-200 flex items-center space-x-3">
        <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center text-xl font-bold">
          <span className="text-white">⚡</span>
        </div>
        <h1 className="text-lg font-bold">Efficio</h1>
      </div>

      {/* User Profile Section */}
      <div className="p-4 border-b border-gray-200 flex items-center">
        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center overflow-hidden">
          <img
            src="https://randomuser.me/api/portraits/men/1.jpg"
            alt="Profile"
            className="w-full h-full object-cover"
            onError={(e) => {
              e.target.onerror = null;
              e.target.textContent = "👤";
              e.target.className = "text-xl";
            }}
          />
        </div>
        <div className="ml-3">
          <p className="font-medium">Arnold Smith</p>
          <p className="text-sm text-gray-500">arnoldsmith@gmail.com</p>
        </div>
      </div>

      {/* Navigation Menu with Icons */}
      <nav className="flex-1 overflow-y-auto p-2">
        <div className="mb-1">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-1">
            Main Menu
          </h3>
          <ul className="space-y-0.5">
            <li>
              <Link 
                to="/" 
                className="flex items-center w-full p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <FiHome className="text-lg" />
                <span className="ml-3">Dashboard</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/tasks" 
                className="flex items-center w-full p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <FiCheckSquare className="text-lg" />
                <span className="ml-3">Tasks</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/inbox" 
                className="flex items-center w-full p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <FiInbox className="text-lg" />
                <span className="ml-3">Inbox</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/calender" 
                className="flex items-center w-full p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <FiCalendar className="text-lg" />
                <span className="ml-3">Calendar</span>
              </Link>
            </li>
            <li>
              <button className="flex items-center w-full p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <FiFolder className="text-lg" />
                <span className="ml-3">Projects</span>
              </button>
            </li>
          </ul>
        </div>

        <div className="mb-1">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-1">
            HR Management
          </h3>
          <ul className="space-y-0.5">
            <li>
              <Link 
                to="/employees" 
                className="flex items-center w-full p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <FiUsers className="text-lg" />
                <span className="ml-3">Employees</span>
              </Link>
            </li>
            <li>
              <Link 
                to="/attendance" 
                className="flex items-center w-full p-2 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <FiClock className="text-lg" />
                <span className="ml-3">Attendance</span>
              </Link>
            </li>
            <li>
              <button className="flex items-center w-full p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <FiDollarSign className="text-lg" />
                <span className="ml-3">Payroll</span>
              </button>
            </li>
            <li>
              <button className="flex items-center w-full p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <FiUserPlus className="text-lg" />
                <span className="ml-3">Hiring</span>
              </button>
            </li>
          </ul>
        </div>

        <div className="mb-1">
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider px-3 py-1">
            Analytics & Reports
          </h3>
          <ul className="space-y-0.5">
            <li>
              <button className="flex items-center w-full p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <FiBarChart2 className="text-lg" />
                <span className="ml-3">Reports</span>
              </button>
            </li>
          </ul>
        </div>

        <div>
          <ul className="space-y-0.5">
            <li>
              <button className="flex items-center w-full p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <FiSettings className="text-lg" />
                <span className="ml-3">Settings</span>
              </button>
            </li>
            <li>
              <button className="flex items-center w-full p-2 rounded-lg hover:bg-gray-100 transition-colors">
                <FiHelpCircle className="text-lg" />
                <span className="ml-3">Help & Support</span>
              </button>
            </li>
          </ul>
        </div>
      </nav>

      {/* Logout Section */}
      <div className="p-2 border-t border-gray-200">
        <button className="flex items-center w-full p-2 rounded-lg hover:bg-gray-100 transition-colors">
          <FiLogOut className="text-lg" />
          <span className="ml-3">Logout</span>
        </button>
      </div>

      {/* Plan Information Section */}
      <div className="p-4 border-t border-gray-200 bg-blue-50 mt-auto">
        <div className="flex justify-between items-center mb-1">
          <span className="font-medium text-sm">Basic Plan</span>
          <span className="text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded-full">
            Trial
          </span>
        </div>
        <p className="text-xs text-gray-600 mb-2">Trial ends in 4 days</p>
        <p className="text-xs text-gray-500">
          You are on a free trial of the Basic plan on monthly billing.
        </p>
      </div>
    </div>
  );
};

export default Sidebar;