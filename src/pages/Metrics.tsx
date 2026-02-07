import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useMetricsStore } from "@/stores/metricsStore";
import { PerformanceChart } from "@/components/ui/PerformanceChart";
import { METRIC_LABELS, WEB_VITALS_THRESHOLDS } from "@/utils/constants";
import { WebVitals, ChartDataPoint } from "@/types";
import {
  getMetricStatus,
  getMetricColor,
  formatDuration,
} from "@/utils/helpers";
import { getHistoricalMetrics } from "@/services/api";

const Metrics: React.FC = () => {
  const { historicalMetrics, setHistoricalMetrics } = useMetricsStore();
  const [selectedMetric, setSelectedMetric] = useState<keyof WebVitals>("lcp");
  const [timeRange, setTimeRange] = useState<"1h" | "6h" | "24h">("1h");

  // Fetch data when time range changes
  useEffect(() => {
    const fetchData = async () => {
      const hours = timeRange === "1h" ? 1 : timeRange === "6h" ? 6 : 24;
      const response = await getHistoricalMetrics(hours);
      if (response && response.data) {
        setHistoricalMetrics(response.data);
      }
    };
    fetchData();
  }, [timeRange, setHistoricalMetrics]);

  const chartData: ChartDataPoint[] = historicalMetrics.map((metric) => ({
    timestamp: metric.timestamp,
    value: metric.metrics[selectedMetric],
    label: new Date(metric.timestamp).toLocaleString(),
  }));

  const calculateStats = () => {
    if (historicalMetrics.length === 0) return null;

    const values = historicalMetrics.map((m) => m.metrics[selectedMetric]);
    const avg = values.reduce((sum, val) => sum + val, 0) / values.length;
    const min = Math.min(...values);
    const max = Math.max(...values);
    const latest = values[values.length - 1];

    const threshold = WEB_VITALS_THRESHOLDS[selectedMetric];
    const status = getMetricStatus(avg, threshold);

    return { avg, min, max, latest, status };
  };

  const stats = calculateStats();

  const metricButtons = Object.keys(METRIC_LABELS) as Array<keyof WebVitals>;
  const timeRanges: Array<"1h" | "6h" | "24h"> = ["1h", "6h", "24h"];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Metrics Detail
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Detailed analysis of web performance metrics
        </p>
      </div>

      <div className="card p-6">
        <div className="flex flex-col lg:flex-row gap-4 lg:items-center lg:justify-between">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
              Select Metric
            </label>
            <div className="flex flex-wrap gap-2">
              {metricButtons.map((metric) => (
                <motion.button
                  key={metric}
                  onClick={() => setSelectedMetric(metric)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                    selectedMetric === metric
                      ? "bg-primary-500 text-white shadow-md"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {metric.toUpperCase()}
                </motion.button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
              Time Range
            </label>
            <div className="flex gap-2">
              {timeRanges.map((range) => (
                <motion.button
                  key={range}
                  onClick={() => setTimeRange(range)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm transition-all ${
                    timeRange === range
                      ? "bg-primary-500 text-white"
                      : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
                  }`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {range}
                </motion.button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {stats && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-4"
        >
          <div className="card p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">Average</p>
            <p
              className={`text-2xl font-bold mt-1 ${getMetricColor(stats.status)}`}
            >
              {selectedMetric === "cls"
                ? stats.avg.toFixed(3)
                : formatDuration(stats.avg)}
            </p>
          </div>
          <div className="card p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">Minimum</p>
            <p className="text-2xl font-bold text-success-DEFAULT mt-1">
              {selectedMetric === "cls"
                ? stats.min.toFixed(3)
                : formatDuration(stats.min)}
            </p>
          </div>
          <div className="card p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">Maximum</p>
            <p className="text-2xl font-bold text-danger-DEFAULT mt-1">
              {selectedMetric === "cls"
                ? stats.max.toFixed(3)
                : formatDuration(stats.max)}
            </p>
          </div>
          <div className="card p-4">
            <p className="text-sm text-gray-600 dark:text-gray-400">Latest</p>
            <p
              className={`text-2xl font-bold mt-1 ${getMetricColor(stats.status)}`}
            >
              {selectedMetric === "cls"
                ? stats.latest.toFixed(3)
                : formatDuration(stats.latest)}
            </p>
          </div>
        </motion.div>
      )}

      {/* Chart */}
      {chartData.length > 0 ? (
        <PerformanceChart
          data={chartData}
          title={METRIC_LABELS[selectedMetric]}
          dataKey="value"
          type="line"
          color="#0ea5e9"
        />
      ) : (
        <div className="card p-12 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            No data available for the selected time range
          </p>
        </div>
      )}

      {/* Threshold Reference */}
      <div className="card p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
          Performance Thresholds
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-success-DEFAULT rounded-full" />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Good
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                ≤{" "}
                {selectedMetric === "cls"
                  ? WEB_VITALS_THRESHOLDS[selectedMetric].good.toFixed(3)
                  : formatDuration(WEB_VITALS_THRESHOLDS[selectedMetric].good)}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-warning-DEFAULT rounded-full" />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Needs Improvement
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                ≤{" "}
                {selectedMetric === "cls"
                  ? WEB_VITALS_THRESHOLDS[
                      selectedMetric
                    ].needsImprovement.toFixed(3)
                  : formatDuration(
                      WEB_VITALS_THRESHOLDS[selectedMetric].needsImprovement,
                    )}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="w-4 h-4 bg-danger-DEFAULT rounded-full" />
            <div>
              <p className="text-sm font-medium text-gray-900 dark:text-white">
                Poor
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                &gt;{" "}
                {selectedMetric === "cls"
                  ? WEB_VITALS_THRESHOLDS[
                      selectedMetric
                    ].needsImprovement.toFixed(3)
                  : formatDuration(
                      WEB_VITALS_THRESHOLDS[selectedMetric].needsImprovement,
                    )}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Metrics;
