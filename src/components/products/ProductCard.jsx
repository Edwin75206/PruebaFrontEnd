import React from 'react';
import { messages } from '../../config/defaultMessages';

export const ProductCard = ({ product, navigate }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col">
    <div className="h-56 overflow-hidden">
      <img
        src={product.images?.[0]}
        alt={product.title}
        className="w-full h-full object-cover"
        onError={(e) => { e.currentTarget.src = `https://placehold.co/600x400/E2E8F0/4A5568?text=${messages.productCard_imageUnavailable.defaultMessage}`; }}
      />
    </div>
    <div className="p-4 flex flex-col flex-grow">
      <h3 className="text-lg font-semibold text-gray-800 truncate">{product.title}</h3>
      <p className="text-2xl font-bold text-indigo-600 my-2">${Number(product.price).toFixed(2)}</p>
      <p className="text-sm text-gray-500 mb-4 flex-grow">{product?.category?.name}</p>
      <button onClick={() => navigate(`/product/${product.id}`)} className="mt-auto w-full bg-indigo-600 text-white py-2 rounded-md hover:bg-indigo-700 transition-colors">
        {messages.productCard_viewMore.defaultMessage}
      </button>
    </div>
  </div>
);
