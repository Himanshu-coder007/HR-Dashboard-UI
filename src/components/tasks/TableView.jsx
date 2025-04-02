import { FiUser, FiEdit2, FiTrash2, FiCheck } from "react-icons/fi";

const TableView = ({
  sortedTasks,
  employees,
  handleAssignTask,
  handleEditTask,
  handleDeleteTask,
}) => {
  return (
    <div className="overflow-x-auto h-full">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50 sticky top-0">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Title
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Category
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Status
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Assigned To
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date Created
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {sortedTasks.map((task) => (
            <tr
              key={task.id}
              className="hover:bg-gray-50 transition-colors duration-150 group"
            >
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 group-hover:text-blue-600">
                {task.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <span
                  className={`px-2 py-1 rounded-full text-xs group-hover:shadow-sm ${
                    task.category === "Recruitment"
                      ? "bg-blue-100 text-blue-800 group-hover:bg-blue-200"
                      : task.category === "Finance"
                      ? "bg-pink-100 text-pink-800 group-hover:bg-pink-200"
                      : task.category === "Feedback"
                      ? "bg-violet-100 text-violet-800 group-hover:bg-violet-200"
                      : task.category === "Training"
                      ? "bg-green-100 text-green-800 group-hover:bg-green-200"
                      : "bg-orange-100 text-orange-800 group-hover:bg-orange-200"
                  }`}
                >
                  {task.category}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <span
                  className={`px-2 py-1 rounded-full text-xs group-hover:shadow-sm ${
                    task.status === "New Request"
                      ? "bg-blue-100 text-blue-800 group-hover:bg-blue-200"
                      : task.status === "In Progress"
                      ? "bg-yellow-100 text-yellow-800 group-hover:bg-yellow-200"
                      : "bg-green-100 text-green-800 group-hover:bg-green-200"
                  }`}
                >
                  {task.status}
                </span>
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                <div className="flex -space-x-2">
                  {(task.assignedTo || [])
                    .slice(0, 3)
                    .map((userId, index) => {
                      const employee = employees.find((e) => e.id === userId);
                      return employee ? (
                        <div
                          key={index}
                          className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 border-2 border-white"
                          title={`${employee.username} (${employee.roleDisplay})`}
                        >
                          {employee.username.charAt(0).toUpperCase()}
                        </div>
                      ) : null;
                    })}
                  {(task.assignedTo || []).length > 3 && (
                    <div
                      className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-800 border-2 border-white"
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
  );
};

export default TableView;