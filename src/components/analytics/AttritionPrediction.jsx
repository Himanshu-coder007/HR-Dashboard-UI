import { FiUsers, FiAlertTriangle } from 'react-icons/fi';
import { useState } from 'react';

export const AttritionPrediction = () => {
  const [showDetails, setShowDetails] = useState(false);
  const atRiskEmployees = [
    { name: 'Sarah Johnson', department: 'Engineering', riskScore: 78 },
    { name: 'Michael Chen', department: 'Marketing', riskScore: 65 },
    { name: 'David Wilson', department: 'Sales', riskScore: 72 },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold flex items-center">
          <FiUsers className="mr-2 text-blue-500" />
          Employee Attrition Prediction
        </h3>
        <span className="px-3 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">
          High Risk
        </span>
      </div>
      <p className="text-gray-600 mb-4">
        Machine learning identifies employees at risk of leaving based on engagement, performance,
        and other factors.
      </p>
      <div className="space-y-3 mb-4">
        {atRiskEmployees.map((employee, index) => (
          <div key={index} className="flex justify-between items-center">
            <div>
              <p className="font-medium">{employee.name}</p>
              <p className="text-sm text-gray-500">{employee.department}</p>
            </div>
            <div className="w-24 bg-gray-200 rounded-full h-2.5">
              <div
                className="bg-red-500 h-2.5 rounded-full"
                style={{ width: `${employee.riskScore}%` }}
              ></div>
            </div>
            <span className="text-sm font-medium">{employee.riskScore}%</span>
          </div>
        ))}
      </div>
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="text-blue-600 text-sm font-medium hover:underline"
      >
        {showDetails ? 'Hide Details' : 'View All At-Risk Employees'}
      </button>
      {showDetails && (
        <div className="mt-4 p-4 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-600 mb-2">
            <FiAlertTriangle className="inline mr-1 text-yellow-500" />
            These employees show signs of disengagement based on:
          </p>
          <ul className="list-disc pl-5 text-sm text-gray-600 space-y-1">
            <li>Decreased activity in collaboration tools</li>
            <li>Lower performance scores in recent reviews</li>
            <li>Increased PTO usage patterns</li>
            <li>Limited participation in optional company events</li>
          </ul>
        </div>
      )}
    </div>
  );
};