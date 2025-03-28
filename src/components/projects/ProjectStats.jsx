import { Doughnut, Pie } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { useState } from 'react';

// Register ChartJS components
ChartJS.register(ArcElement, Tooltip, Legend);

const ProjectStats = ({ projects }) => {
  const [activeSegment, setActiveSegment] = useState(null);

  // Vibrant color palettes with hover effects
  const statusColors = {
    'not started': {
      normal: 'rgba(236, 72, 153, 0.8)',  // Pink-500
      hover: 'rgba(236, 72, 153, 1)',
      border: 'rgba(236, 72, 153, 0.9)'
    },
    'in progress': {
      normal: 'rgba(59, 130, 246, 0.8)',  // Blue-500
      hover: 'rgba(59, 130, 246, 1)',
      border: 'rgba(59, 130, 246, 0.9)'
    },
    'completed': {
      normal: 'rgba(16, 185, 129, 0.8)',  // Green-500
      hover: 'rgba(16, 185, 129, 1)',
      border: 'rgba(16, 185, 129, 0.9)'
    }
  };

  const priorityColors = {
    'low': {
      normal: 'rgba(163, 230, 53, 0.8)',  // Lime-400
      hover: 'rgba(163, 230, 53, 1)',
      border: 'rgba(163, 230, 53, 0.9)'
    },
    'medium': {
      normal: 'rgba(234, 179, 8, 0.8)',   // Yellow-500
      hover: 'rgba(234, 179, 8, 1)',
      border: 'rgba(234, 179, 8, 0.9)'
    },
    'high': {
      normal: 'rgba(239, 68, 68, 0.8)',   // Red-500
      hover: 'rgba(239, 68, 68, 1)',
      border: 'rgba(239, 68, 68, 0.9)'
    }
  };

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
          backgroundColor: Object.keys(statusCounts).map(status => 
            activeSegment === `status-${status}` 
              ? statusColors[status].hover 
              : statusColors[status].normal
          ),
          borderColor: Object.keys(statusCounts).map(status => 
            statusColors[status].border
          ),
          borderWidth: 2,
          hoverBackgroundColor: Object.keys(statusCounts).map(status => 
            statusColors[status].hover
          ),
          hoverBorderWidth: 3,
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
          backgroundColor: Object.keys(priorityCounts).map(priority => 
            activeSegment === `priority-${priority}` 
              ? priorityColors[priority].hover 
              : priorityColors[priority].normal
          ),
          borderColor: Object.keys(priorityCounts).map(priority => 
            priorityColors[priority].border
          ),
          borderWidth: 2,
          hoverBackgroundColor: Object.keys(priorityCounts).map(priority => 
            priorityColors[priority].hover
          ),
          hoverBorderWidth: 3,
        },
      ],
    };
  };

  const chartOptions = {
    responsive: true,
    cutout: '65%',  // Increased cutout to make more space for center text
    plugins: {
      legend: {
        position: 'bottom',
        labels: {
          usePointStyle: true,
          padding: 20,
          font: {
            size: 13,
            weight: 'bold'
          },
          color: '#111827'
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            const label = context.label || '';
            const value = context.raw || 0;
            const total = context.dataset.data.reduce((acc, data) => acc + data, 0);
            const percentage = Math.round((value / total) * 100);
            return `${label}: ${value} (${percentage}%)`;
          }
        },
        displayColors: true,
        backgroundColor: 'rgba(17, 24, 39, 0.9)',
        titleFont: {
          size: 14,
          weight: 'bold'
        },
        bodyFont: {
          size: 13
        },
        padding: 12,
        cornerRadius: 8,
        bodyColor: '#fff',
        titleColor: '#fff',
        borderColor: 'rgba(255, 255, 255, 0.2)',
        borderWidth: 1
      },
    },
    maintainAspectRatio: false,
    onHover: (event, chartElement, chart) => {
      if (chartElement.length > 0) {
        const datasetIndex = chartElement[0].datasetIndex;
        const index = chartElement[0].index;
        const chartId = chart.canvas.id;
        
        if (chartId === 'status-chart') {
          const status = ['not started', 'in progress', 'completed'][index];
          setActiveSegment(`status-${status}`);
        } else if (chartId === 'priority-chart') {
          const priority = ['low', 'medium', 'high'][index];
          setActiveSegment(`priority-${priority}`);
        }
      } else {
        setActiveSegment(null);
      }
    },
    animation: {
      animateScale: true,
      animateRotate: true,
      duration: 1000
    }
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Projects by Status</h2>
        <div className="h-64 relative">
          <Doughnut 
            id="status-chart"
            data={getStatusData()} 
            options={{
              ...chartOptions,
              plugins: {
                ...chartOptions.plugins,
                title: {
                  display: true,
                  text: 'Status Distribution',
                  font: {
                    size: 16,
                    weight: 'bold'
                  },
                  padding: {
                    bottom: 20
                  },
                  color: '#111827'
                }
              }
            }} 
          />
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="text-center">
              <p className="text-3xl font-bold text-gray-800 mb-1">
                {projects.length}
              </p>
              <p className="text-xs font-medium text-gray-500">TOTAL PROJECTS</p>
            </div>
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
        <h2 className="text-xl font-bold text-gray-800 mb-4">Projects by Priority</h2>
        <div className="h-64">
          <Pie 
            id="priority-chart"
            data={getPriorityData()} 
            options={{
              ...chartOptions,
              plugins: {
                ...chartOptions.plugins,
                title: {
                  display: true,
                  text: 'Priority Distribution',
                  font: {
                    size: 16,
                    weight: 'bold'
                  },
                  padding: {
                    bottom: 20
                  },
                  color: '#111827'
                }
              }
            }} 
          />
        </div>
      </div>
    </div>
  );
};

export default ProjectStats;