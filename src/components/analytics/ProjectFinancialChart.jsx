import { FiCalendar, FiDollarSign } from 'react-icons/fi';
import { Bubble } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

export const ProjectFinancialChart = () => {
  const data = {
    datasets: [
      {
        label: 'On Time',
        data: [
          { x: 100, y: 95, r: 15 },
          { x: 95, y: 90, r: 10 },
          { x: 110, y: 105, r: 12 },
        ],
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        borderColor: 'rgba(16, 185, 129, 1)',
      },
      {
        label: 'Delayed',
        data: [
          { x: 120, y: 85, r: 20 },
          { x: 135, y: 75, r: 18 },
          { x: 115, y: 80, r: 16 },
        ],
        backgroundColor: 'rgba(239, 68, 68, 0.5)',
        borderColor: 'rgba(239, 68, 68, 1)',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        title: {
          display: true,
          text: 'Budget Utilization (%)',
        },
        min: 70,
        max: 110,
      },
      x: {
        title: {
          display: true,
          text: 'Project Duration (days)',
        },
        min: 90,
        max: 140,
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.dataset.label || '';
            const point = context.raw;
            return `${label}: ${point.x} days, ${point.y}% budget used`;
          }
        }
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <FiCalendar className="mr-2 text-blue-500" />
        <FiDollarSign className="mr-2 text-blue-500" />
        <h3 className="text-lg font-semibold">Project Deadlines vs Financial Performance</h3>
      </div>
      <p className="text-gray-600 mb-4">
        Impact of project delays on budget utilization and cost overruns.
      </p>
      <div className="h-80">
        <Bubble data={data} options={options} />
      </div>
      <div className="mt-4 text-sm text-gray-600">
        <p>
          Projects delayed by more than 10 days show 15-25% higher budget utilization on average.
          Each week of delay increases costs by approximately 8%.
        </p>
      </div>
    </div>
  );
};