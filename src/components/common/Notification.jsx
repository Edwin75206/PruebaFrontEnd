import React, { useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Icon } from '../../icons';

export const Notification = ({ message, type = 'info', onDismiss }) => {
  const base = "fixed top-20 right-5 z-50";
  const palette = {
    success: "bg-green-500",
    error: "bg-red-500",
    info: "bg-blue-500",
  };

  useEffect(() => {
    if (!message) return;
    const t = setTimeout(() => onDismiss?.(), 3000);
    return () => clearTimeout(t);
  }, [message, onDismiss]);

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ opacity: 0, y: -10, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: -10, scale: 0.98 }}
          transition={{ duration: 0.18 }}
          className={`${base}`}
        >
          <div className={`p-4 rounded-lg shadow-lg text-white flex items-start gap-3 ${palette[type]}`}>
            <Icon name={type === 'error' ? 'delete' : type === 'success' ? 'check' : 'spinner'} className="h-5 w-5 animate-none" />
            <div className="text-sm">{message}</div>
            <button onClick={onDismiss} className="ml-2 font-bold">×</button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
