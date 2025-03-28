// src/components/payroll/PayrollProcessing.jsx
import { useState } from 'react';
import { FiCalendar, FiDownload, FiUpload, FiCheckCircle } from 'react-icons/fi';

const PayrollProcessing = () => {
  const [payPeriod, setPayPeriod] = useState('monthly');
  const [selectedDate, setSelectedDate] = useState('');

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-6">Process Payroll</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          <div>
            <label htmlFor="payPeriod" className="block text-sm font-medium text-gray-700 mb-1">
              Pay Period
            </label>
            <select
              id="payPeriod"
              value={payPeriod}
              onChange={(e) => setPayPeriod(e.target.value)}
              className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
            >
              <option value="weekly">Weekly</option>
              <option value="bi-weekly">Bi-Weekly</option>
              <option value="monthly">Monthly</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="payDate" className="block text-sm font-medium text-gray-700 mb-1">
              Payment Date
            </label>
            <div className="relative rounded-md shadow-sm">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FiCalendar className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="date"
                id="payDate"
                value={selectedDate}
                onChange={(e) => setSelectedDate(e.target.value)}
                className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2"
              />
            </div>
          </div>
        </div>

        <div className="border-t border-gray-200 pt-6">
          <h3 className="text-md font-medium text-gray-900 mb-4">Deductions & Contributions</h3>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount/Percentage</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {[
                  { id: 1, type: 'Income Tax', description: 'Federal income tax', amount: '15%' },
                  { id: 2, type: 'Social Security', description: 'SSN contribution', amount: '6.2%' },
                  { id: 3, type: 'Medicare', description: 'Medicare tax', amount: '1.45%' },
                  { id: 4, type: 'Health Insurance', description: 'Company health plan', amount: '$200' },
                  { id: 5, type: '401(k)', description: 'Retirement plan', amount: '5%' },
                ].map((item) => (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.type}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.description}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.amount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        <div className="mt-6 flex flex-col sm:flex-row justify-end space-y-3 sm:space-y-0 sm:space-x-3">
          <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <FiDownload className="mr-2 h-4 w-4" />
            Export Payroll
          </button>
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <FiCheckCircle className="mr-2 h-4 w-4" />
            Process Payroll
          </button>
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-6">Import Hours & Data</h2>
        <div className="border-2 border-dashed border-gray-300 rounded-lg p-8 text-center">
          <FiUpload className="mx-auto h-12 w-12 text-gray-400" />
          <h3 className="mt-2 text-sm font-medium text-gray-900">Drag and drop files here</h3>
          <p className="mt-1 text-sm text-gray-500">CSV, XLS, or XLSX files</p>
          <div className="mt-6">
            <button className="inline-flex items-center px-4 py-2 border border-gray-300 shadow-sm text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              Browse Files
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PayrollProcessing;