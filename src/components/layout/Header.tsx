import { motion } from "framer-motion";
import { Bars3Icon, BellIcon } from "@heroicons/react/24/outline";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

interface HeaderProps {
  onToggleSidebar: () => void;
}

export const Header: React.FC<HeaderProps> = ({ onToggleSidebar }) => {
  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800 sticky top-0 z-40 backdrop-blur-sm bg-white/80 dark:bg-gray-900/80"
    >
      <div className="flex items-center justify-between px-6 py-4">
        {/* Left section */}
        <div className="flex items-center gap-4">
          <motion.button
            onClick={onToggleSidebar}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors lg:hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Bars3Icon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
          </motion.button>

          <div>
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">
              Performance Observatory
            </h1>
            <p className="text-sm text-gray-600 dark:text-gray-400">
              Real-time web performance monitoring
            </p>
          </div>
        </div>

        {/* Right section */}
        <div className="flex items-center gap-4">
          <ThemeToggle />

          <motion.button
            className="relative p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <BellIcon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-danger-DEFAULT rounded-full" />
          </motion.button>

          <div className="w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-full flex items-center justify-center text-white font-semibold">
            U
          </div>
        </div>
      </div>
    </motion.header>
  );
};
