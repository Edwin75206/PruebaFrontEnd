// src/App.jsx
import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext';
import { CartProvider } from './context/CartContext';
import { SnackbarProvider } from './context/SnackbarContext'; // ✅ nuevo
import { Layout } from './components/common/Layout';
import { HomePage } from './pages/HomePage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { CartPage } from './pages/CartPage';
import { LoginPage } from './pages/LoginPage';
import { RegisterPage } from './pages/RegisterPage';

export default function App() {
  const [route, setRoute] = useState(window.location.pathname);
  const [headerQuery, setHeaderQuery] = useState('');

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setRoute(path);
  };

  useEffect(() => {
    const handlePopState = () => setRoute(window.location.pathname);
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const renderContent = () => {
    if (route.startsWith('/product/')) {
      const productId = route.split('/')[2];
      return <ProductDetailPage productId={productId} navigate={navigate} />;
    }
    switch (route) {
      case '/cart':
        return <CartPage navigate={navigate} />;
      case '/login':
        return <LoginPage navigate={navigate} />;
      case '/register':
        return <RegisterPage navigate={navigate} />;
      case '/':
      default:
        return <HomePage navigate={navigate} externalSearch={headerQuery} />;
    }
  };

  return (
    <AuthProvider>
      <CartProvider>
        <SnackbarProvider> {/* ✅ Snackbar global disponible en toda la app */}
          <Layout navigate={navigate} onSearch={setHeaderQuery}>
            {renderContent()}
          </Layout>
        </SnackbarProvider>
      </CartProvider>
    </AuthProvider>
  );
}
