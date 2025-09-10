import React from 'react';
import { Icon } from '../../icons';

// Componente de notificacion flotante.

// Mapeo de tipos de notificacion a sus estilos e iconos correspondientes.
const variants = {
  success: { base: 'bg-green-500', icon: 'check' },
  error:   { base: 'bg-red-500',   icon: 'delete' },
  info:    { base: 'bg-blue-500',  icon: 'info'   },
};

export default function Snackbar({ message, type = 'success', onClose, action }) {
  const v = variants[type] || variants.success;
  if (!message) return null;

  return (
    // Contenedor principal. 'z-[1301]' asegura que este por encima de otros elementos como los modales.
    <div className="fixed top-20 right-5 z-[1301] animate__animated animate__fadeInDown">
      <div className={`text-white shadow-lg rounded-lg px-4 py-3 flex items-center gap-3 ${v.base}`}>
        <Icon name={v.icon} className="h-5 w-5" />
        <div className="text-sm">{message}</div>

        {/* Renderiza un boton de accion opcional, como un 'Deshacer'. */}
        {action?.label && (
          <button
            onClick={() => { action?.onClick?.(); onClose?.(); }}
            className="ml-2 px-3 py-1 rounded-md bg-transparent text-white border border-white hover:bg-white/20 transition text-xs inline-flex items-center gap-1 cursor-pointer"
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