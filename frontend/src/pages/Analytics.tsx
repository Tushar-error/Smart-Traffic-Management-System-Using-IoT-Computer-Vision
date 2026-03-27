import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useTrafficData } from "../hooks/useTrafficData";
import { Navbar } from "../components/Navbar";
import { TrafficChart } from "../components/TrafficChart";
import type { HistoryPoint } from "../types/index.ts";

const StatCard = ({ label, value, unit, color }: any) => (
  <div className="rounded-2xl p-6" style={{ background: "#111", border: "1px solid #222" }}>
    <div className="font-mono text-xs text-muted uppercase tracking-widest mb-2">{label}</div>
    <div className="font-bebas text-5xl leading-none" style={{ color }}>
      {value}
    </div>
    <div className="font-mono text-xs text-muted mt-1">{unit}</div>
  </div>
);

export const Analytics = () => {
  const { status, history, loading } = useTrafficData();
  const statsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loading && statsRef.current) {
      gsap.fromTo(
        statsRef.current.children,
        { scale: 0.9, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.5, stagger: 0.08, ease: "back.out(1.5)" }
      );
    }
  }, [loading]);

  const totalVehicles = history.reduce((s, h) => s + h.total, 0);
  const avgPerCycle = history.length ? Math.round(totalVehicles / history.length) : 0;
  const peakLane = history.length
    ? (() => {
        const totals = { 1: 0, 2: 0, 3: 0 } as Record<number, number>;
        history.forEach((h) => {
          totals[1] += h.lane1;
          totals[2] += h.lane2;
          totals[3] += h.lane3;
        });
        return Object.entries(totals).sort((a, b) => b[1] - a[1])[0][0];
      })()
    : "-";

  return (
    <div className="h-full overflow-y-auto">
      <Navbar
        title="ANALYTICS"
        esp32Status={status?.esp32_status ?? "simulation"}
        systemRunning={status?.system_running ?? false}
        totalVehicles={status?.total_vehicles ?? 0}
      />

      <div ref={statsRef} className="grid grid-cols-4 gap-6 px-8 mb-8">
        <StatCard label="Total Logged" value={totalVehicles} unit="vehicles" color="#00FF94" />
        <StatCard label="Avg per Cycle" value={avgPerCycle} unit="vehicles/cycle" color="#FFD600" />
        <StatCard label="Peak Lane" value={`L${peakLane}`} unit="most congested" color="#FF3F00" />
        <StatCard label="Cycles Logged" value={history.length} unit="signal cycles" color="#E8E8E8" />
      </div>

      <div className="px-8 mb-8">
        <TrafficChart data={history} />
      </div>

      <div className="px-8 mb-8">
        <div className="rounded-2xl p-6" style={{ background: "#111", border: "1px solid #222" }}>
          <div className="font-bebas text-2xl tracking-widest text-white mb-6">RECENT LOGS</div>
          <div className="overflow-x-auto">
            <table className="w-full font-mono text-xs">
              <thead>
                <tr className="text-muted uppercase tracking-widest border-b border-border">
                  <th className="text-left pb-3">Time</th>
                  <th className="text-center pb-3">Lane 1</th>
                  <th className="text-center pb-3">Lane 2</th>
                  <th className="text-center pb-3">Lane 3</th>
                  <th className="text-center pb-3">Green</th>
                  <th className="text-center pb-3">Total</th>
                </tr>
              </thead>
              <tbody>
                {history.slice(-15).reverse().map((row, i) => (
                  <tr
                    key={i}
                    className="border-b border-border hover:bg-surface2 transition-colors"
                  >
                    <td className="py-3 text-muted">
                      {new Date(row.timestamp).toLocaleTimeString()}
                    </td>
                    <td className="py-3 text-center text-green">{row.lane1}</td>
                    <td className="py-3 text-center text-red">{row.lane2}</td>
                    <td className="py-3 text-center text-yellow">{row.lane3}</td>
                    <td className="py-3 text-center text-white">L{row.green_lane}</td>
                    <td className="py-3 text-center text-white">{row.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};