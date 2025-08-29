import React, { useState, useEffect } from 'react';
import { AuthProvider } from './context/AuthContext.jsx';
import { CartProvider } from './context/CartContext.jsx';
import { Layout } from './components/common/Layout.jsx';
import { HomePage } from './pages/HomePage.jsx';
import { ProductDetailPage } from './pages/ProductDetailPage.jsx';
import { CartPage } from './pages/CartPage.jsx';
import { LoginPage } from './pages/LoginPage.jsx';
import { RegisterPage } from './pages/RegisterPage.jsx';

export default function App() {
  const [route, setRoute] = useState(window.location.pathname);

  const navigate = (path) => {
    window.history.pushState({}, '', path);
    setRoute(path);
  };

  useEffect(() => {
    const onPop = () => setRoute(window.location.pathname);
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  const renderContent = () => {
    if (route.startsWith('/product/')) {
      const productId = route.split('/')[2];
      return <ProductDetailPage productId={productId} navigate={navigate} />;
    }
    switch (route) {
      case '/cart': return <CartPage navigate={navigate} />;
      case '/login': return <LoginPage navigate={navigate} />;
      case '/register': return <RegisterPage navigate={navigate} />;
      case '/':
      default: return <HomePage navigate={navigate} />;
    }
  };

  return (
    <AuthProvider>
      <CartProvider>
        <Layout navigate={navigate}>{renderContent()}</Layout>
      </CartProvider>
    </AuthProvider>
  );
}
