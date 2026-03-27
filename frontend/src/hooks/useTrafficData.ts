import { useState, useEffect, useCallback } from "react";
import { getStatus, getHistory } from "../services/api";
import type { TrafficStatus, HistoryPoint } from "../types/index";

export const useTrafficData = () => {
  const [status, setStatus] = useState<TrafficStatus | null>(null);
  const [history, setHistory] = useState<HistoryPoint[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchStatus = useCallback(async () => {
    try {
      const data = await getStatus();
      setStatus(data);
      setError(null);
    } catch {
      setError("Cannot connect to backend");
    } finally {
      setLoading(false);
    }
  }, []);

  const fetchHistory = useCallback(async () => {
    try {
      const data = await getHistory();
      setHistory(data.reverse());
    } catch {}
  }, []);

  useEffect(() => {
    fetchStatus();
    fetchHistory();
    const statusInterval = setInterval(fetchStatus, 1000);
    const historyInterval = setInterval(fetchHistory, 10000);
    return () => {
      clearInterval(statusInterval);
      clearInterval(historyInterval);
    };
  }, [fetchStatus, fetchHistory]);

  return { status, history, loading, error, refetch: fetchStatus };
};