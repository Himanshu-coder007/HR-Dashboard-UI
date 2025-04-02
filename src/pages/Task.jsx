import React, { useState, useEffect } from "react";
import { FiPlus } from "react-icons/fi";
import TaskControls from "../components/tasks/TaskControls";
import TaskModal from "../components/tasks/TaskModal";
import AssignModal from "../components/tasks/AssignModal";
import KanbanView from "../components/tasks/KanbanView";
import TableView from "../components/tasks/TableView";
import ListView from "../components/tasks/ListView";

const Task = () => {
  // Load tasks from localStorage on initial render
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks
      ? JSON.parse(savedTasks)
      : [
          {
            id: 1,
            category: "Recruitment",
            title: "Employee Onboarding Approval",
            description:
              "A new onboarding request has been submitted for Jane Smith (Marketing Department). HR needs to verify the required documents, approve the onboarding process, and schedule an introduction meeting with the team.",
            status: "New Request",
            count: 3,
            dateCreated: "2025-03-01",
            tags: ["Compliance"],
            assignedTo: [],
          },
          // ... other initial tasks
        ];
  });

  // Employee data with roles
  const [employees] = useState([
    {
      id: 1,
      username: "john_doe",
      email: "john.doe@example.com",
      roles: ["developer"],
      roleDisplay: "Developer",
    },
    // ... other employees
  ]);

  // Other state declarations
  const [viewType, setViewType] = useState("kanban");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("newest");
  const [showSortDropdown, setShowSortDropdown] = useState(false);
  const [showNewTaskModal, setShowNewTaskModal] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [assigningTask, setAssigningTask] = useState(null);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    category: "Recruitment",
    status: "New Request",
    tags: [],
    assignedTo: [],
  });

  // Save tasks to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = () => {
      if (showSortDropdown) {
        setShowSortDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [showSortDropdown]);

  // Filter tasks based on search term
  const filteredTasks = tasks.filter(
    (task) =>
      task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
      task.tags.some((tag) =>
        tag.toLowerCase().includes(searchTerm.toLowerCase())
      )
  );

  // Sort tasks by date
  const sortedTasks = [...filteredTasks].sort((a, b) => {
    const dateA = new Date(a.dateCreated);
    const dateB = new Date(b.dateCreated);
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });

  // Kanban view columns
  const statusColumns = [
    { id: "new", title: "New Request", color: "blue" },
    { id: "progress", title: "In Progress", color: "yellow" },
    { id: "complete", title: "Complete", color: "green" },
  ];

  // Toggle sort dropdown
  const toggleSortDropdown = (e) => {
    e.stopPropagation();
    setShowSortDropdown(!showSortDropdown);
  };

  // Handle new task input changes
  const handleNewTaskChange = (e) => {
    const { name, value } = e.target;
    setNewTask((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

    // Handle tag addition
    const handleAddTag = (e) => {
      if (e.key === "Enter" && e.target.value.trim()) {
        const updatedTags = editingTask
          ? [...editingTask.tags, e.target.value.trim()]
          : [...newTask.tags, e.target.value.trim()];
  
        if (editingTask) {
          setEditingTask((prev) => ({
            ...prev,
            tags: updatedTags,
          }));
        } else {
          setNewTask((prev) => ({
            ...prev,
            tags: updatedTags,
          }));
        }
        e.target.value = "";
      }
    };
  
    // Handle tag removal
    const handleRemoveTag = (index, isEditing) => {
      if (isEditing) {
        setEditingTask((prev) => ({
          ...prev,
          tags: prev.tags.filter((_, i) => i !== index),
        }));
      } else {
        setNewTask((prev) => ({
          ...prev,
          tags: prev.tags.filter((_, i) => i !== index),
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
        dateCreated: new Date().toISOString().split("T")[0],
        assignedTo: [],
      };
      setTasks([...tasks, newTaskObj]);
      setShowNewTaskModal(false);
      setNewTask({
        title: "",
        description: "",
        category: "Recruitment",
        status: "New Request",
        tags: [],
        assignedTo: [],
      });
    };
  
    // Handle edit task
    const handleEditTask = (task) => {
      setEditingTask({
        ...task,
        assignedTo: task.assignedTo || [],
      });
      setShowNewTaskModal(true);
    };
  
    // Submit edited task
    const handleSubmitEditTask = (e) => {
      e.preventDefault();
      const updatedTasks = tasks.map((task) =>
        task.id === editingTask.id ? editingTask : task
      );
      setTasks(updatedTasks);
      setShowNewTaskModal(false);
      setEditingTask(null);
    };
  
    // Handle delete task
    const handleDeleteTask = (id) => {
      if (window.confirm("Are you sure you want to delete this task?")) {
        setTasks(tasks.filter((task) => task.id !== id));
      }
    };
  
    // Handle status change
    const handleStatusChange = (taskId, newStatus) => {
      setTasks(
        tasks.map((task) =>
          task.id === taskId ? { ...task, status: newStatus } : task
        )
      );
    };
  
    // Handle assign task
    const handleAssignTask = (task) => {
      setAssigningTask({
        ...task,
        assignedTo: task.assignedTo || [],
      });
    };
  
    // Handle assignee toggle
    const toggleAssignee = (employeeId) => {
      if (!assigningTask) return;
  
      const currentAssignees = assigningTask.assignedTo || [];
      const updatedAssignees = currentAssignees.includes(employeeId)
        ? currentAssignees.filter((id) => id !== employeeId)
        : [...currentAssignees, employeeId];
  
      setAssigningTask({
        ...assigningTask,
        assignedTo: updatedAssignees,
      });
    };
  
    // Save assigned employees
    const saveAssignees = () => {
      if (!assigningTask) return;
  
      setTasks(
        tasks.map((task) => (task.id === assigningTask.id ? assigningTask : task))
      );
      setAssigningTask(null);
    };
  
    return (
      <div className="bg-white p-5 rounded-xl border border-gray-200 shadow-sm h-full flex flex-col">
        {/* Modals */}
        <TaskModal
          showNewTaskModal={showNewTaskModal}
          setShowNewTaskModal={setShowNewTaskModal}
          editingTask={editingTask}
          setEditingTask={setEditingTask}
          newTask={newTask}
          setNewTask={setNewTask}
          handleNewTaskChange={handleNewTaskChange}
          handleAddTag={handleAddTag}
          handleRemoveTag={handleRemoveTag}
          handleSubmitNewTask={handleSubmitNewTask}
          handleSubmitEditTask={handleSubmitEditTask}
        />
  
        <AssignModal
          assigningTask={assigningTask}
          setAssigningTask={setAssigningTask}
          employees={employees}
          toggleAssignee={toggleAssignee}
          saveAssignees={saveAssignees}
        />
  
        {/* Controls */}
        <TaskControls
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          sortOrder={sortOrder}
          setSortOrder={setSortOrder}
          showSortDropdown={showSortDropdown}
          setShowSortDropdown={setShowSortDropdown}
          viewType={viewType}
          setViewType={setViewType}
          setShowNewTaskModal={setShowNewTaskModal}
        />
  
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
          {viewType === "kanban" && (
            <KanbanView
              sortedTasks={sortedTasks}
              statusColumns={statusColumns}
              handleEditTask={handleEditTask}
              handleDeleteTask={handleDeleteTask}
              handleStatusChange={handleStatusChange}
              handleAssignTask={handleAssignTask}
              employees={employees}
            />
          )}
  
          {viewType === "table" && (
            <TableView
              sortedTasks={sortedTasks}
              employees={employees}
              handleAssignTask={handleAssignTask}
              handleEditTask={handleEditTask}
              handleDeleteTask={handleDeleteTask}
            />
          )}
  
          {viewType === "list" && (
            <ListView
              sortedTasks={sortedTasks}
              employees={employees}
              handleAssignTask={handleAssignTask}
              handleEditTask={handleEditTask}
              handleDeleteTask={handleDeleteTask}
            />
          )}
        </div>
  
        {/* Add Task Button */}
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
  
  export default Task;