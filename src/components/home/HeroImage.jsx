import React from 'react';
import { messages } from '../../config/defaultMessages';

// Componente para mostrar una imagen de bienvenida a ancho completo.
export const HeroImage = () => {
  return (
    <section className="relative w-full h-[70vh] md:h-[85vh] flex items-center justify-center text-center text-white bg-gray-900 overflow-hidden">
      {/* Contenedor de la imagen de fondo. 'absolute inset-0' hace que ocupe todo el espacio. */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.pexels.com/photos/794064/pexels-photo-794064.jpeg"
          alt="Bolsas de Temporada"
          // 'object-cover' asegura que la imagen cubra el area sin deformarse.
          className="w-full h-full object-cover opacity-60"
        />
      </div>

      {/* Contenido de texto superpuesto. 'z-10' lo coloca por encima de la imagen. */}
      <div className="relative z-10 p-4 max-w-4xl mx-auto flex flex-col items-center">
        <h1 className="text-4xl md:text-6xl font-extrabold leading-tight drop-shadow-lg">
          {messages.home_heroSectionTitle.defaultMessage}
        </h1>
      </div>
    </section>
  );
};