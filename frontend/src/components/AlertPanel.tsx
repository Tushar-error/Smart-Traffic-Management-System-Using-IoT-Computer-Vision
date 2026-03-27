import React from 'react';

const AlertPanel: React.FC = () => {
  const alerts = [
    {
      id: 1,
      type: 'critical',
      title: 'Heavy Traffic',
      location: 'Main Street Junction',
      time: '2 min ago',
    },
    {
      id: 2,
      type: 'warning',
      title: 'Road Work',
      location: 'Highway 101',
      time: '15 min ago',
    },
    {
      id: 3,
      type: 'info',
      title: 'Minor Delay',
      location: 'Park Avenue',
      time: '1 hour ago',
    },
  ];

  const getAlertColor = (type: string) => {
    switch (type) {
      case 'critical':
        return 'bg-red-500';
      case 'warning':
        return 'bg-yellow-500';
      case 'info':
        return 'bg-blue-500';
      default:
        return 'bg-gray-500';
    }
  };

  return (
    <div
      className="rounded-2xl p-6 h-[500px] flex flex-col"
      style={{
        backgroundColor: 'var(--bg-card)',
        borderColor: 'var(--border-primary)',
        borderWidth: '1px',
        boxShadow: 'var(--shadow-lg)',
      }}
    >
      <div className="flex items-center justify-between mb-6 ">
        <h2
          className="text-xl font-bold"
          style={{ color: 'var(--text-primary)' }}
        >
          Active Alerts
        </h2>
        <div className="flex items-center gap-2 px-3 py-1.5 rounded-full" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
          <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
          <span className="text-xs font-medium" style={{ color: 'var(--text-secondary)' }}>
            {alerts.length} Active
          </span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4 pr-2 "
      >
        {alerts.map((alert, index) => (
          <div
            key={alert.id}
            className="p-4 rounded-xl transition-all  duration-300 hover:scale-[1.01] cursor-pointer animate-fadeInUp"
            style={{
              backgroundColor: 'var(--bg-secondary)',
              borderColor: 'var(--border-primary)',
              borderWidth: '1px',
              animationDelay: `${index * 0.1}s`,
            }}
          >
            <div className="flex items-start gap-3">
              <div className={`w-2 h-2 ${getAlertColor(alert.type)} rounded-full mt-2 animate-pulse`}></div>
              <div className="flex-1">
                <h3
                  className="font-semibold mb-1"
                  style={{ color: 'var(--text-primary)' }}
                >
                  {alert.title}
                </h3>
                <p
                  className="text-sm mb-2"
                  style={{ color: 'var(--text-secondary)' }}
                >
                  {alert.location}
                </p>
                <p
                  className="text-xs"
                  style={{ color: 'var(--text-tertiary)' }}
                >
                  {alert.time}
                </p>
              </div>
              <button className="p-1.5 rounded-lg hover:bg-gray-500/10 transition-colors">
                <svg className="w-5 h-5" style={{ color: 'var(--text-tertiary)' }} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      <button
        className="mt-4 w-full py-3 rounded-xl font-medium transition-all duration-300 hover:scale-105"
        style={{
          backgroundColor: 'var(--bg-tertiary)',
          color: 'var(--text-primary)',
          borderColor: 'var(--border-primary)',
          borderWidth: '1px',
        }}
      >
        View All Alerts
      </button>
    </div>
  );
};

export default AlertPanel;