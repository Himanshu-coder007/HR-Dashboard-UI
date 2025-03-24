import { FiCalendar } from "react-icons/fi";

const Attendance = () => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  const yAxisValues = [200, 100, 50, 10];

  return (
    <div className="p-4 shadow-lg rounded-xl bg-white w-full border border-gray-200 h-full">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-md font-semibold text-gray-800">Attendance Report</h2>
        <div className="flex items-center gap-2">
          <FiCalendar className="text-gray-500 text-sm" />
          <span className="text-gray-600 text-xs">01 March 2025</span>
        </div>
      </div>
      
      <div className="grid grid-cols-4 gap-3 text-center text-gray-700 mb-4">
        <div className="p-2 rounded-lg bg-gray-50">
          <span className="text-xl font-bold block">173</span>
          <p className="text-xs text-gray-500 mt-1">Total</p>
        </div>
        <div className="p-2 rounded-lg bg-gray-50">
          <span className="text-xl font-bold block">128</span>
          <p className="text-xs text-gray-500 mt-1">On Time</p>
        </div>
        <div className="p-2 rounded-lg bg-gray-50">
          <span className="text-xl font-bold block">21</span>
          <p className="text-xs text-gray-500 mt-1">Absent</p>
        </div>
        <div className="p-2 rounded-lg bg-gray-50">
          <span className="text-xl font-bold block">24</span>
          <p className="text-xs text-gray-500 mt-1">Late</p>
        </div>
      </div>

      {/* Chart with Axes */}
      <div className="flex h-40">
        {/* Y-axis */}
        <div className="flex flex-col justify-between mr-2">
          {yAxisValues.map((value) => (
            <span key={value} className="text-xs text-gray-500">{value}</span>
          ))}
        </div>
        
        {/* Chart area */}
        <div className="flex-1 flex flex-col">
          {/* Chart bars */}
          <div className="flex-1 grid grid-cols-7 gap-1 relative">
            {/* Horizontal grid lines */}
            {yAxisValues.map((_, i) => (
              <div 
                key={`line-${i}`}
                className="absolute left-0 right-0 border-t border-gray-100"
                style={{ bottom: `${(i + 1) * 25}%` }}
              />
            ))}
            
            {/* Bars */}
            {[...Array(7)].map((_, index) => (
              <div key={index} className="flex flex-col justify-end">
                <div 
                  className={`rounded-t-sm ${index % 2 === 0 ? 'bg-blue-500' : 'bg-blue-300'}`}
                  style={{ height: `${Math.random() * 80 + 20}%` }}
                ></div>
              </div>
            ))}
          </div>
          
          {/* X-axis labels */}
          <div className="grid grid-cols-7 gap-1 mt-1">
            {months.map((month, i) => (
              <span key={i} className="text-xs text-gray-500 text-center truncate">{month}</span>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <button className="text-blue-600 hover:text-blue-800 text-xs font-medium flex items-center">
          View Full Report
          <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 ml-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>
    </div>
  );
};

export default Attendance;