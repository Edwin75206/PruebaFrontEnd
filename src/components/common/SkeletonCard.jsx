import React from 'react';

// Componente de 'esqueleto' para simular la carga de una tarjeta de producto.
// Util para mejorar la percepcion de velocidad.
export const SkeletonCard = () => (
  // 'animate-pulse' de Tailwind crea el efecto de brillo sutil.
  <div className="bg-white rounded-lg shadow-md overflow-hidden animate-pulse">
    <div className="h-56 bg-gray-200" />
    <div className="p-4 space-y-3">
      <div className="h-5 bg-gray-200 rounded w-3/4" />
      <div className="h-7 bg-gray-200 rounded w-1/3" />
      <div className="h-4 bg-gray-200 rounded w-1/2" />
      <div className="h-10 bg-gray-200 rounded w-full" />
    </div>
  </div>
);