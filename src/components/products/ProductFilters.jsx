import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css'; // Estilos base para el slider
import { messages } from '../../config/defaultMessages'; 

// Componente reutilizable para la barra lateral de filtros en paginas de categoria/busqueda.
// Es un componente 'controlado': recibe el estado y las funciones para cambiarlo desde el padre.
export const ProductFilters = ({ searchTerm, setSearchTerm, priceRange, setPriceRange, sortBy, setSortBy, maxPrice }) => {
  return (
    // 'aside' es una etiqueta semantica para contenido lateral.
    <aside className="w-full md:w-64 lg:w-72 flex-shrink-0">
      <div className="space-y-6 bg-white p-4 rounded-lg shadow-sm">
        
        {/* Seccion de busqueda por nombre */}
        <div>
          <label htmlFor="search" className="block text-sm font-medium text-gray-700">
            {messages.category_searchLabel.defaultMessage}
          </label>
          <input
            type="text"
            id="search"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={messages.category_searchPlaceholder.defaultMessage}
            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#3E2E2E] focus:ring-[#3E2E2E]"
          />
        </div>

        {/* Seccion de filtro por rango de precios */}
        <div>
          <label className="block text-sm font-medium text-gray-700">
            {messages.category_priceRangeLabel.defaultMessage}
          </label>
          <div className="mt-4 mx-2">
            {/* Componente de la libreria externa 'rc-slider' */}
            <Slider range min={0} max={maxPrice} value={priceRange} onChange={(value) => setPriceRange(value)} allowCross={false} />
          </div>
          <div className="flex justify-between text-xs text-gray-500 mt-2">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>

        {/* Seccion para ordenar los resultados */}
        <div>
          <label htmlFor="sort" className="block text-sm font-medium text-gray-700">
            {messages.category_sortByLabel.defaultMessage}
          </label>
          <select
            id="sort"
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value)}
            className="mt-1 block w-full rounded-md border-gray-300 py-2 pl-3 pr-10 text-base focus:border-[#3E2E2E] focus:outline-none focus:ring-[#3E2E2E]"
          >
            <option value="default">{messages.category_sortRelevance.defaultMessage}</option>
            <option value="price-asc">{messages.category_sortPriceAsc.defaultMessage}</option>
            <option value="price-desc">{messages.category_sortPriceDesc.defaultMessage}</option>
          </select>
        </div>
      </div>
    </aside>
  );
};