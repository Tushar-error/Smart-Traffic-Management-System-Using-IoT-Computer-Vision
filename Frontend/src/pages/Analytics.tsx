
import React from 'react';

const Analytics: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 
          className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
        >
          Traffic Analytics
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Detailed insights and historical data analysis
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((item) => (
          <div
            key={item}
            className="rounded-xl p-6 shadow-lg"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-primary)',
              borderWidth: '1px',
            }}
          >
            <h3 
              className="text-lg font-semibold mb-4"
              style={{ color: 'var(--text-primary)' }}
            >
              Chart {item}
            </h3>
            <div 
              className="h-64 rounded-lg flex items-center justify-center"
              style={{ backgroundColor: 'var(--bg-secondary)' }}
            >
              <p style={{ color: 'var(--text-tertiary)' }}>Chart Placeholder</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Analytics;