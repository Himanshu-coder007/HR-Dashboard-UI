import { FiUserPlus, FiDollarSign } from 'react-icons/fi';
import { Scatter } from 'react-chartjs-2';
import { Chart as ChartJS, LinearScale, PointElement, Tooltip, Legend } from 'chart.js';

ChartJS.register(LinearScale, PointElement, Tooltip, Legend);

export const HiringRevenueChart = () => {
  const data = {
    datasets: [
      {
        label: 'Q1',
        data: [
          { x: 5, y: 120 },
          { x: 8, y: 150 },
          { x: 3, y: 110 },
        ],
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
      },
      {
        label: 'Q2',
        data: [
          { x: 7, y: 140 },
          { x: 10, y: 180 },
          { x: 6, y: 135 },
        ],
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
      {
        label: 'Q3',
        data: [
          { x: 12, y: 210 },
          { x: 9, y: 170 },
          { x: 15, y: 240 },
        ],
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
      },
    ],
  };

  const options = {
    scales: {
      y: {
        title: {
          display: true,
          text: 'Revenue Growth (%)',
        },
      },
      x: {
        title: {
          display: true,
          text: 'New Hires',
        },
      },
    },
    plugins: {
      tooltip: {
        callbacks: {
          label: function(context) {
            return `${context.dataset.label}: ${context.parsed.y}% revenue growth with ${context.parsed.x} new hires`;
          }
        }
      }
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <FiUserPlus className="mr-2 text-blue-500" />
        <h3 className="text-lg font-semibold">Hiring & Revenue Growth Correlation</h3>
      </div>
      <p className="text-gray-600 mb-4">
        Relationship between new hires and company revenue performance.
      </p>
      <div className="h-80">
        <Scatter data={data} options={options} />
      </div>
      <div className="mt-4 text-sm text-gray-600">
        <p>
          Data shows a 0.65 correlation between strategic hiring and revenue growth. Each new hire
          in core departments contributes to ~8% quarterly revenue increase on average.
        </p>
      </div>
    </div>
  );
};