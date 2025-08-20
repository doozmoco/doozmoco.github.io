
import React from 'react';
import { HashRouter, Route, Routes, useLocation } from 'react-router-dom';
import { CartProvider } from './context/CartContext';
import { AuthProvider } from './context/AuthContext';
import { WishlistProvider } from './context/WishlistContext';
import Header from './components/Header';
import Footer from './components/Footer';
import HomePage from './pages/HomePage';
import CollectionPage from './pages/CollectionPage';
import ProductPage from './pages/ProductPage';
import CheckoutPage from './pages/CheckoutPage';
import LoginPage from './pages/LoginPage';
import WishlistPage from './pages/WishlistPage';
import AdminLayout from './pages/admin/AdminLayout';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminCollections from './pages/admin/AdminCollections';
import AdminOrders from './pages/admin/AdminOrders';
import CartSidebar from './components/CartSidebar';
import CategoryPage from './pages/CategoryPage';
import ProtectedRoute from './components/ProtectedRoute';

const TopBanner: React.FC = () => (
  <div className="bg-brand-primary text-white text-center py-2 px-6 text-sm font-medium tracking-wide">
    USE CODE "WELCOME10" TO GET 10% OFF ON FIRST ORDER
  </div>
);

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const location = useLocation();
  const isAdminRoute = location.pathname.startsWith('/admin');
  const isLoginRoute = location.pathname.startsWith('/login');

  if (isAdminRoute || isLoginRoute) {
    return <>{children}</>;
  }

  return (
    <div className="flex flex-col min-h-screen bg-brand-light font-sans text-slate-800">
      <TopBanner />
      <Header />
      <main className="flex-grow">
        {children}
      </main>
      <CartSidebar />
      <Footer />
    </div>
  );
};

function App() {
  return (
    <HashRouter>
      <AuthProvider>
        <CartProvider>
          <WishlistProvider>
            <MainLayout>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/collections/:id" element={<CollectionPage />} />
                <Route path="/category/:slug" element={<CategoryPage />} />
                <Route path="/product/:id" element={<ProductPage />} />
                <Route path="/checkout" element={<CheckoutPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route 
                  path="/wishlist" 
                  element={
                    <ProtectedRoute>
                      <WishlistPage />
                    </ProtectedRoute>
                  } 
                />
                
                <Route 
                  path="/admin" 
                  element={
                    <ProtectedRoute role="ADMIN">
                      <AdminLayout />
                    </ProtectedRoute>
                  }
                >
                  <Route index element={<AdminDashboard />} />
                  <Route path="products" element={<AdminProducts />} />
                  <Route path="collections" element={<AdminCollections />} />
                  <Route path="orders" element={<AdminOrders />} />
                </Route>
              </Routes>
            </MainLayout>
          </WishlistProvider>
        </CartProvider>
      </AuthProvider>
    </HashRouter>
  );
}

export default App;