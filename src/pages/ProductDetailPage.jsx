import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { apiService } from '../services/apiService';
import { useCart } from '../context/CartContext';
import { useSnackbar } from '../context/SnackbarContext';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext.jsx';
import { messages } from '../config/defaultMessages';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { Icon } from '../icons/index.jsx';

// Definicion para la pagina de detalle de un producto.
export const ProductDetailPage = () => {
  // Obtenemos el ID del producto de los parametros de la URL.
  const { productId } = useParams();
  // Hook para la navegacion.
  const navigate = useNavigate();

  // Estados para manejar el producto, la carga y los errores.
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1); // Estado para la cantidad a agregar al carrito.

  // Extraccion de funciones y estado de los diferentes contextos.
  const { cartItems, addToCart, updateQuantity, removeFromCart } = useCart();
  const { showKeyAction } = useSnackbar();
  const { user } = useAuth();
  const { addFavorite, removeFavorite, isFavorite } = useFavorites();

  // Efecto para cargar los datos del producto cuando el productId cambia.
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        // Llamada a la API para obtener los detalles del producto.
        const data = await apiService.get(`/products/${Number(productId)}`);
        setProduct(data);
      } catch (err) {
        // Manejo de errores en caso de que falle la peticion.
        setError(messages.productDetail_errorLoadingProduct.defaultMessage);
      } finally {
        // Desactivamos el estado de carga al finalizar.
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]); // Se ejecuta cada vez que el productId en la URL cambia.

  // Funcion para manejar la accion de agregar un producto al carrito.
  const handleAddToCart = () => {
    if (!product) return;
    // Buscamos si el item ya existia en el carrito para la funcion "deshacer".
    const prevItem = cartItems.find((i) => i.id === product.id);
    const prevQty = prevItem ? prevItem.quantity : 0;
    
    addToCart(product, quantity); // Agregamos el producto al carrito.

    // Definimos la funcion que se ejecutara si el usuario presiona "Deshacer".
    const undo = () => {
      if (prevQty > 0) updateQuantity(product.id, prevQty); // Restaura la cantidad anterior.
      else removeFromCart(product.id); // O lo elimina si no estaba antes.
    };
    // Mostramos una notificacion con la opcion de deshacer la accion.
    showKeyAction('snackbar_productAdded', {}, { label: 'Deshacer', icon: 'undo', onClick: undo });
  };

  // Funcion para agregar o quitar un producto de la lista de favoritos.
  const handleToggleFavorite = () => {
    if (!product) return;
    // Si el usuario no esta logueado, lo redirigimos a la pagina de login.
    if (!user) {
      navigate('/login');
      return;
    }
    // Verificamos si el producto ya es favorito para decidir la accion.
    if (isFavorite(product.id)) {
      removeFavorite(product.id);
    } else {
      addFavorite(product);
    }
  };

  // Renderizados condicionales para los estados de carga y error.
  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!product) return null; // Si no hay producto, no renderizamos nada.

  // Logica para asegurar que siempre haya una imagen que mostrar.
  const safeImage =
    product.images?.[0] ||
    `https://placehold.co/600x400/E2E8F0/4A5568?text=${messages.productCard_imageUnavailable.defaultMessage}`;

  // Renderizado principal del componente.
  return (
    <div className="bg-white p-8 rounded-lg shadow-lg max-w-7xl mx-auto">
      {/* Boton para regresar a la pagina anterior. */}
      <button
        onClick={() => navigate(-1)} 
        className="mb-6 text-[#3E2E2E] hover:underline inline-flex items-center gap-2"
        aria-label="Volver"
      >
        <Icon name="left" className="h-4 w-4" />
        {messages.general_goBack.defaultMessage}
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={safeImage}
            alt={product.title}
            className="w-full h-auto object-cover rounded-lg shadow-md"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = safeImage;
            }}
          />
        </div>
        <div className="flex flex-col">
          <div className="flex justify-between items-start mb-2">
            <h1 className="text-3xl font-bold text-gray-800 ">{product.title}</h1>
            {/* Boton para marcar/desmarcar como favorito. */}
            <button
              onClick={handleToggleFavorite}
              className="p-2 rounded-full hover:bg-red-50 transition-colors flex-shrink-0"
              aria-label={messages.productDetail_toggleFavorite.defaultMessage}
            >
              {/* El icono cambia de color segun si es favorito o no. */}
              <Icon
                name="heart"
                className={`h-7 w-7 ${
                  isFavorite(product.id)
                    ? 'text-red-500 fill-red-500'
                    : 'text-gray-400 hover:text-red-500'
                }`}
              />
            </button>
          </div>
          <p className="text-gray-500 text-sm mb-4">
            {messages.productDetail_categoryLabel.defaultMessage}{' '}
            {product.category?.name || '—'}
          </p>
          <p className="text-4xl font-extrabold text-[#3E2E2E] mb-4">
            ${Number(product.price).toFixed(2)}
          </p>
          <p className="text-gray-700 mb-6 flex-grow">{product.description}</p>
          <div className="flex items-center space-x-4 mb-6">
            <label htmlFor="quantity" className="font-semibold text-gray-700">
              {messages.productDetail_quantityLabel.defaultMessage}
            </label>
            <input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) => setQuantity(Math.max(1, parseInt(e.target.value) || 1))}
              className="w-20 p-2 border border-gray-300 rounded-md text-center focus:ring-2 focus:ring-[#3E2E2E]"
            />
          </div>
          {/* Boton principal para agregar el producto al carrito. */}
          <button
            onClick={handleAddToCart}
            className="w-full bg-[#3E2E2E] text-white py-3 rounded-md hover:bg-[#2a1f1f] transition-colors text-lg font-semibold"
          >
            {messages.productDetail_addToCart.defaultMessage}
          </button>
        </div>
      </div>
    </div>
  );
};