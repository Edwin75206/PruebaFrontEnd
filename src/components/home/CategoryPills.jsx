import React from 'react';

// Componente que renderiza una lista de categorias como pildoras/botones para filtrar.
export const CategoryPills = ({ categories = [], value = 'all', onChange }) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2">
      <button
        onClick={() => onChange('all')}
        // Usamos un 'data-attribute' para manejar el estado activo.
        data-active={value === 'all'}
        // Tailwind puede apuntar a data-attributes para aplicar estilos condicionales.
        className="px-4 py-2 rounded-full bg-white border border-gray-200 text-sm data-[active=true]:bg-espresso data-[active=true]:text-white data-[active=true]:border-espresso transition flex-shrink-0"
      >
        Todas
      </button>
      {categories.map((c) => (
        <button
          key={c.id}
          onClick={() => onChange(String(c.id))}
          data-active={String(value) === String(c.id)}
          className="px-4 py-2 rounded-full bg-white border border-gray-200 text-sm data-[active=true]:bg-espresso data-[active=true]:text-white data-[active=true]:border-espresso transition flex-shrink-0"
        >
          {c.name}
        </button>
      ))}
    </div>
  );
};