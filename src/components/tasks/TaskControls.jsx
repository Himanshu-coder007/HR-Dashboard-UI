import { FiSearch, FiCalendar, FiChevronDown, FiPlus , FiFilter } from "react-icons/fi";
import { FiGrid, FiTable, FiAlignLeft } from "react-icons/fi";

const TaskControls = ({
  searchTerm,
  setSearchTerm,
  sortOrder,
  setSortOrder,
  showSortDropdown,
  setShowSortDropdown,
  viewType,
  setViewType,
  setShowNewTaskModal,
}) => {
  const toggleSortDropdown = (e) => {
    e.stopPropagation();
    setShowSortDropdown(!showSortDropdown);
  };

  return (
    <>
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Tasks</h2>
        <div className="flex items-center gap-3">
          <span className="text-xs text-gray-500">
            {new Date().toLocaleDateString()}
          </span>
          <div className="flex items-center gap-2">
            <button className="p-1.5 rounded-md hover:bg-gray-100">
              <FiFilter className="text-gray-500 text-sm" />
            </button>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center mb-4 gap-4">
        <div className="relative flex-1">
          <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <input
            type="text"
            placeholder="Search tasks..."
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="relative">
          <button
            className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-lg text-sm"
            onClick={toggleSortDropdown}
          >
            <FiCalendar className="text-gray-500" />
            <span>
              Sort: {sortOrder === "newest" ? "Newest First" : "Oldest First"}
            </span>
            <FiChevronDown className="text-gray-500" />
          </button>
          {showSortDropdown && (
            <div
              className="absolute right-0 mt-1 w-48 bg-white rounded-md shadow-lg z-10 border border-gray-200"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  setSortOrder("newest");
                  setShowSortDropdown(false);
                }}
              >
                Newest First
              </button>
              <button
                className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                onClick={() => {
                  setSortOrder("oldest");
                  setShowSortDropdown(false);
                }}
              >
                Oldest First
              </button>
            </div>
          )}
        </div>
      </div>

      <div className="flex gap-4 mb-4">
        <button
          className={`text-center ${
            viewType === "kanban" ? "text-blue-600" : "text-gray-500"
          }`}
          onClick={() => setViewType("kanban")}
        >
          <div className="text-xs mb-1 flex items-center justify-center gap-1">
            <FiGrid className="text-xs" /> Kanban
          </div>
        </button>
        <button
          className={`text-center ${
            viewType === "table" ? "text-blue-600" : "text-gray-500"
          }`}
          onClick={() => setViewType("table")}
        >
          <div className="text-xs mb-1 flex items-center justify-center gap-1">
            <FiTable className="text-xs" /> Table
          </div>
        </button>
        <button
          className={`text-center ${
            viewType === "list" ? "text-blue-600" : "text-gray-500"
          }`}
          onClick={() => setViewType("list")}
        >
          <div className="text-xs mb-1 flex items-center justify-center gap-1">
            <FiAlignLeft className="text-xs" /> List View
          </div>
        </button>
      </div>
    </>
  );
};

export default TaskControls;