import React, { createContext, useState, useContext, useEffect, useMemo } from 'react';

// Contexto para simular un historial de pedidos del usuario.
// Usa localStorage para persistir los pedidos entre sesiones.

const OrderContext = createContext(null);

export const OrderProvider = ({ children }) => {
  // Inicializa el estado leyendo los pedidos guardados en localStorage.
  const [orders, setOrders] = useState(() => {
    try {
      const savedOrders = localStorage.getItem('orderHistory');
      return savedOrders ? JSON.parse(savedOrders) : [];
    } catch (error) {
      console.error('Error al leer el historial de pedidos', error);
      return [];
    }
  });

  // Efecto que guarda el historial en localStorage cada vez que el estado 'orders' cambia.
  useEffect(() => {
    try {
      localStorage.setItem('orderHistory', JSON.stringify(orders));
    } catch (error)
    {
      console.error('Error al guardar el historial de pedidos', error);
    }
  }, [orders]);

  // Funcion para añadir un nuevo pedido al historial.
  const addOrder = (cartItems, total) => {
    const newOrder = {
      id: Date.now(), // ID simple basado en el timestamp.
      date: new Date().toISOString(), // Fecha actual en formato ISO.
      items: cartItems,
      total: total,
    };
    // Añade el nuevo pedido al principio del array para mostrar los mas recientes primero.
    setOrders(prevOrders => [newOrder, ...prevOrders]);
  };

  const value = useMemo(() => ({ orders, addOrder }), [orders]);

  return (
    <OrderContext.Provider value={value}>
      {children}
    </OrderContext.Provider>
  );
};

// Hook personalizado para consumir el contexto de pedidos.
export const useOrders = () => {
  const ctx = useContext(OrderContext);
  if (!ctx) throw new Error('useOrders must be used within an OrderProvider');
  return ctx;
};