import { FiPlus } from 'react-icons/fi';

const TaskList = ({ 
  tasks, 
  teamMembers, 
  onStatusChange, 
  onAddTask 
}) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 mb-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold text-gray-800">Tasks</h2>
        <button 
          onClick={onAddTask}
          className="flex items-center bg-blue-600 text-white px-3 py-1 rounded-lg hover:bg-blue-700 transition text-sm"
        >
          <FiPlus className="mr-1" /> Add Task
        </button>
      </div>
      
      {tasks.length > 0 ? (
        <div className="space-y-4">
          {tasks.map(task => (
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
                  onChange={(e) => onStatusChange(task.id, e.target.value)}
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
  );
};

export default TaskList;