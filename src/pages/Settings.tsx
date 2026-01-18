import { motion } from "framer-motion";
import { ThemeToggle } from "@/components/ui/ThemeToggle";
import { useThemeStore } from "@/stores/themeStore";

const Settings: React.FC = () => {
  const { theme } = useThemeStore();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Settings
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Customize your experience and preferences
        </p>
      </div>

      {/* Appearance Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="card p-6"
      >
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Appearance
        </h2>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3 block">
              Theme
            </label>
            <ThemeToggle />
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              Current theme: <span className="font-medium">{theme}</span>
            </p>
          </div>
        </div>
      </motion.div>

      {/* Notification Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="card p-6"
      >
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Notifications
        </h2>

        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                Performance Alerts
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Get notified when metrics exceed thresholds
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="font-medium text-gray-900 dark:text-white">
                Connection Status
              </p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Notify when WebSocket connection changes
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-primary-300 dark:peer-focus:ring-primary-800 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-primary-600"></div>
            </label>
          </div>
        </div>
      </motion.div>

      {/* Data Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="card p-6"
      >
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Data Management
        </h2>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
              Data Retention Period
            </label>
            <select className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent">
              <option>1 Hour</option>
              <option>6 Hours</option>
              <option selected>24 Hours</option>
              <option>7 Days</option>
              <option>30 Days</option>
            </select>
            <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
              How long to keep performance data in memory
            </p>
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
              Refresh Interval
            </label>
            <select className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent">
              <option>Real-time</option>
              <option selected>5 seconds</option>
              <option>10 seconds</option>
              <option>30 seconds</option>
              <option>1 minute</option>
            </select>
          </div>
        </div>
      </motion.div>

      {/* API Settings */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="card p-6"
      >
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          API Configuration
        </h2>

        <div className="space-y-4">
          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
              API Endpoint
            </label>
            <input
              type="text"
              defaultValue="http://localhost:3000"
              className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              readOnly
            />
          </div>

          <div>
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block">
              WebSocket URL
            </label>
            <input
              type="text"
              defaultValue="ws://localhost:3000"
              className="w-full px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-700 rounded-lg text-gray-900 dark:text-white focus:ring-2 focus:ring-primary-500 focus:border-transparent"
              readOnly
            />
          </div>
        </div>
      </motion.div>

      {/* Actions */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        className="flex gap-4"
      >
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-3 bg-primary-600 hover:bg-primary-700 text-white font-medium rounded-lg transition-colors"
        >
          Save Changes
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="px-6 py-3 bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-gray-900 dark:text-white font-medium rounded-lg transition-colors"
        >
          Reset to Defaults
        </motion.button>
      </motion.div>
    </div>
  );
};

export default Settings;
