import React from 'react';
import { useAuth } from '../../context/AuthContext.jsx';
import { useCart } from '../../context/CartContext.jsx';
import { messages } from '../../config/defaultMessages';

export const Header = ({ navigate }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const { cartCount } = useCart();

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-3 flex justify-between items-center">
        <a onClick={() => navigate('/')} className="text-2xl font-bold text-gray-800 cursor-pointer hover:text-indigo-600 transition-colors">
          {messages.general_appName.defaultMessage}
        </a>
        <div className="flex items-center space-x-4">
          {isAuthenticated && user ? (
            <div className="flex items-center space-x-2">
              <span className="text-gray-700 hidden sm:block">
                {messages.header_greeting.defaultMessage}, {user.name}
              </span>
              <button onClick={logout} className="px-3 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors">
                {messages.header_logout.defaultMessage}
              </button>
            </div>
          ) : (
            <div className="space-x-2">
              <a onClick={() => navigate('/login')} className="px-3 py-2 text-sm bg-indigo-600 text-white rounded-md hover:bg-indigo-700 transition-colors cursor-pointer">
                {messages.header_login.defaultMessage}
              </a>
              <a onClick={() => navigate('/register')} className="px-3 py-2 text-sm bg-gray-200 text-gray-800 rounded-md hover:bg-gray-300 transition-colors cursor-pointer">
                {messages.header_register.defaultMessage}
              </a>
            </div>
          )}
          <a onClick={() => navigate('/cart')} className="relative text-gray-700 hover:text-indigo-600 cursor-pointer">
            🛒
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">{cartCount}</span>
            )}
          </a>
        </div>
      </nav>
    </header>
  );
};
