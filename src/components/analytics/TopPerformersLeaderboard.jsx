import { FiAward, FiStar, FiTrendingUp } from 'react-icons/fi';

export const TopPerformersLeaderboard = () => {
  const topPerformers = [
    { name: 'Alex Johnson', department: 'Engineering', score: 98, trend: 'up' },
    { name: 'Maria Garcia', department: 'Sales', score: 96, trend: 'up' },
    { name: 'David Kim', department: 'Marketing', score: 94, trend: 'steady' },
    { name: 'Sarah Williams', department: 'Operations', score: 92, trend: 'up' },
    { name: 'James Wilson', department: 'Engineering', score: 90, trend: 'down' },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <FiAward className="mr-2 text-blue-500" />
        <h3 className="text-lg font-semibold">Top Performers Leaderboard</h3>
      </div>
      <p className="text-gray-600 mb-4">
        Employees with the highest performance scores across the company.
      </p>
      <div className="space-y-3">
        {topPerformers.map((employee, index) => (
          <div key={index} className="flex items-center p-3 bg-gray-50 rounded-lg">
            <div className="w-8 h-8 flex items-center justify-center bg-blue-100 text-blue-600 rounded-full mr-3">
              {index + 1}
            </div>
            <div className="flex-1">
              <div className="font-medium">{employee.name}</div>
              <div className="text-sm text-gray-500">{employee.department}</div>
            </div>
            <div className="flex items-center">
              <div className="w-24 bg-gray-200 rounded-full h-2.5 mr-3">
                <div
                  className="bg-blue-500 h-2.5 rounded-full"
                  style={{ width: `${employee.score}%` }}
                ></div>
              </div>
              <div className="text-sm font-medium w-10 text-right">{employee.score}</div>
              <div className="ml-2">
                {employee.trend === 'up' && <FiTrendingUp className="text-green-500" />}
                {employee.trend === 'steady' && <FiStar className="text-yellow-500" />}
                {employee.trend === 'down' && <FiTrendingUp className="text-red-500 transform rotate-180" />}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 text-sm text-gray-600">
        <p>
          Performance scores based on productivity, quality, collaboration, and goal achievement metrics.
        </p>
      </div>
    </div>
  );
};