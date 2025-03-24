import React from 'react';
import { FiPlus, FiFilter, FiList, FiGrid, FiTable, FiAlignLeft } from 'react-icons/fi';

const Task = () => {
  const tasks = [
    {
      category: "Recruitment",
      title: "Employee Onboarding Approval",
      description: "A new onboarding request has been submitted for Jane Smith (Marketing Department). HR needs to verify the required documents, approve the onboarding process, and schedule an introduction meeting with the team.",
      status: "New Request",
      count: 3
    },
    {
      category: "Finance",
      title: "Payroll Processing",
      description: "HR and the finance team are calculating salaries, bonuses, tax deductions, and overtime pay. Any discrepancies need to be resolved before the final payroll submission on March 10.",
      status: "In Progress",
      count: 6
    },
    {
      category: "Feedback",
      title: "Employee Satisfaction Survey",
      description: "The HR team has gathered feedback from all departments and is now analyzing the results to identify key areas for improvement.",
      status: "Complete",
      count: 12
    }
  ];

  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Tasks</h2>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500">01 March 2025</span>
          <div className="flex items-center gap-2">
            <button className="p-1.5 rounded-md hover:bg-gray-100">
              <FiList className="text-gray-500 text-sm" />
            </button>
            <button className="p-1.5 rounded-md hover:bg-gray-100">
              <FiFilter className="text-gray-500 text-sm" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex gap-4 mb-4">
        <div className="text-center">
          <div className="text-xs text-gray-500 mb-1 flex items-center justify-center gap-1">
            <FiGrid className="text-xs" /> Kanban
          </div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-500 mb-1 flex items-center justify-center gap-1">
            <FiTable className="text-xs" /> Table
          </div>
        </div>
        <div className="text-center">
          <div className="text-xs text-gray-500 mb-1 flex items-center justify-center gap-1">
            <FiAlignLeft className="text-xs" /> List View
          </div>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        {tasks.map((task, index) => (
          <div key={index} className="p-3 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
            {/* Status count badge at the top of each card */}
            <div className="flex items-center justify-between mb-2">
              <div className={`text-xs font-medium px-2 py-1 rounded-full ${
                task.status === "New Request" ? "bg-blue-100 text-blue-800" :
                task.status === "In Progress" ? "bg-yellow-100 text-yellow-800" :
                "bg-green-100 text-green-800"
              }`}>
                {task.status} {task.count}
              </div>
              <button className="text-xs p-1 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200">
                <FiPlus className="text-xs" />
              </button>
            </div>
            
            <div className="flex justify-between items-start mb-2">
              <div className="flex gap-1">
                <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                  task.category === "Recruitment" ? "bg-blue-100 text-blue-800" :
                  task.category === "Finance" ? "bg-pink-100 text-pink-800" :
                  "bg-violet-100 text-violet-800"
                }`}>
                  {task.category}
                </span>
                {task.category === "Recruitment" && (
                  <span className="text-xs font-medium px-2 py-1 bg-green-100 text-green-800 rounded-full">Compliance</span>
                )}
                {task.category === "Finance" && (
                  <span className="text-xs font-medium px-2 py-1 bg-orange-100 text-orange-800 rounded-full">Compensation</span>
                )}
                {task.category === "Feedback" && (
                  <span className="text-xs font-medium px-2 py-1 bg-blue-100 text-blue-800 rounded-full">Engagement</span>
                )}
              </div>
            </div>
            <h3 className="font-medium text-gray-800 mb-1">{task.title}</h3>
            <p className="text-xs text-gray-500 mb-2 line-clamp-3">{task.description}</p>
            <button className="text-xs text-blue-600 hover:text-blue-800 flex items-center">
              View Details
              <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        ))}
      </div>

      <button className="mt-4 w-full flex items-center justify-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium py-2 border border-dashed border-gray-300 rounded-lg">
        <FiPlus className="text-sm" />
        <span>Add New Task</span>
      </button>
    </div>
  );
};

export default Task;