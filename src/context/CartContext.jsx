import React, { useState, useEffect, createContext, useContext, useMemo } from 'react';
import { useSnackbar } from './SnackbarContext';
import { messages } from '../config/defaultMessages';

// Contexto para manejar el estado global del carrito de compras.

const CartContext = createContext(null);

export const CartProvider = ({ children }) => {
  // Inicializa el estado del carrito desde localStorage para persistencia de datos.
  const [cartItems, setCartItems] = useState(() => {
    try {
      const localData = localStorage.getItem('cart');
      return localData ? JSON.parse(localData) : [];
    } catch {
      return [];
    }
  });

  const { show } = useSnackbar();

  // Efecto para guardar el carrito en localStorage cada vez que cambia.
  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cartItems));
  }, [cartItems]);

  // Añade un producto al carrito o incrementa su cantidad si ya existe.
  const addToCart = (product, quantity = 1) => {
    setCartItems(prev => {
      const existing = prev.find(i => i.id === product.id);
      if (existing) {
        return prev.map(i => (i.id === product.id ? { ...i, quantity: i.quantity + quantity } : i));
      }
      return [...prev, { ...product, quantity }];
    });
  };

  // Elimina un producto del carrito y muestra una notificacion.
  const removeFromCart = (productId) => {
    setCartItems(prev => prev.filter(i => i.id !== productId));
    show(messages.notifications_productRemoved.defaultMessage, 'error');
  };

  // Actualiza la cantidad de un producto especifico.
  const updateQuantity = (productId, newQuantity) => {
    if (newQuantity <= 0) return removeFromCart(productId);
    setCartItems(prev => prev.map(i => (i.id === productId ? { ...i, quantity: newQuantity } : i)));
  };

  // Vacia por completo el carrito (usado despues de un 'pago').
  const clearCart = () => setCartItems([]);

  // useMemo para calcular valores derivados.
  const cartCount = useMemo(() => cartItems.reduce((n, i) => n + i.quantity, 0), [cartItems]);
  const subtotal = useMemo(() => cartItems.reduce((s, i) => s + i.price * i.quantity, 0), [cartItems]);

  const value = useMemo(
    () => ({ cartItems, addToCart, removeFromCart, updateQuantity, clearCart, cartCount, subtotal }),
    [cartItems, cartCount, subtotal]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

// Hook personalizado para un consumo mas limpio del contexto.
export const useCart = () => {
    const ctx = useContext(CartContext);
    if (!ctx) throw new Error('useCart must be used inside a CartProvider');
    return ctx;
};