import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { useTrafficData } from "../hooks/useTrafficData";
import { LaneCard } from "../components/LaneCard";
import { Navbar } from "../components/Navbar";
import { TrafficChart } from "../components/TrafficChart";
import { overrideLane } from "../services/api";
import { MagneticButton } from "../components/MagneticButton";

export const Dashboard = () => {
  const { status, history, loading, error } = useTrafficData();
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
    { lane: 1, name: "NORTH", data: status.lane1 },
    { lane: 2, name: "EAST", data: status.lane2 },
    { lane: 3, name: "SOUTH", data: status.lane3 },
    { lane: 4, name: "WEST", data: status.lane4 },
  ];

  return (
    <div className="h-full overflow-y-auto">
      <Navbar
        title="DASHBOARD"
        esp32Status={status.esp32_status}
        systemRunning={status.system_running}
        totalVehicles={status.total_vehicles}
      />

      <div ref={cardsRef} className="grid grid-cols-2 gap-6 px-8 mb-8">
        {lanes.map(({ lane, name, data }) => (
          <LaneCard
            key={lane}
            lane={lane}
            name={name}
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
          <div className="grid grid-cols-2 gap-4">
            {lanes.map(({ lane, name }) => (
              <MagneticButton
                key={lane}
                onClick={() => handleOverride(lane)}
                className="py-3 rounded-xl font-bebas text-xl tracking-widest border transition-all duration-300 hover:bg-green hover:text-bg hover:border-green"
                style={{ borderColor: "#333", color: "#E8E8E8", background: "transparent" } as any}
              >
                {name} GREEN
              </MagneticButton>
            ))}
          </div>
        </div>
      </div>

      <div className="px-8 mb-8">
        <TrafficChart data={history} />
      </div>
    </div>
  );
};