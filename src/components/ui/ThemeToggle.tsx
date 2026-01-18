import { motion } from "framer-motion";
import {
  SunIcon,
  MoonIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/outline";
import { useThemeStore } from "@/stores/themeStore";
import { cn } from "@/utils/helpers";

export const ThemeToggle: React.FC = () => {
  const { theme, setTheme } = useThemeStore();

  const themes = [
    { value: "light" as const, icon: SunIcon, label: "Light" },
    { value: "dark" as const, icon: MoonIcon, label: "Dark" },
    { value: "system" as const, icon: ComputerDesktopIcon, label: "System" },
  ];

  return (
    <div className="flex items-center gap-1 p-1 bg-gray-100 dark:bg-gray-800 rounded-lg">
      {themes.map(({ value, icon: Icon, label }) => (
        <motion.button
          key={value}
          onClick={() => setTheme(value)}
          className={cn(
            "relative p-2 rounded-md transition-colors duration-200",
            theme === value
              ? "text-primary-600 dark:text-primary-400"
              : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100",
          )}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          aria-label={`${label} theme`}
        >
          {theme === value && (
            <motion.div
              layoutId="activeTheme"
              className="absolute inset-0 bg-white dark:bg-gray-700 rounded-md shadow-sm"
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            />
          )}
          <Icon className="w-5 h-5 relative z-10" />
        </motion.button>
      ))}
    </div>
  );
};
