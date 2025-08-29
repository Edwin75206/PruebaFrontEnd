import React, { useState, useEffect, useCallback } from 'react';
import { apiService } from '../services/apiService';
import { debounce } from '../utils/debounce';
import { ProductCard } from '../components/products/ProductCard';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { messages } from '../config/defaultMessages';
import { BenefitsStrip } from '../components/home/BenefitsStrip';
import { CategoryPills } from '../components/home/CategoryPills';
import { HeroCarousel } from '../components/home/HeroCarousel';

export const HomePage = ({ navigate }) => {
  const [products, setProducts] = useState([]);
  const [featuredList, setFeaturedList] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 2000 });

  useEffect(() => {
    const fetchInitialData = async () => {
      try {
        setLoading(true);
        const [productsData, categoriesData] = await Promise.all([
          apiService.get('/products?offset=0&limit=50'),
          apiService.get('/categories'),
        ]);
        setProducts(productsData);
        setFilteredProducts(productsData);
        setCategories(categoriesData);

        // ---- Destacados (proxy de "más comprados")
        const withImg = productsData.filter(p => Array.isArray(p.images) && p.images[0]);
        let sorted = [...withImg];

        // Si trae rating.count lo usamos, si no por precio desc
        const hasRatingCount = sorted.some(p => p?.rating?.count);
        if (hasRatingCount) {
          sorted.sort((a, b) => (b?.rating?.count || 0) - (a?.rating?.count || 0));
        } else {
          sorted.sort((a, b) => Number(b.price) - Number(a.price));
        }

        setFeaturedList(sorted.slice(0, 5));
      } catch (err) {
        setError(messages.home_errorLoadingProducts.defaultMessage);
      } finally {
        setLoading(false);
      }
    };
    fetchInitialData();
  }, []);

  const applyFilters = useCallback(() => {
    let temp = [...products];
    if (searchTerm) temp = temp.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));
    if (selectedCategory !== 'all') temp = temp.filter(p => p.category?.id === parseInt(selectedCategory));
    temp = temp.filter(p => Number(p.price) >= priceRange.min && Number(p.price) <= priceRange.max);
    setFilteredProducts(temp);
  }, [products, searchTerm, selectedCategory, priceRange]);

  useEffect(() => {
    const debounced = debounce(applyFilters, 200);
    debounced();
  }, [searchTerm, selectedCategory, priceRange, applyFilters]);

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPriceRange(prev => ({ ...prev, [name]: value ? parseInt(value) : 0 }));
  };

  return (
    <div className="space-y-10">
      {/* Carrusel de destacados */}
      <HeroCarousel
        products={featuredList}
        onShop={() => window.scrollTo({ top: document.body.scrollHeight * 0.2, behavior: 'smooth' })}
        onView={(id) => navigate(`/product/${id}`)}
      />

      <BenefitsStrip />

      {/* Filtros */}
      <div className="bg-white p-6 rounded-xl shadow-card">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <h2 className="text-2xl font-bold text-ink">{messages.home_filtersTitle.defaultMessage}</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-3 md:w-2/3">
            <input
              type="text"
              placeholder={messages.home_searchPlaceholder.defaultMessage}
              className="p-2 border border-gray-300 rounded-md w-full"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <div className="flex items-center gap-2">
              <input
                type="number"
                name="min"
                placeholder={messages.home_priceMin.defaultMessage}
                className="p-2 border border-gray-300 rounded-md w-1/2"
                value={priceRange.min}
                onChange={handlePriceChange}
              />
              <input
                type="number"
                name="max"
                placeholder={messages.home_priceMax.defaultMessage}
                className="p-2 border border-gray-300 rounded-md w-1/2"
                value={priceRange.max}
                onChange={handlePriceChange}
              />
            </div>
            <div className="hidden md:block" />
          </div>
        </div>

        <div className="mt-4">
          <CategoryPills
            categories={categories}
            value={selectedCategory}
            onChange={setSelectedCategory}
          />
        </div>
      </div>

      {/* Grid */}
      {loading && <LoadingSpinner />}
      {error && <p className="text-red-500 text-center">{error}</p>}

      {!loading && !error && (
        filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 animate__animated animate__fadeIn">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} navigate={navigate} />
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600 mt-8">{messages.home_noProductsFound.defaultMessage}</p>
        )
      )}
    </div>
  );
};
