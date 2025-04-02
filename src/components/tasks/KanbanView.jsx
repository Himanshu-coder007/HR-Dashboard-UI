import TaskCard from "./TaskCard";

const KanbanView = ({
  sortedTasks,
  statusColumns,
  handleEditTask,
  handleDeleteTask,
  handleStatusChange,
  handleAssignTask,
  employees,
}) => {
  return (
    <div className="grid grid-cols-3 gap-4 h-full">
      {statusColumns.map((column) => (
        <div key={column.id} className="flex flex-col h-full">
          <div
            className={`text-sm font-medium p-2 rounded-lg bg-${column.color}-100 text-${column.color}-800`}
          >
            {column.title}
          </div>
          <div className="flex-1 overflow-y-auto space-y-4 pr-2">
            {sortedTasks
              .filter((task) => task.status === column.title)
              .map((task) => (
                <div
                  key={task.id}
                  className="p-3 border border-gray-200 rounded-lg hover:bg-gray-50 transition-all duration-200 cursor-pointer hover:shadow-md hover:border-gray-300 hover:translate-y-[-2px]"
                >
                  <TaskCard
                    task={task}
                    onEdit={handleEditTask}
                    onDelete={handleDeleteTask}
                    onStatusChange={handleStatusChange}
                    onAssign={handleAssignTask}
                    statusColumns={statusColumns}
                    employees={employees}
                  />
                </div>
              ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default KanbanView;