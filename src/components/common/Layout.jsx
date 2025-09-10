import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import { Header } from './Header';
import { Footer } from './Footer';

// Componente principal que define la estructura de todas las paginas.
export const Layout = () => {
  // Hook de React Router para obtener informacion sobre la ruta actual.
  const location = useLocation();
  // Determina si la pagina actual es la de inicio para aplicar un layout de ancho completo.
  const isFullWidthPage = location.pathname === '/';

  return (
    // Contenedor principal que asegura que el footer siempre este abajo.
    <div className="flex flex-col min-h-screen bg-cream text-ink">
      <Header />
      
      {/* El 'main' aplica el contenedor centrado a todas las paginas excepto a la de inicio. */}
      <main className={`flex-grow ${isFullWidthPage ? '' : 'container mx-auto px-6 py-8'}`}>
        {/* Aqui se renderiza el componente de la pagina activa (HomePage, CartPage, etc.). */}
        <Outlet />
      </main>

      <Footer />
    </div>
  );
};