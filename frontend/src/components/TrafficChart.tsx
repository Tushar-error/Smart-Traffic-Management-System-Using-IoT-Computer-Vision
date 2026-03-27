import {
  LineChart, Line, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer, Legend
} from "recharts";
import type { HistoryPoint } from "../types/index";

interface Props {
  data: HistoryPoint[];
}

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload?.length) {
    return (
      <div className="bg-surface border border-border rounded-xl p-3 font-mono text-xs">
        <div className="text-muted mb-2">{new Date(label).toLocaleTimeString()}</div>
        {payload.map((p: any) => (
          <div key={p.name} style={{ color: p.color }}>{p.name}: {p.value}</div>
        ))}
      </div>
    );
  }
  return null;
};

export const TrafficChart = ({ data }: Props) => {
  const chartData = data.slice(-20).map((d) => ({
    ...d,
    time: d.timestamp,
  }));

  return (
    <div
      className="rounded-2xl p-6"
      style={{ background: "#111111", border: "1px solid #222" }}
    >
      <div className="font-bebas text-2xl tracking-widest text-white mb-6">
        VEHICLE HISTORY
      </div>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" stroke="#1a1a1a" />
          <XAxis
            dataKey="time"
            tickFormatter={(v) => new Date(v).toLocaleTimeString()}
            stroke="#333"
            tick={{ fill: "#555", fontSize: 10, fontFamily: "DM Mono" }}
          />
          <YAxis stroke="#333" tick={{ fill: "#555", fontSize: 10, fontFamily: "DM Mono" }} />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontFamily: "DM Mono", fontSize: "11px", color: "#555" }}
          />
          <Line type="monotone" dataKey="lane1" stroke="#00FF94" strokeWidth={2}
            dot={false} name="Lane 1" />
          <Line type="monotone" dataKey="lane2" stroke="#FF3F00" strokeWidth={2}
            dot={false} name="Lane 2" />
          <Line type="monotone" dataKey="lane3" stroke="#FFD600" strokeWidth={2}
            dot={false} name="Lane 3" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};