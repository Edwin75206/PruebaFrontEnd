import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { LoadingSpinner } from './LoadingSpinner';

// Componente de orden superior para proteger rutas que requieren autenticacion.
export default function Protected({ children }) {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  // Muestra un spinner mientras se verifica el estado de autenticacion.
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <LoadingSpinner />
      </div>
    );
  }

  // Si no esta autenticado, redirige al login.
  if (!isAuthenticated) {
    // 'replace' evita que el usuario regrese a la ruta protegida con el boton de atras.
    // 'state' guarda la ruta original para redirigir al usuario alli despues del login.
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Si esta autenticado, renderiza el componente hijo (la pagina protegida).
  return children;
}