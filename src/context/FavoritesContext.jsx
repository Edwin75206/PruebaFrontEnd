import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { useSnackbar } from './SnackbarContext';
import { messages } from '../config/defaultMessages';

// Contexto para manejar la lista de productos favoritos del usuario.

const FavoritesContext = createContext(null);

export const useFavorites = () => {
    const ctx = useContext(FavoritesContext);
    if (!ctx) throw new Error('useFavorites must be used within a FavoritesProvider');
    return ctx;
};

export const FavoritesProvider = ({ children }) => {
  const { user } = useAuth();
  const { show, showKeyAction,showAction } = useSnackbar();

  // Inicializa los favoritos desde localStorage.
  const [favorites, setFavorites] = useState(() => {
    try {
      const savedFavorites = localStorage.getItem('favorites');
      return savedFavorites ? JSON.parse(savedFavorites) : [];
    } catch (error) {
      console.error('Error al leer favoritos de localStorage', error);
      return [];
    }
  });

  // Guarda los favoritos en localStorage cada vez que la lista cambia.
  useEffect(() => {
    try {
      localStorage.setItem('favorites', JSON.stringify(favorites));
    } catch (error) {
      console.error('Error al guardar favoritos en localStorage', error);
    }
  }, [favorites]);

  // Limpia los favoritos cuando el usuario cierra sesion.
  useEffect(() => {
    if (!user) {
      setFavorites([]);
    }
  }, [user]);

  // Añade un producto a la lista de favoritos.
  const addFavorite = (product) => {
    setFavorites((prev) => [...prev, product]);
    show(messages.favorites_added.defaultMessage, 'success');
  };

  // Elimina un favorito y muestra una notificacion con opcion de deshacer.
  const removeFavorite = (productId) => {
    const favoriteToRemove = favorites.find(p => p.id === productId);
    if (!favoriteToRemove) return;

    setFavorites((prev) => prev.filter((p) => p.id !== productId));
    
    // Logica para la accion de 'Deshacer'.
    const undo = () => {
      setFavorites(prev => [...prev, favoriteToRemove]);
      show("Favorito restaurado.", 'info');
    };
    
    // Muestra el snackbar con el boton de deshacer.
    showAction(
      messages.favorites_removed.defaultMessage,
      'error',
      { label: 'Deshacer', onClick: undo }
    );
  };

  // Funcion helper para saber si un producto ya es favorito.
  const isFavorite = (productId) => {
    return favorites.some((p) => p.id === productId);
  };

  const value = { favorites, addFavorite, removeFavorite, isFavorite, loading: false };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
};