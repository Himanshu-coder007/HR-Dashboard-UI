// src/components/attendance/AttendanceSheet.js
import React from 'react';
import { FiX, FiDownload } from 'react-icons/fi';
import * as XLSX from 'xlsx';

const AttendanceSheet = ({ onClose }) => {
  // Sample attendance data
  const attendanceData = [
    { id: 1, name: 'John Doe', position: 'Developer', present: 22, absent: 1, late: 2, earlyLeave: 1 },
    { id: 2, name: 'Jane Smith', position: 'Designer', present: 21, absent: 2, late: 1, earlyLeave: 0 },
    { id: 3, name: 'Mike Johnson', position: 'Manager', present: 23, absent: 0, late: 0, earlyLeave: 0 },
    { id: 4, name: 'Sarah Williams', position: 'HR', present: 20, absent: 3, late: 1, earlyLeave: 2 },
    { id: 5, name: 'David Brown', position: 'Sales', present: 19, absent: 4, late: 3, earlyLeave: 1 },
    { id: 6, name: 'Emily Davis', position: 'Marketing', present: 18, absent: 5, late: 2, earlyLeave: 1 },
    { id: 7, name: 'Robert Wilson', position: 'Developer', present: 22, absent: 1, late: 0, earlyLeave: 0 },
    { id: 8, name: 'Lisa Taylor', position: 'Designer', present: 21, absent: 2, late: 3, earlyLeave: 1 },
    { id: 9, name: 'James Anderson', position: 'Developer', present: 23, absent: 0, late: 1, earlyLeave: 0 },
    { id: 10, name: 'Emma Thomas', position: 'HR', present: 20, absent: 3, late: 2, earlyLeave: 1 },
  ];

  // Function to export data to Excel
  const exportToExcel = () => {
    // Prepare data for Excel export
    const excelData = attendanceData.map(employee => {
      const totalDays = employee.present + employee.absent;
      const attendancePercentage = Math.round((employee.present / totalDays) * 100);
      
      return {
        'Employee ID': employee.id,
        'Name': employee.name,
        'Position': employee.position,
        'Present Days': employee.present,
        'Absent Days': employee.absent,
        'Late Days': employee.late,
        'Early Leave Days': employee.earlyLeave,
        'Total Working Days': totalDays,
        'Attendance Percentage': `${attendancePercentage}%`,
        'Status': attendancePercentage >= 90 ? 'Excellent' : 
                 attendancePercentage >= 75 ? 'Good' : 'Needs Improvement'
      };
    });

    // Create a worksheet
    const ws = XLSX.utils.json_to_sheet(excelData);
    
    // Create a workbook
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Attendance");
    
    // Generate current date for filename
    const today = new Date();
    const dateString = `${today.getFullYear()}-${(today.getMonth()+1).toString().padStart(2, '0')}-${today.getDate().toString().padStart(2, '0')}`;
    
    // Export the workbook
    XLSX.writeFile(wb, `Attendance_Records_${dateString}.xlsx`);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex flex-col z-50">
      <div className="bg-white rounded-t-lg shadow-xl w-full h-full flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center border-b p-4 sticky top-0 bg-white z-10">
          <div>
            <h2 className="text-2xl font-bold text-gray-800">Attendance Records</h2>
            <p className="text-sm text-gray-500">Month: {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}</p>
          </div>
          <button 
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 p-1 rounded-full hover:bg-gray-100"
          >
            <FiX size={24} />
          </button>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 overflow-auto p-4">
          <div className="overflow-x-auto h-full">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0 z-10">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Present</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Absent</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Late</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Early Leave</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Days</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Attendance %</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {attendanceData.map((employee) => {
                  const totalDays = employee.present + employee.absent;
                  const attendancePercentage = Math.round((employee.present / totalDays) * 100);
                  
                  return (
                    <tr key={employee.id} className="hover:bg-gray-50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.id}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 bg-blue-100 rounded-full flex items-center justify-center text-blue-600 font-bold">
                            {employee.name.charAt(0)}
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                            <div className="text-sm text-gray-500">EMP-{employee.id.toString().padStart(4, '0')}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{employee.position}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-green-600 font-medium">{employee.present}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-red-600 font-medium">{employee.absent}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-yellow-600 font-medium">{employee.late}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-orange-600 font-medium">{employee.earlyLeave}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">{totalDays}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="w-20 bg-gray-200 rounded-full h-2.5 mr-2">
                            <div 
                              className={`h-2.5 rounded-full ${
                                attendancePercentage >= 90 ? 'bg-green-500' : 
                                attendancePercentage >= 75 ? 'bg-blue-500' : 'bg-red-500'
                              }`} 
                              style={{ width: `${attendancePercentage}%` }}
                            ></div>
                          </div>
                          <span className="text-sm font-medium text-gray-700">{attendancePercentage}%</span>
                        </div>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        
        {/* Footer */}
        <div className="border-t p-4 flex justify-between items-center sticky bottom-0 bg-white">
          <div className="text-sm text-gray-500">
            Showing {attendanceData.length} of {attendanceData.length} employees
          </div>
          <div className="flex space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-50 flex items-center"
            >
              Close
            </button>
            <button
              onClick={exportToExcel}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
            >
              <FiDownload className="mr-2" />
              Export to Excel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AttendanceSheet;