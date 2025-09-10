import React from 'react';
import { Icon } from '../../icons';
import { messages } from '../../config/defaultMessages'; // Importamos los mensajes.

// Componente Hero generico para mostrar un producto destacado.
// Recibe un 'product' y funciones callback 'onShop' y 'onView'.
export const Hero = ({ product, onShop, onView }) => {
  // Fallbacks para asegurar que el componente no se rompa si faltan datos.
  const title = product?.title || messages.hero_defaultTitle.defaultMessage;
  const badge = product?.category?.name || messages.hero_defaultBadge.defaultMessage;
  const img = product?.images?.[0] ||
    'https://picsum.photos/960/640?blur=1';

  return (
    <section className="relative overflow-hidden rounded-2xl bg-coal text-cream shadow-card animate__animated animate__fadeIn">
      {/* Layout de grid responsivo: 1 columna en movil, 2 en escritorio. */}
      <div className="grid md:grid-cols-2 gap-6 p-8 md:p-12">
        {/* Contenedor para el contenido de texto. */}
        <div className="flex flex-col justify-center">
          <span className="inline-flex items-center gap-2 w-fit bg-espresso/20 text-cream px-3 py-1 rounded-full text-xs tracking-wide">
            <span className="inline-block h-2 w-2 rounded-full bg-cream" />
            {badge}
          </span>

          <h1 className="mt-3 text-3xl md:text-5xl font-extrabold leading-tight">
            {title}
          </h1>

          <p className="mt-4 text-cream/80 max-w-xl">
            {messages.hero_description.defaultMessage}
          </p>

          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={onShop}
              className="inline-flex items-center gap-2 bg-gold text-coal font-semibold px-5 py-3 rounded-md hover:brightness-95 transition"
            >
              {messages.hero_shopNowButton.defaultMessage} <Icon name="right" className="h-5 w-5" />
            </button>

            {/* El boton 'Ver producto' solo se muestra si el producto tiene un ID. */}
            {product?.id && (
              <button
                onClick={() => onView(product.id)}
                className="text-cream/80 hover:text-cream transition underline-offset-4 hover:underline"
                aria-label={`Ver ${title}`}
              >
                {messages.hero_viewProductButton.defaultMessage}
              </button>
            )}
          </div>
        </div>

        {/* Contenedor para la imagen. */}
        <div className="relative">
          <div className="absolute -top-6 -right-6 bg-gold text-coal px-3 py-2 rounded-lg text-sm shadow-card">
            {messages.hero_discountBadge.defaultMessage}
          </div>

          <img
            src={img}
            alt={title}
            className="w-full h-[320px] md:h-full object-cover rounded-xl animate__animated animate__fadeIn"
            // Fallback en caso de que la imagen principal falle.
            onError={(e) => { e.currentTarget.src = 'https://picsum.photos/960/640?blur=1'; }}
          />
        </div>
      </div>

      {/* Efecto de brillo decorativo en el fondo. */}
      <div className="absolute -z-0 inset-0 pointer-events-none">
        <div className="absolute -right-24 -bottom-24 w-80 h-80 bg-gold/10 rounded-full blur-3xl" />
      </div>
    </section>
  );
};