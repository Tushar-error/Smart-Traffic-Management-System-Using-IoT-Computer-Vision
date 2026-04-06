
import React from 'react';

const TrafficMap: React.FC = () => {
  return (
    <div
      className="rounded-2xl p-6 h-[500px]"
      style={{
        backgroundColor: 'var(--bg-card)',
        borderColor: 'var(--border-primary)',
        borderWidth: '1px',
        boxShadow: 'var(--shadow-lg)',
      }}
    >
      <div className="flex items-center justify-between mb-4">
        <h2
          className="text-xl font-bold"
          style={{ color: 'var(--text-primary)' }}
        >
          Traffic Map
        </h2>
        <div className="flex items-center gap-2">
          <button
            className="p-2 rounded-lg transition-all hover:scale-110"
            style={{
              backgroundColor: 'var(--bg-tertiary)',
              color: 'var(--text-secondary)',
            }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
          <button
            className="p-2 rounded-lg transition-all hover:scale-110"
            style={{
              backgroundColor: 'var(--bg-tertiary)',
              color: 'var(--text-secondary)',
            }}
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
            </svg>
          </button>
        </div>
      </div>

      <div
        className="w-full h-[400px] rounded-xl flex items-center justify-center relative overflow-hidden group"
        style={{ backgroundColor: 'var(--bg-secondary)' }}
      >
        <div className="absolute inset-0 opacity-20">
          <div className="absolute inset-0" style={{
            backgroundImage: 'linear-gradient(var(--border-primary) 1px, transparent 1px), linear-gradient(90deg, var(--border-primary) 1px, transparent 1px)',
            backgroundSize: '50px 50px'
          }}></div>
        </div>

        <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-red-500 rounded-full animate-ping"></div>
        <div className="absolute top-1/4 left-1/3 w-4 h-4 bg-red-500 rounded-full"></div>

        <div className="absolute top-1/2 right-1/3 w-4 h-4 bg-green-500 rounded-full animate-ping animation-delay-2000"></div>
        <div className="absolute top-1/2 right-1/3 w-4 h-4 bg-green-500 rounded-full"></div>

        <div className="absolute bottom-1/3 left-1/2 w-4 h-4 bg-yellow-500 rounded-full animate-ping animation-delay-4000"></div>
        <div className="absolute bottom-1/3 left-1/2 w-4 h-4 bg-yellow-500 rounded-full"></div>

        <div className="relative z-10 text-center">
          <div className="mb-4">
            <svg className="w-16 h-16 mx-auto" style={{ color: 'var(--text-tertiary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <p className="text-lg font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>
            Interactive Map View
          </p>
          <p className="text-sm" style={{ color: 'var(--text-tertiary)' }}>
            Map integration will be displayed here
          </p>
        </div>
      </div>
    </div>
  );
};

export default TrafficMap;