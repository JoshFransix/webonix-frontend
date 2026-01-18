import { motion } from "framer-motion";
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { ChartDataPoint } from "@/types";
import { formatDuration } from "@/utils/helpers";

interface PerformanceChartProps {
  data: ChartDataPoint[];
  title: string;
  dataKey?: string;
  type?: "line" | "area";
  color?: string;
  showLegend?: boolean;
}

export const PerformanceChart: React.FC<PerformanceChartProps> = ({
  data,
  title,
  dataKey = "value",
  type = "area",
  color = "#0ea5e9",
  showLegend = true,
}) => {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="card p-3 shadow-lg"
        >
          <p className="text-sm font-medium text-gray-900 dark:text-white">
            {formatDuration(data.value)}
          </p>
          {data.label && (
            <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {data.label}
            </p>
          )}
        </motion.div>
      );
    }
    return null;
  };

  const formatXAxis = (timestamp: number): string => {
    return new Date(timestamp).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="card p-6"
    >
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
        {title}
      </h3>

      <ResponsiveContainer width="100%" height={300}>
        {type === "area" ? (
          <AreaChart
            data={data}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <defs>
              <linearGradient
                id={`color${dataKey}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <stop offset="5%" stopColor={color} stopOpacity={0.3} />
                <stop offset="95%" stopColor={color} stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="currentColor"
              className="text-gray-200 dark:text-gray-800"
            />
            <XAxis
              dataKey="timestamp"
              tickFormatter={formatXAxis}
              stroke="currentColor"
              className="text-gray-500 dark:text-gray-400"
              fontSize={12}
            />
            <YAxis
              stroke="currentColor"
              className="text-gray-500 dark:text-gray-400"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            {showLegend && <Legend />}
            <Area
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={2}
              fillOpacity={1}
              fill={`url(#color${dataKey})`}
              animationDuration={1000}
            />
          </AreaChart>
        ) : (
          <LineChart
            data={data}
            margin={{ top: 5, right: 20, left: 0, bottom: 5 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="currentColor"
              className="text-gray-200 dark:text-gray-800"
            />
            <XAxis
              dataKey="timestamp"
              tickFormatter={formatXAxis}
              stroke="currentColor"
              className="text-gray-500 dark:text-gray-400"
              fontSize={12}
            />
            <YAxis
              stroke="currentColor"
              className="text-gray-500 dark:text-gray-400"
              fontSize={12}
            />
            <Tooltip content={<CustomTooltip />} />
            {showLegend && <Legend />}
            <Line
              type="monotone"
              dataKey={dataKey}
              stroke={color}
              strokeWidth={2}
              dot={false}
              animationDuration={1000}
            />
          </LineChart>
        )}
      </ResponsiveContainer>
    </motion.div>
  );
};
