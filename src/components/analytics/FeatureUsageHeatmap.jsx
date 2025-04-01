import { FiGrid, FiActivity } from 'react-icons/fi';
import { HeatMapGrid } from 'react-grid-heatmap';

export const FeatureUsageHeatmap = () => {
  const xLabels = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'];
  const yLabels = ['Projects', 'HR', 'Finance', 'Reports', 'Dashboard', 'Chat'];
  
  const data = [
    [85, 70, 65, 75, 90],
    [60, 45, 55, 65, 50],
    [30, 40, 25, 35, 20],
    [75, 80, 85, 70, 90],
    [95, 90, 85, 80, 75],
    [50, 55, 60, 65, 70],
  ];

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <FiGrid className="mr-2 text-blue-500" />
        <h3 className="text-lg font-semibold">Feature Usage Heatmap</h3>
      </div>
      <p className="text-gray-600 mb-4">
        Which features are most/least used across different days.
      </p>
      <div className="h-64 overflow-auto">
        <HeatMapGrid
          data={data}
          xLabels={xLabels}
          yLabels={yLabels}
          cellRender={(x, y, value) => (
            <div title={`${yLabels[y]}: ${value}% usage on ${xLabels[x]}`}>{value}%</div>
          )}
          xLabelsStyle={(index) => ({
            color: '#6b7280',
            fontSize: '.75rem'
          })}
          yLabelsStyle={() => ({
            color: '#6b7280',
            fontSize: '.75rem',
            textTransform: 'uppercase'
          })}
          cellStyle={(_x, _y, ratio) => ({
            background: `rgb(59, 130, 246, ${ratio})`,
            fontSize: '.75rem',
            color: `rgb(0, 0, 0, ${ratio / 2 + 0.4})`
          })}
          cellHeight="2rem"
          xLabelsPos="bottom"
          onClick={(x, y) => alert(`Clicked on ${xLabels[x]}, ${yLabels[y]}`)}
        />
      </div>
      <div className="mt-4 text-sm text-gray-600 flex items-center">
        <FiActivity className="mr-2" />
        <span>Dashboard usage peaks on Mondays while Chat usage increases throughout the week</span>
      </div>
    </div>
  );
};