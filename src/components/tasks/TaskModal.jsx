import { FiX, FiCheck } from "react-icons/fi";

const TaskModal = ({
  showNewTaskModal,
  setShowNewTaskModal,
  editingTask,
  setEditingTask,
  newTask,
  setNewTask,
  handleNewTaskChange,
  handleAddTag,
  handleRemoveTag,
  handleSubmitNewTask,
  handleSubmitEditTask,
}) => {
  if (!showNewTaskModal) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md">
        <div className="flex justify-between items-center border-b border-gray-200 p-4">
          <h3 className="text-lg font-semibold">
            {editingTask ? "Edit Task" : "Create New Task"}
          </h3>
          <button
            onClick={() => {
              setShowNewTaskModal(false);
              setEditingTask(null);
            }}
            className="text-gray-500 hover:text-gray-700"
          >
            <FiX size={20} />
          </button>
        </div>
        <form
          onSubmit={editingTask ? handleSubmitEditTask : handleSubmitNewTask}
          className="p-4 space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={editingTask ? editingTask.title : newTask.title}
              onChange={(e) =>
                editingTask
                  ? setEditingTask({
                      ...editingTask,
                      title: e.target.value,
                    })
                  : handleNewTaskChange(e)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              name="description"
              value={
                editingTask ? editingTask.description : newTask.description
              }
              onChange={(e) =>
                editingTask
                  ? setEditingTask({
                      ...editingTask,
                      description: e.target.value,
                    })
                  : handleNewTaskChange(e)
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              rows={3}
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Category
              </label>
              <select
                name="category"
                value={editingTask ? editingTask.category : newTask.category}
                onChange={(e) =>
                  editingTask
                    ? setEditingTask({
                        ...editingTask,
                        category: e.target.value,
                      })
                    : handleNewTaskChange(e)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="Recruitment">Recruitment</option>
                <option value="Finance">Finance</option>
                <option value="Feedback">Feedback</option>
                <option value="Training">Training</option>
                <option value="Compliance">Compliance</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Status
              </label>
              <select
                name="status"
                value={editingTask ? editingTask.status : newTask.status}
                onChange={(e) =>
                  editingTask
                    ? setEditingTask({
                        ...editingTask,
                        status: e.target.value,
                      })
                    : handleNewTaskChange(e)
                }
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="New Request">New Request</option>
                <option value="In Progress">In Progress</option>
                <option value="Complete">Complete</option>
              </select>
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Tags
            </label>
            <div className="flex flex-wrap gap-2 mb-2">
              {(editingTask ? editingTask.tags : newTask.tags).map(
                (tag, index) => (
                  <span
                    key={index}
                    className="inline-flex items-center px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => handleRemoveTag(index, !!editingTask)}
                      className="ml-1 text-blue-600 hover:text-blue-800"
                    >
                      <FiX size={12} />
                    </button>
                  </span>
                )
              )}
            </div>
            <input
              type="text"
              placeholder="Add tag and press Enter"
              onKeyDown={handleAddTag}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-end space-x-3 pt-4 border-t border-gray-200">
            <button
              type="button"
              onClick={() => {
                setShowNewTaskModal(false);
                setEditingTask(null);
              }}
              className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              {editingTask ? "Update Task" : "Create Task"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskModal;