import { useMemo } from "react";
import { motion } from "framer-motion";
import { useWebSocket } from "@/hooks/useWebSocket";
import { useMetricsStore } from "@/stores/metricsStore";
import { MetricCard } from "@/components/ui/MetricCard";
import { PerformanceChart } from "@/components/ui/PerformanceChart";
import { DashboardSkeleton } from "@/components/ui/LoadingSkeleton";
import { ChartDataPoint, WebVitals } from "@/types";
import {
  SignalIcon,
  ClockIcon,
  ChartBarSquareIcon,
} from "@heroicons/react/24/outline";

const Dashboard: React.FC = () => {
  useWebSocket(); // Initialize WebSocket connection
  const { currentMetric, historicalMetrics, connectionStatus } =
    useMetricsStore();

  // Calculate trend for each metric
  const calculateTrend = (
    metricKey: keyof WebVitals,
  ): { trend: "up" | "down" | "stable"; value: number } => {
    if (historicalMetrics.length < 2) return { trend: "stable", value: 0 };

    const recent = historicalMetrics.slice(-10);
    const current = recent[recent.length - 1]?.metrics[metricKey] || 0;
    const previous = recent[recent.length - 2]?.metrics[metricKey] || 0;

    if (previous === 0) return { trend: "stable", value: 0 };

    const percentChange = ((current - previous) / previous) * 100;

    if (Math.abs(percentChange) < 5) return { trend: "stable", value: 0 };
    return {
      trend: percentChange > 0 ? "up" : "down",
      value: Math.abs(percentChange),
    };
  };

  // Prepare chart data
  const chartData = useMemo(() => {
    const metrics: Record<keyof WebVitals, ChartDataPoint[]> = {
      lcp: [],
      fid: [],
      cls: [],
      fcp: [],
      ttfb: [],
    };

    historicalMetrics.slice(-20).forEach((metric) => {
      Object.keys(metric.metrics).forEach((key) => {
        const metricKey = key as keyof WebVitals;
        metrics[metricKey].push({
          timestamp: metric.timestamp,
          value: metric.metrics[metricKey],
        });
      });
    });

    return metrics;
  }, [historicalMetrics]);

  // Calculate overall score
  const overallScore = currentMetric?.score || 0;

  if (!currentMetric && historicalMetrics.length === 0) {
    return <DashboardSkeleton />;
  }

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-3 gap-6"
      >
        <motion.div variants={item} className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Overall Score
              </p>
              <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">
                {overallScore.toFixed(0)}
              </p>
            </div>
            <div className="w-12 h-12 bg-primary-500/10 rounded-lg flex items-center justify-center">
              <ChartBarSquareIcon className="w-6 h-6 text-primary-600 dark:text-primary-400" />
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Connection Status
              </p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white mt-2">
                {connectionStatus.connected ? "Connected" : "Disconnected"}
              </p>
              {connectionStatus.connected && (
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Latency: {connectionStatus.latency}ms
                </p>
              )}
            </div>
            <div className="w-12 h-12 bg-success-DEFAULT/10 rounded-lg flex items-center justify-center">
              <SignalIcon className="w-6 h-6 text-success-DEFAULT" />
            </div>
          </div>
        </motion.div>

        <motion.div variants={item} className="card p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600 dark:text-gray-400">
                Last Update
              </p>
              <p className="text-lg font-semibold text-gray-900 dark:text-white mt-2">
                {currentMetric
                  ? new Date(currentMetric.timestamp).toLocaleTimeString()
                  : "N/A"}
              </p>
            </div>
            <div className="w-12 h-12 bg-warning-DEFAULT/10 rounded-lg flex items-center justify-center">
              <ClockIcon className="w-6 h-6 text-warning-DEFAULT" />
            </div>
          </div>
        </motion.div>
      </motion.div>

      {/* Metrics Cards */}
      {currentMetric && (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {(Object.keys(currentMetric.metrics) as Array<keyof WebVitals>).map(
            (metricKey) => {
              const { trend, value: trendValue } = calculateTrend(metricKey);
              return (
                <motion.div key={metricKey} variants={item}>
                  <MetricCard
                    metricKey={metricKey}
                    value={currentMetric.metrics[metricKey]}
                    trend={trend}
                    trendValue={trendValue}
                  />
                </motion.div>
              );
            },
          )}
        </motion.div>
      )}

      {/* Charts */}
      {historicalMetrics.length > 0 && (
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <motion.div variants={item}>
            <PerformanceChart
              data={chartData.lcp}
              title="Largest Contentful Paint (LCP)"
              dataKey="value"
              color="#0ea5e9"
            />
          </motion.div>
          <motion.div variants={item}>
            <PerformanceChart
              data={chartData.fid}
              title="First Input Delay (FID)"
              dataKey="value"
              color="#10b981"
            />
          </motion.div>
          <motion.div variants={item}>
            <PerformanceChart
              data={chartData.cls}
              title="Cumulative Layout Shift (CLS)"
              dataKey="value"
              color="#f59e0b"
            />
          </motion.div>
          <motion.div variants={item}>
            <PerformanceChart
              data={chartData.fcp}
              title="First Contentful Paint (FCP)"
              dataKey="value"
              color="#8b5cf6"
            />
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Dashboard;
