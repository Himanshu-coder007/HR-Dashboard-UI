import React, { useState, useEffect } from 'react';
import { 
  FiFilter, 
  FiList, 
  FiGrid, 
  FiTable, 
  FiAlignLeft,
  FiSearch,
  FiCalendar,
  FiChevronDown,
  FiX,
  FiEdit2,
  FiTrash2,
  FiCheck
} from 'react-icons/fi';

const Task = () => {
  // Load tasks from localStorage on initial render
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem('tasks');
    return savedTasks ? JSON.parse(savedTasks) : [
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
      }
    ];
  });

  const [viewMode, setViewMode] = useState("grid"); // grid, table, list
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (showSortDropdown) {
        setShowSortDropdown(false);
      }
    };
    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showSortDropdown]);

  // Filter tasks based on search term
  const filteredTasks = tasks.filter(task =>
    task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (task.tags && task.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase())))
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
  const toggleSortDropdown = (e) => {
    e.stopPropagation();
    setShowSortDropdown(!showSortDropdown);
  };

  // Handle edit task
  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  // Submit edited task
  const handleSubmitEditTask = (updatedTask) => {
    const updatedTasks = tasks.map(task => 
      task.id === updatedTask.id ? updatedTask : task
    );
    setTasks(updatedTasks);
    setEditingTask(null);
  };

  // Handle delete task
  const handleDeleteTask = (id) => {
    if (window.confirm('Are you sure you want to delete this task?')) {
      setTasks(tasks.filter(task => task.id !== id));
    }
  };

  // Handle status change
  const handleStatusChange = (taskId, newStatus) => {
    setTasks(tasks.map(task => 
      task.id === taskId ? { ...task, status: newStatus } : task
    ));
  };

  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm h-full flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Tasks</h2>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500">{new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</span>
          <div className="flex items-center gap-2">
            <button 
              className="p-1.5 rounded-md hover:bg-gray-100"
              onClick={() => setViewMode("list")}
            >
              <FiList className={`text-sm ${viewMode === "list" ? "text-blue-500" : "text-gray-500"}`} />
            </button>
            <button 
              className="p-1.5 rounded-md hover:bg-gray-100"
              onClick={() => setViewMode("grid")}
            >
              <FiGrid className={`text-sm ${viewMode === "grid" ? "text-blue-500" : "text-gray-500"}`} />
            </button>
            <button 
              className="p-1.5 rounded-md hover:bg-gray-100"
              onClick={() => setViewMode("table")}
            >
              <FiTable className={`text-sm ${viewMode === "table" ? "text-blue-500" : "text-gray-500"}`} />
            </button>
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
                  setShowSortDropdown(false);
                }}
              >
                Newest First
              </button>
              <button
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  setSortOrder('oldest');
                  setShowSortDropdown(false);
                }}
              >
                Oldest First
              </button>
            </div>
          )}
        </div>
      </div>

      {/* View Mode Selector */}
      <div className="flex gap-4 mb-4">
        <button 
          className={`text-center ${viewMode === "grid" ? "text-blue-500" : "text-gray-500"}`}
          onClick={() => setViewMode("grid")}
        >
          <div className="text-xs mb-1 flex items-center justify-center gap-1">
            <FiGrid className="text-xs" /> Kanban
          </div>
        </button>
        <button 
          className={`text-center ${viewMode === "table" ? "text-blue-500" : "text-gray-500"}`}
          onClick={() => setViewMode("table")}
        >
          <div className="text-xs mb-1 flex items-center justify-center gap-1">
            <FiTable className="text-xs" /> Table
          </div>
        </button>
        <button 
          className={`text-center ${viewMode === "list" ? "text-blue-500" : "text-gray-500"}`}
          onClick={() => setViewMode("list")}
        >
          <div className="text-xs mb-1 flex items-center justify-center gap-1">
            <FiAlignLeft className="text-xs" /> List View
          </div>
        </button>
      </div>

      {/* Task Display Area with Scroll */}
      <div className={`flex-1 overflow-y-auto ${viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4" : "space-y-4"}`}>
        {sortedTasks.length === 0 ? (
          <div className="col-span-3 flex flex-col items-center justify-center h-full text-gray-500">
            <p>No tasks found</p>
          </div>
        ) : viewMode === "grid" ? (
          sortedTasks.map((task) => (
            <div key={task.id} className="p-3 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow h-full flex flex-col">
              {editingTask?.id === task.id ? (
                <TaskEditForm 
                  task={editingTask}
                  onSave={handleSubmitEditTask}
                  onCancel={() => setEditingTask(null)}
                />
              ) : (
                <TaskCard 
                  task={task}
                  onEdit={handleEditTask}
                  onDelete={handleDeleteTask}
                  onStatusChange={handleStatusChange}
                  statusColumns={statusColumns}
                />
              )}
            </div>
          ))
        ) : viewMode === "list" ? (
          <div className="space-y-3">
            {sortedTasks.map(task => (
              <div key={task.id} className="p-3 border border-gray-200 rounded-lg hover:shadow-sm transition-shadow">
                {editingTask?.id === task.id ? (
                  <TaskEditForm 
                    task={editingTask}
                    onSave={handleSubmitEditTask}
                    onCancel={() => setEditingTask(null)}
                  />
                ) : (
                  <TaskListCard 
                    task={task}
                    onEdit={handleEditTask}
                    onDelete={handleDeleteTask}
                  />
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedTasks.map(task => (
                  <tr key={task.id} className="hover:bg-gray-50">
                    {editingTask?.id === task.id ? (
                      <td colSpan="5" className="p-4">
                        <TaskEditForm 
                          task={editingTask}
                          onSave={handleSubmitEditTask}
                          onCancel={() => setEditingTask(null)}
                        />
                      </td>
                    ) : (
                      <>
                        <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">
                          {task.title}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                            task.category === "Recruitment" ? "bg-blue-100 text-blue-800" :
                            task.category === "Finance" ? "bg-pink-100 text-pink-800" :
                            "bg-violet-100 text-violet-800"
                          }`}>
                            {task.category}
                          </span>
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
                            task.status === "New Request" ? "bg-blue-100 text-blue-800" :
                            task.status === "In Progress" ? "bg-yellow-100 text-yellow-800" :
                            "bg-green-100 text-green-800"
                          }`}>
                            {task.status}
                          </span>
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-sm text-gray-500">
                          {new Date(task.dateCreated).toLocaleDateString()}
                        </td>
                        <td className="px-3 py-2 whitespace-nowrap text-right text-sm font-medium">
                          <div className="flex gap-1">
                            <button 
                              onClick={() => handleEditTask(task)}
                              className="text-xs p-1 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200"
                            >
                              <FiEdit2 className="text-xs" />
                            </button>
                            <button 
                              onClick={() => handleDeleteTask(task.id)}
                              className="text-xs p-1 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200"
                            >
                              <FiTrash2 className="text-xs" />
                            </button>
                          </div>
                        </td>
                      </>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

// Task Card Component
const TaskCard = ({ task, onEdit, onDelete, onStatusChange, statusColumns }) => {
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
        <div className="flex gap-1">
          <button 
            onClick={() => onEdit(task)}
            className="text-xs p-1 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200"
          >
            <FiEdit2 className="text-xs" />
          </button>
          <button 
            onClick={() => onDelete(task.id)}
            className="text-xs p-1 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200"
          >
            <FiTrash2 className="text-xs" />
          </button>
        </div>
      </div>
      
      <div className="flex justify-between items-start mb-2">
        <div className="flex gap-1 flex-wrap">
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
            task.category === "Recruitment" ? "bg-blue-100 text-blue-800" :
            task.category === "Finance" ? "bg-pink-100 text-pink-800" :
            "bg-violet-100 text-violet-800"
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
        {statusColumns && (
          <select
            value={task.status}
            onChange={(e) => onStatusChange(task.id, e.target.value)}
            className="text-xs border border-gray-300 rounded px-2 py-1 focus:outline-none focus:ring-1 focus:ring-blue-500"
          >
            {statusColumns.map(column => (
              <option key={column.id} value={column.title}>{column.title}</option>
            ))}
          </select>
        )}
      </div>
    </>
  );
};

// Task List Card Component
const TaskListCard = ({ task, onEdit, onDelete }) => {
  return (
    <div className="flex items-start justify-between">
      <div className="flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
            task.status === "New Request" ? "bg-blue-100 text-blue-800" :
            task.status === "In Progress" ? "bg-yellow-100 text-yellow-800" :
            "bg-green-100 text-green-800"
          }`}>
            {task.status}
          </span>
          <span className={`text-xs font-medium px-2 py-1 rounded-full ${
            task.category === "Recruitment" ? "bg-blue-100 text-blue-800" :
            task.category === "Finance" ? "bg-pink-100 text-pink-800" :
            "bg-violet-100 text-violet-800"
          }`}>
            {task.category}
          </span>
        </div>
        <h3 className="font-medium text-gray-800">{task.title}</h3>
        <p className="text-xs text-gray-500 line-clamp-2">{task.description}</p>
      </div>
      <div className="flex gap-1 ml-2">
        <button 
          onClick={() => onEdit(task)}
          className="text-xs p-1 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200"
        >
          <FiEdit2 className="text-xs" />
        </button>
        <button 
          onClick={() => onDelete(task.id)}
          className="text-xs p-1 rounded-full bg-gray-100 text-gray-500 hover:bg-gray-200"
        >
          <FiTrash2 className="text-xs" />
        </button>
      </div>
    </div>
  );
};

// Task Edit Form Component
const TaskEditForm = ({ task, onSave, onCancel }) => {
  const [editedTask, setEditedTask] = useState({ ...task });
  const [newTag, setNewTag] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditedTask(prev => ({ ...prev, [name]: value }));
  };

  const handleAddTag = (e) => {
    if (e.key === 'Enter' && newTag.trim()) {
      setEditedTask(prev => ({
        ...prev,
        tags: [...(prev.tags || []), newTag.trim()]
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (index) => {
    setEditedTask(prev => ({
      ...prev,
      tags: prev.tags.filter((_, i) => i !== index)
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(editedTask);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-3">
      <div>
        <label className="block text-xs text-gray-500 mb-1">Title</label>
        <input
          type="text"
          name="title"
          value={editedTask.title}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          required
        />
      </div>
      <div>
        <label className="block text-xs text-gray-500 mb-1">Description</label>
        <textarea
          name="description"
          value={editedTask.description}
          onChange={handleChange}
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          rows="3"
        />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <div>
          <label className="block text-xs text-gray-500 mb-1">Category</label>
          <select
            name="category"
            value={editedTask.category}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          >
            <option value="Recruitment">Recruitment</option>
            <option value="Finance">Finance</option>
            <option value="Feedback">Feedback</option>
            <option value="Training">Training</option>
            <option value="Compliance">Compliance</option>
          </select>
        </div>
        <div>
          <label className="block text-xs text-gray-500 mb-1">Status</label>
          <select
            name="status"
            value={editedTask.status}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
          >
            <option value="New Request">New Request</option>
            <option value="In Progress">In Progress</option>
            <option value="Complete">Complete</option>
          </select>
        </div>
      </div>
      <div>
        <label className="block text-xs text-gray-500 mb-1">Tags</label>
        <div className="flex flex-wrap gap-1 mb-1">
          {editedTask.tags?.map((tag, index) => (
            <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
              {tag}
              <button 
                type="button"
                onClick={() => handleRemoveTag(index)}
                className="ml-1 text-blue-600 hover:text-blue-800"
              >
                <FiX size={12} />
              </button>
            </span>
          ))}
        </div>
        <input
          type="text"
          value={newTag}
          onChange={(e) => setNewTag(e.target.value)}
          onKeyDown={handleAddTag}
          placeholder="Add tag and press Enter"
          className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm"
        />
      </div>
      <div className="flex justify-end gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="px-3 py-1 text-sm border border-gray-300 rounded-md text-gray-700 hover:bg-gray-100"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-3 py-1 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700"
        >
          Save
        </button>
      </div>
    </form>
  );
};

export default Task;