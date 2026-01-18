import { motion } from "framer-motion";
import { Link, useLocation } from "react-router-dom";
import {
  ChartBarIcon,
  Cog6ToothIcon,
  HomeIcon,
  SignalIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/utils/helpers";
import { useMetricsStore } from "@/stores/metricsStore";

interface NavItemProps {
  to: string;
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  isActive: boolean;
  isCollapsed: boolean;
}

const NavItem: React.FC<NavItemProps> = ({
  to,
  icon: Icon,
  label,
  isActive,
  isCollapsed,
}) => {
  return (
    <Link to={to}>
      <motion.div
        className={cn(
          "flex items-center gap-3 px-4 py-3 rounded-lg transition-colors relative",
          isActive
            ? "bg-primary-500/10 text-primary-600 dark:text-primary-400"
            : "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800",
        )}
        whileHover={{ x: 4 }}
        whileTap={{ scale: 0.98 }}
      >
        {isActive && (
          <motion.div
            layoutId="activeNav"
            className="absolute left-0 top-0 bottom-0 w-1 bg-primary-600 dark:bg-primary-400 rounded-r"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
        <Icon className="w-5 h-5 flex-shrink-0" />
        {!isCollapsed && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: "auto" }}
            exit={{ opacity: 0, width: 0 }}
            className="font-medium text-sm whitespace-nowrap"
          >
            {label}
          </motion.span>
        )}
      </motion.div>
    </Link>
  );
};

interface SidebarProps {
  isCollapsed: boolean;
}

export const Sidebar: React.FC<SidebarProps> = ({ isCollapsed }) => {
  const location = useLocation();
  const { connectionStatus } = useMetricsStore();

  const navItems = [
    { to: "/", icon: HomeIcon, label: "Dashboard" },
    { to: "/metrics", icon: ChartBarIcon, label: "Metrics" },
    { to: "/settings", icon: Cog6ToothIcon, label: "Settings" },
  ];

  return (
    <motion.aside
      initial={false}
      animate={{ width: isCollapsed ? 80 : 240 }}
      className="bg-white dark:bg-gray-900 border-r border-gray-200 dark:border-gray-800 h-screen sticky top-0 flex flex-col"
    >
      {/* Logo */}
      <div className="p-6 border-b border-gray-200 dark:border-gray-800">
        <motion.div
          className="flex items-center gap-3"
          animate={{ justifyContent: isCollapsed ? "center" : "flex-start" }}
        >
          <div className="w-8 h-8 bg-gradient-to-br from-primary-500 to-primary-700 rounded-lg flex items-center justify-center">
            <SignalIcon className="w-5 h-5 text-white" />
          </div>
          {!isCollapsed && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="font-bold text-xl text-gray-900 dark:text-white"
            >
              Webonix
            </motion.span>
          )}
        </motion.div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-2">
        {navItems.map((item) => (
          <NavItem
            key={item.to}
            {...item}
            isActive={location.pathname === item.to}
            isCollapsed={isCollapsed}
          />
        ))}
      </nav>

      {/* Connection Status */}
      <div className="p-4 border-t border-gray-200 dark:border-gray-800">
        <motion.div
          className={cn(
            "flex items-center gap-2 px-3 py-2 rounded-lg",
            isCollapsed && "justify-center",
          )}
        >
          <div
            className={cn(
              "w-2 h-2 rounded-full",
              connectionStatus.connected
                ? "bg-success-DEFAULT animate-pulse"
                : "bg-danger-DEFAULT",
            )}
          />
          {!isCollapsed && (
            <div className="flex-1 min-w-0">
              <p className="text-xs font-medium text-gray-700 dark:text-gray-300">
                {connectionStatus.connected ? "Connected" : "Disconnected"}
              </p>
              {connectionStatus.connected && (
                <p className="text-xs text-gray-500 dark:text-gray-400">
                  {connectionStatus.latency}ms
                </p>
              )}
            </div>
          )}
        </motion.div>
      </div>
    </motion.aside>
  );
};
