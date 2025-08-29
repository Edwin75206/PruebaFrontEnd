import React, { useState, useEffect } from 'react';
import { apiService } from '../services/apiService';
import { useCart } from '../context/CartContext';
import { useSnackbar } from '../context/SnackbarContext';
import { messages } from '../config/defaultMessages';
import { LoadingSpinner } from '../components/common/LoadingSpinner';

export const ProductDetailPage = ({ productId, navigate }) => {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const { cartItems, addToCart, updateQuantity, removeFromCart } = useCart();
  const { showKeyAction } = useSnackbar();

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        setLoading(true);
        const data = await apiService.get(`/products/${Number(productId)}`);
        setProduct(data);
      } catch (err) {
        setError(messages.productDetail_errorLoadingProduct.defaultMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (!product) return;

    const prevItem = cartItems.find((i) => i.id === product.id);
    const prevQty = prevItem ? prevItem.quantity : 0;

    addToCart(product, quantity);

    const undo = () => {
      if (prevQty > 0) updateQuantity(product.id, prevQty);
      else removeFromCart(product.id);
    };

    showKeyAction('snackbar_productAdded', {}, { label: 'Deshacer', icon: 'undo', onClick: undo });
  };

  if (loading) return <LoadingSpinner />;
  if (error) return <p className="text-red-500 text-center">{error}</p>;
  if (!product) return null;

  const safeImage =
    product.images?.[0] ||
    `https://placehold.co/600x400/E2E8F0/4A5568?text=${messages.productCard_imageUnavailable.defaultMessage}`;

  return (
    <div className="bg-white p-8 rounded-lg shadow-lg">
      <button
        onClick={() => navigate('/')}
        className="mb-6 text-indigo-600 hover:underline"
        aria-label="Volver"
      >
        &larr; {messages.general_goBack.defaultMessage}
      </button>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <img
            src={safeImage}
            alt={product.title}
            className="w-full h-auto object-cover rounded-lg"
            onError={(e) => {
              e.currentTarget.onerror = null;
              e.currentTarget.src = safeImage;
            }}
          />
        </div>

        <div>
          <h1 className="text-3xl font-bold text-gray-800 mb-2">{product.title}</h1>
          <p className="text-gray-500 text-sm mb-4">
            {messages.productDetail_categoryLabel.defaultMessage}{' '}
            {product.category?.name || '—'}
          </p>
          <p className="text-4xl font-extrabold text-indigo-600 mb-4">
            ${Number(product.price).toFixed(2)}
          </p>
          <p className="text-gray-700 mb-6">{product.description}</p>

          <div className="flex items-center space-x-4 mb-6">
            <label htmlFor="quantity" className="font-semibold">
              {messages.productDetail_quantityLabel.defaultMessage}
            </label>
            <input
              id="quantity"
              type="number"
              min="1"
              value={quantity}
              onChange={(e) =>
                setQuantity(Math.max(1, parseInt(e.target.value) || 1))
              }
              className="w-20 p-2 border border-gray-300 rounded-md text-center"
            />
          </div>

          <button
            onClick={handleAddToCart}
            className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition-colors text-lg font-semibold"
          >
            {messages.productDetail_addToCart.defaultMessage}
          </button>
        </div>
      </div>
    </div>
  );
};
