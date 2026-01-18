// Core Web Vitals Metrics
export interface WebVitals {
  lcp: number; // Largest Contentful Paint (ms)
  fid: number; // First Input Delay (ms)
  cls: number; // Cumulative Layout Shift (score)
  fcp: number; // First Contentful Paint (ms)
  ttfb: number; // Time to First Byte (ms)
}

// Performance Metric Data Point
export interface PerformanceMetric {
  id: string;
  timestamp: number;
  url: string;
  metrics: WebVitals;
  userAgent: string;
  connectionType?: string;
  score: number; // Overall performance score (0-100)
}

// Historical Metrics Response
export interface HistoricalMetrics {
  data: PerformanceMetric[];
  timeRange: {
    start: number;
    end: number;
  };
  aggregates: {
    avgLCP: number;
    avgFID: number;
    avgCLS: number;
    avgScore: number;
  };
}

// Real-time Update Payload
export interface MetricUpdate {
  metric: PerformanceMetric;
  trend: 'improving' | 'stable' | 'degrading';
}

// Alert Configuration
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
