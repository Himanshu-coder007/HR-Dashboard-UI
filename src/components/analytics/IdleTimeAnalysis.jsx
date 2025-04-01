import { FiPieChart, FiClock } from 'react-icons/fi';
import { useState } from 'react';

export const IdleTimeAnalysis = () => {
  const [selectedDepartment, setSelectedDepartment] = useState('Engineering');

  const departments = ['Engineering', 'Marketing', 'Sales', 'Operations'];
  const idleData = {
    Engineering: [
      { day: 'Monday', idle: 1.5 },
      { day: 'Tuesday', idle: 2.0 },
      { day: 'Wednesday', idle: 1.2 },
      { day: 'Thursday', idle: 1.8 },
      { day: 'Friday', idle: 2.5 },
    ],
    Marketing: [
      { day: 'Monday', idle: 1.2 },
      { day: 'Tuesday', idle: 1.5 },
      { day: 'Wednesday', idle: 1.0 },
      { day: 'Thursday', idle: 1.3 },
      { day: 'Friday', idle: 1.7 },
    ],
    Sales: [
      { day: 'Monday', idle: 0.8 },
      { day: 'Tuesday', idle: 1.0 },
      { day: 'Wednesday', idle: 0.5 },
      { day: 'Thursday', idle: 0.7 },
      { day: 'Friday', idle: 1.2 },
    ],
    Operations: [
      { day: 'Monday', idle: 1.0 },
      { day: 'Tuesday', idle: 1.2 },
      { day: 'Wednesday', idle: 0.8 },
      { day: 'Thursday', idle: 1.1 },
      { day: 'Friday', idle: 1.5 },
    ],
  };

  const averageIdleTime = idleData[selectedDepartment].reduce((sum, day) => sum + day.idle, 0) / idleData[selectedDepartment].length;

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center">
          <FiClock className="mr-2 text-blue-500" />
          <h3 className="text-lg font-semibold">Idle Time Analysis</h3>
        </div>
        <select
          value={selectedDepartment}
          onChange={(e) => setSelectedDepartment(e.target.value)}
          className="border rounded px-3 py-1 text-sm"
        >
          {departments.map((dept) => (
            <option key={dept} value={dept}>
              {dept}
            </option>
          ))}
        </select>
      </div>
      <p className="text-gray-600 mb-4">
        Detect unproductive hours in workflows by department.
      </p>
      <div className="mb-4">
        <div className="text-2xl font-bold text-gray-800">
          {averageIdleTime.toFixed(1)} <span className="text-sm font-normal text-gray-500">hours/day</span>
        </div>
        <div className="text-sm text-gray-600">Average idle time</div>
      </div>
      <div className="space-y-2">
        {idleData[selectedDepartment].map((day, index) => (
          <div key={index} className="flex items-center">
            <div className="w-20 text-sm text-gray-600">{day.day}</div>
            <div className="flex-1">
              <div className="h-4 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-red-500"
                  style={{ width: `${(day.idle / 3) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="w-10 text-right text-sm font-medium">{day.idle} hrs</div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-sm text-gray-600">
        <FiPieChart className="inline mr-1" />
        <span>
          Fridays have {Math.max(...idleData[selectedDepartment].map(d => d.idle)).toFixed(1)}x more idle time than other days
        </span>
      </div>
    </div>
  );
};