import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { useTrafficData } from "../hooks/useTrafficData";
import { LaneCard } from "../components/LaneCard";
import { Navbar } from "../components/Navbar";
import { TrafficChart } from "../components/TrafficChart";
import { overrideLane, analyzeTraffic } from "../services/api";
import { MagneticButton } from "../components/MagneticButton";

export const Dashboard = () => {
  const { status, history, loading, error } = useTrafficData();
  const [aiReport, setAiReport] = useState<string | null>(null);
  const [analyzing, setAnalyzing] = useState(false);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!loading && cardsRef.current) {
      gsap.fromTo(
        cardsRef.current.children,
        { y: 40, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "power3.out" }
      );
    }
  }, [loading]);

  const handleOverride = async (lane: number) => {
    try {
      await overrideLane(lane);
    } catch {}
  };

  const handleAiAnalysis = async () => {
    setAnalyzing(true);
    try {
      const data = await analyzeTraffic();
      if (data.report) {
        setAiReport(data.report);
      } else {
        setAiReport("Error: " + data.error);
      }
    } catch (e) {
      setAiReport("Failed to contact AI service.");
    } finally {
      setAnalyzing(false);
    }
  };

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
    { lane: 1, data: status.lane1 },
    { lane: 2, data: status.lane2 },
    { lane: 3, data: status.lane3 },
    { lane: 4, data: status.lane4 },
  ];

  return (
    <div className="h-full overflow-y-auto">
      <Navbar
        title="DASHBOARD"
        esp32Status={status.esp32_status}
        systemRunning={status.system_running}
        totalVehicles={status.total_vehicles}
      />

      {status.is_emergency && (
        <div className="mx-8 mb-6 p-4 rounded-xl bg-red/20 border border-red/40 flex items-center justify-center gap-3 animate-pulse">
          <div className="w-4 h-4 rounded-full bg-red shadow-[0_0_15px_rgba(255,0,0,0.8)]"></div>
          <div className="font-bebas text-2xl tracking-widest text-red-400">
            EMERGENCY VEHICLE DETECTED - PRIORITY OVERRIDE ACTIVE
          </div>
        </div>
      )}

      <div ref={cardsRef} className="grid grid-cols-2 lg:grid-cols-4 gap-6 px-8 mb-8">
        {lanes.map(({ lane, data }) => (
          <LaneCard
            key={lane}
            lane={lane}
            data={data}
            isGreen={status.green_lane === lane}
          />
        ))}
      </div>

      <div className="px-8 mb-8">
        <div
          className="rounded-2xl p-6"
          style={{ background: "#111", border: "1px solid #222" }}
        >
          <div className="font-bebas text-2xl tracking-widest text-white mb-4">
            MANUAL OVERRIDE
          </div>
          <div className="flex gap-4">
            {[1, 2, 3, 4].map((lane) => (
              <MagneticButton
                key={lane}
                onClick={() => handleOverride(lane)}
                className="flex-1 py-3 rounded-xl font-bebas text-xl tracking-widest border transition-all duration-300 hover:bg-green hover:text-bg hover:border-green"
                style={{ borderColor: "#333", color: "#E8E8E8", background: "transparent" } as any}
              >
                LANE {lane} GREEN
              </MagneticButton>
            ))}
          </div>
        </div>
      </div>

      <div className="px-8 mb-8">
        <div
          className="rounded-2xl p-6"
          style={{ background: "#111", border: "1px solid #222" }}
        >
          <div className="flex items-center justify-between mb-4">
            <div className="font-bebas text-2xl tracking-widest text-white">
              AI TRAFFIC ANALYST
            </div>
            <MagneticButton
              onClick={handleAiAnalysis}
              disabled={analyzing}
              className={`px-6 py-2 rounded-xl font-bebas text-lg tracking-widest border transition-all duration-300 ${
                analyzing ? "opacity-50 cursor-not-allowed" : "hover:bg-green hover:text-bg hover:border-green"
              }`}
              style={{ borderColor: "#333", color: "#E8E8E8", background: "transparent" } as any}
            >
              {analyzing ? "ANALYZING..." : "GENERATE REPORT"}
            </MagneticButton>
          </div>

          {aiReport && (
            <div className="mt-4 p-4 rounded-xl bg-bg-light border border-dashed border-gray-800 font-mono text-sm text-gray-300 whitespace-pre-wrap leading-relaxed animate-fade-in">
              {aiReport}
            </div>
          )}
        </div>
      </div>

      <div className="px-8 mb-8">
        <TrafficChart data={history} />
      </div>
    </div>
  );
};