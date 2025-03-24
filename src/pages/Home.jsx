import React from 'react';
import Header from '../components/Header';
import { 
  FiAlertCircle, 
  FiX, 
  FiDownload,
  FiUsers,
  FiBriefcase,
  FiDollarSign,
  FiClock,
  FiTrendingUp,
  FiTrendingDown,
  FiChevronRight
} from 'react-icons/fi';

const Home = () => {
  return (
    <div className="flex flex-col h-full bg-white">
      <Header />
      
      {/* Notification Banner */}
      <div className="bg-white border border-gray-200 rounded-lg mx-4 mt-3 px-3 py-2 flex items-center justify-between">
        <div className="flex items-center justify-center w-full">
          <FiAlertCircle className="text-blue-500 mr-2 text-sm" />
          <p className="text-xs text-gray-600 text-center">
            Optimize your Efficio experience - track attendance, manage teams, and streamline HR operations effortlessly!
          </p>
        </div>
        <button className="text-gray-400 hover:text-gray-600 ml-2">
          <FiX className="text-sm" />
        </button>
      </div>

      {/* Greeting and Date with Export Button */}
      <div className="mx-6 mt-4 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-gray-800">Hello, Arnold Smith</h2>
          <p className="text-sm text-gray-500">Wednesday, 06 March 2025</p>
        </div>
        <button className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm transition-colors">
          <FiDownload className="text-sm" />
          <span>Export</span>
        </button>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-6 overflow-y-auto">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>
        
        {/* Stats Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Total Employees Card */}
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-blue-50 text-blue-600">
                  <FiUsers className="text-lg" />
                </div>
                <h3 className="text-sm font-medium text-gray-500">Total Employees</h3>
              </div>
              <button className="text-blue-500 hover:text-blue-700 text-sm flex items-center">
                Details <FiChevronRight className="ml-1" />
              </button>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-gray-800">173</p>
              <div className="flex items-center mt-1">
                <FiTrendingUp className="text-green-500 mr-1" />
                <span className="text-xs text-green-500">+16 from last month</span>
              </div>
            </div>
          </div>

          {/* Job Applicants Card */}
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-purple-50 text-purple-600">
                  <FiBriefcase className="text-lg" />
                </div>
                <h3 className="text-sm font-medium text-gray-500">Job Applicants</h3>
              </div>
              <button className="text-blue-500 hover:text-blue-700 text-sm flex items-center">
                Details <FiChevronRight className="ml-1" />
              </button>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-gray-800">983</p>
              <div className="flex items-center mt-1">
                <FiTrendingUp className="text-green-500 mr-1" />
                <span className="text-xs text-green-500">+32 from last month</span>
              </div>
            </div>
          </div>

          {/* Total Revenue Card */}
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-green-50 text-green-600">
                  <FiDollarSign className="text-lg" />
                </div>
                <h3 className="text-sm font-medium text-gray-500">Total Revenue</h3>
              </div>
              <button className="text-blue-500 hover:text-blue-700 text-sm flex items-center">
                Details <FiChevronRight className="ml-1" />
              </button>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-gray-800">$4,842.00</p>
              <div className="flex items-center mt-1">
                <FiTrendingUp className="text-green-500 mr-1" />
                <span className="text-xs text-green-500">+$3,834.00 from last month</span>
              </div>
            </div>
          </div>

          {/* Attendance Rate Card */}
          <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="p-2 rounded-full bg-orange-50 text-orange-600">
                  <FiClock className="text-lg" />
                </div>
                <h3 className="text-sm font-medium text-gray-500">Attendance Rate</h3>
              </div>
              <button className="text-blue-500 hover:text-blue-700 text-sm flex items-center">
                Details <FiChevronRight className="ml-1" />
              </button>
            </div>
            <div className="mt-4">
              <p className="text-2xl font-bold text-gray-800">75%</p>
              <div className="flex items-center mt-1">
                <FiTrendingDown className="text-red-500 mr-1" />
                <span className="text-xs text-red-500">-6.4% from last month</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;