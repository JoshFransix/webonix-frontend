import { create } from 'zustand';
import { PerformanceMetric, ConnectionStatus } from '@/types';

interface MetricsStore {
  currentMetric: PerformanceMetric | null;
  historicalMetrics: PerformanceMetric[];
  connectionStatus: ConnectionStatus;
  setCurrentMetric: (metric: PerformanceMetric) => void;
  addHistoricalMetric: (metric: PerformanceMetric) => void;
  setHistoricalMetrics: (metrics: PerformanceMetric[]) => void;
  setConnectionStatus: (status: Partial<ConnectionStatus>) => void;
  clearMetrics: () => void;
}

export const useMetricsStore = create<MetricsStore>((set) => ({
  currentMetric: null,
  historicalMetrics: [],
  connectionStatus: {
    connected: false,
    latency: 0,
    lastUpdate: Date.now(),
  },

  setCurrentMetric: (metric) => {
    set((state) => ({
      currentMetric: metric,
      connectionStatus: {
        ...state.connectionStatus,
        lastUpdate: Date.now(),
      },
    }));
  },

  addHistoricalMetric: (metric) => {
    set((state) => ({
      historicalMetrics: [...state.historicalMetrics, metric].slice(-100),
    }));
  },

  setHistoricalMetrics: (metrics) => {
    set({ historicalMetrics: metrics });
  },

  setConnectionStatus: (status) => {
    set((state) => ({
      connectionStatus: {
        ...state.connectionStatus,
        ...status,
      },
    }));
  },

  clearMetrics: () => {
    set({
      currentMetric: null,
      historicalMetrics: [],
    });
  },
}));
