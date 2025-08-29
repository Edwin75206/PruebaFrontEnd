import React from 'react';
import { Icon } from '../../icons';

export const Hero = ({ product, onShop, onView }) => {
  // Fallbacks por si la API trae algo raro
  const title = product?.title || 'Producto destacado';
  const badge = product?.category?.name || 'Nueva temporada';
  const img = product?.images?.[0] ||
    'https://picsum.photos/960/640?blur=1';

  return (
    <section className="relative overflow-hidden rounded-2xl bg-coal text-cream shadow-card animate__animated animate__fadeIn">
      <div className="grid md:grid-cols-2 gap-6 p-8 md:p-12">
        <div className="flex flex-col justify-center">
          <span className="inline-flex items-center gap-2 w-fit bg-espresso/20 text-cream px-3 py-1 rounded-full text-xs tracking-wide">
            <span className="inline-block h-2 w-2 rounded-full bg-cream" />
            {badge}
          </span>

          <h1 className="mt-3 text-3xl md:text-5xl font-extrabold leading-tight">
            {title}
          </h1>

          <p className="mt-4 text-cream/80 max-w-xl">
            Explora productos con estilo premium, envío rápido y soporte 24/7.
          </p>

          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={onShop}
              className="inline-flex items-center gap-2 bg-gold text-coal font-semibold px-5 py-3 rounded-md hover:brightness-95 transition"
            >
              Comprar ahora <Icon name="right" className="h-5 w-5" />
            </button>

            {product?.id && (
              <button
                onClick={() => onView(product.id)}
                className="text-cream/80 hover:text-cream transition underline-offset-4 hover:underline"
                aria-label={`Ver ${title}`}
              >
                Ver producto
              </button>
            )}
          </div>
        </div>

        <div className="relative">
          <div className="absolute -top-6 -right-6 bg-gold text-coal px-3 py-2 rounded-lg text-sm shadow-card">
            -30% en selección
          </div>

          <img
            src={img}
            alt={title}
            className="w-full h-[320px] md:h-full object-cover rounded-xl animate__animated animate__fadeIn"
            onError={(e) => { e.currentTarget.src = 'https://picsum.photos/960/640?blur=1'; }}
          />
        </div>
      </div>

      <div className="absolute -z-0 inset-0 pointer-events-none">
        <div className="absolute -right-24 -bottom-24 w-80 h-80 bg-gold/10 rounded-full blur-3xl" />
      </div>
    </section>
  );
};
