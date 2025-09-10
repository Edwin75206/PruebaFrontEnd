import React from 'react';
import { Icon } from '../../icons/index';

// Componente de modal generico y reutilizable para mostrar contenido superpuesto.
export const Modal = ({ isOpen, onClose, title, children, footer }) => {
  // Si no esta abierto, no renderiza nada para mantener el DOM limpio.
  if (!isOpen) {
    return null;
  }

  // Evita que el modal se cierre al hacer clic en su contenido.
  const handleModalContentClick = (e) => {
    e.stopPropagation();
  };

  return (
    // Fondo oscuro semitransparente (overlay).
    // Permite cerrar el modal al hacer clic en el.
    <div
      className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4 animate__animated animate__fadeIn animate__faster"
      onClick={onClose}
    >
      {/* Contenedor del panel del modal. */}
      <div
        className="bg-white rounded-2xl shadow-xl w-full max-w-md flex flex-col animate__animated animate__zoomIn animate__faster"
        onClick={handleModalContentClick}
      >
        {/* Cabecera del Modal con titulo y boton de cierre. */}
        <header className="flex items-center justify-between p-4 border-b border-gray-200">
          <h3 className="text-lg font-semibold text-ink">{title}</h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 p-1 rounded-full"
            aria-label="Cerrar modal"
          >
            <Icon name="close" className="h-5 w-5" />
          </button>
        </header>

        {/* Cuerpo del Modal, donde se inyecta el contenido principal. */}
        <main className="p-6">
          {children}
        </main>

        {/* Pie del Modal, se renderiza solo si se pasan botones de accion. */}
        {footer && (
          <footer className="flex justify-end gap-3 p-4 bg-gray-50 rounded-b-2xl">
            {footer}
          </footer>
        )}
      </div>
    </div>
  );
};