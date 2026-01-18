import { motion } from "framer-motion";
import { cn } from "@/utils/helpers";

interface LoadingSkeletonProps {
  className?: string;
  variant?: "text" | "card" | "avatar" | "chart";
}

export const LoadingSkeleton: React.FC<LoadingSkeletonProps> = ({
  className,
  variant = "text",
}) => {
  const baseClasses = "shimmer-wrapper bg-gray-200 dark:bg-gray-800 rounded";

  const variantClasses = {
    text: "h-4 w-full",
    card: "h-32 w-full",
    avatar: "h-12 w-12 rounded-full",
    chart: "h-64 w-full",
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className={cn(baseClasses, variantClasses[variant], className)}
    />
  );
};

export const MetricCardSkeleton: React.FC = () => {
  return (
    <div className="card p-6 space-y-4">
      <LoadingSkeleton variant="text" className="w-1/3" />
      <LoadingSkeleton variant="text" className="w-2/3 h-8" />
      <LoadingSkeleton variant="text" className="w-1/2" />
    </div>
  );
};

export const ChartSkeleton: React.FC = () => {
  return (
    <div className="card p-6 space-y-4">
      <LoadingSkeleton variant="text" className="w-1/4" />
      <LoadingSkeleton variant="chart" />
    </div>
  );
};

export const DashboardSkeleton: React.FC = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <MetricCardSkeleton />
        <MetricCardSkeleton />
        <MetricCardSkeleton />
      </div>
      <ChartSkeleton />
      <ChartSkeleton />
    </div>
  );
};
