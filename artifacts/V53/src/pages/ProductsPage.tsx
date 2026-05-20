import { useState, useEffect } from 'react';
import ProductCard from '../components/ProductCard';
import { products } from '../data/products';
import { useLanguage } from '../context/LanguageContext';

interface ProductsPageProps {
  collection?: 'oriental' | 'modern' | '';
  onProductClick: (productId: string) => void;
}

export default function ProductsPage({ collection = '', onProductClick }: ProductsPageProps) {
  const { language } = useLanguage();
  const [filteredProducts, setFilteredProducts] = useState(products);

  useEffect(() => {
    if (collection) {
      setFilteredProducts(products.filter(p => p.collection === collection));
    } else {
      setFilteredProducts(products);
    }
  }, [collection]);

  const pageTitle = collection === 'oriental'
    ? (language === 'zh' ? '东洋风系列' : language === 'ja' ? '東洋風シリーズ' : 'Oriental Collection')
    : collection === 'modern'
    ? (language === 'zh' ? '现代系列' : language === 'ja' ? 'モダンシリーズ' : 'Modern Collection')
    : (language === 'zh' ? '全部系列' : language === 'ja' ? 'すべてのコレクション' : 'All Collections');

  const bannerImages = {
    oriental: 'https://images.unsplash.com/photo-1596483758379-9d2a3f4e4b6c?w=1600',
    modern: 'https://images.unsplash.com/photo-1595981267035-7b14ead294f5?w=1600',
    all: 'https://images.unsplash.com/photo-1574668446843-ae7c0f6db0ab?w=1600',
  };

  return (
    <div style={{ backgroundColor: '#faf6f2' }}>
      {/* Banner */}
      <section style={{
        position: 'relative',
        height: '60vh',
        minHeight: '400px',
        backgroundImage: `url(${bannerImages[collection as keyof typeof bannerImages] || bannerImages.all})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.3)',
        }} />
        
        <div style={{
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
          color: '#ffffff',
        }}>
          <h1 style={{
            fontSize: 'clamp(32px, 6vw, 64px)',
            fontWeight: '300',
            fontStyle: 'italic',
            letterSpacing: '0.3em',
            marginBottom: '16px',
          }}>
            {pageTitle}
          </h1>
          
          <p style={{
            fontSize: '11px',
            letterSpacing: '0.3em',
            opacity: '0.9',
            textTransform: 'uppercase',
          }}>
            {language === 'zh' ? 'COTORIE COLLECTION' : language === 'ja' ? 'コトリエ コレクション' : 'COTORIE COLLECTION'}
          </p>
        </div>
      </section>

      {/* Products Grid - Full Width Edge-to-Edge */}
      <section style={{
        padding: '100px 0',
        backgroundColor: '#ffffff',
        width: '100%',
      }}>
        {/* Grid System - Full width edge-to-edge */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
          gap: '2px',
          width: '100vw',
          marginLeft: 'calc(-50vw + 50%)',
          marginRight: 'calc(-50vw + 50%)',
        }} className="products-grid">
          {filteredProducts.slice(0, 8).map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onClick={() => onProductClick(product.id)}
              language={language}
            />
          ))}
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '160px 0',
          }}>
            <p style={{
              fontSize: '13px',
              color: '#999999',
              opacity: '0.8',
              letterSpacing: '2px',
              fontWeight: 300,
            }}>
              {language === 'zh' ? '暂无商品' : language === 'ja' ? '商品がありません' : 'No products available'}
            </p>
          </div>
        )}
      </section>

      <style>{`
        @media (max-width: 768px) {
          .products-grid {
            grid-template-columns: repeat(2, 1fr) !important;
          }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .products-grid {
            grid-template-columns: repeat(3, 1fr) !important;
          }
        }
      `}</style>
    </div>
  );
}
