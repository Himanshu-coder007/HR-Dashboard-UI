import { FiClock, FiUsers } from 'react-icons/fi';

const ProjectCard = ({ project, teamMembers, onClick }) => {
  const calculateProgress = (project) => {
    if (!project.tasks || project.tasks.length === 0) return 0;
    const completedTasks = project.tasks.filter(task => task.status === 'done').length;
    return Math.round((completedTasks / project.tasks.length) * 100);
  };

  return (
    <div 
      className="border rounded-lg p-6 hover:shadow-md transition cursor-pointer"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-semibold text-gray-800">{project.name}</h2>
        <span className={`px-2 py-1 text-xs rounded-full ${
          project.status === 'completed' ? 'bg-green-100 text-green-800' :
          project.status === 'in progress' ? 'bg-blue-100 text-blue-800' :
          'bg-gray-100 text-gray-800'
        }`}>
          {project.status}
        </span>
      </div>
      
      <p className="text-gray-600 mb-4 line-clamp-2">{project.description}</p>
      
      <div className="flex items-center text-gray-500 mb-4">
        <FiClock className="mr-2" />
        <span>Due: {new Date(project.dueDate).toLocaleDateString()}</span>
      </div>
      
      <div className="flex items-center text-gray-500 mb-4">
        <FiUsers className="mr-2" />
        <span>
          Team: {project.teamMembers.length} member{project.teamMembers.length !== 1 ? 's' : ''}
        </span>
      </div>
      
      {project.tasks && project.tasks.length > 0 && (
        <div className="mb-4">
          <div className="flex justify-between text-sm mb-1">
            <span>Progress</span>
            <span>{calculateProgress(project)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full" 
              style={{ width: `${calculateProgress(project)}%` }}
            ></div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ProjectCard;