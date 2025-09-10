import React from 'react';
import { Icon } from '../../icons';

// Componente simple y reutilizable para mostrar un indicador de carga.
export const LoadingSpinner = () => (
  <div className="flex justify-center items-center p-8 text-indigo-600">
    {/* La clase 'animate-spin' de Tailwind crea la animacion de rotacion. */}
    <Icon name="spinner" className="h-7 w-7 animate-spin" />
  </div>
);