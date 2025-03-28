// src/components/payroll/EmployeeList.jsx
import { FiSearch, FiDownload, FiPrinter } from 'react-icons/fi';

const EmployeeList = ({ onEmployeeSelect }) => {
  const employees = [
    { id: 1, name: 'John Doe', position: 'Software Engineer', department: 'Engineering', baseSalary: 7500, overtime: 500, deductions: 1500, netPay: 6500, status: 'Paid', paymentDate: '2023-06-15', method: 'Bank Transfer' },
    { id: 2, name: 'Jane Smith', position: 'Product Manager', department: 'Product', baseSalary: 8500, overtime: 200, deductions: 1700, netPay: 7000, status: 'Paid', paymentDate: '2023-06-15', method: 'Bank Transfer' },
    { id: 3, name: 'Robert Johnson', position: 'UX Designer', department: 'Design', baseSalary: 7000, overtime: 300, deductions: 1400, netPay: 5900, status: 'Pending', paymentDate: '', method: '' },
    { id: 4, name: 'Emily Davis', position: 'Marketing Specialist', department: 'Marketing', baseSalary: 6500, overtime: 100, deductions: 1300, netPay: 5300, status: 'Paid', paymentDate: '2023-06-01', method: 'Bank Transfer' },
    { id: 5, name: 'Michael Wilson', position: 'Sales Executive', department: 'Sales', baseSalary: 6000, overtime: 800, deductions: 1200, netPay: 5600, status: 'Paid', paymentDate: '2023-06-01', method: 'Bank Transfer' },
  ];

  return (
    <div className="bg-white shadow rounded-lg p-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 space-y-4 sm:space-y-0">
        <h2 className="text-lg font-medium text-gray-900">Employee Payroll</h2>
        <div className="flex space-x-3">
          <div className="relative rounded-md shadow-sm">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
              <FiSearch className="h-5 w-5 text-gray-400" />
            </div>
            <input
              type="text"
              className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2"
              placeholder="Search employees..."
            />
          </div>
          <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <FiDownload className="mr-2 h-4 w-4" />
            Export
          </button>
          <button className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <FiPrinter className="mr-2 h-4 w-4" />
            Print
          </button>
        </div>
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Position/Dept</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Base Pay</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Overtime</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Deductions</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Net Pay</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-gray-300 flex items-center justify-center text-gray-600">
                      {employee.name.charAt(0)}
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{employee.name}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="text-sm text-gray-900">{employee.position}</div>
                  <div className="text-sm text-gray-500">{employee.department}</div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${employee.baseSalary.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${employee.overtime.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">${employee.deductions.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">${employee.netPay.toLocaleString()}</td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${employee.status === 'Paid' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}`}>
                    {employee.status}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                  <button
                    onClick={() => onEmployeeSelect(employee)}
                    className="text-blue-600 hover:text-blue-900 mr-3"
                  >
                    View
                  </button>
                  <button className="text-gray-600 hover:text-gray-900">Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;