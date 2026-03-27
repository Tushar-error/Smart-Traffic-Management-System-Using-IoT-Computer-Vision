export type LaneData = {
  count: number;
  signal: "GREEN" | "RED" | "YELLOW";
  duration: number;
  congestion: "CLEAR" | "LOW" | "MEDIUM" | "HIGH";
};

export type TrafficStatus = {
  lane1: LaneData;
  lane2: LaneData;
  lane3: LaneData;
  lane4: LaneData;
  green_lane: number | string;
  total_vehicles: number;
  esp32_status: "connected" | "simulation";
  system_running: boolean;
};

export type HistoryPoint = {
  timestamp: string;
  lane1: number;
  lane2: number;
  lane3: number;
  lane4: number;
  green_lane: number;
  total: number;
};

export type User = {
  username: string;
  token: string;
};