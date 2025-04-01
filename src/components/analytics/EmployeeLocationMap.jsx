import { FiMapPin, FiUsers } from 'react-icons/fi';
import { VectorMap } from '@react-jvectormap/core';
import { worldMill } from '@react-jvectormap/world';

export const EmployeeLocationMap = () => {
  const series = {
    regions: [
      {
        values: {
          US: 45,
          GB: 12,
          IN: 8,
          CA: 7,
          DE: 5,
          AU: 4,
          FR: 3,
          BR: 2,
          JP: 2,
          SG: 2,
          CN: 1,
          MX: 1,
          ZA: 1,
          NL: 1,
          SE: 1,
          IT: 1,
          ES: 1,
          PL: 1,
        },
        scale: ['#c8e0f4', '#3b82f6'],
        normalizeFunction: 'polynomial',
      },
    ],
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <FiUsers className="mr-2 text-blue-500" />
        <h3 className="text-lg font-semibold">Employee Distribution by Location</h3>
      </div>
      <p className="text-gray-600 mb-4">
        Map-based visualization of teams across different regions.
      </p>
      <div className="h-80">
        <VectorMap
          map={worldMill}
          backgroundColor="transparent"
          series={series}
          regionStyle={{
            initial: {
              fill: '#e5e7eb',
              stroke: '#d1d5db',
              strokeWidth: 0.5,
            },
            hover: {
              fill: '#93c5fd',
            },
          }}
          onRegionTipShow={(e, el, code) => {
            const value = series.regions[0].values[code] || 0;
            el.html(`
              <div class="p-2">
                <div class="font-semibold">${el.html()}</div>
                <div>${value} employees</div>
                <div class="text-xs text-gray-500">${((value / 100) * 100).toFixed(1)}% of workforce</div>
              </div>
            `);
          }}
        />
      </div>
      <div className="mt-4 text-sm text-gray-600 flex items-center">
        <FiMapPin className="mr-2" />
        <span>45% of employees are based in the United States</span>
      </div>
    </div>
  );
};