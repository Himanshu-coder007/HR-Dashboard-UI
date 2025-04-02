import { FiX, FiCheck, FiUser } from "react-icons/fi";

const AssignModal = ({
  assigningTask,
  setAssigningTask,
  employees,
  toggleAssignee,
  saveAssignees,
}) => {
  if (!assigningTask) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center border-b border-gray-200 p-4">
          <h3 className="text-lg font-semibold">
            Assign Task: {assigningTask.title}
          </h3>
          <button
            onClick={() => setAssigningTask(null)}
            className="text-gray-500 hover:text-gray-700"
          >
            <FiX size={20} />
          </button>
        </div>
        <div className="p-4">
          <div className="space-y-3 max-h-96 overflow-y-auto">
            {employees.map((employee) => (
              <div
                key={employee.id}
                className={`flex items-center justify-between p-3 border rounded-lg cursor-pointer ${
                  (assigningTask.assignedTo || []).includes(employee.id)
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:bg-gray-50"
                }`}
                onClick={() => toggleAssignee(employee.id)}
              >
                <div className="flex items-center">
                  <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-800 mr-3">
                    {employee.username.charAt(0).toUpperCase()}
                  </div>
                  <div>
                    <p className="font-medium text-gray-800">
                      {employee.username}
                    </p>
                    <div className="flex items-center gap-2">
                      <span className="text-xs px-2 py-0.5 bg-blue-100 text-blue-800 rounded-full">
                        {employee.roleDisplay}
                      </span>
                      <span className="text-xs text-gray-500">
                        {employee.email}
                      </span>
                    </div>
                  </div>
                </div>
                {(assigningTask.assignedTo || []).includes(employee.id) && (
                  <FiCheck className="text-blue-600" />
                )}
              </div>
            ))}
          </div>
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200 mt-4">
            <button
              type="button"
              onClick={() => setAssigningTask(null)}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="button"
              onClick={saveAssignees}
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Save Assignees
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssignModal;