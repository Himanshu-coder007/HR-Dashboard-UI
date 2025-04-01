import { FiUsers, FiActivity } from 'react-icons/fi';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export const AttendanceProductivityChart = () => {
  const data = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'Average Attendance Rate',
        data: [92, 94, 91, 89, 93, 95, 90],
        borderColor: 'rgb(99, 102, 241)',
        backgroundColor: 'rgba(99, 102, 241, 0.5)',
        yAxisID: 'y',
        tension: 0.3,
      },
      {
        label: 'Task Completion Rate',
        data: [88, 90, 85, 82, 89, 93, 87],
        borderColor: 'rgb(16, 185, 129)',
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        yAxisID: 'y1',
        tension: 0.3,
      },
    ],
  };

  const options = {
    responsive: true,
    interaction: {
      mode: 'index',
      intersect: false,
    },
    plugins: {
      title: {
        display: true,
        text: 'Attendance vs. Productivity Correlation',
      },
    },
    scales: {
      y: {
        type: 'linear',
        display: true,
        position: 'left',
        title: {
          display: true,
          text: 'Attendance Rate (%)',
        },
        min: 80,
        max: 100,
      },
      y1: {
        type: 'linear',
        display: true,
        position: 'right',
        title: {
          display: true,
          text: 'Task Completion (%)',
        },
        min: 80,
        max: 100,
        grid: {
          drawOnChartArea: false,
        },
      },
    },
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <div className="flex items-center mr-4">
          <FiUsers className="mr-2 text-indigo-500" />
          <span>Attendance</span>
        </div>
        <div className="flex items-center">
          <FiActivity className="mr-2 text-green-500" />
          <span>Productivity</span>
        </div>
      </div>
      <div className="h-80">
        <Line data={data} options={options} />
      </div>
      <div className="mt-4 text-sm text-gray-600">
        <p>
          Analysis shows a 0.78 correlation between attendance and productivity. Teams with attendance
          below 90% show a 12% drop in task completion rates.
        </p>
      </div>
    </div>
  );
};