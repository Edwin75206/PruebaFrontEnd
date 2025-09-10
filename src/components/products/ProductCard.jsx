import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { messages } from '../../config/defaultMessages';
import { useCart } from '../../context/CartContext';
import { useSnackbar } from '../../context/SnackbarContext';
import { Icon } from '../../icons';
import { useAuth } from '../../context/AuthContext';
import { useFavorites } from '../../context/FavoritesContext';

// Componente para mostrar la vista previa de un producto.
export const ProductCard = ({ product }) => {
  // Extraccion de funciones y estado de los diferentes contextos de la aplicacion.
  const { cartItems, addToCart, updateQuantity, removeFromCart } = useCart();
  const { showKeyAction } = useSnackbar();
  const { user } = useAuth();
  const { isFavorite, addFavorite, removeFavorite } = useFavorites();
  
  // Hook para la navegacion.
  const navigate = useNavigate();

  // Estado para controlar si la imagen del producto se cargo correctamente.
  const [imgOk, setImgOk] = useState(true);

  // Normalizacion y validacion de los datos del producto.
  const title = product?.title || '';
  const images = product?.images || [];
  const isTest = /test\s*product/i.test(title);

  // Si el producto no es valido (sin titulo, de prueba, sin imagenes, o imagen rota), no se renderiza.
  if (!title || isTest || images.length === 0 || !imgOk) {
    return null;
  }

  // Manejador para agregar el producto al carrito.
  const handleAdd = (e) => {
    // Detenemos la propagacion para evitar que se active el link de navegacion de la tarjeta.
    e.stopPropagation();
    const prevItem = cartItems.find((i) => i.id === product.id);
    const prevQty = prevItem ? prevItem.quantity : 0;
    addToCart(product, 1);
    
    // Funcion para deshacer la accion, que se pasara al snackbar.
    const undo = () => {
      if (prevQty > 0) updateQuantity(product.id, prevQty);
      else removeFromCart(product.id);
    };
    showKeyAction('snackbar_productAdded', {}, {
      label: 'Deshacer',
      icon: 'undo',
      onClick: undo
    });
  };

  // Manejador para agregar o quitar el producto de favoritos.
  const handleToggleFavorite = (e) => {
    e.stopPropagation(); // Evita la navegacion.
    // Si el usuario no esta logueado, lo redirigimos al login.
    if (!user) {
      navigate('/login');
      return;
    }
    // Agrega o quita de favoritos dependiendo del estado actual.
    if (isFavorite(product.id)) {
      removeFavorite(product.id);
    } else {
      addFavorite(product);
    }
  };

  const imgSrc = images[0];

  return (
    <div
      className="bg-white rounded-xl shadow-card overflow-hidden transition hover:shadow-xl group flex flex-col"
      role="article"
      aria-label={title || 'Producto'}
    >
      <div className="relative h-56 overflow-hidden">
        
        {/* Boton para agregar a favoritos, posicionado absolutamente. */}
        <button
          onClick={handleToggleFavorite}
          title="Añadir a favoritos"
          aria-label="Añadir a favoritos"
          className="absolute left-3 top-3 z-10 transition-all duration-200 bg-espresso text-white p-2 rounded-full shadow-card hover:brightness-110 active:scale-95"
        >
          {/* El icono cambia de apariencia si el producto ya es favorito. */}
          <Icon name="heart" className={`h-4 w-4 ${isFavorite(product.id) ? 'fill-white' : ''}`} />
        </button>

        {/* Boton para agregar al carrito, aparece al hacer hover en escritorio. */}
        <button
          onClick={handleAdd}
          title="Agregar al carrito"
          aria-label="Agregar al carrito"
          className="absolute right-3 top-3 z-10 opacity-100 md:opacity-0 md:group-hover:opacity-100 -translate-y-0 md:-translate-y-1 md:group-hover:translate-y-0 transition-all duration-200 bg-espresso text-white p-2 rounded-full shadow-card hover:brightness-110 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        >
          <Icon name="cart" className="h-4 w-4" />
        </button>

        <img
          src={imgSrc}
          alt={title || 'Producto'}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 z-0"
          // Si la imagen falla al cargar, el componente se oculta para no mostrar un error visual.
          onError={() => setImgOk(false)} 
          // Carga diferida de imagenes para mejorar el rendimiento.
          loading="lazy"
        />
      </div>

      {/* Seccion de informacion del producto. */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold text-ink truncate" title={title}>
          {title}
        </h3>
        <p className="text-2xl font-bold text-espresso my-2">
          ${Number(product?.price || 0).toFixed(2)}
        </p>
        <p className="text-sm text-gray-500 mb-4 flex-grow">
          {product?.category?.name || '—'}
        </p>
        {/* Boton principal para navegar a la pagina de detalle del producto. */}
        <button
          onClick={() => navigate(`/product/${product.id}`)}
          className="mt-auto w-full bg-espresso text-white py-2 rounded-md hover:bg-latte transition"
          aria-label={`Ver más sobre ${title || 'producto'}`}
        >
          {messages.productCard_viewMore.defaultMessage}
        </button>
      </div>
    </div>
  );
};