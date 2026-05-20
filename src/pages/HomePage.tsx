import Hero from '../components/Hero';
import { useRef, useEffect } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { useAllProducts } from '../hooks/useWooCommerceProducts';
import { translations } from '../data/translations';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface HomePageProps {
  onNavigate: (page: string) => void;
  onProductClick: (productId: string) => void;
}

export default function HomePage({ onNavigate, onProductClick }: HomePageProps) {
  const { language } = useLanguage();
  const modelScrollRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  // Shopify 实时数据
  const { products, loading } = useAllProducts(50);
  // 精选商品：有 isNew 标签的优先，否则取前 4 个
  const featuredProducts =
    products.filter((p) => p.isNew).slice(0, 4).length > 0
      ? products.filter((p) => p.isNew).slice(0, 4)
      : products.slice(0, 4);

  // 自定义平滑滚动吸附逻辑
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let isAnimating = false;
    let lastScrollTop = container.scrollTop;
    let scrollTimeout: NodeJS.Timeout | null = null;

    const easeOutCubic = (t: number): number => {
      return 1 - Math.pow(1 - t, 3);
    };

    const smoothScrollTo = (targetY: number, duration: number = 800) => {
      const startY = container.scrollTop;
      const distance = targetY - startY;
      if (distance === 0) return;

      const startTime = performance.now();

      const animate = (currentTime: number) => {
        const elapsed = currentTime - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const easedProgress = easeOutCubic(progress);
        container.scrollTop = startY + distance * easedProgress;

        if (progress < 1) {
          requestAnimationFrame(animate);
        } else {
          isAnimating = false;
        }
      };

      isAnimating = true;
      requestAnimationFrame(animate);
    };

    const handleScroll = () => {
      if (isAnimating) return;

      const sections = Array.from(container.querySelectorAll('section, .products'));
      const viewportHeight = container.clientHeight;
      const scrollTop = container.scrollTop;
      const scrollDirection = scrollTop - lastScrollTop;
      lastScrollTop = scrollTop;

      if (scrollTimeout) clearTimeout(scrollTimeout);

      scrollTimeout = setTimeout(() => {
        if (isAnimating) return;

        let closestSection: Element | null = null;
        let minDistance = Infinity;

        sections.forEach((section) => {
          const sectionTop = (section as HTMLElement).offsetTop;
          const distance = Math.abs(sectionTop - scrollTop);

          if (distance < viewportHeight * 0.4 && distance < minDistance) {
            minDistance = distance;
            closestSection = section;
          }
        });

        if (closestSection && minDistance > 0 && minDistance < viewportHeight * 0.15) {
          const targetY = (closestSection as HTMLElement).offsetTop;
          const duration = Math.min(800 + minDistance * 0.5, 1200);
          smoothScrollTo(targetY, duration);
        }
      }, 100);
    };

    container.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      container.removeEventListener('scroll', handleScroll);
      if (scrollTimeout) clearTimeout(scrollTimeout);
    };
  }, []);

  const modelImages = [
    'https://images.unsplash.com/photo-1596483758379-9d2a3f4e4b6c?w=800',
    'https://images.unsplash.com/photo-1595981267035-7b14ead294f5?w=800',
    'https://images.unsplash.com/photo-1582298538104-fe2e74c2ed57?w=800',
    'https://images.unsplash.com/photo-1574668446843-ae7c0f6db0ab?w=800',
    'https://images.unsplash.com/photo-1563178406-4cdc2923acbc?w=800',
    'https://images.unsplash.com/photo-1596483758379-9d2a3f4e4b6c?w=800',
  ];

  function getModelShowcaseTitle(): string {
    if (language === 'zh') return '品牌模特展示';
    if (language === 'ja') return 'ブランドモデルショーケース';
    return 'Brand Model Showcase';
  }

  function getFeaturedTitle(): string {
    if (language === 'zh') return '精选系列';
    if (language === 'ja') return '厳選コレクション';
    return 'Featured Collection';
  }

  function getCat1Title() {
    return translations[language].cat1.title;
  }

  function getCat1Desc() {
    return translations[language].cat1.desc;
  }

  function getCat1Link() {
    return translations[language].cat1.link;
  }

  function getCat2Title() {
    return translations[language].cat2.title;
  }

  function getCat2Desc() {
    return translations[language].cat2.desc;
  }

  function getCat2Link() {
    return translations[language].cat2.link;
  }

  function getProductsSectionTitle() {
    return translations[language].productsSection.title[language];
  }

  function getProductsSectionSubtitle() {
    return translations[language].productsSection.subtitle[language];
  }

  function scrollModels(direction: 'left' | 'right') {
    if (modelScrollRef.current) {
      const scrollAmount = 400;
      modelScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  }

  return (
    <div className="home-scroll-container" ref={containerRef} style={{ backgroundColor: '#faf6f2' }}>
      {/* Hero Section */}
      <Hero onCtaClick={() => onNavigate('products')} />

      {/* sec-light */}
      <section className="sec-light">
        <div className="cat-row reverse">
          <div className="cat-img">
            <div className="bg" style={{ background: 'linear-gradient(150deg,#f0e8e0,#faf3ec,#f8ede5)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
              <div style={{ fontSize: 'clamp(40px,5vw,90px)', fontStyle: 'italic', opacity: 0.04, color: '#c49a8c', letterSpacing: '8px', textTransform: 'lowercase' }}>cotorie</div>
              <div style={{ fontSize: '12px', opacity: 0.1, color: '#3d2e2a', letterSpacing: '4px', marginTop: '16px' }}>SLEEPWEAR</div>
            </div>
          </div>
          <div className="cat-text">
            <div style={{ fontSize: '10px', letterSpacing: '3px', opacity: 0.35, marginBottom: '10px' }}>COTORIE</div>
            <h2 dangerouslySetInnerHTML={{ __html: getCat2Title() }} />
            <p>{getCat2Desc()}</p>
            <a href="/modern" className="cat-link">{getCat2Link()}</a>
          </div>
        </div>
      </section>

      {/* sec-dark */}
      <section className="sec-dark">
        <div className="cat-row">
          <div className="cat-img">
            <div className="bg" style={{ background: 'linear-gradient(150deg,#180010,#0a0007,#050008)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
              <div style={{ fontSize: 'clamp(40px,5vw,90px)', fontStyle: 'italic', opacity: 0.06, letterSpacing: '8px', color: '#fff', textTransform: 'lowercase' }}>cotorie</div>
              <div style={{ fontSize: '12px', opacity: 0.12, color: '#fff', letterSpacing: '4px', marginTop: '16px' }}>LINGERIE</div>
            </div>
          </div>
          <div className="cat-text">
            <div style={{ fontSize: '10px', letterSpacing: '3px', opacity: 0.35, marginBottom: '10px' }}>COTORIE</div>
            <h2 dangerouslySetInnerHTML={{ __html: getCat1Title() }} />
            <p>{getCat1Desc()}</p>
            <a href="/oriental" className="cat-link">{getCat1Link()}</a>
          </div>
        </div>
      </section>

      {/* New Products Section */}
      <section className="products" id="products">
        <div className="products-header">
          <div data-i18n="products.tag" style={{ fontSize: '10px', letterSpacing: '4px', opacity: '0.35', marginBottom: '6px' }}>COTORIE COLLECTION</div>
          <h2 data-i18n="products.title">{getProductsSectionTitle()}</h2>
          <p data-i18n="products.subtitle">{getProductsSectionSubtitle()}</p>
        </div>

        {loading && !featuredProducts.length && (
          <div style={{ textAlign: 'center', padding: '80px 0' }}>
            <p style={{ fontSize: '13px', color: '#999', letterSpacing: '2px', fontWeight: 300 }}>
              {language === 'zh' ? '加载中...' : language === 'ja' ? '読み込み中...' : 'Loading...'}
            </p>
          </div>
        )}

        <div className="products-grid">
          {featuredProducts.map((product) => (
            <a
              key={product.id}
              href="/product-detail"
              onClick={(e) => {
                e.preventDefault();
                onProductClick(product.id);
              }}
              className="product-card"
            >
              <div className="pg">
                <div className="mark">cotorie</div>
                <div className="code">{product.collection.toUpperCase()} {product.id.length > 4 ? '…' + product.id.slice(-4) : product.id}</div>
              </div>
              <div className="product-info">
                <h3>{language === 'zh' ? product.name : language === 'ja' ? product.nameJa : product.nameEn}</h3>
                <span>
                  ¥{product.price.toLocaleString()}
                  {product.isNew ? (language === 'zh' ? ' 2025 春夏新品' : language === 'ja' ? ' 2025 春夏新作' : ' Spring/Summer 2025 New') : (language === 'zh' ? '限定系列' : language === 'ja' ? '限定シリーズ' : 'Limited Collection')}
                </span>
              </div>
            </a>
          ))}
        </div>
      </section>

      {/* Brand Model Showcase */}
      <section style={{ padding: '96px 0', backgroundColor: '#111111', overflow: 'hidden' }}>
        <h2 style={{
          fontSize: '24px', fontWeight: '300', fontStyle: 'italic',
          letterSpacing: '0.2em', textAlign: 'center', color: '#ffffff', marginBottom: '48px',
        }}>
          {getModelShowcaseTitle()}
        </h2>

        <div style={{ position: 'relative' }}>
          <button onClick={() => scrollModels('left')} style={{
            position: 'absolute', left: '2vw', top: '50%', transform: 'translateY(-50%)',
            zIndex: 10, width: '48px', height: '48px', borderRadius: '50%',
            backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.3)',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 12px rgba(0,0,0,0.3)', transition: 'all 0.3s',
          }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#ffffff'; e.currentTarget.style.borderColor = '#ffffff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#1a1a1a'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; }}
          >
            <ChevronLeft size={24} color="#ffffff" />
          </button>

          <div id="model-scroll" ref={modelScrollRef} style={{
            display: 'flex', gap: '24px', overflowX: 'auto', scrollBehavior: 'smooth',
            scrollbarWidth: 'none', msOverflowStyle: 'none', paddingLeft: '80px', paddingRight: '80px',
          }}>
            {modelImages.map((img, idx) => (
              <div key={idx} style={{
                flexShrink: 0, width: '320px', height: '480px',
                overflow: 'hidden', borderRadius: '2px',
              }}>
                <img src={img} alt={`Model ${idx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
            ))}
          </div>

          <button onClick={() => scrollModels('right')} style={{
            position: 'absolute', right: '2vw', top: '50%', transform: 'translateY(-50%)',
            zIndex: 10, width: '48px', height: '48px', borderRadius: '50%',
            backgroundColor: '#1a1a1a', border: '1px solid rgba(255,255,255,0.3)',
            cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 2px 12px rgba(0,0,0,0.3)', transition: 'all 0.3s',
          }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#ffffff'; e.currentTarget.style.borderColor = '#ffffff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#1a1a1a'; e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)'; }}
          >
            <ChevronRight size={24} color="#ffffff" />
          </button>
        </div>
      </section>

      {/* Brand Story Teaser */}
      <section style={{ padding: '120px 24px', backgroundColor: '#000000', color: '#ffffff', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(28px, 5vw, 48px)', fontWeight: '300', fontStyle: 'italic',
            letterSpacing: '0.2em', marginBottom: '32px', color: '#ffffff',
          }}>
            ほっぺが赤くなる
          </h2>

          <p style={{
            fontSize: '13px', letterSpacing: '0.2em', lineHeight: '2.5',
            opacity: '0.8', marginBottom: '48px',
          }}>
            {language === 'zh'
              ? 'COTORIE 是一个日本情趣内衣品牌，致力于展现东方女性的独特魅力。我们的设计理念融合了传统日式美学与现代性感元素，每一件作品都如同少女脸颊上的红晕，纯净而诱人。'
              : language === 'ja'
              ? 'COTORIE は、東方女性の独自の魅力を表現することに尽力している日本のランジェリーブランドです。私たちのデザインコンセプトは、伝統的な日本の美学と現代的なセクシーさの要素を融合させ、すべての作品は乙女の頬の赤らみのように、純粋で魅力的です。'
              : 'COTORIE is a Japanese lingerie brand dedicated to showcasing the unique charm of Eastern women. Our design philosophy blends traditional Japanese aesthetics with modern sensual elements. Each piece is like the blush on a maiden\'s cheek—pure and alluring.'}
          </p>

          <button onClick={() => onNavigate('about')} style={{
            backgroundColor: '#ffffff', color: '#000000', padding: '18px 64px',
            fontSize: '11px', letterSpacing: '0.3em', textTransform: 'uppercase',
            border: 'none', cursor: 'pointer', transition: 'all 0.3s ease',
          }}
            onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = '#c49a8c'; e.currentTarget.style.color = '#ffffff'; }}
            onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = '#ffffff'; e.currentTarget.style.color = '#000000'; }}
          >
            {language === 'zh' ? '阅读品牌故事' : language === 'ja' ? 'ブランドストーリーを読む' : 'Read Brand Story'}
          </button>
        </div>
      </section>

      <style>{`
        #model-scroll::-webkit-scrollbar { display: none; }
        .home-scroll-container { height: 100vh; overflow-y: scroll; scroll-behavior: smooth; -webkit-scroll-snap-type: y proximity; scroll-snap-type: y proximity; }
        .home-scroll-container > section, .home-scroll-container > .products { -webkit-scroll-snap-align: start; scroll-snap-align: start; }
        .sec-dark { background: #000; color: #fff; }
        .sec-dark .cat-text { background: #000; text-align: left; align-items: flex-start; }
        .sec-dark .cat-link { color: #fff; border-bottom-color: #fff; align-self: flex-start; }
        .sec-light { background: #faf6f2; color: #3d2e2a; }
        .sec-light .cat-text { background: #faf6f2; text-align: right; align-items: flex-end; }
        .sec-light .cat-link { color: #3d2e2a; border-bottom-color: #3d2e2a; align-self: flex-end; }
        .cat-row { display: grid; grid-template-columns: 1fr 1fr; min-height: 100vh; }
        .cat-row.reverse { direction: rtl; }
        .cat-row.reverse > * { direction: ltr; }
        .cat-img { position: relative; overflow: hidden; display: flex; align-items: center; justify-content: center; }
        .cat-img .bg { width: 100%; height: 100%; transition: 0.6s; }
        .cat-img:hover .bg { transform: scale(1.03); }
        .cat-text { display: flex; flex-direction: column; justify-content: center; padding: 80px 60px; }
        .cat-text h2 { font-size: clamp(24px, 3vw, 42px); font-weight: 300; letter-spacing: 3px; margin-bottom: 18px; font-style: italic; }
        .cat-text p { font-size: 13px; line-height: 1.8; opacity: 0.55; margin-bottom: 28px; letter-spacing: 1px; }
        .cat-link { font-size: 10px; letter-spacing: 3px; text-transform: uppercase; border-bottom: 1px solid; display: inline-block; padding-bottom: 4px; transition: 0.3s; }
        .cat-link:hover { opacity: 0.5; }
        .products { padding: 100px 0; background: #fff; width: 100%; }
        .products-header { text-align: center; margin-bottom: 60px; color: #3d2e2a; }
        .products-grid { display: grid; grid-template-columns: repeat(4, 1fr); gap: 2px; width: 100vw; margin-left: calc(-50vw + 50%); margin-right: calc(-50vw + 50%); }
        .product-card { position: relative; overflow: hidden; background: #f5f0eb; aspect-ratio: 3/4; display: block; text-decoration: none; color: inherit; cursor: pointer; }
        .product-card .pg { width: 100%; height: 100%; transition: 0.5s; display: flex; align-items: center; justify-content: center; flex-direction: column; gap: 10px; }
        .product-card:hover .pg { transform: scale(1.04); }
        .product-card .pg .mark { font-size: clamp(16px, 2vw, 32px); font-style: italic; opacity: 0.06; color: #c49a8c; letter-spacing: 3px; }
        .product-card .pg .code { font-size: 10px; opacity: 0.08; color: #3d2e2a; letter-spacing: 2px; }
        .product-info { position: absolute; bottom: 0; left: 0; width: 100%; padding: 28px 24px; background: linear-gradient(transparent, rgba(255,255,255,0.9)); color: #3d2e2a; }
        .product-info h3 { font-size: 13px; letter-spacing: 2px; margin-bottom: 4px; font-weight: 400; }
        .product-info span { font-size: 11px; opacity: 0.5; letter-spacing: 1px; }
        @media (max-width: 768px) {
          .products-grid { grid-template-columns: repeat(2, 1fr) !important; }
          .cat-row { grid-template-columns: 1fr !important; }
          .cat-row.reverse { direction: ltr; }
        }
        @media (min-width: 769px) and (max-width: 1024px) {
          .products-grid { grid-template-columns: repeat(3, 1fr) !important; }
        }
      `}</style>
    </div>
  );
}