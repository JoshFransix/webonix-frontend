import { onCLS, onINP, onLCP, onFCP, onTTFB, Metric } from 'web-vitals';
import axiosInstance from '@/lib/axios';
import { PerformanceMetric, WebVitals } from '@/types';

const collectedMetrics: Partial<WebVitals> = {};

function calculateScore(metrics: WebVitals): number {
  let score = 100;

  if (metrics.lcp > 4000) score -= 40;
  else if (metrics.lcp > 2500) score -= 20;
  else if (metrics.lcp > 2000) score -= 10;

  if (metrics.inp > 500) score -= 30;
  else if (metrics.inp > 200) score -= 15;

  if (metrics.cls > 0.25) score -= 30;
  else if (metrics.cls > 0.1) score -= 15;

  return Math.max(0, score);
}

async function sendMetricsToBackend(metrics: WebVitals): Promise<void> {
  try {
    const performanceMetric: PerformanceMetric = {
      id: `metric_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      timestamp: Date.now(),
      url: window.location.href,
      metrics,
      userAgent: navigator.userAgent,
      connectionType: (navigator as any).connection?.effectiveType || 'unknown',
      score: calculateScore(metrics),
    };

    await axiosInstance.post('/api/metrics', performanceMetric);

    console.log('✅ Web Vitals metrics sent to backend:', metrics);
  } catch (error) {
    console.error('❌ Failed to send metrics to backend:', error);
  }
}

function handleMetric(metric: Metric): void {
  const metricName = metric.name.toLowerCase() as keyof WebVitals;
  collectedMetrics[metricName] = metric.value;

  const requiredMetrics: Array<keyof WebVitals> = ['lcp', 'inp', 'cls', 'fcp', 'ttfb'];
  const hasAllMetrics = requiredMetrics.every((m) => collectedMetrics[m] !== undefined);

  if (hasAllMetrics) {
    sendMetricsToBackend(collectedMetrics as WebVitals);
  }
}

export function initWebVitals(): void {
  onCLS(handleMetric);
  onINP(handleMetric);
  onLCP(handleMetric);
  onFCP(handleMetric);
  onTTFB(handleMetric);

  setInterval(() => {
    if (Object.keys(collectedMetrics).length > 0) {
      const completeMetrics: WebVitals = {
        lcp: collectedMetrics.lcp || 0,
        inp: collectedMetrics.inp || 0,
        cls: collectedMetrics.cls || 0,
        fcp: collectedMetrics.fcp || 0,
        ttfb: collectedMetrics.ttfb || 0,
      };
      sendMetricsToBackend(completeMetrics);
    }
  }, 30000);
}
