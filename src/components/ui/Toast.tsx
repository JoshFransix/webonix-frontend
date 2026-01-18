import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {
  CheckCircleIcon,
  ExclamationTriangleIcon,
  InformationCircleIcon,
  XCircleIcon,
} from "@heroicons/react/24/solid";
import { cn } from "@/utils/helpers";

export type ToastType = "success" | "error" | "warning" | "info";

interface ToastProps {
  id: string;
  message: string;
  type: ToastType;
  duration?: number;
  onClose: (id: string) => void;
}

const icons = {
  success: CheckCircleIcon,
  error: XCircleIcon,
  warning: ExclamationTriangleIcon,
  info: InformationCircleIcon,
};

const styles = {
  success: "bg-success-DEFAULT/10 border-success-DEFAULT text-success-DEFAULT",
  error: "bg-danger-DEFAULT/10 border-danger-DEFAULT text-danger-DEFAULT",
  warning: "bg-warning-DEFAULT/10 border-warning-DEFAULT text-warning-DEFAULT",
  info: "bg-primary-500/10 border-primary-500 text-primary-500",
};

export const Toast: React.FC<ToastProps> = ({
  id,
  message,
  type,
  duration = 5000,
  onClose,
}) => {
  const Icon = icons[type];

  React.useEffect(() => {
    const timer = setTimeout(() => onClose(id), duration);
    return () => clearTimeout(timer);
  }, [id, duration, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.3 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.5, transition: { duration: 0.2 } }}
      className={cn(
        "flex items-center gap-3 px-4 py-3 rounded-lg border shadow-lg backdrop-blur-sm",
        styles[type],
      )}
    >
      <Icon className="w-5 h-5 flex-shrink-0" />
      <p className="text-sm font-medium flex-1">{message}</p>
      <button
        onClick={() => onClose(id)}
        className="p-1 hover:bg-black/5 dark:hover:bg-white/5 rounded transition-colors"
      >
        <XMarkIcon className="w-4 h-4" />
      </button>
    </motion.div>
  );
};

interface ToastContainerProps {
  toasts: Array<{ id: string; message: string; type: ToastType }>;
  onClose: (id: string) => void;
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
  toasts,
  onClose,
}) => {
  return (
    <div className="fixed bottom-4 right-4 z-50 flex flex-col gap-2 max-w-md">
      <AnimatePresence>
        {toasts.map((toast) => (
          <Toast key={toast.id} {...toast} onClose={onClose} />
        ))}
      </AnimatePresence>
    </div>
  );
};
