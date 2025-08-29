import React from 'react';
import { useCart } from '../context/CartContext.jsx';
import { messages } from '../config/defaultMessages';

export const CartPage = () => {
  const { cartItems, removeFromCart, updateQuantity, subtotal } = useCart();
  const total = subtotal;

  if (cartItems.length === 0) {
    return <p className="text-center text-gray-600">{messages.cart_empty.defaultMessage}</p>;
  }

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <h1 className="text-3xl font-bold mb-6 text-gray-800">{messages.cart_title.defaultMessage}</h1>
      <div className="divide-y divide-gray-200">
        {cartItems.map(item => (
          <div key={item.id} className="flex items-center justify-between py-4">
            <div className="flex items-center space-x-4">
              <img src={item.images?.[0]} alt={item.title} className="w-20 h-20 object-cover rounded-md" />
              <div>
                <h3 className="font-semibold text-gray-800">{item.title}</h3>
                <p className="text-gray-500">${Number(item.price).toFixed(2)}</p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              <input type="number" min="1" value={item.quantity} onChange={(e) => updateQuantity(item.id, parseInt(e.target.value) || 1)} className="w-16 p-1 border border-gray-300 rounded-md text-center"/>
              <p className="font-semibold w-24 text-right">${(item.price * item.quantity).toFixed(2)}</p>
              <button onClick={() => removeFromCart(item.id)} className="text-red-500 hover:text-red-700">🗑️</button>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex justify-end items-center mb-2">
          <span className="text-gray-600">{messages.cart_subtotal.defaultMessage}</span>
          <span className="font-bold text-lg ml-4">${subtotal.toFixed(2)}</span>
        </div>
        <div className="flex justify-end items-center text-2xl font-bold">
          <span className="text-gray-800">{messages.cart_total.defaultMessage}</span>
          <span className="text-indigo-600 ml-4">${total.toFixed(2)}</span>
        </div>
        <div className="flex justify-end mt-6">
          <button className="bg-indigo-600 text-white py-3 px-8 rounded-md hover:bg-indigo-700 transition-colors">
            {messages.cart_checkout.defaultMessage}
          </button>
        </div>
      </div>
    </div>
  );
};
