import { WebVitals } from '@/types';

export const WEB_VITALS_THRESHOLDS = {
  lcp: {
    good: 2500,
    needsImprovement: 4000,
    poor: Infinity,
  },
  inp: {
    good: 200,
    needsImprovement: 500,
    poor: Infinity,
  },
  cls: {
    good: 0.1,
    needsImprovement: 0.25,
    poor: Infinity,
  },
  fcp: {
    good: 1800,
    needsImprovement: 3000,
    poor: Infinity,
  },
  ttfb: {
    good: 800,
    needsImprovement: 1800,
    poor: Infinity,
  },
};

export const METRIC_LABELS: Record<keyof WebVitals, string> = {
  lcp: 'Largest Contentful Paint',
  inp: 'Interaction to Next Paint',
  cls: 'Cumulative Layout Shift',
  fcp: 'First Contentful Paint',
  ttfb: 'Time to First Byte',
};

export const METRIC_DESCRIPTIONS: Record<keyof WebVitals, string> = {
  lcp: 'Measures loading performance. Should occur within 2.5s of page load.',
  inp: 'Measures responsiveness. Pages should have an INP of 200ms or less.',
  cls: 'Measures visual stability. Pages should maintain a CLS of 0.1 or less.',
  fcp: 'Measures perceived load speed. Should occur within 1.8s.',
  ttfb: 'Measures server response time. Should be within 800ms.',
};

export const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';
export const WS_URL = import.meta.env.VITE_WS_URL || 'ws://localhost:3000';
