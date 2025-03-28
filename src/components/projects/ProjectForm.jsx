import { useState } from 'react';

const ProjectForm = ({ 
  projectForm, 
  teamMembers, 
  onSubmit, 
  onCancel, 
  onChange 
}) => {
  const handleChange = (e) => {
    const { name, value } = e.target;
    onChange({ ...projectForm, [name]: value });
  };

  const handleMemberToggle = (memberId) => {
    const updatedMembers = projectForm.teamMembers.includes(memberId)
      ? projectForm.teamMembers.filter(id => id !== memberId)
      : [...projectForm.teamMembers, memberId];
    onChange({ ...projectForm, teamMembers: updatedMembers });
  };

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">
        {projectForm.id ? 'Edit Project' : 'New Project'}
      </h2>
      
      <form onSubmit={onSubmit}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Project Name</label>
            <input
              type="text"
              name="name"
              value={projectForm.name}
              onChange={handleChange}
              className="w-full border rounded-lg px-4 py-2"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={projectForm.description}
              onChange={handleChange}
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
                onChange={handleChange}
                className="w-full border rounded-lg px-4 py-2"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Due Date</label>
              <input
                type="date"
                name="dueDate"
                value={projectForm.dueDate}
                onChange={handleChange}
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
                onChange={handleChange}
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
                onChange={handleChange}
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
                    onChange={() => handleMemberToggle(member.id)}
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
            onClick={onCancel}
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
  );
};

export default ProjectForm;