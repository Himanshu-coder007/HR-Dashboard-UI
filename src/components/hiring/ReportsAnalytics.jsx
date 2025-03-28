import { FiBarChart2, FiTrendingUp, FiUsers, FiClock, FiDollarSign } from 'react-icons/fi';
import { Bar, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

const ReportsAnalytics = () => {
  // Sample data for charts
  const hiringPipelineData = {
    labels: ['Applied', 'Screened', 'Interviewed', 'Offered', 'Hired'],
    datasets: [
      {
        label: 'Candidates',
        data: [120, 80, 45, 15, 8],
        backgroundColor: [
          'rgba(59, 130, 246, 0.7)',
          'rgba(99, 102, 241, 0.7)',
          'rgba(168, 85, 247, 0.7)',
          'rgba(236, 72, 153, 0.7)',
          'rgba(16, 185, 129, 0.7)',
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(99, 102, 241, 1)',
          'rgba(168, 85, 247, 1)',
          'rgba(236, 72, 153, 1)',
          'rgba(16, 185, 129, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const sourceData = {
    labels: ['LinkedIn', 'Indeed', 'Company Website', 'Referrals', 'Other'],
    datasets: [
      {
        data: [45, 25, 15, 10, 5],
        backgroundColor: [
          'rgba(59, 130, 246, 0.7)',
          'rgba(16, 185, 129, 0.7)',
          'rgba(245, 158, 11, 0.7)',
          'rgba(236, 72, 153, 0.7)',
          'rgba(156, 163, 175, 0.7)',
        ],
        borderColor: [
          'rgba(59, 130, 246, 1)',
          'rgba(16, 185, 129, 1)',
          'rgba(245, 158, 11, 1)',
          'rgba(236, 72, 153, 1)',
          'rgba(156, 163, 175, 1)',
        ],
        borderWidth: 1,
      },
    ],
  };

  const timeToHireData = {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
    datasets: [
      {
        label: 'Days',
        data: [35, 42, 28, 31, 24, 29],
        backgroundColor: 'rgba(59, 130, 246, 0.7)',
        borderColor: 'rgba(59, 130, 246, 1)',
        borderWidth: 1,
      },
    ],
  };

  const metrics = [
    { name: 'Total Open Positions', value: '12', icon: <FiUsers className="h-6 w-6 text-blue-500" />, change: '+2 from last month' },
    { name: 'Average Time to Hire', value: '32 days', icon: <FiClock className="h-6 w-6 text-green-500" />, change: '-5 days from last quarter' },
    { name: 'Cost per Hire', value: '$4,500', icon: <FiDollarSign className="h-6 w-6 text-purple-500" />, change: '-$200 from last quarter' },
    { name: 'Offer Acceptance Rate', value: '78%', icon: <FiTrendingUp className="h-6 w-6 text-yellow-500" />, change: '+8% from last quarter' },
  ];

  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Reports & Analytics</h2>
        <p className="mt-2 text-sm text-gray-600">
          Track your hiring metrics and pipeline performance.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {metrics.map((metric, index) => (
          <div key={index} className="bg-white overflow-hidden shadow rounded-lg">
            <div className="p-5">
              <div className="flex items-center">
                <div className="flex-shrink-0">
                  {metric.icon}
                </div>
                <div className="ml-5 w-0 flex-1">
                  <dl>
                    <dt className="text-sm font-medium text-gray-500 truncate">{metric.name}</dt>
                    <dd>
                      <div className="text-lg font-medium text-gray-900">{metric.value}</div>
                    </dd>
                  </dl>
                </div>
              </div>
              <div className="mt-4">
                <span className="text-sm text-gray-500">{metric.change}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white p-6 shadow rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Hiring Pipeline</h3>
          <div className="h-80">
            <Bar 
              data={hiringPipelineData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'top',
                  },
                  title: {
                    display: false,
                  },
                },
              }}
            />
          </div>
        </div>

        <div className="bg-white p-6 shadow rounded-lg">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Candidate Sources</h3>
          <div className="h-80">
            <Pie
              data={sourceData}
              options={{
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                  legend: {
                    position: 'right',
                  },
                },
              }}
            />
          </div>
        </div>
      </div>

      <div className="bg-white p-6 shadow rounded-lg">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Time to Hire Trend</h3>
        <div className="h-80">
          <Bar
            data={timeToHireData}
            options={{
              responsive: true,
              maintainAspectRatio: false,
              plugins: {
                legend: {
                  position: 'top',
                },
                title: {
                  display: false,
                },
              },
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default ReportsAnalytics;