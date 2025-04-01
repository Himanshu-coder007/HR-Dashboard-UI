import { FiClock, FiBarChart2 } from 'react-icons/fi';
import { Radar } from 'react-chartjs-2';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';

ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export const TimePerTaskChart = () => {
  const data = {
    labels: ['Research', 'Development', 'Testing', 'Documentation', 'Meetings', 'Code Review'],
    datasets: [
      {
        label: 'Engineering Team',
        data: [12, 18, 14, 8, 10, 6],
        backgroundColor: 'rgba(59, 130, 246, 0.2)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 2,
      },
      {
        label: 'Company Average',
        data: [10, 15, 12, 6, 15, 8],
        backgroundColor: 'rgba(16, 185, 129, 0.2)',
        borderColor: 'rgba(16, 185, 129, 1)',
        borderWidth: 2,
      },
    ],
  };

  const options = {
    scales: {
      r: {
        angleLines: {
          display: true,
        },
        suggestedMin: 0,
        suggestedMax: 20,
        ticks: {
          stepSize: 5,
          callback: function(value) {
            return value + ' hrs';
          }
        }
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <FiClock className="mr-2 text-blue-500" />
        <h3 className="text-lg font-semibold">Average Time Spent Per Task</h3>
      </div>
      <p className="text-gray-600 mb-4">
        Breakdown of time allocation by task type (by team or individual).
      </p>
      <div className="h-64">
        <Radar data={data} options={options} />
      </div>
      <div className="mt-4 text-sm text-gray-600 flex items-center">
        <FiBarChart2 className="mr-2" />
        <span>Engineering spends 20% more time on development than company average</span>
      </div>
    </div>
  );
};