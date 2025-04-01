import { FiDollarSign, FiAlertCircle } from 'react-icons/fi';
import { useState } from 'react';

export const PayrollAnomalyDetection = () => {
  const [expandedAnomaly, setExpandedAnomaly] = useState(null);

  const anomalies = [
    {
      id: 1,
      type: 'Overtime Spike',
      employee: 'John Smith',
      department: 'Operations',
      amount: '$1,250',
      normalRange: '$400-$600',
      date: 'Last Pay Period',
    },
    {
      id: 2,
      type: 'Bonus Discrepancy',
      employee: 'Marketing Team',
      department: 'Marketing',
      amount: '$5,000',
      normalRange: '$2,000-$3,000',
      date: 'Current Pay Period',
    },
    {
      id: 3,
      type: 'Expense Outlier',
      employee: 'Lisa Wong',
      department: 'Sales',
      amount: '$2,800',
      normalRange: '$800-$1,200',
      date: 'Last Month',
    },
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <FiDollarSign className="mr-2 text-blue-500" />
        <h3 className="text-lg font-semibold">Payroll Anomaly Detection</h3>
      </div>
      <p className="text-gray-600 mb-4">
        Identifies unusual salary transactions or discrepancies in payroll data.
      </p>
      <div className="space-y-3">
        {anomalies.map((anomaly) => (
          <div key={anomaly.id} className="border rounded-lg p-3">
            <div className="flex justify-between items-center">
              <div className="flex items-center">
                <FiAlertCircle className="mr-2 text-yellow-500" />
                <span className="font-medium">{anomaly.type}</span>
              </div>
              <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded">
                {anomaly.amount}
              </span>
            </div>
            <div className="text-sm text-gray-600 mt-1">
              {anomaly.employee} • {anomaly.department}
            </div>
            <button
              onClick={() => setExpandedAnomaly(expandedAnomaly === anomaly.id ? null : anomaly.id)}
              className="text-blue-600 text-xs mt-2 hover:underline"
            >
              {expandedAnomaly === anomaly.id ? 'Hide Details' : 'View Details'}
            </button>
            {expandedAnomaly === anomaly.id && (
              <div className="mt-2 text-sm bg-gray-50 p-2 rounded">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-gray-500">Normal Range:</span>
                    <span className="ml-2">{anomaly.normalRange}</span>
                  </div>
                  <div>
                    <span className="text-gray-500">Date:</span>
                    <span className="ml-2">{anomaly.date}</span>
                  </div>
                </div>
                <div className="mt-2">
                  <span className="text-gray-500">Suggested Action:</span>
                  <span className="ml-2">
                    {anomaly.type.includes('Overtime') ? 'Verify hours with manager' : 
                     anomaly.type.includes('Bonus') ? 'Review approval documentation' : 
                     'Request expense receipts'}
                  </span>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};