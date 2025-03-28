// src/components/payroll/EmployeeDetails.jsx
import { FiArrowLeft, FiDownload, FiPrinter } from 'react-icons/fi';

const EmployeeDetails = ({ employee, onBack }) => {
  const payrollHistory = [
    { id: 1, period: 'June 2023', grossPay: 8000, deductions: 1500, netPay: 6500, status: 'Paid', paymentDate: '2023-06-15' },
    { id: 2, period: 'May 2023', grossPay: 8000, deductions: 1500, netPay: 6500, status: 'Paid', paymentDate: '2023-05-15' },
    { id: 3, period: 'April 2023', grossPay: 8000, deductions: 1500, netPay: 6500, status: 'Paid', paymentDate: '2023-04-15' },
    { id: 4, period: 'March 2023', grossPay: 8000, deductions: 1500, netPay: 6500, status: 'Paid', paymentDate: '2023-03-15' },
  ];

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex items-center mb-6">
        <button
          onClick={onBack}
          className="mr-4 p-2 rounded-full hover:bg-gray-100"
        >
          <FiArrowLeft className="h-5 w-5 text-gray-600" />
        </button>
        <h2 className="text-lg font-medium text-gray-900">Employee Payroll Details</h2>
      </div>
      
      <div className="border-b border-gray-200 pb-6 mb-6">
        <div className="flex items-start">
          <div className="flex-shrink-0 h-16 w-16 rounded-full bg-gray-300 flex items-center justify-center text-gray-600 text-2xl font-bold">
            {employee.name.charAt(0)}
          </div>
          <div className="ml-4">
            <h3 className="text-lg font-medium text-gray-900">{employee.name}</h3>
            <p className="text-sm text-gray-500">{employee.position}</p>
            <p className="text-sm text-gray-500">{employee.department} Department</p>
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-gray-500 mb-2">Salary Information</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-700">Base Salary:</span>
              <span className="text-sm font-medium text-gray-900">${employee.baseSalary.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-700">Overtime Pay:</span>
              <span className="text-sm font-medium text-gray-900">${employee.overtime.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-700">Gross Pay:</span>
              <span className="text-sm font-medium text-gray-900">${(employee.baseSalary + employee.overtime).toLocaleString()}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-gray-50 p-4 rounded-lg">
          <h4 className="text-sm font-medium text-gray-500 mb-2">Deductions</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-sm text-gray-700">Tax:</span>
              <span className="text-sm font-medium text-gray-900">${(employee.deductions * 0.6).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-700">Insurance:</span>
              <span className="text-sm font-medium text-gray-900">${(employee.deductions * 0.3).toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-gray-700">Other:</span>
              <span className="text-sm font-medium text-gray-900">${(employee.deductions * 0.1).toLocaleString()}</span>
            </div>
            <div className="flex justify-between border-t border-gray-200 pt-2 mt-2">
              <span className="text-sm font-medium text-gray-700">Total Deductions:</span>
              <span className="text-sm font-medium text-gray-900">${employee.deductions.toLocaleString()}</span>
            </div>
          </div>
        </div>
      </div>
      
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-md font-medium text-gray-900">Net Pay</h3>
        <span className="text-2xl font-bold text-gray-900">${employee.netPay.toLocaleString()}</span>
      </div>
      
      <div className="border-t border-gray-200 pt-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-md font-medium text-gray-900">Payroll History</h3>
          <div className="flex space-x-2">
            <button className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <FiDownload className="mr-1 h-4 w-4" />
              Export
            </button>
            <button className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              <FiPrinter className="mr-1 h-4 w-4" />
              Print
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Period</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gross Pay</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deductions</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net Pay</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {payrollHistory.map((item) => (
                <tr key={item.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.period}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.grossPay.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${item.deductions.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${item.netPay.toLocaleString()}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${item.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.paymentDate}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                    <button className="text-blue-600 hover:text-blue-900">View Payslip</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;