export interface WebVitals {
  lcp: number;
  inp: number;
  cls: number;
  fcp: number;
  ttfb: number;
}

export interface PerformanceMetric {
  id: string;
  timestamp: number;
  url: string;
  metrics: WebVitals;
  userAgent: string;
  connectionType?: string;
  score: number;
}

export interface HistoricalMetrics {
  data: PerformanceMetric[];
  timeRange: {
    start: number;
    end: number;
  };
  aggregates: {
    avgLCP: number;
    avgINP: number;
    avgCLS: number;
    avgScore: number;
  };
}

export interface MetricUpdate {
  metric: PerformanceMetric;
  trend: 'improving' | 'stable' | 'degrading';
}

export interface Alert {
  id: string;
  name: string;
  metric: keyof WebVitals;
  threshold: number;
  condition: 'above' | 'below';
  enabled: boolean;
}

// Connection Status
export interface ConnectionStatus {
  connected: boolean;
  latency: number;
  lastUpdate: number;
}

// Chart Data Point
export interface ChartDataPoint {
  timestamp: number;
  value: number;
  label?: string;
}

// Metric Threshold Configuration
export interface MetricThreshold {
  good: number;
  needsImprovement: number;
  poor: number;
}

// User Preferences
export interface UserPreferences {
  theme: 'light' | 'dark' | 'system';
  refreshInterval: number;
  alertsEnabled: boolean;
  dataRetention: number; // in hours
}
