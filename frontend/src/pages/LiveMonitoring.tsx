import React, { useRef, useEffect } from 'react';
import { gsap } from 'gsap';
import { useTrafficData } from '../hooks/useTrafficData';
import { Navbar } from '../components/Navbar';
import { SignalLight } from '../components/SignalLight';

const DIRECTION_NAMES: Record<number, string> = { 1: 'NORTH', 2: 'EAST', 3: 'SOUTH', 4: 'WEST' };

const LiveMonitoring: React.FC = () => {
  const { status, loading, error } = useTrafficData();
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loading && gridRef.current) {
      gsap.fromTo(
        gridRef.current.children,
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power3.out' }
      );
    }
  }, [loading]);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="font-bebas text-4xl text-green tracking-widest animate-pulse-green">
          LOADING...
        </div>
      </div>
    );
  }

  if (error || !status) {
    return (
      <div className="flex items-center justify-center h-full">
        <div className="text-center">
          <div className="font-bebas text-4xl text-red tracking-widest">CONNECTION FAILED</div>
          <div className="font-mono text-sm text-muted mt-2">Make sure backend is running on port 5000</div>
        </div>
      </div>
    );
  }

  const lanes = [
    { id: 1, data: status.lane1 },
    { id: 2, data: status.lane2 },
    { id: 3, data: status.lane3 },
    { id: 4, data: status.lane4 },
  ];

  const congestionColor: Record<string, string> = {
    CLEAR:  '#00FF94',
    LOW:    '#00FF94',
    MEDIUM: '#FFD600',
    HIGH:   '#FF3F00',
  };

  return (
    <div className="h-full overflow-y-auto">
      <Navbar
        title="LIVE MONITORING"
        esp32Status={status.esp32_status}
        systemRunning={status.system_running}
        totalVehicles={status.total_vehicles}
      />

      {status.is_emergency && (
        <div className="mx-8 mb-6 p-4 rounded-xl bg-red/20 border border-red/40 flex items-center justify-center gap-3 animate-pulse">
          <div className="w-4 h-4 rounded-full bg-red shadow-[0_0_15px_rgba(255,0,0,0.8)]" />
          <div className="font-bebas text-2xl tracking-widest text-red-400">
            EMERGENCY VEHICLE DETECTED — PRIORITY OVERRIDE ACTIVE
          </div>
        </div>
      )}

      <div ref={gridRef} className="grid grid-cols-1 md:grid-cols-2 gap-6 px-8 pb-8">
        {lanes.map(({ id, data }) => {
          const isGreen = status.green_lane === id;
          const congestion = data?.congestion ?? 'CLEAR';
          const count = data?.count ?? 0;

          return (
            <div
              key={id}
              className="rounded-2xl p-6 transition-all duration-500"
              style={{
                background: 'linear-gradient(135deg, #111111 0%, #0d0d0d 100%)',
                border: `1px solid ${isGreen ? 'rgba(0,255,148,0.5)' : '#222'}`,
                boxShadow: isGreen ? '0 0 40px rgba(0,255,148,0.08)' : 'none',
              }}
            >
              {/* Header */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <div className="font-bebas text-4xl text-white tracking-wider">
                    LANE {id}
                  </div>
                  <div className="font-mono text-xs tracking-widest uppercase mt-1" style={{ color: congestionColor[congestion] }}>
                    {DIRECTION_NAMES[id]} — {congestion}
                  </div>
                </div>
                <div className="flex items-center gap-4">
                  {isGreen && (
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                      <span className="font-mono text-xs text-muted">LIVE</span>
                    </div>
                  )}
                  <SignalLight signal={data?.signal ?? 'RED'} />
                </div>
              </div>

              {/* Vehicle count */}
              <div className="mb-4">
                <div className="font-mono text-xs text-muted uppercase tracking-widest mb-1">Vehicles Detected</div>
                <div
                  className="font-bebas leading-none"
                  style={{ fontSize: '5rem', color: isGreen ? '#00FF94' : '#E8E8E8' }}
                >
                  {count}
                </div>
              </div>

              {/* Congestion bar */}
              <div className="mb-4">
                <div className="font-mono text-xs text-muted uppercase tracking-widest mb-2">Congestion</div>
                <div className="h-1.5 bg-surface2 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-700"
                    style={{
                      width: `${Math.min((count / 15) * 100, 100)}%`,
                      background: congestionColor[congestion],
                      boxShadow: `0 0 8px ${congestionColor[congestion]}`,
                    }}
                  />
                </div>
              </div>

              {/* Green timer */}
              {isGreen && (
                <div className="font-mono text-xs text-green tracking-widest">
                  ⏱ GREEN FOR {data?.duration ?? 0}s
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LiveMonitoring;