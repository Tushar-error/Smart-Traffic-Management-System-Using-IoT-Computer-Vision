
import React from 'react';

const Settings: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto px-6 py-8">
      <div className="mb-8">
        <h1 
          className="text-4xl font-bold mb-2 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent"
        >
          Settings
        </h1>
        <p style={{ color: 'var(--text-secondary)' }}>
          Configure your traffic management system
        </p>
      </div>

      <div className="space-y-6">
        {['General', 'Notifications', 'Camera Settings', 'Data & Privacy'].map((section) => (
          <div
            key={section}
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
              {section}
            </h3>
            <p style={{ color: 'var(--text-secondary)' }}>
              {section} settings will be configured here.
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Settings;