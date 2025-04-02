import { FiUsers, FiAlertTriangle, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import { useState } from 'react';

export const AttritionPrediction = () => {
  const [showDetails, setShowDetails] = useState(false);
  const atRiskEmployees = [
    { name: 'Sarah Johnson', department: 'Engineering', riskScore: 78 },
    { name: 'Michael Chen', department: 'Marketing', riskScore: 65 },
    { name: 'David Wilson', department: 'Sales', riskScore: 72 },
    { name: 'Emily Rodriguez', department: 'HR', riskScore: 59 },
    { name: 'James Peterson', department: 'Engineering', riskScore: 81 },
  ];

  // Function to determine risk level color
  const getRiskColor = (score) => {
    if (score >= 75) return 'bg-gradient-to-r from-red-500 to-rose-600';
    if (score >= 60) return 'bg-gradient-to-r from-amber-400 to-orange-500';
    return 'bg-gradient-to-r from-yellow-300 to-amber-400';
  };

  // Function to determine risk level text
  const getRiskLevel = (score) => {
    if (score >= 75) return 'Critical Risk';
    if (score >= 60) return 'High Risk';
    return 'Moderate Risk';
  };

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg border border-gray-100 hover:shadow-md transition-shadow duration-300">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-indigo-50 rounded-lg">
            <FiUsers className="text-indigo-600 text-xl" />
          </div>
          <h3 className="text-xl font-semibold text-gray-800">Employee Attrition Prediction</h3>
        </div>
        <span className="px-3 py-1 bg-rose-100 text-rose-800 text-sm font-medium rounded-full animate-pulse">
          {getRiskLevel(Math.max(...atRiskEmployees.map(e => e.riskScore)))}
        </span>
      </div>
      
      <p className="text-gray-500 mb-6 leading-relaxed">
        Our predictive model has identified employees at risk of leaving based on engagement metrics, 
        performance indicators, and behavioral patterns.
      </p>
      
      <div className="space-y-4 mb-6">
        {atRiskEmployees.slice(0, 3).map((employee, index) => (
          <div key={index} className="flex justify-between items-center group">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-medium">
                {employee.name.charAt(0)}
              </div>
              <div>
                <p className="font-medium text-gray-800">{employee.name}</p>
                <p className="text-xs text-gray-400">{employee.department}</p>
              </div>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-28 bg-gray-100 rounded-full h-2">
                <div
                  className={`h-2 rounded-full ${getRiskColor(employee.riskScore)}`}
                  style={{ width: `${employee.riskScore}%` }}
                ></div>
              </div>
              <span className={`text-sm font-semibold w-8 text-right ${
                employee.riskScore >= 75 ? 'text-rose-600' : 
                employee.riskScore >= 60 ? 'text-orange-500' : 'text-amber-500'
              }`}>
                {employee.riskScore}%
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <button
        onClick={() => setShowDetails(!showDetails)}
        className="flex items-center text-indigo-600 text-sm font-medium hover:text-indigo-800 transition-colors"
      >
        {showDetails ? (
          <>
            <FiChevronUp className="mr-1" />
            Hide Details
          </>
        ) : (
          <>
            <FiChevronDown className="mr-1" />
            View All {atRiskEmployees.length} At-Risk Employees
          </>
        )}
      </button>
      
      {showDetails && (
        <div className="mt-6 p-5 bg-gradient-to-br from-gray-50 to-gray-100 rounded-xl animate-fadeIn">
          <div className="mb-4">
            <h4 className="font-medium text-gray-800 mb-3 flex items-center">
              <FiAlertTriangle className="mr-2 text-amber-500" />
              Risk Indicators Detected
            </h4>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm text-gray-600">
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-rose-500 rounded-full mr-2"></span>
                Decreased activity in collaboration tools
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-amber-500 rounded-full mr-2"></span>
                Lower performance scores in recent reviews
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-2"></span>
                Increased PTO usage patterns
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-red-400 rounded-full mr-2"></span>
                Limited participation in company events
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-rose-400 rounded-full mr-2"></span>
                Reduced network interactions
              </li>
              <li className="flex items-center">
                <span className="w-1.5 h-1.5 bg-pink-500 rounded-full mr-2"></span>
                Negative sentiment in feedback
              </li>
            </ul>
          </div>
          
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-left text-gray-500">
              <thead className="text-xs text-gray-700 bg-gray-100/50">
                <tr>
                  <th className="px-4 py-2 rounded-l-lg">Employee</th>
                  <th className="px-4 py-2">Department</th>
                  <th className="px-4 py-2">Risk Score</th>
                  <th className="px-4 py-2 rounded-r-lg">Risk Level</th>
                </tr>
              </thead>
              <tbody>
                {atRiskEmployees.map((employee, index) => (
                  <tr key={index} className="border-b border-gray-100 hover:bg-gray-50/50">
                    <td className="px-4 py-3 font-medium text-gray-800">{employee.name}</td>
                    <td className="px-4 py-3">{employee.department}</td>
                    <td className="px-4 py-3">
                      <div className="flex items-center">
                        <div className="w-16 bg-gray-200 rounded-full h-1.5 mr-2">
                          <div
                            className={`h-1.5 rounded-full ${getRiskColor(employee.riskScore)}`}
                            style={{ width: `${employee.riskScore}%` }}
                          ></div>
                        </div>
                        {employee.riskScore}%
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        employee.riskScore >= 75 ? 'bg-rose-100 text-rose-800' : 
                        employee.riskScore >= 60 ? 'bg-amber-100 text-amber-800' : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {getRiskLevel(employee.riskScore)}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-xs text-gray-500">
              Last updated: {new Date().toLocaleDateString()} | Model version: 2.4.1
            </p>
          </div>
        </div>
      )}
      
      <style jsx>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 0.3s ease-out forwards;
        }
      `}</style>
    </div>
  );
};