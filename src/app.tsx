import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import CartDrawer from './pages/CartPage';
import HomePage from './pages/HomePage';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import AboutPage from './pages/AboutPage';
import { CartProvider } from './context/CartContext';
import { LanguageProvider } from './context/LanguageContext';

type Page = 'home' | 'products' | 'product-detail' | 'about';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const [selectedProductId, setSelectedProductId] = useState<string>('');
  const [cartOpen, setCartOpen] = useState(false);
  const [collectionFilter, setCollectionFilter] = useState<'oriental' | 'modern' | ''>('');

  // Handle browser back/forward
  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname;
      if (path === '/' || path === '') {
        setCurrentPage('home');
      } else if (path === '/products') {
        setCurrentPage('products');
        setCollectionFilter('');
      } else if (path.startsWith('/products?')) {
        setCurrentPage('products');
        const params = new URLSearchParams(path.split('?')[1]);
        const collection = params.get('collection') as 'oriental' | 'modern' | '';
        setCollectionFilter(collection || '');
      } else if (path.startsWith('/product/')) {
        setCurrentPage('product-detail');
        setSelectedProductId(path.split('/')[2]);
      } else if (path === '/about') {
        setCurrentPage('about');
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (page: string) => {
    if (page === 'home') {
      window.history.pushState({}, '', '/');
      setCurrentPage('home');
    } else if (page.startsWith('products')) {
      const collection = page.includes('?') ? page.split('=')[1] : '';
      const url = collection ? `/products?collection=${collection}` : '/products';
      window.history.pushState({}, '', url);
      setCurrentPage('products');
      setCollectionFilter(collection as 'oriental' | 'modern' | '' || '');
    } else if (page === 'about') {
      window.history.pushState({}, '', '/about');
      setCurrentPage('about');
    }
  };

  const handleProductClick = (productId: string) => {
    window.history.pushState({}, '', `/product/${productId}`);
    setSelectedProductId(productId);
    setCurrentPage('product-detail');
  };

  const renderPage = () => {
    switch (currentPage) {
      case 'home':
        return <HomePage onNavigate={navigate} onProductClick={handleProductClick} />;
      case 'products':
        return <ProductsPage collection={collectionFilter} onProductClick={handleProductClick} />;
      case 'product-detail':
        return (
          <ProductDetailPage
            productId={selectedProductId}
            onBack={() => {
              window.history.back();
            }}
          />
        );
      case 'about':
        return <AboutPage />;
      default:
        return <HomePage onNavigate={navigate} onProductClick={handleProductClick} />;
    }
  };

  return (
    <LanguageProvider>
      <CartProvider>
        <div style={{
          minHeight: '100vh',
          display: 'flex',
          flexDirection: 'column',
          fontFamily: '"Noto Sans JP", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        }}>
          <Header
            onOpenCart={() => setCartOpen(true)}
            onNavigate={navigate}
          />
          
          <main style={{ flex: 1 }}>
            {renderPage()}
          </main>

          <Footer />

          <CartDrawer
            isOpen={cartOpen}
            onClose={() => setCartOpen(false)}
            onProductClick={handleProductClick}
          />
        </div>
      </CartProvider>
    </LanguageProvider>
  );
}
