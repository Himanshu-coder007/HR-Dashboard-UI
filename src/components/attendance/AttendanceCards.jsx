// src/components/attendance/AttendanceCards.js
import React from 'react';
import { FiUsers, FiCheckCircle, FiXCircle, FiClock } from 'react-icons/fi';

const AttendanceCards = () => {
  const stats = [
    { 
      title: 'Total Employees', 
      value: 124, 
      icon: <FiUsers className="text-3xl text-blue-600" />,
      bgColor: 'bg-blue-100',
      textBgColor: 'bg-blue-600',
      hoverBgColor: 'hover:bg-blue-200',
      textColor: 'text-blue-600'
    },
    { 
      title: 'Present Today', 
      value: 98, 
      icon: <FiCheckCircle className="text-3xl text-green-600" />,
      bgColor: 'bg-green-100',
      textBgColor: 'bg-green-600',
      hoverBgColor: 'hover:bg-green-200',
      textColor: 'text-green-600'
    },
    { 
      title: 'Absent Today', 
      value: 12, 
      icon: <FiXCircle className="text-3xl text-red-600" />,
      bgColor: 'bg-red-100',
      textBgColor: 'bg-red-600',
      hoverBgColor: 'hover:bg-red-200',
      textColor: 'text-red-600'
    },
    { 
      title: 'Late Today', 
      value: 14, 
      icon: <FiClock className="text-3xl text-yellow-600" />,
      bgColor: 'bg-yellow-100',
      textBgColor: 'bg-yellow-600',
      hoverBgColor: 'hover:bg-yellow-200',
      textColor: 'text-yellow-600'
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {stats.map((stat, index) => (
        <div 
          key={index} 
          className={`${stat.bgColor} ${stat.hoverBgColor} p-6 rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 transform hover:-translate-y-1`}
        >
          <div className="flex justify-between items-center">
            <div>
              <span className={`${stat.textBgColor} text-white text-xs font-medium px-2 py-1 rounded-full`}>
                {stat.title}
              </span>
              <p className={`${stat.textColor} text-3xl font-bold mt-3`}>{stat.value}</p>
            </div>
            <div className={`p-3 rounded-full ${stat.bgColor} shadow-md`}>
              {stat.icon}
            </div>
          </div>
          <div className="mt-4">
            <div className="h-1 w-full bg-white rounded-full overflow-hidden">
              <div 
                className={`h-full ${stat.textBgColor}`} 
                style={{ width: `${Math.min(100, (stat.value / 124) * 100)}%` }}
              ></div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AttendanceCards;