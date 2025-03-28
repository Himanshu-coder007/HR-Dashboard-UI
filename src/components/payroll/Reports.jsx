// src/components/payroll/Reports.jsx
import { useState } from 'react';
import { FiDownload, FiCalendar, FiFilter } from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const Reports = () => {
  const [reportType, setReportType] = useState('monthly');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const payrollData = [
    { name: 'Jan', payroll: 120000, tax: 24000, benefits: 18000 },
    { name: 'Feb', payroll: 125000, tax: 25000, benefits: 18750 },
    { name: 'Mar', payroll: 130000, tax: 26000, benefits: 19500 },
    { name: 'Apr', payroll: 118000, tax: 23600, benefits: 17700 },
    { name: 'May', payroll: 135000, tax: 27000, benefits: 20250 },
    { name: 'Jun', payroll: 140000, tax: 28000, benefits: 21000 },
  ];

  const taxData = [
    { name: 'Federal', amount: 65000, percentage: '45%' },
    { name: 'State', amount: 35000, percentage: '25%' },
    { name: 'Social Security', amount: 22000, percentage: '15%' },
    { name: 'Medicare', amount: 18000, percentage: '12%' },
    { name: 'Other', amount: 5000, percentage: '3%' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
          <h2 className="text-lg font-medium text-gray-900">Payroll Reports</h2>
          <div className="flex space-x-3">
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="monthly">Monthly</option>
              <option value="quarterly">Quarterly</option>
              <option value="yearly">Yearly</option>
              <option value="custom">Custom Range</option>
            </select>
            
            {reportType === 'custom' && (
              <div className="flex items-center space-x-2">
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiCalendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2"
                  />
                </div>
                <span className="text-gray-500">to</span>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiCalendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2"
                  />
                </div>
              </div>
            )}
            
            <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <FiFilter className="mr-1 h-4 w-4" />
              Filter
            </button>
            
            <button className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <FiDownload className="mr-1 h-4 w-4" />
              Export
            </button>
          </div>
        </div>

        <div className="space-y-8">
          <div>
            <h3 className="text-md font-medium text-gray-900 mb-4">Payroll Overview</h3>
            <div className="h-80">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={payrollData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Legend />
                  <Bar dataKey="payroll" fill="#3B82F6" name="Total Payroll" />
                  <Bar dataKey="tax" fill="#EF4444" name="Taxes" />
                  <Bar dataKey="benefits" fill="#10B981" name="Benefits" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-900 mb-4">Tax Breakdown</h4>
              <div className="space-y-3">
                {taxData.map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700">{item.name}</span>
                      <span className="font-medium text-gray-900">${item.amount.toLocaleString()} ({item.percentage})</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-blue-600 h-2 rounded-full" 
                        style={{ width: item.percentage }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white border border-gray-200 rounded-lg p-4">
              <h4 className="text-sm font-medium text-gray-900 mb-4">Department Costs</h4>
              <div className="space-y-3">
                {[
                  { name: 'Engineering', cost: 65000, percentage: '46%' },
                  { name: 'Product', cost: 35000, percentage: '25%' },
                  { name: 'Marketing', cost: 22000, percentage: '16%' },
                  { name: 'Sales', cost: 18000, percentage: '13%' },
                ].map((item, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-700">{item.name}</span>
                      <span className="font-medium text-gray-900">${item.cost.toLocaleString()} ({item.percentage})</span>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className="bg-green-600 h-2 rounded-full" 
                        style={{ width: item.percentage }}
                      ></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-md font-medium text-gray-900 mb-4">Detailed Report</h3>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employees</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gross Pay</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tax</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Benefits</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net Pay</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {payrollData.map((item, index) => (
                    <tr key={index}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.name} 2023</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">85</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.payroll.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.tax.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.benefits.toLocaleString()}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${(item.payroll - item.tax - item.benefits).toLocaleString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;