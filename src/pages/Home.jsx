import React from 'react';
import Header from '../components/Header';
import StatsCards from '../components/StatsCards';
import Attendance from '../components/Attendance';
import Task from '../components/Task';
import { 
  FiAlertCircle, 
  FiX, 
  FiDownload
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
        {/* Top Row - Stats and Attendance */}
        <div className="flex flex-col lg:flex-row gap-6 mb-6">
          <div className="lg:w-[60%]">
            <StatsCards />
          </div>
          <div className="lg:w-[40%]">
            <Attendance />
          </div>
        </div>

        {/* Bottom Row - Task Component */}
        <div className="mt-6">
          <Task />
        </div>
      </div>
    </div>
  );
};

export default Home;