import React from 'react';

interface StatisticsCardProps {
  title: string;
  value: string;
  change: string;
  icon: string;
}

const StatisticsCard: React.FC<StatisticsCardProps> = ({ title, value, change, icon }) => {
  const isPositive = change.startsWith('+');
  const isNegative = change.startsWith('-');
  const isStable = change === 'stable';

  const getIcon = () => {
    switch (icon) {
      case 'car':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
          </svg>
        );
      case 'speed':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
          </svg>
        );
      case 'traffic':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
          </svg>
        );
      case 'alert':
        return (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div
      className="relative group rounded-2xl p-6 transition-all duration-300 hover:scale-105"
      style={{
        backgroundColor: 'var(--bg-card)',
        borderColor: 'var(--border-primary)',
        borderWidth: '1px',
        boxShadow: 'var(--shadow-md)',
      }}
    >
      <div className="absolute -inset-0.5 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-2xl blur opacity-0 group-hover:opacity-30 transition duration-500"></div>
      
      <div className="relative">
        <div className="flex items-start justify-between mb-4">
          <div
            className="p-3 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600"
          >
            <div className="text-white">
              {getIcon()}
            </div>
          </div>
          <div
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              isPositive
                ? 'bg-green-500/20 text-green-400'
                : isNegative
                ? 'bg-red-500/20 text-red-400'
                : 'bg-gray-500/20 text-gray-400'
            }`}
          >
            {change}
          </div>
        </div>

        <h3
          className="text-sm font-medium mb-2"
          style={{ color: 'var(--text-secondary)' }}
        >
          {title}
        </h3>
        <p
          className="text-3xl font-bold"
          style={{ color: 'var(--text-primary)' }}
        >
          {value}
        </p>
      </div>
    </div>
  );
};

export default StatisticsCard;