import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useTrafficData } from "../hooks/useTrafficData";
import { Navbar } from "../components/Navbar";
import { TrafficChart } from "../components/TrafficChart";
import { analyzeTraffic } from "../services/api";
import { MagneticButton } from "../components/MagneticButton";

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
  const [aiReport, setAiReport] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
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

  const handleAiAnalysis = async () => {
    setAnalyzing(true);
    try {
      const data = await analyzeTraffic();
      setAiReport(data.report || "Error: " + data.error);
    } catch {
      setAiReport("Failed to contact AI service.");
    } finally {
      setAnalyzing(false);
    }
  };

  const totalVehicles = history.reduce((s, h) => s + h.total, 0);
  const avgPerCycle = history.length ? Math.round(totalVehicles / history.length) : 0;
  const peakLane = history.length
    ? (() => {
        const totals = { 1: 0, 2: 0, 3: 0, 4: 0 } as Record<number, number>;
        history.forEach((h) => {
          totals[1] += h.lane1 || 0;
          totals[2] += h.lane2 || 0;
          totals[3] += h.lane3 || 0;
          totals[4] += (h as any).lane4 || 0;
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

      <div className="px-8 mb-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <TrafficChart data={history} />
        </div>
        <div className="rounded-2xl p-6 flex flex-col" style={{ background: "#111", border: "1px solid #222" }}>
            <div className="flex items-center justify-between mb-4">
              <div className="font-bebas text-2xl tracking-widest text-white">AI ANALYST</div>
              <MagneticButton
                onClick={handleAiAnalysis}
                disabled={analyzing}
                className={`px-4 py-1 rounded-lg font-bebas text-sm tracking-widest border transition-all ${
                  analyzing ? "opacity-30" : "hover:bg-green hover:text-bg border-border"
                }`}
              >
                {analyzing ? "..." : "GENERATE"}
              </MagneticButton>
            </div>
            <div className="flex-1 font-mono text-[10px] text-muted overflow-y-auto max-h-[300px] whitespace-pre-wrap leading-relaxed">
              {aiReport || "Click generate to receive an AI-powered traffic pattern analysis for the last 30 cycles."}
            </div>
        </div>
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
                  <th className="text-center pb-3">Lane 4</th>
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
                    <td className="py-3 text-center text-blue-400">{(row as any).lane4 || 0}</td>
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