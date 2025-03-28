import { useState, useEffect } from 'react';
import { FiFolder, FiPlus, FiEdit2 } from 'react-icons/fi';
import ProjectCard from '../components/projects/ProjectCard';
import ProjectStats from '../components/projects/ProjectStats';
import ProjectForm from '../components/projects/ProjectForm';
import TaskList from '../components/projects/TaskList';
import TaskForm from '../components/projects/TaskForm';
import ProjectSidebar from '../components/projects/ProjectSidebar';
import CommentsSection from '../components/projects/CommentsSection';
import AttachmentsSection from '../components/projects/AttachmentsSection';

const Projects = () => {
  // State for projects and UI controls
  const [projects, setProjects] = useState([]);
  const [selectedProject, setSelectedProject] = useState(null);
  const [showProjectForm, setShowProjectForm] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [newComment, setNewComment] = useState('');

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

  // Load sample data
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
      },
      {
        id: 3,
        name: 'Marketing Campaign',
        description: 'Q3 marketing campaign for new product launch',
        startDate: '2023-05-15',
        dueDate: '2023-06-30',
        status: 'completed',
        priority: 'high',
        teamMembers: [2, 3],
        tasks: [
          { id: 1, title: 'Create Ad Designs', status: 'done', assignee: 2, dueDate: '2023-05-25' },
          { id: 2, title: 'Write Copy', status: 'done', assignee: 3, dueDate: '2023-05-20' },
          { id: 3, title: 'Launch Campaign', status: 'done', assignee: 3, dueDate: '2023-06-01' }
        ],
        comments: [
          { id: 1, author: 3, text: 'Campaign launched successfully', date: '2023-06-01' }
        ],
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
  const handleFileUpload = (file) => {
    const attachment = {
      id: selectedProject.attachments.length + 1,
      name: file.name,
      type: file.type.split('/')[0],
      url: URL.createObjectURL(file),
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
  };

  return (
    <div className="bg-white h-screen overflow-auto container mx-auto px-4 py-8">
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

          <ProjectStats projects={projects} />

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
              <ProjectCard 
                key={project.id}
                project={project}
                teamMembers={teamMembers}
                onClick={() => setSelectedProject(project)}
              />
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
              <TaskList 
                tasks={selectedProject.tasks}
                teamMembers={teamMembers}
                onStatusChange={updateTaskStatus}
                onAddTask={() => setShowTaskForm(true)}
              />
              
              <CommentsSection 
                comments={selectedProject.comments}
                teamMembers={teamMembers}
                newComment={newComment}
                onCommentChange={setNewComment}
                onAddComment={addComment}
              />
            </div>
            
            <div>
              <ProjectSidebar 
                project={selectedProject}
                teamMembers={teamMembers}
              />
              
              <AttachmentsSection 
                attachments={selectedProject.attachments}
                onFileUpload={handleFileUpload}
              />
            </div>
          </div>
        </div>
      )}
      
      {/* New/Edit Project Modal */}
      {showProjectForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <ProjectForm 
              projectForm={projectForm}
              teamMembers={teamMembers}
              onSubmit={handleProjectSubmit}
              onCancel={() => setShowProjectForm(false)}
              onChange={setProjectForm}
            />
          </div>
        </div>
      )}
      
      {/* New Task Modal */}
      {showTaskForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
            <TaskForm 
              taskForm={taskForm}
              teamMembers={teamMembers.filter(m => 
                selectedProject.teamMembers.includes(m.id))
              }
              onSubmit={handleTaskSubmit}
              onCancel={() => setShowTaskForm(false)}
              onChange={setTaskForm}
            />
          </div>
        </div>
      )}
    </div>
  );
};


export default Projects;