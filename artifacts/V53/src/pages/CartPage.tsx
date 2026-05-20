import { X, Plus, Minus, Trash2 } from 'lucide-react';
import { useCart } from '../context/CartContext';
import { useLanguage } from '../context/LanguageContext';
import type { Language } from '../types';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  onProductClick: (productId: string) => void;
}

export default function CartDrawer({ isOpen, onClose, onProductClick }: CartDrawerProps) {
  const { items, updateQuantity, removeItem, getTotal, getItemCount } = useCart();
  const { language } = useLanguage();

  function getLabel(key: string): string {
    const labels: Record<string, Record<Language, string>> = {
      title: { zh: '购物袋', ja: 'ショッピングバッグ', en: 'Shopping Bag' },
      items: { zh: '件', ja: '点', en: 'items' },
      empty: { zh: '您的购物袋是空的', ja: 'ショッピングバッグは空です', en: 'Your shopping bag is empty' },
      continueShopping: { zh: '继续购物', ja: 'お買い物を続ける', en: 'Continue Shopping' },
      color: { zh: '颜色', ja: 'カラー', en: 'Color' },
      size: { zh: '尺码', ja: 'サイズ', en: 'Size' },
      subtotal: { zh: '小计', ja: '小計', en: 'Subtotal' },
      shippingNote: { zh: '运费和税费将在结账时计算', ja: '送料と税金はチェックアウト時に計算されます', en: 'Shipping and taxes calculated at checkout' },
      checkout: { zh: '结账', ja: 'チェックアウト', en: 'Checkout' },
    };
    return labels[key]?.[language] || key;
  }

  function getProductName(product: any): string {
    if (language === 'zh') return product.name;
    if (language === 'ja') return product.nameJa;
    return product.nameEn;
  }

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        onClick={onClose}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0,0,0,0.5)',
          zIndex: 2000,
        }}
      />

      {/* Drawer */}
      <div className="slide-in-right" style={{
        position: 'fixed',
        top: 0,
        right: 0,
        bottom: 0,
        width: '100%',
        maxWidth: '480px',
        backgroundColor: '#faf6f2',
        zIndex: 2001,
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Header */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '24px',
          borderBottom: '1px solid rgba(61, 46, 42, 0.2)',
        }}>
          <h2 style={{
            fontSize: '18px',
            fontWeight: '300',
            fontStyle: 'italic',
            letterSpacing: '0.2em',
            color: '#3d2e2a',
          }}>
            {getLabel('title')}
            {getItemCount() > 0 && (
              <span style={{
                fontSize: '12px',
                fontWeight: '400',
                fontStyle: 'normal',
                marginLeft: '12px',
                opacity: '0.6',
              }}>
                ({getItemCount()} {getLabel('items')})
              </span>
            )}
          </h2>
          
          <button
            onClick={onClose}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#3d2e2a',
              padding: '8px',
            }}
          >
            <X size={24} />
          </button>
        </div>

        {/* Cart Items */}
        <div style={{
          flex: 1,
          overflowY: 'auto',
          padding: '24px',
        }}>
          {items.length === 0 ? (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              height: '100%',
              textAlign: 'center',
            }}>
              <p style={{
                fontSize: '13px',
                color: '#3d2e2a',
                opacity: '0.6',
                letterSpacing: '2px',
                marginBottom: '32px',
              }}>
                {getLabel('empty')}
              </p>
              <button
                onClick={onClose}
                style={{
                  backgroundColor: '#3d2e2a',
                  color: '#ffffff',
                  padding: '16px 48px',
                  fontSize: '11px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  border: 'none',
                  cursor: 'pointer',
                }}
              >
                {getLabel('continueShopping')}
              </button>
            </div>
          ) : (
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '24px',
            }}>
              {items.map((item) => (
                <div
                  key={`${item.product.id}-${item.selectedColor}-${item.selectedSize}`}
                  style={{
                    display: 'flex',
                    gap: '20px',
                    paddingBottom: '24px',
                    borderBottom: '1px solid rgba(61, 46, 42, 0.1)',
                  }}
                >
                  {/* Product Image */}
                  <div
                    onClick={() => {
                      onClose();
                      onProductClick(item.product.id);
                    }}
                    style={{
                      width: '100px',
                      height: '133px',
                      flexShrink: 0,
                      cursor: 'pointer',
                      overflow: 'hidden',
                    }}
                  >
                    <img
                      src={item.product.images[0]}
                      alt={getProductName(item.product)}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                      }}
                    />
                  </div>

                  {/* Product Info */}
                  <div style={{
                    flex: 1,
                    display: 'flex',
                    flexDirection: 'column',
                  }}>
                    <h3
                      onClick={() => {
                        onClose();
                        onProductClick(item.product.id);
                      }}
                      style={{
                        fontSize: '13px',
                        fontWeight: '400',
                        letterSpacing: '1px',
                        color: '#3d2e2a',
                        marginBottom: '8px',
                        cursor: 'pointer',
                        fontStyle: 'italic',
                      }}
                    >
                      {getProductName(item.product)}
                    </h3>

                    <p style={{
                      fontSize: '12px',
                      color: '#3d2e2a',
                      opacity: '0.7',
                      marginBottom: '12px',
                    }}>
                      ¥{item.product.price.toLocaleString()}
                    </p>

                    <p style={{
                      fontSize: '11px',
                      color: '#3d2e2a',
                      opacity: '0.6',
                      marginBottom: '4px',
                    }}>
                      {getLabel('color')}: {item.selectedColor}
                    </p>

                    <p style={{
                      fontSize: '11px',
                      color: '#3d2e2a',
                      opacity: '0.6',
                      marginBottom: '16px',
                    }}>
                      {getLabel('size')}: {item.selectedSize}
                    </p>

                    {/* Quantity Controls */}
                    <div style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '12px',
                      marginTop: 'auto',
                    }}>
                      <button
                        onClick={() => updateQuantity(item.product.id, item.selectedColor, item.selectedSize, Math.max(0, item.quantity - 1))}
                        style={{
                          width: '32px',
                          height: '32px',
                          border: '1px solid rgba(61, 46, 42, 0.3)',
                          background: 'none',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Minus size={14} />
                      </button>

                      <span style={{
                        fontSize: '13px',
                        color: '#3d2e2a',
                        minWidth: '32px',
                        textAlign: 'center',
                      }}>
                        {item.quantity}
                      </span>

                      <button
                        onClick={() => updateQuantity(item.product.id, item.selectedColor, item.selectedSize, item.quantity + 1)}
                        style={{
                          width: '32px',
                          height: '32px',
                          border: '1px solid rgba(61, 46, 42, 0.3)',
                          background: 'none',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                        }}
                      >
                        <Plus size={14} />
                      </button>

                      <button
                        onClick={() => removeItem(item.product.id, item.selectedColor, item.selectedSize)}
                        style={{
                          marginLeft: 'auto',
                          background: 'none',
                          border: 'none',
                          cursor: 'pointer',
                          color: '#3d2e2a',
                          opacity: '0.5',
                          padding: '8px',
                        }}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer - Subtotal & Checkout */}
        {items.length > 0 && (
          <div style={{
            borderTop: '1px solid rgba(61, 46, 42, 0.2)',
            padding: '24px',
            backgroundColor: '#ffffff',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '24px',
            }}>
              <span style={{
                fontSize: '12px',
                letterSpacing: '1px',
                color: '#3d2e2a',
              }}>
                {getLabel('subtotal')}
              </span>
              <span style={{
                fontSize: '18px',
                fontWeight: '400',
                color: '#3d2e2a',
                letterSpacing: '1px',
              }}>
                ¥{getTotal().toLocaleString()}
              </span>
            </div>

            <p style={{
              fontSize: '11px',
              color: '#3d2e2a',
              opacity: '0.6',
              marginBottom: '24px',
              textAlign: 'center',
            }}>
              {getLabel('shippingNote')}
            </p>

            <button
              style={{
                width: '100%',
                backgroundColor: '#3d2e2a',
                color: '#ffffff',
                padding: '20px',
                fontSize: '11px',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = '#000000';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = '#3d2e2a';
              }}
            >
              {getLabel('checkout')}
            </button>
          </div>
        )}
      </div>
    </>
  );
}
