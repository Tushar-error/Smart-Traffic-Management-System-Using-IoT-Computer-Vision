import React from 'react';

const LiveFeed: React.FC = () => {
  const cameras = [
    { id: 1, name: 'Junction A - North', status: 'active', traffic: 'High' },
    { id: 2, name: 'Highway 101 - East', status: 'active', traffic: 'Medium' },
    { id: 3, name: 'Main Street - South', status: 'active', traffic: 'Low' },
    { id: 4, name: 'Park Avenue - West', status: 'active', traffic: 'Medium' },
  ];

  const getTrafficColor = (level: string) => {
    switch (level) {
      case 'High':
        return 'text-red-400';
      case 'Medium':
        return 'text-yellow-400';
      case 'Low':
        return 'text-green-400';
      default:
        return 'text-gray-400';
    }
  };

  return (
    <div
      className="rounded-2xl p-6"
      style={{
        backgroundColor: 'var(--bg-card)',
        borderColor: 'var(--border-primary)',
        borderWidth: '1px',
        boxShadow: 'var(--shadow-lg)',
      }}
    >
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cameras.map((camera, index) => (
          <div
            key={camera.id}
            className="group relative rounded-xl overflow-hidden transition-all duration-300 hover:scale-105 animate-fadeInUp"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              borderColor: 'var(--border-primary)',
              borderWidth: '1px',
              animationDelay: `${index * 0.1}s`,
            }}
          >
           <div className="aspect-video relative overflow-hidden" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
          
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/5 to-transparent animate-pulse"></div>
              
            <div className="absolute inset-0 opacity-20">
                <div
                  className="absolute inset-0"
                  style={{
                    backgroundImage: 'linear-gradient(var(--border-primary) 1px, transparent 1px), linear-gradient(90deg, var(--border-primary) 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                  }}
                ></div>
              </div>
              <div className="absolute top-3 left-3 flex items-center gap-2 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
                <span className="text-xs font-semibold text-white">LIVE</span>
              </div>
              <div className="absolute top-3 right-3 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm">
                <span className={`text-xs font-semibold ${getTrafficColor(camera.traffic)}`}>
                  {camera.traffic}
                </span>
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-16 h-16 opacity-30" style={{ color: 'var(--text-tertiary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <div className="p-4">
              <h3
                className="font-semibold mb-2"
                style={{ color: 'var(--text-primary)' }}
              >
                {camera.name}
              </h3>
              <div className="flex items-center justify-between">
                <span
                  className="text-xs"
                  style={{ color: 'var(--text-tertiary)' }}
                >
                  Camera {camera.id}
                </span>
                <button className="p-1.5 rounded-lg hover:bg-gray-500/10 transition-colors">
                  <svg className="w-4 h-4" style={{ color: 'var(--text-tertiary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LiveFeed;