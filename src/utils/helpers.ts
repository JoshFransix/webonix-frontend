import { type ClassValue, clsx } from 'clsx';

export function cn(...inputs: ClassValue[]): string {
  return clsx(inputs);
}

export function formatNumber(num: number, decimals: number = 0): string {
  return new Intl.NumberFormat('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  }).format(num);
}

export function formatDuration(ms: number): string {
  if (ms < 1000) return `${Math.round(ms)}ms`;
  return `${(ms / 1000).toFixed(2)}s`;
}

export function getMetricStatus(
  value: number,
  thresholds: { good: number; needsImprovement: number }
): 'good' | 'needsImprovement' | 'poor' {
  if (value <= thresholds.good) return 'good';
  if (value <= thresholds.needsImprovement) return 'needsImprovement';
  return 'poor';
}

export function getMetricColor(status: 'good' | 'needsImprovement' | 'poor'): string {
  const colors = {
    good: 'text-success-DEFAULT dark:text-success-light',
    needsImprovement: 'text-warning-DEFAULT dark:text-warning-light',
    poor: 'text-danger-DEFAULT dark:text-danger-light',
  };
  return colors[status];
}

export function getMetricBgColor(status: 'good' | 'needsImprovement' | 'poor'): string {
  const colors = {
    good: 'bg-success-DEFAULT/10 dark:bg-success-light/10',
    needsImprovement: 'bg-warning-DEFAULT/10 dark:bg-warning-light/10',
    poor: 'bg-danger-DEFAULT/10 dark:bg-danger-light/10',
  };
  return colors[status];
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: number | null = null;
  return (...args: Parameters<T>) => {
    if (timeout) clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean;
  return (...args: Parameters<T>) => {
    if (!inThrottle) {
      func(...args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}
