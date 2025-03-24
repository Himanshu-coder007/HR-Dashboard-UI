import { FiCalendar } from "react-icons/fi";

const Attendance = () => {
  return (
    <div className="p-6 shadow-lg rounded-2xl bg-white w-full max-w-2xl border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold text-gray-800">Attendance Report</h2>
        <div className="flex items-center gap-2">
          <FiCalendar className="text-gray-500" />
          <span className="text-gray-600 text-sm">01 March 2025</span>
        </div>
      </div>
      <div className="grid grid-cols-4 gap-4 text-center text-gray-700 mb-6">
        <div className="p-3 rounded-lg bg-gray-50">
          <span className="text-3xl font-bold block">173</span>
          <p className="text-sm text-gray-500 mt-1">Total Employees</p>
        </div>
        <div className="p-3 rounded-lg bg-gray-50">
          <span className="text-3xl font-bold block">128</span>
          <p className="text-sm text-gray-500 mt-1">On Time</p>
        </div>
        <div className="p-3 rounded-lg bg-gray-50">
          <span className="text-3xl font-bold block">21</span>
          <p className="text-sm text-gray-500 mt-1">Absent</p>
        </div>
        <div className="p-3 rounded-lg bg-gray-50">
          <span className="text-3xl font-bold block">24</span>
          <p className="text-sm text-gray-500 mt-1">Late</p>
        </div>
      </div>
      <div className="mt-6 grid grid-cols-7 gap-1">
        {[...Array(35)].map((_, index) => (
          <div
            key={index}
            className={`w-8 h-8 rounded-md ${index % 5 === 0 ? "bg-blue-500" : "bg-blue-200"}`}
          ></div>
        ))}
      </div>
      <div className="mt-6 flex justify-end">
        <button className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center">
          View Full Report
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Attendance;