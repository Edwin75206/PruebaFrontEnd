import React, { createContext, useState, useContext, useMemo } from 'react';
import { Modal } from '../components/common/Modal';

// Contexto para manejar un unico modal global en toda la aplicacion.
// Permite que cualquier componente pueda abrir el modal sin tener que renderizarlo.

const ModalContext = createContext(null);

export const ModalProvider = ({ children }) => {
  const [isOpen, setIsOpen] = useState(false);
  // Estado para guardar el contenido dinamico del modal (titulo, hijos, pie).
  const [content, setContent] = useState({ title: '', children: null, footer: null });

  // Funcion para mostrar el modal con contenido especifico.
  const showModal = ({ title, children, footer }) => {
    setContent({ title, children, footer });
    setIsOpen(true);
  };

  // Funcion para cerrar el modal.
  const hideModal = () => {
    setIsOpen(false);
  };

  // Guardamos el valor del contexto para evitar renders innecesarios en los consumidores.
  const value = useMemo(() => ({ showModal, hideModal }), []);

  return (
    <ModalContext.Provider value={value}>
      {children}
      {/* El componente visual del Modal se renderiza aqui, una sola vez en toda la app. */}
      {/* Su visibilidad y contenido son controlados por el estado de este provider. */}
      <Modal
        isOpen={isOpen}
        onClose={hideModal}
        title={content.title}
        footer={content.footer}
      >
        {content.children}
      </Modal>
    </ModalContext.Provider>
  );
};

// Hook personalizado para un consumo facil del contexto del modal.
export const useModal = () => {
  const ctx = useContext(ModalContext);
  if (!ctx) throw new Error('useModal must be used within a ModalProvider');
  return ctx;
};