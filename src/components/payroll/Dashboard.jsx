// src/components/payroll/Dashboard.jsx
import { FiDollarSign, FiUsers, FiCalendar, FiFileText } from 'react-icons/fi';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, Cell } from 'recharts';
import { useState } from 'react';

const payrollData = [
  { name: 'Jan', payroll: 120000, bonus: 15000, employees: 115 },
  { name: 'Feb', payroll: 125000, bonus: 18000, employees: 118 },
  { name: 'Mar', payroll: 130000, bonus: 20000, employees: 122 },
  { name: 'Apr', payroll: 118000, bonus: 12000, employees: 120 },
  { name: 'May', payroll: 135000, bonus: 22000, employees: 123 },
  { name: 'Jun', payroll: 140000, bonus: 25000, employees: 124 },
];

const PayrollDashboard = () => {
  const [activeIndex, setActiveIndex] = useState(null);
  const [showBonus, setShowBonus] = useState(true);

  const handleBarEnter = (_, index) => {
    setActiveIndex(index);
  };

  const handleBarLeave = () => {
    setActiveIndex(null);
  };

  // Calculate metrics
  const totalPayroll = payrollData.reduce((sum, month) => sum + month.payroll, 0);
  const avgPayroll = Math.round(totalPayroll / payrollData.length);
  const currentEmployees = payrollData[payrollData.length - 1].employees;
  const payrollGrowth = ((payrollData[payrollData.length - 1].payroll - payrollData[0].payroll) / payrollData[0].payroll * 100);

  return (
    <div className="space-y-6 p-4">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {/* Total Payroll Card */}
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-blue-100 text-blue-600">
              <FiDollarSign className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Total Payroll</h3>
              <p className="text-2xl font-semibold text-gray-900">
                ${(totalPayroll / 1000).toLocaleString()}k
              </p>
              <p className="text-xs text-gray-500 mt-1">
                {payrollGrowth.toFixed(1)}% vs first period
              </p>
            </div>
          </div>
        </div>
        
        {/* Employees Card */}
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-green-100 text-green-600">
              <FiUsers className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Employees</h3>
              <p className="text-2xl font-semibold text-gray-900">{currentEmployees}</p>
              <p className="text-xs text-gray-500 mt-1">
                +{currentEmployees - payrollData[0].employees} since Jan
              </p>
            </div>
          </div>
        </div>
        
        {/* Next Payroll Card */}
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-purple-100 text-purple-600">
              <FiCalendar className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Next Payroll</h3>
              <p className="text-2xl font-semibold text-gray-900">Jun 30</p>
              <p className="text-xs text-gray-500 mt-1">
                ${Math.round(avgPayroll / 1000)}k estimated
              </p>
            </div>
          </div>
        </div>
        
        {/* Pending Card */}
        <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
          <div className="flex items-center">
            <div className="p-3 rounded-full bg-yellow-100 text-yellow-600">
              <FiFileText className="h-6 w-6" />
            </div>
            <div className="ml-4">
              <h3 className="text-sm font-medium text-gray-500">Pending</h3>
              <p className="text-2xl font-semibold text-gray-900">3</p>
              <p className="text-xs text-gray-500 mt-1">
                2 approvals needed
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Payroll Chart */}
      <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">Payroll Overview</h2>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setShowBonus(true)}
              className={`px-3 py-1 text-sm rounded ${showBonus ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
            >
              With Bonuses
            </button>
            <button 
              onClick={() => setShowBonus(false)}
              className={`px-3 py-1 text-sm rounded ${!showBonus ? 'bg-blue-100 text-blue-600' : 'bg-gray-100 text-gray-600'}`}
            >
              Base Only
            </button>
          </div>
        </div>
        <div className="h-80">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={payrollData}
              margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              onMouseLeave={handleBarLeave}
            >
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
              <XAxis 
                dataKey="name" 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#6b7280' }}
              />
              <YAxis 
                axisLine={false} 
                tickLine={false} 
                tick={{ fill: '#6b7280' }}
                tickFormatter={(value) => `$${(value / 1000)}k`}
              />
              {/* <Tooltip 
                formatter={(value) => [`$${value.toLocaleString()}`, showBonus ? 'Total Compensation' : 'Base Payroll']}
                labelFormatter={(label) => `Month: ${label}`}
                contentStyle={{
                  borderRadius: '8px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  border: 'none'
                }}
              /> */}
              <Legend />
              <Bar 
                dataKey={showBonus ? "payroll" : (d) => d.payroll - d.bonus} 
                name={showBonus ? "Total Compensation" : "Base Payroll"}
                fill="#3B82F6"
                radius={[4, 4, 0, 0]}
                animationDuration={1500}
                onMouseEnter={handleBarEnter}
              >
                {payrollData.map((entry, index) => (
                  <Cell 
                    key={`cell-${index}`} 
                    fill={activeIndex === index ? '#1D4ED8' : '#3B82F6'} 
                  />
                ))}
              </Bar>
              {showBonus && (
                <Bar 
                  dataKey="bonus" 
                  name="Bonuses"
                  fill="#10B981"
                  radius={[4, 4, 0, 0]}
                  animationDuration={1500}
                  onMouseEnter={handleBarEnter}
                >
                  {payrollData.map((entry, index) => (
                    <Cell 
                      key={`cell-bonus-${index}`} 
                      fill={activeIndex === index ? '#059669' : '#10B981'} 
                    />
                  ))}
                </Bar>
              )}
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Transactions Table */}
      <div className="bg-white p-6 rounded-lg shadow hover:shadow-md transition-shadow">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-lg font-medium text-gray-900">Recent Transactions</h2>
          <button className="text-sm text-blue-600 hover:text-blue-800">
            View All
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Employee</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {[
                { id: 1, name: 'John Doe', date: '2023-06-15', amount: 4500, status: 'Paid', type: 'Salary' },
                { id: 2, name: 'Jane Smith', date: '2023-06-15', amount: 5200, status: 'Paid', type: 'Salary + Bonus' },
                { id: 3, name: 'Robert Johnson', date: '2023-06-15', amount: 3800, status: 'Pending', type: 'Salary' },
                { id: 4, name: 'Emily Davis', date: '2023-06-01', amount: 4200, status: 'Paid', type: 'Salary' },
                { id: 5, name: 'Michael Wilson', date: '2023-06-01', amount: 2800, status: 'Paid', type: 'Contractor' },
              ].map((transaction) => (
                <tr key={transaction.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                        {transaction.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">{transaction.name}</div>
                        <div className="text-sm text-gray-500">{transaction.type.includes('Contractor') ? 'Contractor' : 'Employee'}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(transaction.date).toLocaleDateString('en-US', {
                      year: 'numeric',
                      month: 'short',
                      day: 'numeric'
                    })}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                    ${transaction.amount.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                      transaction.status === 'Paid' 
                        ? 'bg-green-100 text-green-800' 
                        : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {transaction.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {transaction.type}
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

export default PayrollDashboard;