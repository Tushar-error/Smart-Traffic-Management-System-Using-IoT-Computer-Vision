
import React from 'react';
import TrafficMap from '../components/TrafficMap';
import LiveFeed from '../components/LiveFeed';
import StatisticsCard from '../components/StatisticsCard';
import AlertPanel from '../components/AlertPanel';

const Dashboard: React.FC = () => {
  return (
    <div className="min-h-screen relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 -right-4 w-72 h-72 bg-cyan-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute -bottom-8 left-20 w-72 h-72 bg-blue-500/10 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
      </div>

      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
       
        <div className="flex items-center justify-between flex-wrap gap-4">
          <div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-3 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 bg-clip-text text-transparent">
              Traffic Dashboard
            </h1>
            <p 
              className="text-base sm:text-lg flex items-center gap-2"
              style={{ color: 'var(--text-secondary)' }}
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
              </span>
              Real-time traffic monitoring and management system
            </p>
          </div>
          
          <div className="flex items-center gap-3">
            <button 
              className="px-4 sm:px-5 py-2.5 rounded-xl font-medium transition-all duration-300 hover:scale-105 flex items-center gap-2 group text-sm sm:text-base"
              style={{
                backgroundColor: 'var(--bg-tertiary)',
                color: 'var(--text-primary)',
                borderColor: 'var(--border-primary)',
                borderWidth: '1px',
              }}
            >
              <svg className="w-5 h-5 transition-transform group-hover:rotate-180 duration-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <span className="hidden sm:inline">Refresh</span>
            </button>
            <button className="relative group px-4 sm:px-6 py-2.5 rounded-xl font-medium overflow-hidden text-sm sm:text-base">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-purple-600 transition-all duration-300 group-hover:scale-105"></div>
              <span className="relative text-white flex items-center gap-2">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <span className="hidden sm:inline">Export</span>
              </span>
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          <StatisticsCard
            title="Active Vehicles" 
            value="1,234" 
            change="+12%" 
            icon="car"
          />
          <StatisticsCard 
            title="Avg Speed" 
            value="45 km/h" 
            change="-5%" 
            icon="speed"
          />
          <StatisticsCard 
            title="Congestion Level" 
            value="Medium" 
            change="stable" 
            icon="traffic"
          />
          <StatisticsCard 
            title="Incidents" 
            value="3" 
            change="+1" 
            icon="alert"
          />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-6">
          <div className="lg:col-span-2">
            <TrafficMap />
          </div>
          
          <div className="lg:col-span-1">
            <AlertPanel />
          </div>
        </div>

        <div>
          <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-red-500 to-pink-500 rounded-lg blur-md opacity-50"></div>
                <div className="relative bg-gradient-to-r from-red-500 to-pink-500 p-2 rounded-lg">
                  <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <h2 
                className="text-xl sm:text-2xl font-bold"
                style={{ color: 'var(--text-primary)' }}
              >
                Live Camera Feeds
              </h2>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 rounded-full" style={{ backgroundColor: 'var(--bg-tertiary)' }}>
              <div className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium" style={{ color: 'var(--text-secondary)' }}>
                8 cameras active
              </span>
            </div>
          </div>
          <LiveFeed />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;