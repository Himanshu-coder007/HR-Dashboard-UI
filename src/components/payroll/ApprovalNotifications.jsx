// src/components/payroll/ApprovalNotifications.jsx
import { FiCheck, FiX, FiAlertCircle, FiMail, FiBell } from 'react-icons/fi';

const ApprovalNotifications = () => {
  const pendingApprovals = [
    { id: 1, type: 'Payroll Run', date: '2023-06-15', amount: '$135,000', employees: 85, requester: 'John Smith', status: 'pending' },
    { id: 2, type: 'Bonus Payment', date: '2023-06-10', amount: '$25,000', employees: 12, requester: 'Sarah Johnson', status: 'pending' },
    { id: 3, type: 'Overtime Adjustment', date: '2023-06-05', amount: '$8,500', employees: 23, requester: 'Michael Brown', status: 'pending' },
  ];

  const notifications = [
    { id: 1, type: 'Payroll Processed', message: 'June payroll has been processed successfully', date: '2023-06-15 14:30', read: false },
    { id: 2, type: 'Tax Filing', message: 'Q2 tax filing completed and submitted', date: '2023-06-10 09:15', read: true },
    { id: 3, type: 'New Request', message: 'New payroll adjustment request from Michael Brown', date: '2023-06-05 16:45', read: true },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-white shadow rounded-lg p-6">
        <h2 className="text-lg font-medium text-gray-900 mb-6">Pending Approvals</h2>
        
        <div className="space-y-4">
          {pendingApprovals.map((approval) => (
            <div key={approval.id} className="border border-gray-200 rounded-lg p-4">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-md font-medium text-gray-900">{approval.type}</h3>
                  <p className="text-sm text-gray-500 mt-1">
                    <span className="font-medium">Date:</span> {approval.date} • 
                    <span className="font-medium ml-2">Amount:</span> {approval.amount} • 
                    <span className="font-medium ml-2">Employees:</span> {approval.employees}
                  </p>
                  <p className="text-sm text-gray-500 mt-1">
                    <span className="font-medium">Requested by:</span> {approval.requester}
                  </p>
                </div>
                <div className="flex space-x-2">
                  <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                    <FiCheck className="mr-1 h-4 w-4" />
                    Approve
                  </button>
                  <button className="inline-flex items-center px-3 py-1 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                    <FiX className="mr-1 h-4 w-4" />
                    Reject
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-white shadow rounded-lg p-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-medium text-gray-900">Notifications</h2>
          <button className="inline-flex items-center px-3 py-1 border border-transparent text-sm leading-4 font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
            <FiMail className="mr-1 h-4 w-4" />
            Send Reminder
          </button>
        </div>
        
        <div className="space-y-4">
          {notifications.map((notification) => (
            <div key={notification.id} className={`border-l-4 ${notification.read ? 'border-gray-200' : 'border-blue-500'} p-4 bg-gray-50 rounded-r-lg`}>
              <div className="flex">
                <div className="flex-shrink-0">
                  {!notification.read ? (
                    <FiAlertCircle className="h-5 w-5 text-blue-500" />
                  ) : (
                    <FiBell className="h-5 w-5 text-gray-400" />
                  )}
                </div>
                <div className="ml-3">
                  <h3 className={`text-sm font-medium ${notification.read ? 'text-gray-700' : 'text-gray-900'}`}>
                    {notification.type}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1">
                    {notification.message}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    {notification.date}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ApprovalNotifications;