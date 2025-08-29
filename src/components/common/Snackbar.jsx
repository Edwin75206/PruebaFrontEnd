import React from 'react';
import { Icon } from '../../icons';

const variants = {
  success: { base: 'bg-green-500', icon: 'check' },
  error:   { base: 'bg-red-500',   icon: 'delete' },
  info:    { base: 'bg-blue-500',  icon: 'info'   },
};

export default function Snackbar({ message, type = 'success', onClose, action }) {
  const v = variants[type] || variants.success;
  if (!message) return null;

  return (
    <div className="fixed top-20 right-5 z-50 animate__animated animate__fadeInDown">
      <div className={`text-white shadow-lg rounded-lg px-4 py-3 flex items-center gap-3 ${v.base}`}>
        <Icon name={v.icon} className="h-5 w-5" />
        <div className="text-sm">{message}</div>

        {action?.label && (
          <button
            onClick={() => { action?.onClick?.(); onClose?.(); }}
            className="ml-2 px-2 py-1 rounded-md bg-white text-coal hover:opacity-90 transition text-xs inline-flex items-center gap-1 cursor-pointer"
          >
            {action.icon && <Icon name={action.icon} className="h-4 w-4" />}
            {action.label}
          </button>
        )}

        <button onClick={onClose} className="ml-1 font-bold text-white/90 hover:text-white cursor-pointer">×</button>
      </div>
    </div>
  );
}
