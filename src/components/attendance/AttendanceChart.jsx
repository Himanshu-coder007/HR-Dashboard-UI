// src/components/attendance/AttendanceChart.js
import React from 'react';
import { Line, Bar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  Filler
);

const AttendanceChart = () => {
  // Monthly data for line chart
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul'];
  const monthlyData = {
    labels: months,
    datasets: [
      {
        label: 'Present',
        data: [65, 59, 80, 81, 56, 55, 90],
        borderColor: '#10B981',
        backgroundColor: 'rgba(16, 185, 129, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Absent',
        data: [28, 48, 40, 19, 86, 27, 10],
        borderColor: '#EF4444',
        backgroundColor: 'rgba(239, 68, 68, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
      },
      {
        label: 'Late',
        data: [18, 25, 30, 15, 20, 35, 25],
        borderColor: '#F59E0B',
        backgroundColor: 'rgba(245, 158, 11, 0.1)',
        borderWidth: 2,
        tension: 0.4,
        fill: true,
      }
    ],
  };

  // Weekly data for bar chart
  const weekdays = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const weeklyData = {
    labels: weekdays,
    datasets: [
      {
        label: 'Average Attendance',
        data: [85, 92, 89, 94, 88, 65],
        backgroundColor: 'rgba(99, 102, 241, 0.7)',
        borderColor: 'rgba(99, 102, 241, 1)',
        borderWidth: 1,
        borderRadius: 4,
      }
    ],
  };

  const lineOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Monthly Attendance Trend',
        font: {
          size: 14
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          callback: function(value) {
            return value + '%';
          }
        }
      }
    },
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false
      },
      title: {
        display: true,
        text: 'Weekly Attendance Pattern',
        font: {
          size: 14
        }
      },
      tooltip: {
        callbacks: {
          label: function(context) {
            return context.raw + '% attendance';
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
    },
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Monthly Line Chart */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="h-80">
          <Line options={lineOptions} data={monthlyData} />
        </div>
      </div>
      
      {/* Weekly Bar Chart */}
      <div className="bg-white p-4 rounded-lg shadow-sm">
        <div className="h-80">
          <Bar options={barOptions} data={weeklyData} />
        </div>
      </div>
    </div>
  );
};

export default AttendanceChart;