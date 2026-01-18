import { motion } from "framer-motion";
import {
  ArrowTrendingUpIcon,
  ArrowTrendingDownIcon,
} from "@heroicons/react/24/solid";
import {
  cn,
  formatDuration,
  getMetricStatus,
  getMetricColor,
  getMetricBgColor,
} from "@/utils/helpers";
import {
  WEB_VITALS_THRESHOLDS,
  METRIC_LABELS,
  METRIC_DESCRIPTIONS,
} from "@/utils/constants";
import { WebVitals } from "@/types";

interface MetricCardProps {
  metricKey: keyof WebVitals;
  value: number;
  trend?: "up" | "down" | "stable";
  trendValue?: number;
  onClick?: () => void;
}

export const MetricCard: React.FC<MetricCardProps> = ({
  metricKey,
  value,
  trend = "stable",
  trendValue = 0,
  onClick,
}) => {
  const threshold = WEB_VITALS_THRESHOLDS[metricKey];
  const status = getMetricStatus(value, threshold);
  const label = METRIC_LABELS[metricKey];
  const description = METRIC_DESCRIPTIONS[metricKey];

  const formatValue = (val: number): string => {
    if (metricKey === "cls") {
      return val.toFixed(3);
    }
    return formatDuration(val);
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      whileHover={{ scale: 1.02, y: -4 }}
      className={cn(
        "card p-6 cursor-pointer transition-all duration-200",
        onClick && "hover:shadow-xl",
      )}
      onClick={onClick}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-sm font-medium text-gray-600 dark:text-gray-400 uppercase tracking-wide">
            {metricKey.toUpperCase()}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
            {label}
          </p>
        </div>
        <div
          className={cn(
            "px-2 py-1 rounded-full text-xs font-semibold",
            getMetricBgColor(status),
          )}
        >
          <span className={getMetricColor(status)}>{status}</span>
        </div>
      </div>

      {/* Value */}
      <div className="mb-4">
        <motion.div
          key={value}
          initial={{ scale: 1.2, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ type: "spring", stiffness: 200, damping: 15 }}
          className={cn("text-4xl font-bold", getMetricColor(status))}
        >
          {formatValue(value)}
        </motion.div>
      </div>

      {/* Trend */}
      {trend !== "stable" && (
        <motion.div
          initial={{ opacity: 0, x: -10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-2"
        >
          {trend === "down" ? (
            <ArrowTrendingDownIcon className="w-4 h-4 text-success-DEFAULT" />
          ) : (
            <ArrowTrendingUpIcon className="w-4 h-4 text-danger-DEFAULT" />
          )}
          <span
            className={cn(
              "text-sm font-medium",
              trend === "down" ? "text-success-DEFAULT" : "text-danger-DEFAULT",
            )}
          >
            {Math.abs(trendValue).toFixed(1)}%{" "}
            {trend === "down" ? "faster" : "slower"}
          </span>
        </motion.div>
      )}

      {/* Description */}
      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2 line-clamp-2">
        {description}
      </p>

      {/* Threshold indicator */}
      <div className="mt-4 flex gap-1">
        <div className="flex-1 h-1 bg-success-DEFAULT/20 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: status === "good" ? "100%" : "0%" }}
            className="h-full bg-success-DEFAULT"
          />
        </div>
        <div className="flex-1 h-1 bg-warning-DEFAULT/20 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: status === "needsImprovement" ? "100%" : "0%" }}
            className="h-full bg-warning-DEFAULT"
          />
        </div>
        <div className="flex-1 h-1 bg-danger-DEFAULT/20 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: status === "poor" ? "100%" : "0%" }}
            className="h-full bg-danger-DEFAULT"
          />
        </div>
      </div>
    </motion.div>
  );
};
