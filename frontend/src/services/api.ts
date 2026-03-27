import axios from "axios";

const BASE_URL = "http://127.0.0.1:5000";

const api = axios.create({ baseURL: BASE_URL });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const login = async (username: string, password: string) => {
  const res = await api.post("/api/login", { username, password });
  return res.data;
};

export const getStatus = async () => {
  const res = await api.get("/api/status");
  return res.data;
};

export const getHistory = async () => {
  const res = await api.get("/api/history");
  return res.data;
};

export const overrideLane = async (lane: number) => {
  const res = await api.post("/api/override", { lane });
  return res.data;
};