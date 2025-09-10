import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useFavorites } from '../context/FavoritesContext.jsx';
import { useOrders } from '../context/OrderContext.jsx';
import { messages } from '../config/defaultMessages';
import { ProductCard } from "../components/products/ProductCard";
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import UserCard from '../components/user/UserCard';

// Definicion para la pagina de perfil del usuario.
export default function ProfilePage() {
  // Hook para la navegacion.
  const navigate = useNavigate();
  // Extraccion de datos de los contextos de autenticacion, favoritos y ordenes.
  const { user } = useAuth();
  const { favorites, loading: favoritesLoading } = useFavorites();
  const { orders } = useOrders();

  // Funcion para renderizar la seccion de productos favoritos.
  const renderFavorites = () => {
    // Muestra un spinner mientras se cargan los favoritos.
    if (favoritesLoading) {
      return <div className="col-span-full flex justify-center py-4"><LoadingSpinner /></div>;
    }
    // Muestra un mensaje si no hay favoritos.
    if (favorites.length === 0) {
      return <div className="col-span-full text-center text-gray-400 text-sm">{messages.profile_noFavorites.defaultMessage}</div>;
    }
    // Mapea y renderiza cada producto favorito usando el componente ProductCard.
    return favorites.map((product) => (
      <ProductCard key={product.id} product={product} />
    ));
  };

  // Funcion para renderizar la seccion del historial de pedidos.
  const renderOrderHistory = () => {
    // Muestra un mensaje si no hay ordenes en el historial.
    if (orders.length === 0) {
      return (
        <div className="text-center text-gray-400 text-sm py-4">
          {messages.profile_noOrders.defaultMessage}
        </div>
      );
    }
    // Mapea y renderiza cada orden del historial.
    return (
      <div className="space-y-4">
        {orders.map(order => (
          <div key={order.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <p className="text-sm text-gray-500">
                {messages.profile_orderDate.defaultMessage} {new Date(order.date).toLocaleDateString('es-MX')}
              </p>
              <p className="font-bold text-lg">${order.total.toFixed(2)}</p>
            </div>
            {/* Muestra una vista previa de los primeros 4 items de la orden. */}
            <div className="flex space-x-2">
              {order.items.slice(0, 4).map(item => (
                <img key={item.id} src={item.images[0]} alt={item.title} className="w-12 h-12 rounded object-cover" />
              ))}
            </div>
          </div>
        ))}
      </div>
    );
  };

  // Renderizado principal del componente con un layout responsivo.
  return (
    <section className="container mx-auto px-4 py-8 
      flex flex-col gap-8 // Por defecto (movil), es una columna
      md:grid md:grid-cols-3 md:gap-8 // En escritorio, cambia a una cuadricula de 3 columnas
    ">
      
      {/* Bloque del Perfil de Usuario, muestra la informacion del usuario. */}
      <div className="order-1 md:order-2 md:col-start-3">
        <UserCard user={user} />
      </div>

      {/* Bloque de Favoritos. */}
      <main className="flex-1 order-2 md:order-1 md:col-span-2 md:row-span-2">
        <div className="bg-white rounded-2xl shadow-card p-6 h-full">
          <h3 className="text-lg font-semibold text-ink">
            {messages.profile_favoritesTitle.defaultMessage}
          </h3>
          <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4">
            {/* Llama a la funcion para renderizar los favoritos. */}
            {renderFavorites()}
          </div>
        </div>
      </main>

      {/* Bloque del Historial de Pedidos. */}
      <div className="bg-white rounded-2xl shadow-card p-6 order-3 md:order-3 md:col-start-3">
        <h3 className="text-lg font-semibold text-ink">
          {messages.profile_ordersTitle.defaultMessage}
        </h3>
        <div className="mt-4">
          {/* Llama a la funcion para renderizar el historial. */}
          {renderOrderHistory()}
        </div>
      </div>
    </section>
  );
}