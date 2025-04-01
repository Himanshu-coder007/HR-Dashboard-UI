import { FiCalendar, FiCheckCircle } from 'react-icons/fi';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(ArcElement, Tooltip, Legend);

export const MeetingEfficiencyChart = () => {
  const data = {
    labels: ['Effective Meetings', 'Ineffective Meetings'],
    datasets: [
      {
        data: [35, 65],
        backgroundColor: [
          'rgba(16, 185, 129, 0.7)',
          'rgba(239, 68, 68, 0.7)',
        ],
        borderColor: [
          'rgba(16, 185, 129, 1)',
          'rgba(239, 68, 68, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.label}: ${context.raw}%`;
          }
        }
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <FiCalendar className="mr-2 text-blue-500" />
        <h3 className="text-lg font-semibold">Meeting Efficiency Score</h3>
      </div>
      <p className="text-gray-600 mb-4">
        Number of meetings vs actual work completed from meeting outcomes.
      </p>
      <div className="h-64 flex flex-col items-center">
        <div className="w-48 h-48">
          <Doughnut data={data} options={options} />
        </div>
        <div className="mt-4 text-center">
          <div className="text-2xl font-bold text-gray-800">35%</div>
          <div className="text-sm text-gray-600">of meetings result in actionable outcomes</div>
        </div>
      </div>
      <div className="mt-4 text-sm text-gray-600">
        <p>
          <FiCheckCircle className="inline mr-1 text-green-500" />
          Effective meetings have clear agendas, decisions, and follow-up actions
        </p>
      </div>
    </div>
  );
};