import { FiCalendar, FiClock } from 'react-icons/fi';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const TaskCompletionForecast = () => {
  const data = {
    labels: ['Project A', 'Project B', 'Project C', 'Project D', 'Project E'],
    datasets: [
      {
        label: 'Current Progress',
        data: [45, 78, 62, 30, 90],
        backgroundColor: 'rgba(59, 130, 246, 0.5)',
      },
      {
        label: 'Forecasted Completion',
        data: [65, 85, 70, 50, 95],
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.raw}%`;
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 100,
        ticks: {
          callback: function(value) {
            return value + '%';
          }
        }
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <FiCalendar className="mr-2 text-blue-500" />
        <h3 className="text-lg font-semibold">Task Completion Forecast</h3>
      </div>
      <p className="text-gray-600 mb-4">
        Based on past performance, estimates which projects/tasks might be delayed.
      </p>
      <div className="h-64">
        <Bar data={data} options={options} />
      </div>
      <div className="mt-4 flex items-center text-sm text-gray-500">
        <FiClock className="mr-1" />
        <span>Projects in red may miss deadlines without intervention</span>
      </div>
    </div>
  );
};