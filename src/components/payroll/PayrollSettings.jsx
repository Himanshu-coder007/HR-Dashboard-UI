// src/components/payroll/PayrollSettings.jsx
import { useState } from 'react';
import { FiCalendar, FiDollarSign, FiCreditCard, FiPlus, FiTrash2 } from 'react-icons/fi';

const PayrollSettings = () => {
  const [paymentMethods, setPaymentMethods] = useState([
    { id: 1, name: 'Bank Transfer', isDefault: true },
    { id: 2, name: 'Direct Deposit', isDefault: false },
    { id: 3, name: 'Check', isDefault: false },
  ]);
  const [newMethod, setNewMethod] = useState('');

  const addPaymentMethod = () => {
    if (newMethod.trim()) {
      setPaymentMethods([...paymentMethods, { id: Date.now(), name: newMethod, isDefault: false }]);
      setNewMethod('');
    }
  };

  const removePaymentMethod = (id) => {
    setPaymentMethods(paymentMethods.filter(method => method.id !== id));
  };

  const setDefaultMethod = (id) => {
    setPaymentMethods(paymentMethods.map(method => ({
      ...method,
      isDefault: method.id === id
    })));
  };

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-6">Payroll Settings</h2>
        
        <div className="space-y-6">
          <div>
            <h3 className="text-md font-medium text-gray-900 mb-4">Pay Schedule</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label htmlFor="payFrequency" className="block text-sm font-medium text-gray-700 mb-1">
                  Frequency
                </label>
                <select
                  id="payFrequency"
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  defaultValue="monthly"
                >
                  <option value="weekly">Weekly</option>
                  <option value="bi-weekly">Bi-Weekly</option>
                  <option value="monthly">Monthly</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="payDay" className="block text-sm font-medium text-gray-700 mb-1">
                  Pay Day
                </label>
                <select
                  id="payDay"
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                  defaultValue="last"
                >
                  <option value="1">1st of the month</option>
                  <option value="15">15th of the month</option>
                  <option value="last">Last day of the month</option>
                </select>
              </div>
              
              <div>
                <label htmlFor="firstPayDate" className="block text-sm font-medium text-gray-700 mb-1">
                  First Pay Date
                </label>
                <div className="relative rounded-md shadow-sm">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiCalendar className="h-5 w-5 text-gray-400" />
                  </div>
                  <input
                    type="date"
                    id="firstPayDate"
                    className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 sm:text-sm border-gray-300 rounded-md py-2"
                  />
                </div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-md font-medium text-gray-900 mb-4">Salary Components</h3>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FiDollarSign className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Basic Salary</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">Fixed amount</span>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Edit</button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FiDollarSign className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Overtime</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">1.5x hourly rate</span>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Edit</button>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <FiDollarSign className="h-5 w-5 text-gray-400 mr-2" />
                  <span className="text-sm font-medium text-gray-700">Bonuses</span>
                </div>
                <div className="flex items-center space-x-4">
                  <span className="text-sm text-gray-500">Variable</span>
                  <button className="text-blue-600 hover:text-blue-800 text-sm font-medium">Edit</button>
                </div>
              </div>
              
              <button className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium">
                <FiPlus className="mr-1 h-4 w-4" />
                Add Component
              </button>
            </div>
          </div>
          
          <div className="border-t border-gray-200 pt-6">
            <h3 className="text-md font-medium text-gray-900 mb-4">Payment Methods</h3>
            <div className="space-y-3">
              {paymentMethods.map((method) => (
                <div key={method.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-md">
                  <div className="flex items-center">
                    <FiCreditCard className="h-5 w-5 text-gray-400 mr-2" />
                    <span className="text-sm font-medium text-gray-700">{method.name}</span>
                    {method.isDefault && (
                      <span className="ml-2 px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                        Default
                      </span>
                    )}
                  </div>
                  <div className="flex items-center space-x-4">
                    {!method.isDefault && (
                      <button 
                        onClick={() => setDefaultMethod(method.id)}
                        className="text-sm text-gray-500 hover:text-gray-700"
                      >
                        Set Default
                      </button>
                    )}
                    <button 
                      onClick={() => removePaymentMethod(method.id)}
                      className="text-red-600 hover:text-red-800"
                    >
                      <FiTrash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              ))}
              
              <div className="flex items-center space-x-2">
                <input
                  type="text"
                  value={newMethod}
                  onChange={(e) => setNewMethod(e.target.value)}
                  placeholder="New payment method"
                  className="block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                />
                <button
                  onClick={addPaymentMethod}
                  className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <FiPlus className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex justify-end">
          <button className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            Save Settings
          </button>
        </div>
      </div>
    </div>
  );
};

export default PayrollSettings;