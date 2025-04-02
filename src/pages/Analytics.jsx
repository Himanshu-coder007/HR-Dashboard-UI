import { useState } from 'react';
import {
  FiTrendingUp,
  FiUsers,
  FiDollarSign,
  FiCalendar,
  FiClock,
  FiMap,
  FiAward,
  FiAlertTriangle,
} from 'react-icons/fi';
import {
  AttritionPrediction,
  TaskCompletionForecast,
  PayrollAnomalyDetection,
  AttendanceProductivityChart,
  HiringRevenueChart,
  ProjectFinancialChart,
  TimePerTaskChart,
  MeetingEfficiencyChart,
  IdleTimeAnalysis,
  EmployeeLocationMap,
  ClientEngagementMap,
  TopPerformersLeaderboard,
  TeamCollaborationScore,
  FeatureUsageHeatmap,
} from '../components/analytics';

const Analytics = () => {
  const [activeTab, setActiveTab] = useState('predictive');

  return (
    <div className="min-h-screen overflow-auto bg-grey-200 p-4 md:p-8">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800">Analytics</h1>
      </header>

      <div className="mb-6">
        <div className="flex flex-wrap gap-2 border-b border-gray-200">
          <TabButton
            active={activeTab === 'predictive'}
            onClick={() => setActiveTab('predictive')}
            icon={<FiTrendingUp className="mr-2" />}
          >
            Predictive Insights
          </TabButton>
          <TabButton
            active={activeTab === 'correlations'}
            onClick={() => setActiveTab('correlations')}
            icon={<FiUsers className="mr-2" />}
          >
            Cross-Department Trends
          </TabButton>
          <TabButton
            active={activeTab === 'efficiency'}
            onClick={() => setActiveTab('efficiency')}
            icon={<FiClock className="mr-2" />}
          >
            Time & Efficiency
          </TabButton>
          <TabButton
            active={activeTab === 'geographic'}
            onClick={() => setActiveTab('geographic')}
            icon={<FiMap className="mr-2" />}
          >
            Geographic Insights
          </TabButton>
          <TabButton
            active={activeTab === 'gamification'}
            onClick={() => setActiveTab('gamification')}
            icon={<FiAward className="mr-2" />}
          >
            Engagement Metrics
          </TabButton>
        </div>
      </div>

      <div className="grid gap-6">
        {activeTab === 'predictive' && (
          <>
            <div className="grid md:grid-cols-3 gap-6">
              <AttritionPrediction />
              <TaskCompletionForecast />
              <PayrollAnomalyDetection />
            </div>
          </>
        )}

        {activeTab === 'correlations' && (
          <>
            <AttendanceProductivityChart />
            <HiringRevenueChart />
            <ProjectFinancialChart />
          </>
        )}

        {activeTab === 'efficiency' && (
          <>
            <div className="grid md:grid-cols-3 gap-6">
              <TimePerTaskChart />
              <MeetingEfficiencyChart />
              <IdleTimeAnalysis />
            </div>
          </>
        )}

        {activeTab === 'geographic' && (
          <>
            <div className="grid md:grid-cols-2 gap-6">
              <EmployeeLocationMap />
              <ClientEngagementMap />
            </div>
          </>
        )}

        {activeTab === 'gamification' && (
          <>
            <TopPerformersLeaderboard />
            <div className="grid md:grid-cols-2 gap-6">
              <TeamCollaborationScore />
              <FeatureUsageHeatmap />
            </div>
          </>
        )}
      </div>
    </div>
  );
};

const TabButton = ({ active, onClick, icon, children }) => (
  <button
    onClick={onClick}
    className={`flex items-center px-4 py-2 text-sm font-medium rounded-t-lg transition-colors ${
      active
        ? 'bg-white border-t border-l border-r border-gray-200 text-blue-600'
        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-100'
    }`}
  >
    {icon}
    {children}
  </button>
);

export default Analytics;