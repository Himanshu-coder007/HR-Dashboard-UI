import { FiUsers, FiMessageSquare } from 'react-icons/fi';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

export const TeamCollaborationScore = () => {
  const data = {
    labels: ['Engineering', 'Marketing', 'Sales', 'Operations', 'HR', 'Finance'],
    datasets: [
      {
        label: 'Internal Collaboration',
        data: [85, 70, 65, 75, 90, 60],
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
      },
      {
        label: 'Cross-Team Collaboration',
        data: [65, 80, 75, 70, 85, 50],
        backgroundColor: 'rgba(16, 185, 129, 0.7)',
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
        <FiUsers className="mr-2 text-blue-500" />
        <h3 className="text-lg font-semibold">Team Collaboration Score</h3>
      </div>
      <p className="text-gray-600 mb-4">
        How well different departments work together based on communication metrics.
      </p>
      <div className="h-64">
        <Bar data={data} options={options} />
      </div>
      <div className="mt-4 text-sm text-gray-600 flex items-center">
        <FiMessageSquare className="mr-2" />
        <span>HR has the highest internal collaboration while Engineering leads in cross-team collaboration</span>
      </div>
    </div>
  );
};