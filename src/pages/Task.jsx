import React, { useState } from 'react';
import { 
  FiPlus, 
  FiFilter, 
  FiList, 
  FiGrid, 
  FiTable, 
  FiAlignLeft,
  FiSearch,
  FiCalendar,
  FiChevronDown
} from 'react-icons/fi';

const Task = () => {
  // State for view type
  const [viewType, setViewType] = useState('kanban');
  // State for search term
  const [searchTerm, setSearchTerm] = useState('');
  // State for sort order
  const [sortOrder, setSortOrder] = useState('newest');
  // State for dropdown visibility
  const [showSortDropdown, setShowSortDropdown] = useState(false);

  // Sample tasks data
  const [tasks, setTasks] = useState([
    {
      id: 1,
      category: "Recruitment",
      title: "Employee Onboarding Approval",
      description: "A new onboarding request has been submitted for Jane Smith (Marketing Department). HR needs to verify the required documents, approve the onboarding process, and schedule an introduction meeting with the team.",
      status: "New Request",
      count: 3,
      dateCreated: "2025-03-01",
      tags: ["Compliance"]
    },
    {
      id: 2,
      category: "Finance",
      title: "Payroll Processing",
      description: "HR and the finance team are calculating salaries, bonuses, tax deductions, and overtime pay. Any discrepancies need to be resolved before the final payroll submission on March 10.",
      status: "In Progress",
      count: 6,
      dateCreated: "2025-02-28",
      tags: ["Compensation"]
    },
    {
      id: 3,
      category: "Feedback",
      title: "Employee Satisfaction Survey",
      description: "The HR team has gathered feedback from all departments and is now analyzing the results to identify key areas for improvement.",
      status: "Complete",
      count: 12,
      dateCreated: "2025-03-02",
      tags: ["Engagement"]
    },
    {
      id: 4,
      category: "Training",
      title: "Leadership Workshop",
      description: "Organize a leadership development workshop for middle management scheduled for next month.",
      status: "In Progress",
      count: 2,
      dateCreated: "2025-02-25",
      tags: ["Development"]
    },
    {
      id: 5,
      category: "Compliance",
      title: "Policy Update Review",
      description: "Review and update company policies to ensure compliance with new labor regulations.",
      status: "New Request",
      count: 5,
      dateCreated: "2025-03-03",
      tags: ["Legal"]
    }
  ]);

  // Filter tasks based on search term
  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort tasks by date
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const dateA = new Date(a.dateCreated);
    const dateB = new Date(b.dateCreated);
    return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
  });

  // Kanban view columns
  const statusColumns = [
    { id: 'new', title: 'New Request', color: 'blue' },
    { id: 'progress', title: 'In Progress', color: 'yellow' },
    { id: 'complete', title: 'Complete', color: 'green' }
  ];

  // Toggle sort dropdown
  const toggleSortDropdown = () => {
    setShowSortDropdown(!showSortDropdown);
  };

  // Close dropdown when clicking outside
  const closeDropdown = () => {
    setShowSortDropdown(false);
  };

  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm h-full">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Tasks</h2>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500">01 March 2025</span>
          <div className="flex items-center gap-2">
            <button className="p-1.5 rounded-md hover:bg-gray-100">
              <FiFilter className="text-gray-500 text-sm" />
            </button>
          </div>
        </div>
      </div>

      {/* Search and Sort Controls */}
      <div className="flex justify-between items-center mb-4 gap-4">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search tasks..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative">
          <button 
            className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm"
            onClick={toggleSortDropdown}
          >
            <FiCalendar className="text-gray-500" />
            <span>Sort: {sortOrder === 'newest' ? 'Newest First' : 'Oldest First'}</span>
            <FiChevronDown className="text-gray-500" />
          </button>
          {showSortDropdown && (
            <div 
              className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  setSortOrder('newest');
                  closeDropdown();
                }}
              >
                Newest First
              </button>
              <button
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  setSortOrder('oldest');
                  closeDropdown();
                }}
              >
                Oldest First
              </button>
            </div>
          )}
        </div>
      </div>

      {/* View Type Selector */}
      <div className="flex gap-4 mb-4">
        <button 
          className={`text-center ${viewType === 'kanban' ? 'text-blue-600' : 'text-gray-500'}`}
          onClick={() => setViewType('kanban')}
        >
          <div className="text-xs mb-1 flex items-center justify-center gap-1">
            <FiGrid className="text-xs" /> Kanban
          </div>
        </button>
        <button 
          className={`text-center ${viewType === 'table' ? 'text-blue-600' : 'text-gray-500'}`}
          onClick={() => setViewType('table')}
        >
          <div className="text-xs mb-1 flex items-center justify-center gap-1">
            <FiTable className="text-xs" /> Table
          </div>
        </button>
        <button 
          className={`text-center ${viewType === 'list' ? 'text-blue-600' : 'text-gray-500'}`}
          onClick={() => setViewType('list')}
        >
          <div className="text-xs mb-1 flex items-center justify-center gap-1">
            <FiAlignLeft className="text-xs" /> List View
          </div>
        </button>
      </div>

      {/* Kanban View */}
      {viewType === 'kanban' && (
        <div className="grid grid-cols-3 gap-4">
          {statusColumns.map(column => (
            <div key={column.id} className="space-y-4">
              <div className={`text-sm font-medium p-2 rounded-lg bg-${column.color}-100 text-${column.color}-800`}>
                {column.title}
              </div>
              {sortedTasks
                .filter(task => task.status === column.title)
                .map(task => (
                  <div 
                    key={task.id} 
                    className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  >
                    <TaskCard task={task} />
                  </div>
                ))}
            </div>
          ))}
        </div>
      )}

      {/* Table View */}
      {viewType === 'table' && (
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Created</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {sortedTasks.map(task => (
                <tr key={task.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{task.title}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      task.category === "Recruitment" ? "bg-blue-100 text-blue-800" :
                      task.category === "Finance" ? "bg-pink-100 text-pink-800" :
                      task.category === "Feedback" ? "bg-violet-100 text-violet-800" :
                      task.category === "Training" ? "bg-green-100 text-green-800" :
                      "bg-orange-100 text-orange-800"
                    }`}>
                      {task.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      task.status === "New Request" ? "bg-blue-100 text-blue-800" :
                      task.status === "In Progress" ? "bg-yellow-100 text-yellow-800" :
                      "bg-green-100 text-green-800"
                    }`}>
                      {task.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(task.dateCreated).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* List View */}
      {viewType === 'list' && (
        <div className="space-y-4">
          {sortedTasks.map(task => (
            <div key={task.id} className="p-4 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-medium text-gray-800 mb-1">{task.title}</h3>
                  <p className="text-xs text-gray-500 mb-2 line-clamp-2">{task.description}</p>
                </div>
                <div className="flex gap-2">
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    task.category === "Recruitment" ? "bg-blue-100 text-blue-800" :
                    task.category === "Finance" ? "bg-pink-100 text-pink-800" :
                    task.category === "Feedback" ? "bg-violet-100 text-violet-800" :
                    task.category === "Training" ? "bg-green-100 text-green-800" :
                    "bg-orange-100 text-orange-800"
                  }`}>
                    {task.category}
                  </span>
                  <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                    task.status === "New Request" ? "bg-blue-100 text-blue-800" :
                    task.status === "In Progress" ? "bg-yellow-100 text-yellow-800" :
                    "bg-green-100 text-green-800"
                  }`}>
                    {task.status}
                  </span>
                </div>
              </div>
              <div className="flex justify-between items-center mt-2">
                <span className="text-xs text-gray-500">
                  Created: {new Date(task.dateCreated).toLocaleDateString()}
                </span>
                <button className="text-xs text-blue-600 hover:text-blue-800 flex items-center">
                  View Details
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      <button className="mt-4 w-full flex items-center justify-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium py-2 border border-dashed border-gray-300 rounded-lg">
        <FiPlus className="text-sm" />
        <span>Add New Task</span>
      </button>
    </div>
  );
};

// Reusable Task Card Component
const TaskCard = ({ task }) => {
  return (
    <>
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
            task.category === "Feedback" ? "bg-violet-100 text-violet-800" :
            task.category === "Training" ? "bg-green-100 text-green-800" :
            "bg-orange-100 text-orange-800"
          }`}>
            {task.category}
          </span>
          {task.tags && task.tags.map((tag, index) => (
            <span 
              key={index}
              className={`text-xs font-medium px-2 py-1 rounded-full ${
                tag === "Compliance" ? "bg-green-100 text-green-800" :
                tag === "Compensation" ? "bg-orange-100 text-orange-800" :
                tag === "Engagement" ? "bg-blue-100 text-blue-800" :
                "bg-purple-100 text-purple-800"
              }`}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <h3 className="font-medium text-gray-800 mb-1">{task.title}</h3>
      <p className="text-xs text-gray-500 mb-2 line-clamp-3">{task.description}</p>
      <div className="flex justify-between items-center">
        <span className="text-xs text-gray-500">
          {new Date(task.dateCreated).toLocaleDateString()}
        </span>
        <button className="text-xs text-blue-600 hover:text-blue-800 flex items-center">
          View Details
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </>
  );
};

export default Task;