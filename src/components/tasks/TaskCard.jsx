import { FiUser, FiEdit2, FiTrash2, FiMail, FiX } from "react-icons/fi";
import emailjs from '@emailjs/browser';
import { useState } from 'react';

const TaskCard = ({
  task,
  onEdit,
  onDelete,
  onStatusChange,
  onAssign,
  statusColumns,
  employees,
}) => {
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailStatus, setEmailStatus] = useState(null);
  const [showEmailInput, setShowEmailInput] = useState(false);
  const [emailAddress, setEmailAddress] = useState('');
  const [emailName, setEmailName] = useState('');

  const sendTaskViaEmail = async () => {
    if (!emailAddress) {
      setEmailStatus({ success: false, message: "Please enter an email address" });
      return;
    }

    // Simple email validation
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress)) {
      setEmailStatus({ success: false, message: "Please enter a valid email address" });
      return;
    }

    setIsSendingEmail(true);
    setEmailStatus(null);

    try {
      // Prepare email parameters
      const emailParams = {
        task_title: task.title,
        task_description: task.description,
        task_category: task.category,
        task_status: task.status,
        task_due_date: task.dueDate || 'Not specified',
        task_created_date: new Date(task.dateCreated).toLocaleDateString(),
        task_tags: task.tags?.join(', ') || 'None',
        to_name: emailName || 'Recipient',
        to_email: emailAddress,
        from_name: 'Task Management System',
        reply_to: 'no-reply@taskmanager.com',
      };

      // Send email using EmailJS
      const response = await emailjs.send(
        'service_xare5rm', // Replace with your service ID
        'template_avkkqc9', // Replace with your template ID
        emailParams,
        'QiWXGac-x9hAL4zu2' // Replace with your user ID
      );

      setEmailStatus({ 
        success: true, 
        message: `Task sent successfully to ${emailAddress}` 
      });
      
      // Reset form after successful send
      setEmailAddress('');
      setEmailName('');
      setShowEmailInput(false);
    } catch (error) {
      console.error('Failed to send email:', error);
      setEmailStatus({ 
        success: false, 
        message: 'Failed to send task via email' 
      });
    } finally {
      setIsSendingEmail(false);
    }
  };

  const handleEmailClick = () => {
    setShowEmailInput(!showEmailInput);
    setEmailStatus(null);
  };

  const handleCancelEmail = () => {
    setShowEmailInput(false);
    setEmailAddress('');
    setEmailName('');
    setEmailStatus(null);
  };

  return (
    <div className="border rounded-lg p-4 mb-4 bg-white shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-2">
        <div className="flex gap-1">
          <span
            className={`text-xs font-medium px-2 py-1 rounded-full ${
              task.category === "Recruitment"
                ? "bg-blue-100 text-blue-800"
                : task.category === "Finance"
                ? "bg-pink-100 text-pink-800"
                : task.category === "Feedback"
                ? "bg-violet-100 text-violet-800"
                : task.category === "Training"
                ? "bg-green-100 text-green-800"
                : "bg-orange-100 text-orange-800"
            }`}
          >
            {task.category}
          </span>
          {task.tags &&
            task.tags.map((tag, index) => (
              <span
                key={index}
                className={`text-xs font-medium px-2 py-1 rounded-full ${
                  tag === "Compliance"
                    ? "bg-green-100 text-green-800"
                    : tag === "Compensation"
                    ? "bg-orange-100 text-orange-800"
                    : tag === "Engagement"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-purple-100 text-purple-800"
                }`}
              >
                {tag}
              </span>
            ))}
        </div>
        <div className="flex space-x-1">
          <button
            onClick={() => onAssign(task)}
            className="text-gray-600 hover:text-gray-800 p-1 rounded-full hover:bg-gray-100"
            title="Assign"
          >
            <FiUser size={14} />
          </button>
          <button
            onClick={() => onEdit(task)}
            className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-100"
            title="Edit"
          >
            <FiEdit2 size={14} />
          </button>
          <div className="relative">
            <button
              onClick={handleEmailClick}
              disabled={isSendingEmail}
              className={`p-1 rounded-full ${
                isSendingEmail 
                  ? 'text-gray-400 cursor-not-allowed' 
                  : 'text-green-600 hover:text-green-800 hover:bg-green-100'
              }`}
              title="Send via Email"
            >
              <FiMail size={14} />
            </button>
            {showEmailInput && (
              <div className="absolute right-0 mt-1 w-64 bg-white rounded-md shadow-lg z-10 border border-gray-200 p-3">
                <div className="flex justify-between items-center mb-2">
                  <h4 className="text-sm font-medium">Send Task via Email</h4>
                  <button 
                    onClick={handleCancelEmail}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <FiX size={16} />
                  </button>
                </div>
                <div className="space-y-2">
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Recipient Name</label>
                    <input
                      type="text"
                      value={emailName}
                      onChange={(e) => setEmailName(e.target.value)}
                      placeholder="Optional"
                      className="w-full text-xs border border-gray-300 rounded px-2 py-1"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-gray-600 mb-1">Email Address*</label>
                    <input
                      type="email"
                      value={emailAddress}
                      onChange={(e) => setEmailAddress(e.target.value)}
                      placeholder="recipient@example.com"
                      required
                      className="w-full text-xs border border-gray-300 rounded px-2 py-1"
                    />
                  </div>
                  <button
                    onClick={sendTaskViaEmail}
                    disabled={!emailAddress || isSendingEmail}
                    className={`w-full text-xs py-1 px-2 rounded ${
                      !emailAddress || isSendingEmail
                        ? 'bg-gray-200 text-gray-500 cursor-not-allowed'
                        : 'bg-green-500 text-white hover:bg-green-600'
                    }`}
                  >
                    {isSendingEmail ? 'Sending...' : 'Send Email'}
                  </button>
                </div>
              </div>
            )}
          </div>
          <button
            onClick={() => onDelete(task.id)}
            className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-100"
            title="Delete"
          >
            <FiTrash2 size={14} />
          </button>
        </div>
      </div>

      <h3 className="font-medium text-gray-800 mb-1">{task.title}</h3>
      <p className="text-xs text-gray-500 mb-2 line-clamp-3">
        {task.description}
      </p>

      {(task.assignedTo || []).length > 0 && (
        <div className="flex -space-x-2 mb-2">
          {(task.assignedTo || []).slice(0, 3).map((userId, index) => {
            const employee = employees.find((e) => e.id === userId);
            return employee ? (
              <div
                key={index}
                className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 border-2 border-white text-xs"
                title={`${employee.username} (${employee.roleDisplay}) - ${employee.email}`}
              >
                {employee.username.charAt(0).toUpperCase()}
              </div>
            ) : null;
          })}
          {(task.assignedTo || []).length > 3 && (
            <div
              className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-800 border-2 border-white text-xs"
              title={`${(task.assignedTo || [])
                .slice(3)
                .map((id) => {
                  const e = employees.find((emp) => emp.id === id);
                  return e ? `${e.username} (${e.roleDisplay}) - ${e.email}` : "";
                })
                .join(", ")}`}
            >
              +{(task.assignedTo || []).length - 3}
            </div>
          )}
        </div>
      )}

      {emailStatus && (
        <div className={`text-xs mb-2 ${
          emailStatus.success ? 'text-green-600' : 'text-red-600'
        }`}>
          {emailStatus.message}
        </div>
      )}

      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500">
          {new Date(task.dateCreated).toLocaleDateString()}
        </span>
        {statusColumns && (
          <select
            value={task.status}
            onChange={(e) => onStatusChange(task.id, e.target.value)}
            className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {statusColumns.map((column) => (
              <option key={column.id} value={column.title}>
                {column.title}
              </option>
            ))}
          </select>
        )}
      </div>
    </div>
  );
};

export default TaskCard;