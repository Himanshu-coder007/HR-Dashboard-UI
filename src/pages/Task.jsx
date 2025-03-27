import React, { useState, useEffect } from 'react';
import { 
  FiPlus, 
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
  FiUser,
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
        tags: ["Compliance"],
        assignedTo: []
      },
      {
        id: 2,
        category: "Finance",
        title: "Payroll Processing",
        description: "HR and the finance team are calculating salaries, bonuses, tax deductions, and overtime pay. Any discrepancies need to be resolved before the final payroll submission on March 10.",
        status: "In Progress",
        count: 6,
        dateCreated: "2025-02-28",
        tags: ["Compensation"],
        assignedTo: []
      },
      {
        id: 3,
        category: "Feedback",
        title: "Employee Satisfaction Survey",
        description: "The HR team has gathered feedback from all departments and is now analyzing the results to identify key areas for improvement.",
        status: "Complete",
        count: 12,
        dateCreated: "2025-03-02",
        tags: ["Engagement"],
        assignedTo: []
      },
      {
        id: 4,
        category: "Training",
        title: "Leadership Workshop",
        description: "Organize a leadership development workshop for middle management scheduled for next month.",
        status: "In Progress",
        count: 2,
        dateCreated: "2025-02-25",
        tags: ["Development"],
        assignedTo: []
      },
      {
        id: 5,
        category: "Compliance",
        title: "Policy Update Review",
        description: "Review and update company policies to ensure compliance with new labor regulations.",
        status: "New Request",
        count: 5,
        dateCreated: "2025-03-03",
        tags: ["Legal"],
        assignedTo: []
      }
    ];
  });

  // Employee data
  const [employees] = useState([
    {
      id: 1,
      username: "john_doe",
      email: "john.doe@example.com",
      roles: ["developer"]
    },
    {
      id: 2,
      username: "jane_smith",
      email: "jane.smith@example.com",
      roles: ["designer"]
    },
    {
      id: 3,
      username: "alice_jones",
      email: "alice.jones@example.com",
      roles: ["project manager"]
    },
    {
      id: 4,
      username: "bob_williams",
      email: "bob.williams@example.com",
      roles: ["business analyst"]
    },
    {
      id: 5,
      username: "charlie_brown",
      email: "charlie.brown@example.com",
      roles: ["developer", "designer"]
    }
  ]);

  // Other state declarations
  const [viewType, setViewType] = useState('kanban');
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOrder, setSortOrder] = useState('newest');
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [assigningTask, setAssigningTask] = useState(null);
  const [newTask, setNewTask] = useState({
    title: '',
    description: '',
    category: 'Recruitment',
    status: 'New Request',
    tags: [],
    assignedTo: []
  });

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
    task.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()))
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

  // Handle new task input changes
  const handleNewTaskChange = (e) => {
    const { name, value } = e.target;
    setNewTask(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle tag addition
  const handleAddTag = (e) => {
    if (e.key === 'Enter' && e.target.value.trim()) {
      const updatedTags = editingTask 
        ? [...editingTask.tags, e.target.value.trim()]
        : [...newTask.tags, e.target.value.trim()];
      
      if (editingTask) {
        setEditingTask(prev => ({
          ...prev,
          tags: updatedTags
        }));
      } else {
        setNewTask(prev => ({
          ...prev,
          tags: updatedTags
        }));
      }
      e.target.value = '';
    }
  };

  // Handle tag removal
  const handleRemoveTag = (index, isEditing) => {
    if (isEditing) {
      setEditingTask(prev => ({
        ...prev,
        tags: prev.tags.filter((_, i) => i !== index)
      }));
    } else {
      setNewTask(prev => ({
        ...prev,
        tags: prev.tags.filter((_, i) => i !== index)
      }));
    }
  };

  // Submit new task
  const handleSubmitNewTask = (e) => {
    e.preventDefault();
    const newTaskObj = {
      ...newTask,
      id: Date.now(),
      count: 1,
      dateCreated: new Date().toISOString().split('T')[0],
      assignedTo: []
    };
    setTasks([...tasks, newTaskObj]);
    setShowNewTaskModal(false);
    setNewTask({
      title: '',
      description: '',
      category: 'Recruitment',
      status: 'New Request',
      tags: [],
      assignedTo: []
    });
  };

  // Handle edit task
  const handleEditTask = (task) => {
    setEditingTask({
      ...task,
      assignedTo: task.assignedTo || []
    });
    setShowNewTaskModal(true);
  };

  // Submit edited task
  const handleSubmitEditTask = (e) => {
    e.preventDefault();
    const updatedTasks = tasks.map(task => 
      task.id === editingTask.id ? editingTask : task
    );
    setTasks(updatedTasks);
    setShowNewTaskModal(false);
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

  // Handle assign task
  const handleAssignTask = (task) => {
    setAssigningTask({
      ...task,
      assignedTo: task.assignedTo || []
    });
  };

  // Handle assignee toggle
  const toggleAssignee = (employeeId) => {
    if (!assigningTask) return;

    const currentAssignees = assigningTask.assignedTo || [];
    const updatedAssignees = currentAssignees.includes(employeeId)
      ? currentAssignees.filter(id => id !== employeeId)
      : [...currentAssignees, employeeId];

    setAssigningTask({
      ...assigningTask,
      assignedTo: updatedAssignees
    });
  };

  // Save assigned employees
  const saveAssignees = () => {
    if (!assigningTask) return;

    setTasks(tasks.map(task => 
      task.id === assigningTask.id ? assigningTask : task
    ));
    setAssigningTask(null);
  };

  return (
    <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm h-full flex flex-col">
      {/* New/Edit Task Modal */}
      {showNewTaskModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center border-b border-gray-200 p-4">
              <h3 className="text-lg font-semibold">
                {editingTask ? 'Edit Task' : 'Create New Task'}
              </h3>
              <button 
                onClick={() => {
                  setShowNewTaskModal(false);
                  setEditingTask(null);
                }}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={20} />
              </button>
            </div>
            <form 
              onSubmit={editingTask ? handleSubmitEditTask : handleSubmitNewTask} 
              className="p-4 space-y-4"
            >
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={editingTask ? editingTask.title : newTask.title}
                  onChange={(e) => 
                    editingTask
                      ? setEditingTask({...editingTask, title: e.target.value})
                      : handleNewTaskChange(e)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                <textarea
                  name="description"
                  value={editingTask ? editingTask.description : newTask.description}
                  onChange={(e) => 
                    editingTask
                      ? setEditingTask({...editingTask, description: e.target.value})
                      : handleNewTaskChange(e)
                  }
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows={3}
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                  <select
                    name="category"
                    value={editingTask ? editingTask.category : newTask.category}
                    onChange={(e) => 
                      editingTask
                        ? setEditingTask({...editingTask, category: e.target.value})
                        : handleNewTaskChange(e)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Recruitment">Recruitment</option>
                    <option value="Finance">Finance</option>
                    <option value="Feedback">Feedback</option>
                    <option value="Training">Training</option>
                    <option value="Compliance">Compliance</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                  <select
                    name="status"
                    value={editingTask ? editingTask.status : newTask.status}
                    onChange={(e) => 
                      editingTask
                        ? setEditingTask({...editingTask, status: e.target.value})
                        : handleNewTaskChange(e)
                    }
                    className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="New Request">New Request</option>
                    <option value="In Progress">In Progress</option>
                    <option value="Complete">Complete</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Tags</label>
                <div className="flex flex-wrap gap-2 mb-2">
                  {(editingTask ? editingTask.tags : newTask.tags).map((tag, index) => (
                    <span key={index} className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800">
                      {tag}
                      <button 
                        type="button"
                        onClick={() => handleRemoveTag(index, !!editingTask)}
                        className="ml-1 text-blue-600 hover:text-blue-800"
                      >
                        <FiX size={12} />
                      </button>
                    </span>
                  ))}
                </div>
                <input
                  type="text"
                  placeholder="Add tag and press Enter"
                  onKeyDown={handleAddTag}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
                <button
                  type="button"
                  onClick={() => {
                    setShowNewTaskModal(false);
                    setEditingTask(null);
                  }}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  {editingTask ? 'Update Task' : 'Create Task'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Assign Task Modal */}
      {assigningTask && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center border-b border-gray-200 p-4">
              <h3 className="text-lg font-semibold">
                Assign Task: {assigningTask.title}
              </h3>
              <button 
                onClick={() => setAssigningTask(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <FiX size={20} />
              </button>
            </div>
            <div className="p-4">
              <div className="space-y-3 max-h-96 overflow-y-auto">
                {employees.map(employee => (
                  <div 
                    key={employee.id} 
                    className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer ${
                      (assigningTask.assignedTo || []).includes(employee.id) 
                        ? 'border-blue-500 bg-blue-50' 
                        : 'border-gray-200 hover:bg-gray-50'
                    }`}
                    onClick={() => toggleAssignee(employee.id)}
                  >
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 mr-3">
                        {employee.username.charAt(0).toUpperCase()}
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{employee.username}</p>
                        <p className="text-xs text-gray-500">{employee.email}</p>
                      </div>
                    </div>
                    {(assigningTask.assignedTo || []).includes(employee.id) && (
                      <FiCheck className="text-blue-600" />
                    )}
                  </div>
                ))}
              </div>
              <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 mt-4">
                <button
                  type="button"
                  onClick={() => setAssigningTask(null)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={saveAssignees}
                  className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Save Assignees
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Tasks</h2>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500">{new Date().toLocaleDateString()}</span>
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

      {/* Main Content Area with Scroll */}
      <div className="flex-1 overflow-y-auto">
        {/* Kanban View */}
        {viewType === 'kanban' && (
          <div className="grid grid-cols-3 gap-4 h-full">
            {statusColumns.map(column => (
              <div key={column.id} className="flex flex-col h-full">
                <div className={`text-sm font-medium p-2 rounded-lg bg-${column.color}-100 text-${column.color}-800`}>
                  {column.title}
                </div>
                <div className="flex-1 overflow-y-auto space-y-4 pr-2">
                  {sortedTasks
                    .filter(task => task.status === column.title)
                    .map(task => (
                      <div 
                        key={task.id} 
                        className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200 cursor-pointer hover:shadow-md hover:border-gray-300 hover:translate-y-[-2px]"
                      >
                        <TaskCard 
                          task={task} 
                          onEdit={handleEditTask}
                          onDelete={handleDeleteTask}
                          onStatusChange={handleStatusChange}
                          onAssign={handleAssignTask}
                          statusColumns={statusColumns}
                          employees={employees}
                        />
                      </div>
                    ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Table View */}
        {viewType === 'table' && (
          <div className="overflow-x-auto h-full">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Title</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Assigned To</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date Created</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {sortedTasks.map(task => (
                  <tr key={task.id} className="hover:bg-gray-50 transition-colors duration-150 group">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 group-hover:text-blue-600">
                      {task.title}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`px-2 py-1 rounded-full text-xs group-hover:shadow-sm ${
                        task.category === "Recruitment" ? "bg-blue-100 text-blue-800 group-hover:bg-blue-200" :
                        task.category === "Finance" ? "bg-pink-100 text-pink-800 group-hover:bg-pink-200" :
                        task.category === "Feedback" ? "bg-violet-100 text-violet-800 group-hover:bg-violet-200" :
                        task.category === "Training" ? "bg-green-100 text-green-800 group-hover:bg-green-200" :
                        "bg-orange-100 text-orange-800 group-hover:bg-orange-200"
                      }`}>
                        {task.category}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <span className={`px-2 py-1 rounded-full text-xs group-hover:shadow-sm ${
                        task.status === "New Request" ? "bg-blue-100 text-blue-800 group-hover:bg-blue-200" :
                        task.status === "In Progress" ? "bg-yellow-100 text-yellow-800 group-hover:bg-yellow-200" :
                        "bg-green-100 text-green-800 group-hover:bg-green-200"
                      }`}>
                        {task.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex -space-x-2">
                        {(task.assignedTo || []).slice(0, 3).map((userId, index) => {
                          const employee = employees.find(e => e.id === userId);
                          return employee ? (
                            <div 
                              key={index} 
                              className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 border-2 border-white"
                              title={employee.username}
                            >
                              {employee.username.charAt(0).toUpperCase()}
                            </div>
                          ) : null;
                        })}
                        {(task.assignedTo || []).length > 3 && (
                          <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-800 border-2 border-white">
                            +{(task.assignedTo || []).length - 3}
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 group-hover:text-gray-700">
                      {new Date(task.dateCreated).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      <div className="flex space-x-2">
                        <button 
                          onClick={() => handleAssignTask(task)}
                          className="text-gray-600 hover:text-gray-800 p-1 rounded-full hover:bg-gray-100"
                          title="Assign"
                        >
                          <FiUser size={16} />
                        </button>
                        <button 
                          onClick={() => handleEditTask(task)}
                          className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-100"
                          title="Edit"
                        >
                          <FiEdit2 size={16} />
                        </button>
                        <button 
                          onClick={() => handleDeleteTask(task.id)}
                          className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-100"
                          title="Delete"
                        >
                          <FiTrash2 size={16} />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* List View */}
        {viewType === 'list' && (
          <div className="space-y-4 overflow-y-auto h-full pb-4">
            {sortedTasks.map(task => (
              <div 
                key={task.id} 
                className="p-4 border border-gray-200 rounded-lg transition-all duration-200 hover:shadow-md hover:border-gray-300 hover:translate-y-[-2px]"
              >
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-medium text-gray-800 mb-1 hover:text-blue-600">{task.title}</h3>
                    <p className="text-xs text-gray-500 mb-2 line-clamp-2 hover:text-gray-600">{task.description}</p>
                  </div>
                  <div className="flex gap-2">
                    <span className={`text-xs font-medium px-2 py-1 rounded-full hover:shadow-sm ${
                      task.category === "Recruitment" ? "bg-blue-100 text-blue-800 hover:bg-blue-200" :
                      task.category === "Finance" ? "bg-pink-100 text-pink-800 hover:bg-pink-200" :
                      task.category === "Feedback" ? "bg-violet-100 text-violet-800 hover:bg-violet-200" :
                      task.category === "Training" ? "bg-green-100 text-green-800 hover:bg-green-200" :
                      "bg-orange-100 text-orange-800 hover:bg-orange-200"
                    }`}>
                      {task.category}
                    </span>
                    <span className={`text-xs font-medium px-2 py-1 rounded-full hover:shadow-sm ${
                      task.status === "New Request" ? "bg-blue-100 text-blue-800 hover:bg-blue-200" :
                      task.status === "In Progress" ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200" :
                      "bg-green-100 text-green-800 hover:bg-green-200"
                    }`}>
                      {task.status}
                    </span>
                  </div>
                </div>
                <div className="flex justify-between items-center mt-2">
                  <div className="flex items-center">
                    <div className="flex -space-x-2 mr-3">
                      {(task.assignedTo || []).slice(0, 3).map((userId, index) => {
                        const employee = employees.find(e => e.id === userId);
                        return employee ? (
                          <div 
                            key={index} 
                            className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 border-2 border-white text-xs"
                            title={employee.username}
                          >
                            {employee.username.charAt(0).toUpperCase()}
                          </div>
                        ) : null;
                      })}
                      {(task.assignedTo || []).length > 3 && (
                        <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-800 border-2 border-white text-xs">
                          +{(task.assignedTo || []).length - 3}
                        </div>
                      )}
                    </div>
                    <span className="text-xs text-gray-500 hover:text-gray-700">
                      Created: {new Date(task.dateCreated).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex space-x-2">
                    <button 
                      onClick={() => handleAssignTask(task)}
                      className="text-gray-600 hover:text-gray-800 p-1 rounded-full hover:bg-gray-100 text-xs flex items-center"
                    >
                      <FiUser size={14} className="mr-1" /> Assign
                    </button>
                    <button 
                      onClick={() => handleEditTask(task)}
                      className="text-blue-600 hover:text-blue-800 p-1 rounded-full hover:bg-blue-100 text-xs flex items-center"
                    >
                      <FiEdit2 size={14} className="mr-1" /> Edit
                    </button>
                    <button 
                      onClick={() => handleDeleteTask(task.id)}
                      className="text-red-600 hover:text-red-800 p-1 rounded-full hover:bg-red-100 text-xs flex items-center"
                    >
                      <FiTrash2 size={14} className="mr-1" /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <button 
        className="mt-4 w-full flex items-center justify-center gap-2 text-blue-600 hover:text-blue-800 text-sm font-medium py-2 border border-dashed border-gray-300 rounded-lg hover:bg-blue-50 transition-colors"
        onClick={() => setShowNewTaskModal(true)}
      >
        <FiPlus className="text-sm" />
        <span>Add New Task</span>
      </button>
    </div>
  );
};

// Enhanced Task Card Component with assign functionality
const TaskCard = ({ task, onEdit, onDelete, onStatusChange, onAssign, statusColumns, employees }) => {
  return (
    <>
      <div className="flex items-center justify-between mb-2">
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
      <p className="text-xs text-gray-500 mb-2 line-clamp-3">{task.description}</p>
      
      {/* Assigned users */}
      {(task.assignedTo || []).length > 0 && (
        <div className="flex -space-x-2 mb-2">
          {(task.assignedTo || []).slice(0, 3).map((userId, index) => {
            const employee = employees.find(e => e.id === userId);
            return employee ? (
              <div 
                key={index} 
                className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 border-2 border-white text-xs"
                title={employee.username}
              >
                {employee.username.charAt(0).toUpperCase()}
              </div>
            ) : null;
          })}
          {(task.assignedTo || []).length > 3 && (
            <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-800 border-2 border-white text-xs">
              +{(task.assignedTo || []).length - 3}
            </div>
          )}
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
            {statusColumns.map(column => (
              <option key={column.id} value={column.title}>{column.title}</option>
            ))}
          </select>
        )}
      </div>
    </>
  );
};

export default Task;