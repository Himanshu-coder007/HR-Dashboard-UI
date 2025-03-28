// src/components/attendance/TopAttendants.js
import React from 'react';
import { FiAward } from 'react-icons/fi';

const TopAttendants = () => {
  const topAttendants = [
    { id: 1, name: 'John Doe', department: 'Development', presentDays: 24, avatar: 'JD' },
    { id: 2, name: 'Jane Smith', department: 'Design', presentDays: 23, avatar: 'JS' },
    { id: 3, name: 'Mike Johnson', department: 'Marketing', presentDays: 22, avatar: 'MJ' },
    { id: 4, name: 'Sarah Williams', department: 'HR', presentDays: 21, avatar: 'SW' },
    { id: 5, name: 'David Brown', department: 'Sales', presentDays: 20, avatar: 'DB' }
  ];

  return (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Employee
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Department
            </th>
            <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Present Days (This Month)
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {topAttendants.map((attendant, index) => (
            <tr key={attendant.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-medium">
                    {attendant.avatar}
                  </div>
                  <div className="ml-4">
                    <div className="text-sm font-medium text-gray-900">
                      {attendant.name}
                      {index < 3 && (
                        <FiAward className="inline-block ml-2 text-yellow-500" />
                      )}
                    </div>
                  </div>
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-500">{attendant.department}</div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="w-24 bg-gray-200 rounded-full h-2.5 mr-2">
                    <div 
                      className="bg-green-600 h-2.5 rounded-full" 
                      style={{ width: `${(attendant.presentDays / 24) * 100}%` }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium text-gray-700">
                    {attendant.presentDays}/24
                  </span>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TopAttendants;