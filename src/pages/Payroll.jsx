// src/pages/Payroll.jsx
import { useState } from 'react';
import { FiDollarSign, FiUsers, FiCalendar, FiFileText, FiSettings, FiPieChart, FiCheckCircle } from 'react-icons/fi';
import PayrollDashboard from '../components/payroll/Dashboard';
import EmployeeList from '../components/payroll/EmployeeList';
import PayrollProcessing from '../components/payroll/PayrollProcessing';
import PayrollSettings from '../components/payroll/PayrollSettings';
import EmployeeDetails from '../components/payroll/EmployeeDetails';
import Reports from '../components/payroll/Reports';
import ApprovalNotifications from '../components/payroll/ApprovalNotifications';

const Payroll = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedEmployee, setSelectedEmployee] = useState(null);

  const tabs = [
    { id: 'dashboard', label: 'Dashboard', icon: <FiPieChart className="mr-2" /> },
    { id: 'employeeList', label: 'Employee List', icon: <FiUsers className="mr-2" /> },
    { id: 'processing', label: 'Payroll Processing', icon: <FiDollarSign className="mr-2" /> },
    { id: 'settings', label: 'Settings', icon: <FiSettings className="mr-2" /> },
    { id: 'reports', label: 'Reports', icon: <FiFileText className="mr-2" /> },
    { id: 'approvals', label: 'Approvals', icon: <FiCheckCircle className="mr-2" /> },
  ];

  const handleEmployeeSelect = (employee) => {
    setSelectedEmployee(employee);
    setActiveTab('employeeDetails');
  };

  return (
    <div className="min-h-screen overflow-auto bg-gray-50">
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <h1 className="text-2xl font-bold text-gray-900">Payroll Management</h1>
            <div className="flex space-x-4">
              <button className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700">
                Run Payroll
              </button>
              <button className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                Export
              </button>
            </div>
          </div>
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`${activeTab === tab.id
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm flex items-center`}
                >
                  {tab.icon}
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {activeTab === 'dashboard' && <PayrollDashboard />}
        {activeTab === 'employeeList' && (
          <EmployeeList onEmployeeSelect={handleEmployeeSelect} />
        )}
        {activeTab === 'processing' && <PayrollProcessing />}
        {activeTab === 'settings' && <PayrollSettings />}
        {activeTab === 'employeeDetails' && selectedEmployee && (
          <EmployeeDetails employee={selectedEmployee} onBack={() => setActiveTab('employeeList')} />
        )}
        {activeTab === 'reports' && <Reports />}
        {activeTab === 'approvals' && <ApprovalNotifications />}
      </main>
    </div>
  );
};

export default Payroll;