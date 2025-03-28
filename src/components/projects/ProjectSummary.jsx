// src/components/projects/ProjectSummary.js
import { FiCalendar, FiFlag, FiClock, FiEdit2 } from 'react-icons/fi';

const ProjectSummary = ({ project, onEditClick }) => {
  // Calculate progress based on tasks
  const totalTasks = project.tasks.length;
  const completedTasks = project.tasks.filter(task => task.status === 'done').length;
  const progressPercentage = totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

  // Format date
  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  // Get status color classes
  const getStatusColor = () => {
    switch (project.status) {
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'in progress':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  // Get priority color classes
  const getPriorityColor = () => {
    switch (project.priority) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-green-100 text-green-800';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h1 className="text-2xl font-bold text-gray-800">{project.name}</h1>
          <p className="text-gray-600 mt-2">{project.description}</p>
        </div>
        <button 
          onClick={onEditClick}
          className="flex items-center bg-gray-200 px-3 py-1 rounded-lg hover:bg-gray-300 transition"
        >
          <FiEdit2 className="mr-1" /> Edit
        </button>
      </div>
      
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mt-4">
        <div className="flex flex-wrap gap-3">
          <div className="flex items-center bg-gray-50 px-4 py-3 rounded-lg">
            <FiCalendar className="text-gray-500 mr-2" />
            <div>
              <p className="text-xs text-gray-500">Due Date</p>
              <p className="text-sm font-medium text-gray-800">
                {formatDate(project.dueDate)}
              </p>
            </div>
          </div>
          
          <div className={`flex items-center px-4 py-3 rounded-lg ${getStatusColor()}`}>
            <FiClock className="mr-2" />
            <div>
              <p className="text-xs">Status</p>
              <p className="text-sm font-medium">
                {project.status.charAt(0).toUpperCase() + project.status.slice(1)}
              </p>
            </div>
          </div>
          
          <div className={`flex items-center px-4 py-3 rounded-lg ${getPriorityColor()}`}>
            <FiFlag className="mr-2" />
            <div>
              <p className="text-xs">Priority</p>
              <p className="text-sm font-medium">
                {project.priority.charAt(0).toUpperCase() + project.priority.slice(1)}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="mt-6">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">Project Progress</span>
          <span className="text-sm font-medium text-gray-700">
            {completedTasks}/{totalTasks} tasks ({progressPercentage}%)
          </span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2.5">
          <div 
            className={`h-2.5 rounded-full ${
              progressPercentage === 100 ? 'bg-green-500' :
              progressPercentage > 0 ? 'bg-blue-500' : 'bg-gray-400'
            }`} 
            style={{ width: `${progressPercentage}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default ProjectSummary;