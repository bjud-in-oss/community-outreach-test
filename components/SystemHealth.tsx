import React from 'react';

const SystemHealth: React.FC = () => {
  const healthChecks = [
    { name: 'API', status: 'Operational' },
    { name: 'Database', status: 'Operational' },
    { name: 'CI/CD', status: 'Degraded' },
  ];

  return (
    <div className="bg-white p-4 rounded-lg shadow">
      <h2 className="text-xl font-bold mb-2">System Health</h2>
      <ul>
        {healthChecks.map((check) => (
          <li key={check.name} className="flex justify-between items-center mb-1">
            <span>{check.name}</span>
            <span className={`text-sm font-semibold ${
              check.status === 'Operational' ? 'text-green-600' : 'text-yellow-600'
            }`}>
              {check.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SystemHealth;
