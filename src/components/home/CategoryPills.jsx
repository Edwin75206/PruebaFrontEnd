import React from 'react';

export const CategoryPills = ({ categories = [], value = 'all', onChange }) => {
  return (
    <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-2">
      <button
        onClick={() => onChange('all')}
        data-active={value === 'all'}
        className="px-4 py-2 rounded-full bg-white border border-gray-200 data-[active=true]:bg-espresso data-[active=true]:text-white transition"
      >
        Todas
      </button>
      {categories.map((c) => (
        <button
          key={c.id}
          onClick={() => onChange(String(c.id))}
          data-active={String(value) === String(c.id)}
          className="px-4 py-2 rounded-full bg-white border border-gray-200 data-[active=true]:bg-espresso data-[active=true]:text-white transition"
        >
          {c.name}
        </button>
      ))}
    </div>
  );
};
