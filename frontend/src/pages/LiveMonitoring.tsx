import React from 'react';

const LiveMonitoring: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 
          className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
        >
          Live Monitoring
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Real-time camera feeds and traffic flow visualization
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {[1, 2, 3, 4].map((feed) => (
          <div
            key={feed}
            className="rounded-xl p-4 shadow-lg"
            style={{
              backgroundColor: 'var(--bg-card)',
              borderColor: 'var(--border-primary)',
              borderWidth: '1px',
            }}
          >
            <div className="flex items-center justify-between mb-3">
              <h3 
                className="text-sm font-semibold"
                style={{ color: 'var(--text-primary)' }}
              >
                Camera {feed}
              </h3>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span 
                  className="text-xs font-medium"
                  style={{ color: 'var(--text-tertiary)' }}
                >
                  LIVE
                </span>
              </div>
            </div>
            <div 
              className="aspect-video rounded-lg flex items-center justify-center"
              style={{ backgroundColor: 'var(--bg-secondary)' }}
            >
              <p style={{ color: 'var(--text-tertiary)' }}>Live Feed {feed}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveMonitoring;