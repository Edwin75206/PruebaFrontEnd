import React, { useState, useEffect, createContext, useContext, useMemo } from 'react';

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const localData = localStorage.getItem('cart');
      return localData ? JSON.parse(localData) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => (i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i));
      }
      return [...prev, { ...product, quantity }];
    });
  };

  const removeFromCart = (productId) => setCartItems(prev => prev.filter(i => i.id !== productId));

  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) return removeFromCart(productId);
    setCartItems(prev => prev.map(i => (i.id === productId ? { ...i, quantity: newQuantity } : i)));
  };

  const clearCart = () => setCartItems([]);

  const cartCount = useMemo(() => cartItems.reduce((n, i) => n + i.quantity, 0), [cartItems]);
  const subtotal = useMemo(() => cartItems.reduce((s, i) => s + i.price * i.quantity, 0), [cartItems]);

  const value = useMemo(
    () => ({ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, subtotal }),
    [cartItems, cartCount, subtotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => useContext(CartContext);
