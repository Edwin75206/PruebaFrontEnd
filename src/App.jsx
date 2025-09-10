import React from "react";
// Se importan los componentes de React Router
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Se importan todos los providers y páginas
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { SnackbarProvider } from "./context/SnackbarContext";
import { FavoritesProvider } from "./context/FavoritesContext.jsx";
import { ModalProvider } from "./context/ModalContext.jsx";
import { OrderProvider } from "./context/OrderContext.jsx";
import { Layout } from "./components/common/Layout";
import { HomePage } from "./pages/HomePage";
import { ProductDetailPage } from "./pages/ProductDetailPage";
import { CartPage } from "./pages/CartPage";
import { LoginPage } from "./pages/LoginPage";
import { RegisterPage } from "./pages/RegisterPage";
import { CategoryPage } from "./pages/CategoryPage";
import ProfilePage from "./pages/ProfilePage";
import Protected from "./components/common/Protected";

class AppErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div style={{ padding: 24 }}>
          <h2>Ocurrió un error inesperado.</h2>
          <p>Intenta recargar la página o volver al inicio.</p>
          <button onClick={() => (window.location.href = "/")}>
            Ir al inicio
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

export default function App() {

  return (
    <AuthProvider>
      <SnackbarProvider>
        <CartProvider>
          <ModalProvider>
            <FavoritesProvider>
              <OrderProvider>
                <AppErrorBoundary>
                  {/*La aplicación se envuelve en BrowserRouter */}
                  <BrowserRouter>
                    {/*<Routes> define dónde pueden ir las rutas */}
                    <Routes>
                      {/* La ruta principal ("/") usa el Layout y anida las demás páginas dentro */}
                      <Route path="/" element={<Layout />}>
                        {/* 'index' es la ruta por defecto para "/" */}
                        <Route index element={<HomePage />} />
                        <Route path="cart" element={<CartPage />} />
                        <Route path="login" element={<LoginPage />} />
                        <Route path="register" element={<RegisterPage />} />
                        {/* Rutas con parámetros dinámicos */}
                        <Route path="product/:productId" element={<ProductDetailPage />} />
                        <Route path="category/:categoryId" element={<CategoryPage />} />
                        
                        {/* Ruta Protegida */}
                        <Route
                          path="profile"
                          element={
                            <Protected>
                              <ProfilePage />
                            </Protected>
                          }
                        />
                        
                        {/* Ruta para páginas no encontradas (404) */}
                        <Route path="*" element={<h1 className="text-center p-8">Página no encontrada</h1>} />
                      </Route>
                    </Routes>
                  </BrowserRouter>
                </AppErrorBoundary>
              </OrderProvider>
            </FavoritesProvider>
          </ModalProvider>
        </CartProvider>
      </SnackbarProvider>
    </AuthProvider>
  );
}

