import axiosInstance from '@/lib/axios';
import { PerformanceMetric } from '@/types';

interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: string;
}

interface HistoricalResponse {
  success: boolean;
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

export async function getMetrics(limit: number = 10): Promise<PerformanceMetric[]> {
  try {
    const response = await axiosInstance.get<ApiResponse<PerformanceMetric[]>>(
      `/api/metrics?limit=${limit}`
    );
    return response.data.data;
  } catch (error) {
    console.error('Error fetching metrics:', error);
    return [];
  }
}

export async function getHistoricalMetrics(hours: number): Promise<HistoricalResponse | null> {
  try {
    const response = await axiosInstance.get<HistoricalResponse>(
      `/api/metrics/historical/${hours}`
    );
    return response.data;
  } catch (error) {
    console.error('Error fetching historical metrics:', error);
    return null;
  }
}
