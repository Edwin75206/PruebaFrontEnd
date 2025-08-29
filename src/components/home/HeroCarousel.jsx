
import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Icon } from '../../icons';

/**
 * props:
 * - products: array de productos (con {id, title, images[], category?})
 * - onView: (id) => void
 * - onShop: () => void
 */
export const HeroCarousel = ({ products = [], onView, onShop }) => {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null);
  const safeProducts = useMemo(
    () => products.filter(p => Array.isArray(p.images) && p.images[0]),
    [products]
  );
  const len = safeProducts.length;

  // autoplay
  useEffect(() => {
    if (len === 0) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % len);
    }, 5000);
    return () => clearInterval(timerRef.current);
  }, [len]);

  // pausa en hover
  const pause = () => timerRef.current && clearInterval(timerRef.current);
  const resume = () => {
    if (len === 0) return;
    timerRef.current = setInterval(() => {
      setIndex((i) => (i + 1) % len);
    }, 5000);
  };

  if (len === 0) {
    return (
      <section className="relative overflow-hidden rounded-2xl bg-coal text-cream shadow-card p-10">
        <h1 className="text-3xl md:text-5xl font-extrabold">Explora productos</h1>
        <p className="mt-4 text-cream/80">No hay productos destacados disponibles por ahora.</p>
      </section>
    );
  }

  const current = safeProducts[index];
  const title = current?.title || 'Producto destacado';
  const badge = current?.category?.name || 'Destacado';
  const img = current?.images?.[0] || 'https://picsum.photos/960/640?blur=1';

  const go = (dir) => {
    pause();
    setIndex((i) => (i + (dir === 'next' ? 1 : -1) + len) % len);
    resume();
  };

  return (
    <section
      className="relative overflow-hidden rounded-2xl bg-coal text-cream shadow-card animate__animated animate__fadeIn"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      <div className="grid md:grid-cols-2 gap-6 p-8 md:p-12">
        {/* Texto */}
        <div className="flex flex-col justify-center">
          <span className="inline-flex items-center gap-2 w-fit bg-espresso/20 text-cream px-3 py-1 rounded-full text-xs tracking-wide">
            <span className="inline-block h-2 w-2 rounded-full bg-cream" />
            {badge}
          </span>

          <h1 key={current.id} className="mt-3 text-3xl md:text-5xl font-extrabold leading-tight animate__animated animate__fadeIn">
            {title}
          </h1>

          <p className="mt-4 text-cream/80 max-w-xl">
            Descubre nuestra selección destacada de la semana.
          </p>

          <div className="mt-6 flex items-center gap-3">
            <button
              onClick={onShop}
              className="inline-flex items-center gap-2 bg-gold text-coal font-semibold px-5 py-3 rounded-md hover:brightness-95 transition"
            >
              Comprar ahora <Icon name="right" className="h-5 w-5" />
            </button>

            <button
              onClick={() => onView(current.id)}
              className="text-cream/80 hover:text-cream transition underline-offset-4 hover:underline"
              aria-label={`Ver ${title}`}
            >
              Ver producto
            </button>
          </div>
        </div>

        {/* Imagen */}
        <div className="relative">
          <div className="absolute -top-6 -right-6 bg-gold text-coal px-3 py-2 rounded-lg text-sm shadow-card">
            -30% en selección
          </div>

          <img
            key={img}
            src={img}
            alt={title}
            className="w-full h-[320px] md:h-full object-cover rounded-xl animate__animated animate__fadeIn"
            onError={(e) => { e.currentTarget.src = 'https://picsum.photos/960/640?blur=1'; }}
          />
        </div>
      </div>

      {/* Controles */}
      <button
        onClick={() => go('prev')}
        aria-label="Anterior"
        className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-cream/10 hover:bg-cream/20"
      >
        <Icon name="left" className="h-6 w-6" />
      </button>
      <button
        onClick={() => go('next')}
        aria-label="Siguiente"
        className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-cream/10 hover:bg-cream/20"
      >
        <Icon name="right" className="h-6 w-6" />
      </button>

      {/* Dots */}
      <div className="absolute left-0 right-0 bottom-4 flex justify-center gap-2">
        {safeProducts.map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Ir al slide ${i + 1}`}
            className={`h-2 w-2 rounded-full transition ${i === index ? 'bg-gold' : 'bg-cream/40 hover:bg-cream/70'}`}
          />
        ))}
      </div>

      {/* Glow */}
      <div className="absolute -z-0 inset-0 pointer-events-none">
        <div className="absolute -right-24 -bottom-24 w-80 h-80 bg-gold/10 rounded-full blur-3xl" />
      </div>
    </section>
  );
};
