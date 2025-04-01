import { FiMap, FiDollarSign } from 'react-icons/fi';
import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';

const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json';

const markers = [
  { markerOffset: 15, name: 'New York', coordinates: [-74.006, 40.7128], revenue: 15.2, clients: 42 },
  { markerOffset: 15, name: 'London', coordinates: [-0.1278, 51.5074], revenue: 12.7, clients: 38 },
  { markerOffset: 15, name: 'Singapore', coordinates: [103.8198, 1.3521], revenue: 9.5, clients: 25 },
  { markerOffset: -25, name: 'Sydney', coordinates: [151.2093, -33.8688], revenue: 7.3, clients: 18 },
  { markerOffset: 15, name: 'Dubai', coordinates: [55.2708, 25.2048], revenue: 6.1, clients: 15 },
  { markerOffset: -25, name: 'São Paulo', coordinates: [-46.6333, -23.5505], revenue: 5.8, clients: 14 },
  { markerOffset: 15, name: 'Tokyo', coordinates: [139.6917, 35.6895], revenue: 5.2, clients: 12 },
];

export const ClientEngagementMap = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <div className="flex items-center mb-4">
        <FiMap className="mr-2 text-blue-500" />
        <FiDollarSign className="mr-2 text-blue-500" />
        <h3 className="text-lg font-semibold">Client Locations & Engagement</h3>
      </div>
      <p className="text-gray-600 mb-4">
        Geographic distribution of client activity and revenue sources.
      </p>
      <div className="h-80">
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{
            scale: 120,
          }}
        >
          <Geographies geography={geoUrl}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#e5e7eb"
                  stroke="#d1d5db"
                  strokeWidth={0.5}
                />
              ))
            }
          </Geographies>
          {markers.map(({ name, coordinates, markerOffset, revenue, clients }) => (
            <Marker key={name} coordinates={coordinates}>
              <circle r={Math.sqrt(revenue) * 1.5} fill="#3b82f6" fillOpacity={0.6} stroke="#1d4ed8" strokeWidth={1} />
              <text
                textAnchor="middle"
                y={markerOffset}
                style={{ fontFamily: 'system-ui', fill: '#1e293b', fontSize: '10px' }}
              >
                {name}
              </text>
              <text
                textAnchor="middle"
                y={markerOffset + 12}
                style={{ fontFamily: 'system-ui', fill: '#64748b', fontSize: '8px' }}
              >
                ${revenue}M
              </text>
            </Marker>
          ))}
        </ComposableMap>
      </div>
      <div className="mt-4 text-sm text-gray-600">
        <p>North America and Europe account for 65% of total client revenue</p>
      </div>
    </div>
  );
};