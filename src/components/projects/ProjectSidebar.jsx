const ProjectSidebar = ({ project, teamMembers }) => {
    const calculateProgress = (project) => {
      if (!project.tasks || project.tasks.length === 0) return 0;
      const completedTasks = project.tasks.filter(task => task.status === 'done').length;
      return Math.round((completedTasks / project.tasks.length) * 100);
    };
  
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Project Details</h2>
        
        <div className="space-y-4">
          <div>
            <h3 className="text-sm font-medium text-gray-500">Start Date</h3>
            <p>{new Date(project.startDate).toLocaleDateString()}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500">Due Date</h3>
            <p>{new Date(project.dueDate).toLocaleDateString()}</p>
          </div>
          
          <div>
            <h3 className="text-sm font-medium text-gray-500">Team Members</h3>
            <div className="mt-2 space-y-2">
              {project.teamMembers.length > 0 ? (
                project.teamMembers.map(memberId => {
                  const member = teamMembers.find(m => m.id === memberId);
                  return member ? (
                    <div key={member.id} className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-gray-300 flex items-center justify-center mr-2">
                        {member.name.charAt(0)}
                      </div>
                      <div>
                        <p className="text-sm font-medium">{member.name}</p>
                        <p className="text-xs text-gray-500">{member.role}</p>
                      </div>
                    </div>
                  ) : null;
                })
              ) : (
                <p className="text-sm text-gray-500">No team members assigned</p>
              )}
            </div>
          </div>
          
          {project.tasks && project.tasks.length > 0 && (
            <div>
              <h3 className="text-sm font-medium text-gray-500">Progress</h3>
              <div className="mt-2">
                <div className="flex justify-between text-sm mb-1">
                  <span>{calculateProgress(project)}% complete</span>
                  <span>
                    {project.tasks.filter(t => t.status === 'done').length}/
                    {project.tasks.length} tasks
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className="bg-blue-600 h-2 rounded-full" 
                    style={{ width: `${calculateProgress(project)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default ProjectSidebar;