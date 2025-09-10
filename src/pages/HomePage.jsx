import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { apiService } from '../services/apiService';
import { ProductCard } from '../components/products/ProductCard';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { messages } from '../config/defaultMessages';
import { BenefitsStrip } from '../components/home/BenefitsStrip';
import { HeroCarousel } from '../components/home/HeroCarousel';
import { HeroImage } from '../components/home/HeroImage';

// Definicion para la pagina de inicio.
export const HomePage = () => {
  // Hook para la navegacion.
  const navigate = useNavigate();

  // Estados para manejar las listas de productos, el estado de carga y los errores.
  const [featuredList, setFeaturedList] = useState([]);
  const [randomProducts, setRandomProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Efecto para cargar los datos iniciales de la pagina al montar el componente.
  useEffect(() => {
    // Funcion asincrona para realizar las peticiones a la API.
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        // Obtenemos una lista inicial de productos.
        const productsData = await apiService.get('/products?offset=0&limit=50');

        // Filtramos los productos para asegurar que tengan al menos una imagen.
        const withImg = productsData.filter(p => Array.isArray(p.images) && p.images[0]);
        
        // Creamos una lista de productos destacados ordenandolos por precio (los mas caros primero).
        let sorted = [...withImg].sort((a, b) => Number(b.price) - Number(a.price));
        setFeaturedList(sorted.slice(0, 5));

        // Creamos una lista de productos aleatorios para la seccion principal.
        const shuffled = [...withImg].sort(() => 0.5 - Math.random());
        setRandomProducts(shuffled.slice(0, 4));
        
      } catch (err)
      {
        // Manejo de errores en caso de que falle la peticion.
        setError(messages.home_errorLoadingProducts.defaultMessage);
      } finally {
        // Desactivamos el estado de carga, tanto si tuvo exito como si fallo.
        setLoading(false);
      }
    };
    fetchInitialData();
  }, []); // El array vacio asegura que el efecto se ejecute solo una vez.

  // Renderizado principal del componente.
  return (
    <>
      {/* Componente para la imagen principal de bienvenida. */}
      <HeroImage />

      <div className="container mx-auto px-4 py-8 space-y-12">
      
        {/* Carrusel que muestra los productos mas destacados (los mas caros). */}
        <HeroCarousel
          products={featuredList}
          onView={(id) => navigate(`/product/${id}`)}
        />
        
        {/* Componente que muestra una tira de beneficios o ventajas. */}
        <BenefitsStrip />

        <section>
          <h2 className="text-3xl font-bold text-center mb-8">
            {messages.home_featuredProductsTitle.defaultMessage}
          </h2>
          {/* Renderizado condicional basado en el estado de carga y error. */}
          {loading ? (
            <LoadingSpinner />
          ) : error ? (
            <p className="text-red-500 text-center">{error}</p>
          ) : (
            // Mapea y renderiza la cuadricula de productos aleatorios.
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {randomProducts.map(product => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </section>
      </div>
    </>
  );
};