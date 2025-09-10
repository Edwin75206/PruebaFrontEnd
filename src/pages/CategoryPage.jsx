import React, { useEffect, useState, useMemo } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { apiService } from "../services/apiService";
import { ProductCard } from "../components/products/ProductCard";
import { ProductFilters } from "../components/products/ProductFilters";
import { LoadingSpinner } from "../components/common/LoadingSpinner";
import { messages } from '../config/defaultMessages'; 


// Definicion para la pagina de una categoria especifica.
export function CategoryPage() { 
  // Obtenemos el ID de la categoria de los parametros de la URL.
  const { categoryId } = useParams();
  // Hook para la navegacion.
  const navigate = useNavigate();

  // Estados para manejar los productos, el titulo de la pagina y el estado de carga/error.
  const [products, setProducts] = useState([]);
  const [title, setTitle] = useState("Categoria");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Estados para los filtros y el ordenamiento de productos.
  const [searchTerm, setSearchTerm] = useState('');
  const [priceRange, setPriceRange] = useState([0, 1000]);
  const [sortBy, setSortBy] = useState('default');
  const [maxPrice, setMaxPrice] = useState(1000);

  // Efecto para cargar los productos de la categoria cuando el categoryId cambia.
  useEffect(() => {
    if (!categoryId) return;
    setLoading(true); // Iniciamos el estado de carga.

    // Llamada a la API para obtener los productos de la categoria.
    apiService.get(`/categories/${categoryId}/products?offset=0&limit=50`)
      .then((data) => {
        // Actualizamos el estado con los productos recibidos.
        setProducts(data);
        const categoryName = data?.[0]?.category?.name;
        // Actualizamos el titulo de la pagina con el nombre de la categoria.
        setTitle(categoryName || `Categoria #${categoryId}`);
        if (data.length > 0) {
          // Calculamos el precio maximo para ajustar el filtro de rango de precios.
          const topPrice = Math.ceil(Math.max(...data.map(p => p.price)) / 10) * 10;
          setMaxPrice(topPrice);
          setPriceRange([0, topPrice]);
        }
      })
      .catch((err) => {
        // Manejo de errores en la llamada a la API.
        setError(err?.message || "Error al cargar la categoria");
        setTitle(`Categoria #${categoryId}`);
      })
      .finally(() => setLoading(false)); // Finalizamos el estado de carga.
  }, [categoryId]); // La dependencia es categoryId, el efecto se ejecuta cuando cambia.

  // Guatdamos el resultado de filtrar y ordenar los productos para optimizar el rendimiento.
  const filteredAndSortedProducts = useMemo(() => {
    let processedProducts = [...products];
    // Filtro por termino de busqueda.
    if (searchTerm) {
      processedProducts = processedProducts.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));
    }
    // Filtro por rango de precios.
    processedProducts = processedProducts.filter(p => p.price >= priceRange[0] && p.price <= priceRange[1]);
    // Ordenamiento de productos.
    if (sortBy === 'price-asc') {
      processedProducts.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-desc') {
      processedProducts.sort((a, b) => b.price - a.price);
    }
    return processedProducts;
  }, [products, searchTerm, priceRange, sortBy]); // Se recalcula solo si estas dependencias cambian.

  // Renderizados condicionales para diferentes estados de la pagina.
  if (!categoryId) return <p className="mt-4 text-center">{messages.category_invalid.defaultMessage}</p>;
  if (loading) return <div className="flex justify-center mt-8"><LoadingSpinner /></div>;
  if (error) return <p className="mt-4 text-center text-red-500">{error}</p>;

  // Renderizado principal del componente.
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">{title}</h1>
      <div className="flex flex-col md:flex-row gap-8">
        {/* Componente que contiene todos los controles de filtro. */}
        <ProductFilters
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          priceRange={priceRange}
          setPriceRange={setPriceRange}
          sortBy={sortBy}
          setSortBy={setSortBy}
          maxPrice={maxPrice}
        />
        <main className="flex-1">
          {/* Si no hay productos despues de filtrar, muestra un mensaje. */}
          {filteredAndSortedProducts.length === 0 ? (
            <div className="text-center py-10 bg-white rounded-lg shadow-sm">
              <p>{messages.feedback_noProductsFound.defaultMessage}</p>
            </div>
          ) : (
            // Mapea y renderiza los productos filtrados y ordenados.
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAndSortedProducts.map((p) => (
                <ProductCard key={p.id} product={p} navigate={navigate} />
              ))}
            </div>
          )}
        </main>
      </div>
    </div>
  );
}