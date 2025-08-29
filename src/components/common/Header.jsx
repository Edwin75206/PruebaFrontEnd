import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useCart } from '../../context/CartContext';
import { messages } from '../../config/defaultMessages';
import { Icon } from '../../icons';

export const Header = ({ navigate, onSearch }) => {
  const { isAuthenticated, user, logout } = useAuth();
  const { cartCount } = useCart();
  const [q, setQ] = useState('');

  const handleSearch = (e) => {
    const v = e.target.value;
    setQ(v);
    onSearch?.(v);
  };

  return (
    <header className="backdrop-blur bg-white/80 border-b border-gray-200 sticky top-0 z-50">
      <nav className="container mx-auto px-6 py-3 flex gap-4 items-center">
        <a onClick={() => navigate('/')} className="text-2xl font-extrabold text-ink cursor-pointer hover:text-espresso transition">
          PlatziStore
        </a>

        {/* Search */}
        <div className="hidden md:flex items-center flex-1 max-w-xl mx-6">
          <div className="relative w-full">
            <Icon name="search" className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={q}
              onChange={handleSearch}
              placeholder={messages.home_searchPlaceholder.defaultMessage}
              className="w-full pl-10 pr-3 py-2 border border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-gold"
              aria-label="Buscar productos"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          {isAuthenticated && user ? (
            <div className="hidden sm:flex items-center gap-2">
              <span className="text-gray-700">{messages.header_greeting.defaultMessage}, {user.name}</span>
              <button onClick={logout} className="inline-flex items-center gap-2 px-3 py-2 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition">
                <Icon name="logout" className="h-4 w-4" />
                {messages.header_logout.defaultMessage}
              </button>
            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2">
              <a onClick={() => navigate('/login')} className="inline-flex items-center gap-2 px-3 py-2 text-sm bg-espresso text-white rounded-md hover:bg-latte transition cursor-pointer">
                <Icon name="login" className="h-4 w-4" />
                {messages.header_login.defaultMessage}
              </a>
              <a onClick={() => navigate('/register')} className="inline-flex items-center gap-2 px-3 py-2 text-sm bg-gray-200 text-ink rounded-md hover:bg-gray-300 transition cursor-pointer">
                {messages.header_register.defaultMessage}
              </a>
            </div>
          )}

          <a onClick={() => navigate('/cart')} className="relative text-ink hover:text-espresso cursor-pointer">
            <Icon name="cart" className="h-6 w-6" />
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-2 bg-gold text-coal text-xs font-semibold rounded-full h-5 w-5 flex items-center justify-center">
                {cartCount}
              </span>
            )}
          </a>
        </div>
      </nav>
    </header>
  );
};
