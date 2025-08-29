import React, { useState, useEffect, useCallback } from 'react';
import { apiService } from '../services/apiService';
import { debounce } from '../utils/debounce';
import { ProductCard } from '../components/products/ProductCard';
import { LoadingSpinner } from '../components/common/LoadingSpinner';
import { messages } from '../config/defaultMessages';

export const HomePage = ({ navigate }) => {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFiltered] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categories, setCategories] = useState([]);

  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState({ min: 0, max: 2000 });

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const [p, c] = await Promise.all([
          apiService.get('/products?offset=0&limit=50'),
          apiService.get('/categories')
        ]);
        setProducts(p);
        setFiltered(p);
        setCategories(c);
      } catch {
        setError(messages.home_errorLoadingProducts.defaultMessage);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const applyFilters = useCallback(() => {
    let temp = [...products];
    if (searchTerm) temp = temp.filter(p => p.title.toLowerCase().includes(searchTerm.toLowerCase()));
    if (selectedCategory !== 'all') temp = temp.filter(p => p.category?.id === parseInt(selectedCategory));
    temp = temp.filter(p => p.price >= priceRange.min && p.price <= priceRange.max);
    setFiltered(temp);
  }, [products, searchTerm, selectedCategory, priceRange]);

  useEffect(() => {
    debounce(applyFilters, 300)();
  }, [searchTerm, selectedCategory, priceRange, applyFilters]);

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPriceRange(prev => ({ ...prev, [name]: value ? parseInt(value) : 0 }));
  };

  return (
    <div>
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-bold mb-4 text-gray-800">{messages.home_filtersTitle.defaultMessage}</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <input type="text" placeholder={messages.home_searchPlaceholder.defaultMessage} className="p-2 border border-gray-300 rounded-md w-full" value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} />
          <select className="p-2 border border-gray-300 rounded-md w-full" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
            <option value="all">{messages.home_allCategories.defaultMessage}</option>
            {categories.map(cat => <option key={cat.id} value={cat.id}>{cat.name}</option>)}
          </select>
          <div className="flex items-center space-x-2">
            <input type="number" name="min" placeholder={messages.home_priceMin.defaultMessage} className="p-2 border border-gray-300 rounded-md w-1/2" value={priceRange.min} onChange={handlePriceChange} />
            <input type="number" name="max" placeholder={messages.home_priceMax.defaultMessage} className="p-2 border border-gray-300 rounded-md w-1/2" value={priceRange.max} onChange={handlePriceChange} />
          </div>
        </div>
      </div>

      {loading && <LoadingSpinner />}
      {error && <p className="text-red-500 text-center">{error}</p>}
      {!loading && !error && (
        filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map(product => <ProductCard key={product.id} product={product} navigate={navigate} />)}
          </div>
        ) : (
          <p className="text-center text-gray-600 mt-8">{messages.home_noProductsFound.defaultMessage}</p>
        )
      )}
    </div>
  );
};
