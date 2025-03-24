import React from 'react';
import { 
  FiUsers, 
  FiBriefcase, 
  FiDollarSign, 
  FiClock,
  FiTrendingUp,
  FiTrendingDown,
  FiChevronRight
} from 'react-icons/fi';

const StatsCards = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
      {/* Card 1: Total Employees */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
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

      {/* Card 2: Job Applicants */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
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

      {/* Card 3: Total Revenue */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
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

      {/* Card 4: Attendance Rate */}
      <div className="bg-white p-4 rounded-lg border border-gray-200 shadow-sm">
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
  );
};

export default StatsCards;