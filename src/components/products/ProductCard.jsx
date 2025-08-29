import React from 'react';
import { messages } from '../../config/defaultMessages';
import { useCart } from '../../context/CartContext';
import { useSnackbar } from '../../context/SnackbarContext';
import { Icon } from '../../icons';

export const ProductCard = ({ product, navigate }) => {
  const { cartItems, addToCart, updateQuantity, removeFromCart } = useCart();
  const { showKeyAction } = useSnackbar();

  const handleAdd = (e) => {
    e.stopPropagation();
    const prevItem = cartItems.find((i) => i.id === product.id);
    const prevQty = prevItem ? prevItem.quantity : 0;

    addToCart(product, 1);

    const undo = () => {
      if (prevQty > 0) updateQuantity(product.id, prevQty);
      else removeFromCart(product.id);
    };

    showKeyAction('snackbar_productAdded', {}, { label: 'Deshacer', icon: 'undo', onClick: undo });
  };

  const imgSrc =
    product?.images?.[0] ||
    `https://placehold.co/600x400/E2E8F0/4A5568?text=${messages.productCard_imageUnavailable.defaultMessage}`;

  return (
    <div
      className="bg-white rounded-xl shadow-card overflow-hidden transition hover:shadow-xl group flex flex-col"
      role="article"
      aria-label={product?.title || 'Producto'}
    >
      {/* IMAGEN + OVERLAYS */}
      <div className="relative h-56 overflow-hidden">
        <span className="absolute left-3 top-3 z-10 bg-gold text-coal text-xs font-semibold px-2 py-1 rounded-md shadow-card">
          Nuevo
        </span>

        <button
          onClick={handleAdd}
          title="Agregar al carrito"
          aria-label="Agregar al carrito"
          className="
            absolute right-3 top-3 z-10
            opacity-100 md:opacity-0 md:group-hover:opacity-100
            -translate-y-0 md:-translate-y-1 md:group-hover:translate-y-0
            transition-all duration-200
            bg-espresso text-white p-2 rounded-full shadow-card
            hover:brightness-110 active:scale-95
            focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold
          "
        >
          <Icon name="cart" className="h-4 w-4" />
        </button>

        <img
          src={imgSrc}
          alt={product?.title || 'Producto'}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 z-0"
          onError={(e) => {
            e.currentTarget.onerror = null;
            e.currentTarget.src = `https://placehold.co/600x400/E2E8F0/4A5568?text=${messages.productCard_imageUnavailable.defaultMessage}`;
          }}
        />
      </div>

      {/* CONTENIDO */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-ink truncate" title={product?.title}>
          {product?.title}
        </h3>

        <p className="text-2xl font-bold text-espresso my-2">
          ${Number(product?.price || 0).toFixed(2)}
        </p>

        <p className="text-sm text-gray-500 mb-4 flex-grow">
          {product?.category?.name || '—'}
        </p>

        <button
          onClick={() => navigate(`/product/${product.id}`)}
          className="mt-auto w-full bg-espresso text-white py-2 rounded-md hover:bg-latte transition"
          aria-label={`Ver más sobre ${product?.title || 'producto'}`}
        >
          {messages.productCard_viewMore.defaultMessage}
        </button>
      </div>
    </div>
  );
};
