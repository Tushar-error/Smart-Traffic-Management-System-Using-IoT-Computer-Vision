import React from 'react';
import { useAuth } from '../context/AuthContext';
import { Navbar } from '../components/Navbar';
import { useTrafficData } from '../hooks/useTrafficData';

const SettingRow = ({ label, value, hint }: { label: string; value: string; hint?: string }) => (
  <div className="flex items-center justify-between py-4 border-b border-border last:border-b-0">
    <div>
      <div className="font-mono text-sm text-white">{label}</div>
      {hint && <div className="font-mono text-xs text-muted mt-0.5">{hint}</div>}
    </div>
    <div className="font-mono text-sm text-green tracking-wider">{value}</div>
  </div>
);

const Settings: React.FC = () => {
  const { user } = useAuth();
  const { status } = useTrafficData();

  const sections = [
    {
      title: "SYSTEM",
      rows: [
        { label: "System Status",      value: status?.system_running ? "RUNNING" : "STOPPED",       hint: "Background detection loop" },
        { label: "ESP32 Controller",   value: status?.esp32_status?.toUpperCase() ?? "UNKNOWN",     hint: "Hardware connection mode" },
        { label: "Total Vehicles",     value: String(status?.total_vehicles ?? 0),                  hint: "Vehicles counted this session" },
      ],
    },
    {
      title: "AUTHENTICATION",
      rows: [
        { label: "Logged In As",   value: user?.username ?? "—",  hint: "Current operator session" },
        { label: "Token Storage",  value: "LOCAL",                hint: "JWT stored in localStorage" },
        { label: "Session Expiry", value: "24 HOURS",             hint: "Token auto-expires after login" },
      ],
    },
    {
      title: "DETECTION CONFIG",
      rows: [
        { label: "YOLO Model",             value: "yolov8n.pt",            hint: "Nano model — fastest inference" },
        { label: "Confidence Threshold",   value: "0.40",                  hint: "Set via CONFIDENCE_THRESHOLD in .env" },
        { label: "Frame Resolution",       value: "640 × 480",             hint: "Set via FRAME_WIDTH / FRAME_HEIGHT in .env" },
        { label: "Vehicle Classes",        value: "Car, Bike, Bus, Truck", hint: "COCO classes 2, 3, 5, 7" },
      ],
    },
    {
      title: "SIGNAL TIMING",
      rows: [
        { label: "Min Green Time", value: "5 s",  hint: "MIN_GREEN_TIME in .env" },
        { label: "Max Green Time", value: "60 s", hint: "MAX_GREEN_TIME in .env" },
        { label: "Yellow Duration", value: "3 s", hint: "YELLOW_DURATION in .env" },
      ],
    },
  ];

  return (
    <div className="h-full overflow-y-auto">
      <Navbar
        title="SETTINGS"
        esp32Status={status?.esp32_status ?? "simulation"}
        systemRunning={status?.system_running ?? false}
        totalVehicles={status?.total_vehicles ?? 0}
      />

      <div className="px-8 pb-8 space-y-6">
        {sections.map((section) => (
          <div
            key={section.title}
            className="rounded-2xl p-6"
            style={{ background: "#111", border: "1px solid #222" }}
          >
            <div className="font-bebas text-2xl tracking-widest text-white mb-4">
              {section.title}
            </div>
            <div>
              {section.rows.map((row) => (
                <SettingRow key={row.label} {...row} />
              ))}
            </div>
          </div>
        ))}

        <div
          className="rounded-2xl p-6"
          style={{ background: "#111", border: "1px solid #222" }}
        >
          <div className="font-bebas text-2xl tracking-widest text-white mb-2">
            CONFIGURATION
          </div>
          <div className="font-mono text-xs text-muted leading-relaxed">
            All system parameters (camera index, serial port, thresholds, secrets) are controlled
            via environment variables. Copy{" "}
            <span className="text-green">backend/.env.example</span> to{" "}
            <span className="text-green">backend/.env</span> and restart the server to apply changes.
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;