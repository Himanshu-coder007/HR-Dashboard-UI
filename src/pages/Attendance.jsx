// src/pages/Attendance.js
import React, { useState } from 'react';
import { FiDownload } from 'react-icons/fi';
import AttendanceCards from '../components/attendance/AttendanceCards';
import AttendanceChart from '../components/attendance/AttendanceChart';
import TopAttendants from '../components/attendance/TopAttendants';
import AttendanceSheet from '../components/attendance/AttendanceSheet';

const Attendance = () => {
  const [showSheet, setShowSheet] = useState(false);

  return (
    <div className="p-6 bg-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Attendance Dashboard</h1>
        <button
          onClick={() => setShowSheet(true)}
          className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition-colors"
        >
          <FiDownload className="mr-2" />
          View Attendance Sheet
        </button>
      </div>
      
      {/* Cards Row */}
      <div className="mb-8">
        <AttendanceCards />
      </div>
      
      {/* Attendance Chart */}
      <div className="bg-white rounded-lg shadow-md p-6 mb-8">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Attendance Report</h2>
        <AttendanceChart />
      </div>
      
      {/* Top Attendants */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-700 mb-4">Top Attendants</h2>
        <TopAttendants />
      </div>

      {/* Attendance Sheet Modal */}
      {showSheet && (
        <AttendanceSheet onClose={() => setShowSheet(false)} />
      )}
    </div>
  );
};

export default Attendance;