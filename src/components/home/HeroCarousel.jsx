import React, { useEffect, useMemo, useRef, useState } from "react";
import { Icon } from "../../icons";
import { isUsableProduct, normalizeProduct } from "../../services/apiService";
import { messages } from "../../config/defaultMessages";

// Carrusel automatico para mostrar una lista de productos destacados.
export const HeroCarousel = ({ products = [], onView, onShop }) => {
  const [index, setIndex] = useState(0);
  const timerRef = useRef(null); // Ref para manejar el intervalo del carrusel.

  // useMemo para procesar y limpiar los productos solo cuando la prop 'products' cambia.
  const safeProducts = useMemo(() => {
    return (products || []).map(normalizeProduct).filter(isUsableProduct);
  }, [products]);

  const len = safeProducts.length;

  // useEffect para controlar el avance automatico del carrusel.
  useEffect(() => {
    if (len <= 1) return; // Detiene el timer si no hay suficientes slides.
    timerRef.current = setInterval(() => setIndex((i) => (i + 1) % len), 5000);
    // Limpia el intervalo cuando el componente se desmonta.
    return () => clearInterval(timerRef.current);
  }, [len]);

  // Pausa el carrusel cuando el mouse esta encima.
  const pause = () => timerRef.current && clearInterval(timerRef.current);
  // Reanuda el carrusel cuando el mouse sale.
  const resume = () => {
    if (len <= 1) return;
    timerRef.current = setInterval(() => setIndex((i) => (i + 1) % len), 5000);
  };

  // Renderizado fallback si no hay productos validos.
  if (len === 0) {
    return (
      <section className="relative overflow-hidden rounded-2xl bg-coal text-cream shadow-card p-10 text-center md:text-left">
        <h1 className="text-3xl md:text-5xl font-extrabold">
          {messages.carousel_exploreProducts.defaultMessage}
        </h1>
        <p className="mt-4 text-cream/80">
          {messages.carousel_noFeaturedProducts.defaultMessage}
        </p>
      </section>
    );
  }

  const current = safeProducts[index];
  const title =
    current?.title || messages.hero_defaultTitle.defaultMessage;
  const badge =
    current?.category?.name || messages.carousel_featuredBadge.defaultMessage;
  const img = current?.images?.[0] || "https://picsum.photos/960/640?blur=1";

  // Funcion para navegar entre slides con los botones.
  const go = (dir) => {
    pause();
    const newIndex = (index + (dir === "next" ? 1 : -1) + len) % len;
    setIndex(newIndex);
    resume();
  };

  return (
    <section
      className="relative overflow-hidden rounded-2xl bg-coal text-cream shadow-card animate__animated animate__fadeIn"
      onMouseEnter={pause}
      onMouseLeave={resume}
    >
      <div className="grid md:grid-cols-2 gap-6 p-8 md:p-12 items-center">
        <div className="flex flex-col justify-center text-center md:text-left order-2 md:order-1">
          <span className="inline-flex items-center gap-2 w-fit bg-espresso/20 text-cream px-3 py-1 rounded-full text-xs tracking-wide mx-auto md:mx-0">
            <span className="inline-block h-2 w-2 rounded-full bg-cream" />
            {badge}
          </span>

          <h1
            key={current.id}
            className="mt-3 text-3xl md:text-5xl font-extrabold leading-tight animate__animated animate__fadeIn"
          >
            {title}
          </h1>

          <p className="mt-4 text-cream/80 max-w-xl mx-auto md:mx-0">
            {messages.carousel_weeklySelection.defaultMessage}
          </p>

          <div className="mt-6 flex flex-col sm:flex-row items-center gap-4 justify-center md:justify-start">
            <button
              onClick={onShop}
              className="inline-flex items-center gap-2 bg-gold text-coal font-semibold px-5 py-3 rounded-md hover:brightness-95 transition"
            >
              {messages.carousel_shopNow.defaultMessage}{" "}
              <Icon name="right" className="h-5 w-5" />
            </button>

            <button
              onClick={() => onView(current.id)}
              className="text-cream/80 hover:text-cream transition underline-offset-4 hover:underline"
              aria-label={`Ver ${title}`}
            >
              {messages.carousel_viewProduct.defaultMessage}
            </button>
          </div>
        </div>

        <div className="relative order-1 md:order-2">
          <img
            key={img}
            src={img}
            alt={title}
            className="w-full h-64 md:h-full object-cover rounded-xl animate__animated animate__fadeIn"
            onError={(e) => {
              e.currentTarget.src = "https://picsum.photos/960/640?blur=1";
            }}
          />
        </div>
      </div>

      {/* Controles */}
      {len > 1 && (
        <>
          <button
            onClick={() => go("prev")}
            aria-label={messages.carousel_prevLabel.defaultMessage}
            className="absolute left-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-cream/10 hover:bg-cream/20"
          >
            <Icon name="left" className="h-6 w-6" />
          </button>
          <button
            onClick={() => go("next")}
            aria-label={messages.carousel_nextLabel.defaultMessage}
            className="absolute right-3 top-1/2 -translate-y-1/2 p-2 rounded-full bg-cream/10 hover:bg-cream/20"
          >
            <Icon name="right" className="h-6 w-6" />
          </button>
          <div className="absolute left-0 right-0 bottom-4 flex justify-center gap-2">
            {safeProducts.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={messages.carousel_goToSlide.defaultMessage.replace(
                  "{slideNumber}",
                  i + 1
                )}
                className={`h-2 w-2 rounded-full transition ${
                  i === index ? "bg-gold" : "bg-cream/40 hover:bg-cream/70"
                }`}
              />
            ))}
          </div>
        </>
      )}

      {/* Glow */}
      <div className="absolute -z-0 inset-0 pointer-events-none">
        <div className="absolute -right-24 -bottom-24 w-80 h-80 bg-gold/10 rounded-full blur-3xl" />
      </div>
    </section>
  );
};
