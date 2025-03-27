import { useState, useEffect } from 'react';
import { FiFolder, FiUsers, FiClock, FiPlus, FiEdit2, FiTrash2, FiCheck, FiPaperclip, FiMessageSquare } from 'react-icons/fi';

const Projects = () => {
  // State for projects and UI controls
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [newComment, setNewComment] = useState('');
  const [fileUpload, setFileUpload] = useState(null);

  // Form states
  const [projectForm, setProjectForm] = useState({
    name: '',
    description: '',
    startDate: '',
    dueDate: '',
    status: 'not started',
    priority: 'medium',
    teamMembers: []
  });

  const [taskForm, setTaskForm] = useState({
    title: '',
    description: '',
    assignee: '',
    status: 'todo',
    dueDate: ''
  });

  // Sample team members
  const teamMembers = [
    { id: 1, name: 'John Doe', role: 'Developer' },
    { id: 2, name: 'Jane Smith', role: 'Designer' },
    { id: 3, name: 'Mike Johnson', role: 'Manager' }
  ];

  // Load sample data (in a real app, this would be an API call)
  useEffect(() => {
    const sampleProjects = [
      {
        id: 1,
        name: 'Website Redesign',
        description: 'Complete redesign of company website with modern UI/UX',
        startDate: '2023-06-01',
        dueDate: '2023-08-15',
        status: 'in progress',
        priority: 'high',
        teamMembers: [1, 2],
        tasks: [
          { id: 1, title: 'Design Homepage', status: 'done', assignee: 2, dueDate: '2023-06-10' },
          { id: 2, title: 'Develop Contact Form', status: 'in progress', assignee: 1, dueDate: '2023-06-20' }
        ],
        comments: [
          { id: 1, author: 1, text: 'Started working on the contact form', date: '2023-06-05' }
        ],
        attachments: [
          { id: 1, name: 'Design Mockup', type: 'image', url: '#', uploadDate: '2023-06-02' }
        ]
      },
      {
        id: 2,
        name: 'Mobile App Development',
        description: 'Build cross-platform mobile application for iOS and Android',
        startDate: '2023-07-01',
        dueDate: '2023-10-30',
        status: 'not started',
        priority: 'medium',
        teamMembers: [1, 3],
        tasks: [],
        comments: [],
        attachments: []
      }
    ];
    setProjects(sampleProjects);
  }, []);

  // Filter projects based on status and search term
  const filteredProjects = projects.filter(project => {
    const matchesFilter = filter === 'all' || project.status === filter;
    const matchesSearch = project.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                          project.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Calculate project progress based on tasks
  const calculateProgress = (project) => {
    if (!project.tasks || project.tasks.length === 0) return 0;
    const completedTasks = project.tasks.filter(task => task.status === 'done').length;
    return Math.round((completedTasks / project.tasks.length) * 100);
  };

  // Handle project form changes
  const handleProjectFormChange = (e) => {
    const { name, value } = e.target;
    setProjectForm({
      ...projectForm,
      [name]: value
    });
  };

  // Handle task form changes
  const handleTaskFormChange = (e) => {
    const { name, value } = e.target;
    setTaskForm({
      ...taskForm,
      [name]: value
    });
  };

  // Submit new project
  const handleProjectSubmit = (e) => {
    e.preventDefault();
    const newProject = {
      id: projects.length + 1,
      ...projectForm,
      teamMembers: projectForm.teamMembers,
      tasks: [],
      comments: [],
      attachments: []
    };
    setProjects([...projects, newProject]);
    setShowProjectForm(false);
    setProjectForm({
      name: '',
      description: '',
      startDate: '',
      dueDate: '',
      status: 'not started',
      priority: 'medium',
      teamMembers: []
    });
  };

  // Submit new task
  const handleTaskSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      id: selectedProject.tasks.length + 1,
      ...taskForm,
      assignee: parseInt(taskForm.assignee)
    };
    
    const updatedProjects = projects.map(project => {
      if (project.id === selectedProject.id) {
        return {
          ...project,
          tasks: [...project.tasks, newTask]
        };
      }
      return project;
    });
    
    setProjects(updatedProjects);
    setSelectedProject({
      ...selectedProject,
      tasks: [...selectedProject.tasks, newTask]
    });
    setShowTaskForm(false);
    setTaskForm({
      title: '',
      description: '',
      assignee: '',
      status: 'todo',
      dueDate: ''
    });
  };

  // Update task status
  const updateTaskStatus = (taskId, newStatus) => {
    const updatedProjects = projects.map(project => {
      if (project.id === selectedProject.id) {
        const updatedTasks = project.tasks.map(task => {
          if (task.id === taskId) {
            return { ...task, status: newStatus };
          }
          return task;
        });
        return { ...project, tasks: updatedTasks };
      }
      return project;
    });
    
    setProjects(updatedProjects);
    setSelectedProject({
      ...selectedProject,
      tasks: selectedProject.tasks.map(task => 
        task.id === taskId ? { ...task, status: newStatus } : task
      )
    });
  };

  // Add comment to project
  const addComment = () => {
    if (!newComment.trim()) return;
    
    const comment = {
      id: selectedProject.comments.length + 1,
      author: 1, // In a real app, this would be the logged-in user
      text: newComment,
      date: new Date().toISOString().split('T')[0]
    };
    
    const updatedProjects = projects.map(project => {
      if (project.id === selectedProject.id) {
        return {
          ...project,
          comments: [...project.comments, comment]
        };
      }
      return project;
    });
    
    setProjects(updatedProjects);
    setSelectedProject({
      ...selectedProject,
      comments: [...selectedProject.comments, comment]
    });
    setNewComment('');
  };

  // Handle file upload
  const handleFileUpload = (e) => {
    e.preventDefault();
    if (!fileUpload) return;
    
    const attachment = {
      id: selectedProject.attachments.length + 1,
      name: fileUpload.name,
      type: fileUpload.type.split('/')[0],
      url: URL.createObjectURL(fileUpload),
      uploadDate: new Date().toISOString().split('T')[0]
    };
    
    const updatedProjects = projects.map(project => {
      if (project.id === selectedProject.id) {
        return {
          ...project,
          attachments: [...project.attachments, attachment]
        };
      }
      return project;
    });
    
    setProjects(updatedProjects);
    setSelectedProject({
      ...selectedProject,
      attachments: [...selectedProject.attachments, attachment]
    });
    setFileUpload(null);
  };

  return (
    <div className=" bg-white min-h-screen container mx-auto px-4 py-8">
      {!selectedProject ? (
        // Project List View
        <div>
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800">Projects</h1>
            <button 
              onClick={() => setShowProjectForm(true)}
              className="flex items-center bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
            >
              <FiPlus className="mr-2" /> New Project
            </button>
          </div>

          {/* Filters and Search */}
          <div className="flex flex-col md:flex-row justify-between mb-6 gap-4">
            <div className="flex space-x-2">
              <button 
                onClick={() => setFilter('all')} 
                className={`px-4 py-2 rounded-lg ${filter === 'all' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              >
                All
              </button>
              <button 
                onClick={() => setFilter('not started')} 
                className={`px-4 py-2 rounded-lg ${filter === 'not started' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              >
                Not Started
              </button>
              <button 
                onClick={() => setFilter('in progress')} 
                className={`px-4 py-2 rounded-lg ${filter === 'in progress' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              >
                In Progress
              </button>
              <button 
                onClick={() => setFilter('completed')} 
                className={`px-4 py-2 rounded-lg ${filter === 'completed' ? 'bg-blue-600 text-white' : 'bg-gray-200'}`}
              >
                Completed
              </button>
            </div>
            <input
              type="text"
              placeholder="Search projects..."
              className="px-4 py-2 border rounded-lg w-full md:w-64"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map(project => (
              <div 
                key={project.id} 
                className="border rounded-lg p-6 hover:shadow-md transition cursor-pointer"
                onClick={() => setSelectedProject(project)}
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
            ))}
          </div>
        </div>
      ) : (
        // Project Detail View
        <div>
          <button 
            onClick={() => setSelectedProject(null)}
            className="flex items-center text-blue-600 mb-6 hover:underline"
          >
            ← Back to Projects
          </button>
          
          <div className="flex justify-between items-start mb-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-800">{selectedProject.name}</h1>
              <div className="flex items-center mt-2">
                <span className={`px-2 py-1 text-xs rounded-full mr-3 ${
                  selectedProject.status === 'completed' ? 'bg-green-100 text-green-800' :
                  selectedProject.status === 'in progress' ? 'bg-blue-100 text-blue-800' :
                  'bg-gray-100 text-gray-800'
                }`}>
                  {selectedProject.status}
                </span>
                <span className={`px-2 py-1 text-xs rounded-full ${
                  selectedProject.priority === 'high' ? 'bg-red-100 text-red-800' :
                  selectedProject.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                  'bg-green-100 text-green-800'
                }`}>
                  {selectedProject.priority} priority
                </span>
              </div>
            </div>
            
            <div className="flex space-x-2">
              <button 
                onClick={() => {
                  setProjectForm({
                    name: selectedProject.name,
                    description: selectedProject.description,
                    startDate: selectedProject.startDate,
                    dueDate: selectedProject.dueDate,
                    status: selectedProject.status,
                    priority: selectedProject.priority,
                    teamMembers: selectedProject.teamMembers
                  });
                  setShowProjectForm(true);
                }}
                className="flex items-center bg-gray-200 px-3 py-1 rounded-lg hover:bg-gray-300 transition"
              >
                <FiEdit2 className="mr-1" /> Edit
              </button>
            </div>
          </div>
          
          <p className="text-gray-700 mb-8">{selectedProject.description}</p>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2">
              {/* Tasks Section */}
              <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-semibold text-gray-800">Tasks</h2>
                  <button 
                    onClick={() => setShowTaskForm(true)}
                    className="flex items-center bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition text-sm"
                  >
                    <FiPlus className="mr-1" /> Add Task
                  </button>
                </div>
                
                {selectedProject.tasks.length > 0 ? (
                  <div className="space-y-4">
                    {selectedProject.tasks.map(task => (
                      <div key={task.id} className="border rounded-lg p-4">
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-medium text-gray-800">{task.title}</h3>
                            {task.description && (
                              <p className="text-gray-600 text-sm mt-1">{task.description}</p>
                            )}
                          </div>
                          <select
                            value={task.status}
                            onChange={(e) => updateTaskStatus(task.id, e.target.value)}
                            className={`text-xs px-2 py-1 rounded ${
                              task.status === 'done' ? 'bg-green-100 text-green-800' :
                              task.status === 'in progress' ? 'bg-blue-100 text-blue-800' :
                              'bg-gray-100 text-gray-800'
                            }`}
                          >
                            <option value="todo">To Do</option>
                            <option value="in progress">In Progress</option>
                            <option value="done">Done</option>
                          </select>
                        </div>
                        
                        <div className="flex justify-between items-center mt-3 text-xs text-gray-500">
                          <div>
                            {task.assignee && (
                              <span>
                                Assigned to: {teamMembers.find(m => m.id === task.assignee)?.name || 'Unassigned'}
                              </span>
                            )}
                          </div>
                          <div>
                            {task.dueDate && (
                              <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">No tasks yet. Add your first task!</p>
                )}
              </div>
              
              {/* Comments Section */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-6">Discussion</h2>
                
                <div className="space-y-4 mb-6">
                  {selectedProject.comments.length > 0 ? (
                    selectedProject.comments.map(comment => (
                      <div key={comment.id} className="border-b pb-4">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-medium text-gray-800">
                            {teamMembers.find(m => m.id === comment.author)?.name || 'Unknown'}
                          </span>
                          <span className="text-xs text-gray-500">{comment.date}</span>
                        </div>
                        <p className="text-gray-700">{comment.text}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-4">No comments yet. Start the discussion!</p>
                  )}
                </div>
                
                <div className="flex space-x-2">
                  <input
                    type="text"
                    placeholder="Add a comment..."
                    className="flex-1 border rounded-lg px-4 py-2"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                  />
                  <button
                    onClick={addComment}
                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                  >
                    <FiMessageSquare />
                  </button>
                </div>
              </div>
            </div>
            
            <div>
              {/* Project Info Sidebar */}
              <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Project Details</h2>
                
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Start Date</h3>
                    <p>{new Date(selectedProject.startDate).toLocaleDateString()}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Due Date</h3>
                    <p>{new Date(selectedProject.dueDate).toLocaleDateString()}</p>
                  </div>
                  
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Team Members</h3>
                    <div className="mt-2 space-y-2">
                      {selectedProject.teamMembers.length > 0 ? (
                        selectedProject.teamMembers.map(memberId => {
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
                  
                  {selectedProject.tasks.length > 0 && (
                    <div>
                      <h3 className="text-sm font-medium text-gray-500">Progress</h3>
                      <div className="mt-2">
                        <div className="flex justify-between text-sm mb-1">
                          <span>{calculateProgress(selectedProject)}% complete</span>
                          <span>
                            {selectedProject.tasks.filter(t => t.status === 'done').length}/
                            {selectedProject.tasks.length} tasks
                          </span>
                        </div>
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-600 h-2 rounded-full" 
                            style={{ width: `${calculateProgress(selectedProject)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              {/* Attachments Section */}
              <div className="bg-white rounded-lg shadow-sm border p-6">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">Attachments</h2>
                
                {selectedProject.attachments.length > 0 ? (
                  <div className="space-y-3">
                    {selectedProject.attachments.map(file => (
                      <div key={file.id} className="flex items-center p-2 border rounded-lg hover:bg-gray-50">
                        <FiPaperclip className="mr-3 text-gray-500" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{file.name}</p>
                          <p className="text-xs text-gray-500">{file.uploadDate}</p>
                        </div>
                        <a 
                          href={file.url} 
                          download
                          className="text-blue-600 text-sm hover:underline"
                        >
                          Download
                        </a>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-500 text-center py-4">No attachments yet</p>
                )}
                
                <form onSubmit={handleFileUpload} className="mt-4">
                  <label className="block text-sm font-medium text-gray-700 mb-1">Upload File</label>
                  <div className="flex">
                    <input
                      type="file"
                      onChange={(e) => setFileUpload(e.target.files[0])}
                      className="flex-1 border rounded-l-lg px-3 py-2 text-sm"
                    />
                    <button
                      type="submit"
                      className="bg-blue-600 text-white px-3 py-2 rounded-r-lg hover:bg-blue-700 transition"
                    >
                      <FiPaperclip />
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      )}
      
      {/* New/Edit Project Modal */}
      {showProjectForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                {projectForm.id ? 'Edit Project' : 'New Project'}
              </h2>
              
              <form onSubmit={handleProjectSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
                    <input
                      type="text"
                      name="name"
                      value={projectForm.name}
                      onChange={handleProjectFormChange}
                      className="w-full border rounded-lg px-4 py-2"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      name="description"
                      value={projectForm.description}
                      onChange={handleProjectFormChange}
                      className="w-full border rounded-lg px-4 py-2"
                      rows="3"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
                      <input
                        type="date"
                        name="startDate"
                        value={projectForm.startDate}
                        onChange={handleProjectFormChange}
                        className="w-full border rounded-lg px-4 py-2"
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                      <input
                        type="date"
                        name="dueDate"
                        value={projectForm.dueDate}
                        onChange={handleProjectFormChange}
                        className="w-full border rounded-lg px-4 py-2"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select
                        name="status"
                        value={projectForm.status}
                        onChange={handleProjectFormChange}
                        className="w-full border rounded-lg px-4 py-2"
                      >
                        <option value="not started">Not Started</option>
                        <option value="in progress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                      <select
                        name="priority"
                        value={projectForm.priority}
                        onChange={handleProjectFormChange}
                        className="w-full border rounded-lg px-4 py-2"
                      >
                        <option value="low">Low</option>
                        <option value="medium">Medium</option>
                        <option value="high">High</option>
                      </select>
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Team Members</label>
                    <div className="space-y-2">
                      {teamMembers.map(member => (
                        <div key={member.id} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`member-${member.id}`}
                            checked={projectForm.teamMembers.includes(member.id)}
                            onChange={() => {
                              const updatedMembers = projectForm.teamMembers.includes(member.id)
                                ? projectForm.teamMembers.filter(id => id !== member.id)
                                : [...projectForm.teamMembers, member.id];
                              setProjectForm({
                                ...projectForm,
                                teamMembers: updatedMembers
                              });
                            }}
                            className="mr-2"
                          />
                          <label htmlFor={`member-${member.id}`} className="text-sm">
                            {member.name} ({member.role})
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowProjectForm(false)}
                    className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    {projectForm.id ? 'Update' : 'Create'} Project
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
      
      {/* New Task Modal */}
      {showTaskForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Add New Task</h2>
              
              <form onSubmit={handleTaskSubmit}>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Task Title</label>
                    <input
                      type="text"
                      name="title"
                      value={taskForm.title}
                      onChange={handleTaskFormChange}
                      className="w-full border rounded-lg px-4 py-2"
                      required
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
                    <textarea
                      name="description"
                      value={taskForm.description}
                      onChange={handleTaskFormChange}
                      className="w-full border rounded-lg px-4 py-2"
                      rows="3"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Assignee</label>
                    <select
                      name="assignee"
                      value={taskForm.assignee}
                      onChange={handleTaskFormChange}
                      className="w-full border rounded-lg px-4 py-2"
                    >
                      <option value="">Select team member</option>
                      {selectedProject.teamMembers.map(memberId => {
                        const member = teamMembers.find(m => m.id === memberId);
                        return member ? (
                          <option key={member.id} value={member.id}>
                            {member.name} ({member.role})
                          </option>
                        ) : null;
                      })}
                    </select>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                      <select
                        name="status"
                        value={taskForm.status}
                        onChange={handleTaskFormChange}
                        className="w-full border rounded-lg px-4 py-2"
                      >
                        <option value="todo">To Do</option>
                        <option value="in progress">In Progress</option>
                        <option value="done">Done</option>
                      </select>
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
                      <input
                        type="date"
                        name="dueDate"
                        value={taskForm.dueDate}
                        onChange={handleTaskFormChange}
                        className="w-full border rounded-lg px-4 py-2"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3 mt-6">
                  <button
                    type="button"
                    onClick={() => setShowTaskForm(false)}
                    className="px-4 py-2 border rounded-lg hover:bg-gray-100"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                  >
                    Add Task
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Projects;