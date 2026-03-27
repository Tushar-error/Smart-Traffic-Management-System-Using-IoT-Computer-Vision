import { useEffect, useState } from "react";

interface Props {
  title: string;
  esp32Status: string;
  systemRunning: boolean;
  totalVehicles: number;
}

export const Navbar = ({ title, esp32Status, systemRunning, totalVehicles }: Props) => {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);

  return (
    <div
      className="flex items-center justify-between px-8 py-4 mb-8"
      style={{ borderBottom: "1px solid #1a1a1a" }}
    >
      <div className="font-bebas text-3xl tracking-widest text-white">{title}</div>

      <div className="flex items-center gap-8">
        <div className="text-center">
          <div className="font-mono text-xs text-muted uppercase tracking-widest">Total</div>
          <div className="font-bebas text-2xl text-white">{totalVehicles} vehicles</div>
        </div>

        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${esp32Status === "connected" ? "bg-green animate-pulse-green" : "bg-yellow"}`} />
          <div className="font-mono text-xs text-muted uppercase tracking-widest">
            ESP32 {esp32Status}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <div className={`w-2 h-2 rounded-full ${systemRunning ? "bg-green animate-pulse-green" : "bg-red"}`} />
          <div className="font-mono text-xs text-muted uppercase tracking-widest">
            {systemRunning ? "Running" : "Stopped"}
          </div>
        </div>

        <div className="font-mono text-sm text-green tracking-widest">
          {time.toLocaleTimeString()}
        </div>
      </div>
    </div>
  );
};