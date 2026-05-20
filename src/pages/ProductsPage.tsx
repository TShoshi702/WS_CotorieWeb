import { useAllProducts, useProductsByCollection } from '../hooks/useWooCommerceProducts';
import ProductCard from '../components/ProductCard';
import { useLanguage } from '../context/LanguageContext';

interface ProductsPageProps {
  collection?: 'oriental' | 'modern' | '';
  onProductClick: (productId: string) => void;
}

export default function ProductsPage({ collection = '', onProductClick }: ProductsPageProps) {
  const { language } = useLanguage();

  // Shopify 实时数据
  const allHook = useAllProducts(50);
  const collectionHook = useProductsByCollection(collection, 50);

  const { products, loading, error } = collection
    ? { products: collectionHook.products, loading: collectionHook.loading, error: collectionHook.error }
    : { products: allHook.products, loading: allHook.loading, error: allHook.error };

  const filteredProducts = products; // 通过 API 已经筛选好了

  const pageTitle =
    collection === 'oriental'
      ? language === 'zh' ? '东洋风系列' : language === 'ja' ? '東洋風シリーズ' : 'Oriental Collection'
      : collection === 'modern'
      ? language === 'zh' ? '现代系列' : language === 'ja' ? 'モダンシリーズ' : 'Modern Collection'
      : language === 'zh' ? '全部系列' : language === 'ja' ? 'すべてのコレクション' : 'All Collections';

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
          top: 0, left: 0, right: 0, bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.3)',
        }} />
        <div style={{ position: 'relative', zIndex: 1, textAlign: 'center', color: '#ffffff' }}>
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

      {/* Status States */}
      <section style={{ padding: '100px 0', backgroundColor: '#ffffff', width: '100%' }}>
        {loading && (
          <div style={{ textAlign: 'center', padding: '160px 0' }}>
            <p style={{ fontSize: '13px', color: '#999', letterSpacing: '2px', fontWeight: 300 }}>
              {language === 'zh' ? '加载中...' : language === 'ja' ? '読み込み中...' : 'Loading...'}
            </p>
          </div>
        )}

        {!loading && error && (
          <div style={{ textAlign: 'center', padding: '160px 0' }}>
            <p style={{ fontSize: '13px', color: '#c0392b', letterSpacing: '2px', fontWeight: 300 }}>
              {language === 'zh' ? `错误: ${error}` : language === 'ja' ? `エラー: ${error}` : `Error: ${error}`}
            </p>
          </div>
        )}

        {!loading && !error && filteredProducts.length === 0 && (
          <div style={{ textAlign: 'center', padding: '160px 0' }}>
            <p style={{ fontSize: '13px', color: '#999', opacity: '0.8', letterSpacing: '2px', fontWeight: 300 }}>
              {language === 'zh' ? '暂无商品' : language === 'ja' ? '商品がありません' : 'No products available'}
            </p>
          </div>
        )}

        {!loading && !error && filteredProducts.length > 0 && (
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
        )}
      </section>

      <style>{`
        @media (max-width: 768px) {
          .products-grid { grid-template-columns: repeat(2, 1fr) !important; }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .products-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}