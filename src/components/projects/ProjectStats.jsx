import { Doughnut, Bar } from 'react-chartjs-2';

const ProjectStats = ({ projects }) => {
  const getStatusData = () => {
    const statusCounts = {
      'not started': 0,
      'in progress': 0,
      'completed': 0
    };

    projects.forEach(project => {
      statusCounts[project.status]++;
    });

    return {
      labels: ['Not Started', 'In Progress', 'Completed'],
      datasets: [
        {
          label: 'Projects by Status',
          data: Object.values(statusCounts),
          backgroundColor: [
            'rgba(99, 102, 241, 0.7)',
            'rgba(59, 130, 246, 0.7)',
            'rgba(16, 185, 129, 0.7)'
          ],
          borderColor: [
            'rgba(99, 102, 241, 1)',
            'rgba(59, 130, 246, 1)',
            'rgba(16, 185, 129, 1)'
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  const getPriorityData = () => {
    const priorityCounts = {
      'low': 0,
      'medium': 0,
      'high': 0
    };

    projects.forEach(project => {
      priorityCounts[project.priority]++;
    });

    return {
      labels: ['Low', 'Medium', 'High'],
      datasets: [
        {
          label: 'Projects by Priority',
          data: Object.values(priorityCounts),
          backgroundColor: [
            'rgba(16, 185, 129, 0.7)',
            'rgba(234, 179, 8, 0.7)',
            'rgba(239, 68, 68, 0.7)'
          ],
          borderColor: [
            'rgba(16, 185, 129, 1)',
            'rgba(234, 179, 8, 1)',
            'rgba(239, 68, 68, 1)'
          ],
          borderWidth: 1,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom',
      },
    },
    maintainAspectRatio: false,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Projects by Status</h2>
        <div className="h-64">
          <Doughnut data={getStatusData()} options={chartOptions} />
        </div>
      </div>
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <h2 className="text-xl font-semibold text-gray-800 mb-4">Projects by Priority</h2>
        <div className="h-64">
          <Bar data={getPriorityData()} options={chartOptions} />
        </div>
      </div>
    </div>
  );
};

export default ProjectStats;