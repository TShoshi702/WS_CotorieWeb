import { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import { products } from '../data/products';
import type { Language } from '../types';

interface ProductDetailPageProps {
  productId: string;
  onBack: () => void;
}

export default function ProductDetailPage({ productId, onBack }: ProductDetailPageProps) {
  const { language } = useLanguage();
  const { addToCart } = useCart();
  const [selectedColor, setSelectedColor] = useState<string>('');
  const [selectedSize, setSelectedSize] = useState<string>('');
  const [expandedSection, setExpandedSection] = useState<string | null>(null);
  const [addedToCart, setAddedToCart] = useState(false);
  const recommendScrollRef = useRef<HTMLDivElement>(null);
  const imagesContainerRef = useRef<HTMLDivElement>(null);

  const product = products.find(p => p.id === productId);
  
  const recommendedProducts = product 
    ? products.filter(p => p.collection === product.collection && p.id !== product.id).slice(0, 6)
    : [];

  useEffect(() => {
    if (product) {
      setSelectedColor(product.colors[0]);
      setSelectedSize(product.sizes[0]);
    }
  }, [product]);

  useEffect(() => {
    setAddedToCart(false);
  }, [productId]);

  // 滚动穿透效果：当左侧图片区滚动到顶部或底部时，将滚轮事件传递给页面
  useEffect(() => {
    const container = imagesContainerRef.current;
    if (!container) return;

    const handleWheel = (e: WheelEvent) => {
      const scrollTop = container.scrollTop;
      const scrollHeight = container.scrollHeight;
      const clientHeight = container.clientHeight;
      const isAtTop = scrollTop <= 0;
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 1;
      
      // 判断滚动方向
      const isScrollingDown = e.deltaY > 0;
      const isScrollingUp = e.deltaY < 0;
      
      // 如果在顶部向上滚动，或在底部向下滚动，则让事件穿透到父容器
      if ((isAtTop && isScrollingUp) || (isAtBottom && isScrollingDown)) {
        e.preventDefault();
        e.stopPropagation();
        
        // 将滚动传递给页面
        window.scrollBy({
          top: e.deltaY,
          behavior: 'auto',
        });
      }
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    
    return () => {
      container.removeEventListener('wheel', handleWheel);
    };
  }, []);

  if (!product) {
    return (
      <div style={{
        minHeight: '100vh',
        paddingTop: '64px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#fafafa',
      }}>
        <p style={{
          fontSize: '13px',
          letterSpacing: '2px',
          color: '#666',
        }}>
          {language === 'zh' ? '商品未找到' : language === 'ja' ? '商品が見つかりません' : 'Product not found'}
        </p>
      </div>
    );
  }

  function getName(): string {
    if (!product) return '';
    if (language === 'zh') return product.name;
    if (language === 'ja') return product.nameJa;
    return product.nameEn;
  }

  function getDescription(): string {
    if (!product) return '';
    if (language === 'zh') return product.description;
    if (language === 'ja') return product.descriptionJa;
    return product.descriptionEn;
  }

  function getLabel(key: string): string {
    const labels: Record<string, Record<Language, string>> = {
      price: { zh: '价格', ja: '価格', en: 'Price' },
      color: { zh: '颜色', ja: 'カラー', en: 'Color' },
      size: { zh: '尺码', ja: 'サイズ', en: 'Size' },
      quantity: { zh: '数量', ja: '数量', en: 'Quantity' },
      addToCart: { zh: '加入购物车', ja: 'カートに追加', en: 'Add to Cart' },
      added: { zh: '已添加', ja: '追加済み', en: 'Added' },
      details: { zh: '产品详情', ja: '商品詳細', en: 'Details' },
      care: { zh: '材质与护理', ja: '素材とお手入れ', en: 'Material & Care' },
      shipping: { zh: '配送信息', ja: '配送情報', en: 'Shipping' },
      back: { zh: '返回', ja: '戻る', en: 'Back' },
      youMayLike: { zh: '您可能也喜欢', ja: 'あなたへのおすすめ', en: 'You May Also Like' },
    };
    return labels[key]?.[language] || key;
  }

  function toggleSection(section: string) {
    setExpandedSection(expandedSection === section ? null : section);
  }

  function handleAddToCart() {
    if (product) {
      addToCart(product, 1, selectedColor, selectedSize);
    }
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  }

  function scrollRecommendations(direction: 'left' | 'right') {
    if (recommendScrollRef.current) {
      const scrollAmount = 300;
      recommendScrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth',
      });
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      paddingTop: '64px',
      backgroundColor: '#faf6f2',
    }}>
      <button
        onClick={onBack}
        className="mobile-only"
        style={{
          display: 'none',
          position: 'fixed',
          top: '72px',
          left: '16px',
          zIndex: 100,
          background: 'rgba(250, 246, 242, 0.95)',
          border: 'none',
          padding: '8px 12px',
          borderRadius: '4px',
          cursor: 'pointer',
          fontSize: '12px',
          letterSpacing: '1px',
          backdropFilter: 'blur(8px)',
        }}
      >
        ← {getLabel('back')}
      </button>

      {addedToCart && (
        <div style={{
          position: 'fixed',
          top: '80px',
          left: '50%',
          transform: 'translateX(-50%)',
          backgroundColor: '#1a1a1a',
          color: '#fff',
          padding: '12px 32px',
          fontSize: '12px',
          letterSpacing: '2px',
          textTransform: 'uppercase',
          zIndex: 1500,
          animation: 'fadeInOut 2s ease-in-out',
        }}>
          {getLabel('added')}
        </div>
      )}

      {/* 50/50 Layout: Left images, right product info with white background */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr',
        gap: '0',
        width: '100%',
      }} className="desktop-layout">
        
        {/* Left - Images with Vertical Stack (scrollable) - 50% viewport width */}
        <div 
          ref={imagesContainerRef}
          className="product-images-container" 
          style={{
            width: '50vw',
            position: 'sticky',
            top: '64px',
            height: 'calc(100vh - 64px)',
            overflowY: 'auto',
            backgroundColor: '#ffffff',
          }}
        >
          <div style={{
            display: 'flex',
            flexDirection: 'column',
          }}>
            {product.images.map((img, idx) => (
              <div
                key={idx}
                style={{
                  width: '100%',
                  aspectRatio: '0.75',
                  backgroundColor: '#f8f8f8',
                  overflow: 'hidden',
                }}
              >
                <img
                  src={img}
                  alt={`${getName()} ${idx + 1}`}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                  }}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Right - Product Info with White Background - 50% viewport width */}
        <div style={{
          backgroundColor: '#ffffff',
          padding: '80px 4vw',
          minHeight: 'calc(100vh - 64px)',
        }}>
          {/* Content Container - Centered within white area, but content is left-aligned */}
          <div style={{
            maxWidth: '480px',
            margin: '0 auto',
          }}>
            <h1 style={{
              fontSize: '20px',
              fontWeight: 400,
              letterSpacing: '3px',
              textTransform: 'uppercase',
              marginBottom: '24px',
              color: '#000000',
              textAlign: 'left',
            }}>
              {getName()}
            </h1>

            <div style={{
              fontSize: '16px',
              fontWeight: 300,
              letterSpacing: '2px',
              color: '#000000',
              marginBottom: '32px',
              textAlign: 'left',
            }}>
              ¥{product.price.toLocaleString()}
            </div>

            <p style={{
              fontSize: '13px',
              lineHeight: 2,
              letterSpacing: '0.5px',
              color: '#666666',
              marginBottom: '40px',
              textAlign: 'left',
            }}>
              {getDescription()}
            </p>

            <div style={{ marginBottom: '24px' }}>
              <div style={{
                fontSize: '11px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '12px',
                color: '#000000',
              }}>
                {getLabel('color')}
              </div>
              <div style={{
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap',
              }}>
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    style={{
                      padding: '8px 16px',
                      border: selectedColor === color ? '1px solid #000' : '1px solid #e0e0e0',
                      backgroundColor: selectedColor === color ? '#000' : '#fff',
                      color: selectedColor === color ? '#fff' : '#000',
                      fontSize: '11px',
                      letterSpacing: '1px',
                      cursor: 'pointer',
                      transition: 'all 0.3s',
                      minWidth: '60px',
                    }}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <div style={{
                fontSize: '11px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                marginBottom: '12px',
                color: '#000000',
              }}>
                {getLabel('size')}
              </div>
              <div style={{
                display: 'flex',
                gap: '8px',
                flexWrap: 'wrap',
              }}>
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    style={{
                      width: '48px',
                      height: '48px',
                      border: selectedSize === size ? '1px solid #000' : '1px solid #e0e0e0',
                      backgroundColor: selectedSize === size ? '#000' : '#fff',
                      color: selectedSize === size ? '#fff' : '#000',
                      fontSize: '12px',
                      letterSpacing: '1px',
                      cursor: 'pointer',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      transition: 'all 0.3s',
                    }}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <button
              onClick={handleAddToCart}
              style={{
                width: '100%',
                padding: '16px',
                backgroundColor: addedToCart ? '#333' : '#000000',
                color: '#ffffff',
                border: 'none',
                fontSize: '12px',
                letterSpacing: '2px',
                textTransform: 'uppercase',
                cursor: 'pointer',
                transition: 'background-color 0.3s',
                marginBottom: '16px',
              }}
              onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#333'}
              onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#000'}
            >
              {addedToCart ? getLabel('added') : getLabel('addToCart')}
            </button>

            <p style={{
              fontSize: '11px',
              color: '#666',
              textAlign: 'left',
              letterSpacing: '0.5px',
            }}>
              {language === 'zh' ? '免费配送 · 30 天退换货' : language === 'ja' ? '送料無料・30 日間返品可能' : 'Free shipping · 30-day returns'}
            </p>

            <div style={{ marginTop: '40px', borderTop: '1px solid #e0e0e0' }}>
              {['details', 'care', 'shipping'].map((section) => (
                <div key={section} style={{ borderBottom: '1px solid #e0e0e0' }}>
                  <button
                    onClick={() => toggleSection(section)}
                    style={{
                      width: '100%',
                      padding: '16px 0',
                      background: 'none',
                      border: 'none',
                      display: 'flex',
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      cursor: 'pointer',
                    }}
                  >
                    <span style={{
                      fontSize: '11px',
                      letterSpacing: '2px',
                      textTransform: 'uppercase',
                      color: '#000000',
                    }}>
                      {getLabel(section)}
                    </span>
                    {expandedSection === section ? (
                      <ChevronUp size={16} />
                    ) : (
                      <ChevronDown size={16} />
                    )}
                  </button>
                  {expandedSection === section && (
                    <div style={{
                      paddingBottom: '16px',
                      fontSize: '12px',
                      lineHeight: 1.8,
                      color: '#666',
                      letterSpacing: '0.5px',
                    }}>
                      {section === 'details' && getDescription()}
                      {section === 'care' && (language === 'zh' ? '轻柔手洗，悬挂晾干。避免阳光直射。' : language === 'ja' ? '優しく手洗いし、吊り干ししてください。直射日光を避けてください。' : 'Hand wash gently. Hang to dry. Avoid direct sunlight.')}
                      {section === 'shipping' && (language === 'zh' ? '中国大陆地区满¥500 免运费。2-5 个工作日送达。' : language === 'ja' ? '中国本土は¥500 以上で送料無料。2-5 営業日でお届けします。' : 'Free shipping over ¥500 in mainland China. Delivery in 2-5 business days.')}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Products Section - Full Width at Bottom */}
      {recommendedProducts.length > 0 && (
        <div style={{
          backgroundColor: '#ffffff',
          borderTop: '1px solid #e0e0e0',
          padding: '64px 4vw',
        }}>
          <h3 style={{
            fontSize: '14px',
            fontWeight: 400,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            marginBottom: '40px',
            color: '#000000',
          }}>
            {getLabel('youMayLike')}
          </h3>
          
          <div style={{
            position: 'relative',
          }}>
            <button
              onClick={() => scrollRecommendations('left')}
              style={{
                position: 'absolute',
                left: '2vw',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10,
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: '#fff',
                border: '1px solid #e0e0e0',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              }}
            >
              <ChevronLeft size={20} />
            </button>

            <div
              ref={recommendScrollRef}
              style={{
                display: 'flex',
                gap: '32px',
                overflowX: 'auto',
                scrollBehavior: 'smooth',
                scrollbarWidth: 'none',
                msOverflowStyle: 'none',
                paddingLeft: '60px',
                paddingRight: '60px',
              }}
            >
              {recommendedProducts.map((recProduct) => (
                <div
                  key={recProduct.id}
                  onClick={() => {
                    window.history.pushState({}, '', `/product/${recProduct.id}`);
                    window.dispatchEvent(new PopStateEvent('popstate'));
                  }}
                  style={{
                    flexShrink: 0,
                    width: '360px',
                    cursor: 'pointer',
                  }}
                >
                  <div style={{
                    width: '100%',
                    aspectRatio: '3/4',
                    backgroundColor: '#f8f8f8',
                    overflow: 'hidden',
                    marginBottom: '20px',
                  }}>
                    <img
                      src={recProduct.images[0]}
                      alt={language === 'zh' ? recProduct.name : language === 'ja' ? recProduct.nameJa : recProduct.nameEn}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </div>
                  <p style={{
                    fontSize: '14px',
                    letterSpacing: '1.5px',
                    color: '#000',
                    marginBottom: '10px',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                    whiteSpace: 'nowrap',
                  }}>
                    {language === 'zh' ? recProduct.name : language === 'ja' ? recProduct.nameJa : recProduct.nameEn}
                  </p>
                  <p style={{
                    fontSize: '14px',
                    fontWeight: 300,
                    color: '#666',
                  }}>
                    ¥{recProduct.price.toLocaleString()}
                  </p>
                </div>
              ))}
            </div>

            <button
              onClick={() => scrollRecommendations('right')}
              style={{
                position: 'absolute',
                right: '2vw',
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 10,
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                backgroundColor: '#fff',
                border: '1px solid #e0e0e0',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 2px 8px rgba(0,0,0,0.1)',
              }}
            >
              <ChevronRight size={20} />
            </button>
          </div>
        </div>
      )}

      <style>{`
        /* Hide scrollbar for left images container - Prada style */
        .product-images-container::-webkit-scrollbar {
          display: none;
        }
        .product-images-container {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        
        @media (min-width: 1280px) {
          .desktop-layout {
            grid-template-columns: 1fr 1fr !important;
          }
          .mobile-only {
            display: none !important;
          }
        }
        @media (max-width: 1279px) {
          .desktop-layout {
            grid-template-columns: 1fr !important;
          }
          .mobile-only {
            display: block !important;
          }
        }
        @keyframes fadeInOut {
          0% { opacity: 0; transform: translateX(-50%) translateY(-10px); }
          10% { opacity: 1; transform: translateX(-50%) translateY(0); }
          90% { opacity: 1; transform: translateX(-50%) translateY(0); }
          100% { opacity: 0; transform: translateX(-50%) translateY(-10px); }
        }
      `}</style>
    </div>
  );
}
