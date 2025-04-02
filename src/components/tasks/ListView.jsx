import { FiUser, FiEdit2, FiTrash2 } from "react-icons/fi";

const ListView = ({
  sortedTasks,
  employees,
  handleAssignTask,
  handleEditTask,
  handleDeleteTask,
}) => {
  return (
    <div className="space-y-4 overflow-y-auto h-full pb-4">
      {sortedTasks.map((task) => (
        <div
          key={task.id}
          className="p-4 border border-gray-200 rounded-lg transition-all duration-200 hover:shadow-md hover:border-gray-300 hover:translate-y-[-2px]"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-gray-800 mb-1 hover:text-blue-600">
                {task.title}
              </h3>
              <p className="text-xs text-gray-500 mb-2 line-clamp-2 hover:text-gray-600">
                {task.description}
              </p>
            </div>
            <div className="flex gap-2">
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full hover:shadow-sm ${
                  task.category === "Recruitment"
                    ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                    : task.category === "Finance"
                    ? "bg-pink-100 text-pink-800 hover:bg-pink-200"
                    : task.category === "Feedback"
                    ? "bg-violet-100 text-violet-800 hover:bg-violet-200"
                    : task.category === "Training"
                    ? "bg-green-100 text-green-800 hover:bg-green-200"
                    : "bg-orange-100 text-orange-800 hover:bg-orange-200"
                }`}
              >
                {task.category}
              </span>
              <span
                className={`text-xs font-medium px-2 py-1 rounded-full hover:shadow-sm ${
                  task.status === "New Request"
                    ? "bg-blue-100 text-blue-800 hover:bg-blue-200"
                    : task.status === "In Progress"
                    ? "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                    : "bg-green-100 text-green-800 hover:bg-green-200"
                }`}
              >
                {task.status}
              </span>
            </div>
          </div>
          <div className="flex justify-between items-center mt-2">
            <div className="flex items-center">
              <div className="flex -space-x-2 mr-3">
                {(task.assignedTo || [])
                  .slice(0, 3)
                  .map((userId, index) => {
                    const employee = employees.find((e) => e.id === userId);
                    return employee ? (
                      <div
                        key={index}
                        className="w-6 h-6 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 border-2 border-white text-xs"
                        title={`${employee.username} (${employee.roleDisplay})`}
                      >
                        {employee.username.charAt(0).toUpperCase()}
                      </div>
                    ) : null;
                  })}
                {(task.assignedTo || []).length > 3 && (
                  <div
                    className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center text-gray-800 border-2 border-white text-xs"
                    title={`${(task.assignedTo || [])
                      .slice(3)
                      .map((id) => {
                        const e = employees.find((emp) => emp.id === id);
                        return e
                          ? `${e.username} (${e.roleDisplay})`
                          : "";
                      })
                      .join(", ")}`}
                  >
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
  );
};

export default ListView;