import { useState } from 'react';
import { ShoppingBag, Menu, X } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useCart } from '../context/CartContext';
import type { Language } from '../types';

interface HeaderProps {
  onOpenCart: () => void;
  onNavigate: (page: string) => void;
}

export default function Header({ onOpenCart, onNavigate }: HeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const { language, setLanguage } = useLanguage();
  const { getTotalItems } = useCart();

  const navItems = [
    { key: 'oriental', label: getNavLabel('oriental'), page: 'products?collection=oriental' },
    { key: 'modern', label: getNavLabel('modern'), page: 'products?collection=modern' },
  ];

  function getNavLabel(key: string): string {
    const labels: Record<string, Record<Language, string>> = {
      oriental: { zh: '东洋风', ja: '東洋風', en: 'Oriental' },
      modern: { zh: '现代', ja: 'モダン', en: 'Modern' },
    };
    return labels[key]?.[language] || key;
  }

  function handleLanguageClick(newLang: Language) {
    setLanguage(newLang);
  }

  function toggleJaEn() {
    setLanguage(language === 'ja' ? 'en' : 'ja');
  }

  return (
    <>
      <header style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        backgroundColor: '#faf6f2',
        color: '#1a1a1a',
        zIndex: 1000,
        height: '64px',
        borderBottom: '1px solid #e8e8e8',
      }}>
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '100%',
          padding: '0 4vw',
        }}>
          {/* Left - Series Navigation & Hamburger */}
          <div style={{ 
            display: 'flex',
            alignItems: 'center',
            gap: '32px',
            minWidth: '160px',
          }}>
            <button 
              onClick={() => setMenuOpen(true)}
              style={{ 
                background: 'none', 
                border: 'none', 
                color: '#1a1a1a',
                cursor: 'pointer',
                padding: '8px',
              }}
              className="desktop-hide"
            >
              <Menu size={20} />
            </button>

            <nav style={{ 
              display: 'none',
              gap: '32px',
            }} className="desktop-show">
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => onNavigate(item.page)}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#1a1a1a',
                    fontSize: '12px',
                    letterSpacing: '1px',
                    cursor: 'pointer',
                    opacity: 0.7,
                    transition: 'opacity 0.3s',
                    textTransform: 'uppercase',
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                  onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}
                >
                  {item.label}
                </button>
              ))}
            </nav>
          </div>

          {/* Center - Logo (Absolutely Positioned) */}
          <div 
            onClick={() => onNavigate('home')}
            style={{
              position: 'absolute',
              left: '50%',
              transform: 'translateX(-50%)',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
            }}
          >
            <img 
              src="https://down.dingtalk.com/media/lQLPM4TGRt7r8z3NDmDNGQCwUhASmunwkjwJ2W9rCC7uAA_6400_3680.png" 
              alt="COTORIE"
              style={{
                height: '36px',
                width: 'auto',
              }}
            />
          </div>

          {/* Right - Language & Cart */}
          <div style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '24px',
            minWidth: '160px',
            justifyContent: 'flex-end',
          }}>
            {/* JA/EN Toggle */}
            <button
              onClick={toggleJaEn}
              style={{
                background: 'none',
                border: 'none',
                color: '#1a1a1a',
                fontSize: '12px',
                letterSpacing: '1px',
                cursor: 'pointer',
                opacity: 0.8,
                transition: 'opacity 0.3s',
                textTransform: 'uppercase',
                minWidth: '44px',
                textAlign: 'center',
                padding: '8px 0',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
              onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
              onMouseLeave={(e) => e.currentTarget.style.opacity = '0.7'}
            >
              {language === 'ja' ? '日本語' : 'EN'}
            </button>
            
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <button
                onClick={onOpenCart}
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#1a1a1a',
                  cursor: 'pointer',
                  padding: '8px',
                  opacity: 0.9,
                  transition: 'opacity 0.3s',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
                onMouseEnter={(e) => e.currentTarget.style.opacity = '1'}
                onMouseLeave={(e) => e.currentTarget.style.opacity = '0.8'}
              >
                <ShoppingBag size={20} />
              </button>
              {getTotalItems() > 0 && (
                <span style={{
                  position: 'absolute',
                  top: '0',
                  right: '0',
                  transform: 'translate(25%, -25%)',
                  backgroundColor: '#1a1a1a',
                  color: '#fff',
                  fontSize: '9px',
                  fontWeight: 500,
                  minWidth: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  lineHeight: '1',
                  zIndex: 10,
                }}>
                  {getTotalItems()}
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      {menuOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: 'rgba(26, 26, 26, 0.95)',
            zIndex: 1001,
          }}
          onClick={() => setMenuOpen(false)}
        >
          <div 
            className="slide-in-left"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              bottom: 0,
              width: '100%',
              maxWidth: '320px',
              backgroundColor: '#faf6f2',
              padding: '80px 32px 32px',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setMenuOpen(false)}
              style={{
                position: 'absolute',
                top: '24px',
                right: '24px',
                background: 'none',
                border: 'none',
                color: '#1a1a1a',
                cursor: 'pointer',
              }}
            >
              <X size={24} />
            </button>

            <nav style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
              {navItems.map((item) => (
                <button
                  key={item.key}
                  onClick={() => {
                    onNavigate(item.page);
                    setMenuOpen(false);
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#1a1a1a',
                    fontSize: '14px',
                    letterSpacing: '1px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    opacity: 0.8,
                    textTransform: 'uppercase',
                  }}
                >
                  {item.label}
                </button>
              ))}
              <hr style={{ borderColor: '#e8e8e8', margin: '16px 0' }} />
              <div style={{ fontSize: '12px', color: '#1a1a1a', opacity: 0.6, marginBottom: '12px' }}>
                Language
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <button
                  onClick={() => {
                    setLanguage('ja');
                    setMenuOpen(false);
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#1a1a1a',
                    fontSize: '14px',
                    letterSpacing: '1px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    opacity: language === 'ja' ? 1 : 0.6,
                    textTransform: 'uppercase',
                  }}
                >
                  日本語
                </button>
                <button
                  onClick={() => {
                    setLanguage('en');
                    setMenuOpen(false);
                  }}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: '#1a1a1a',
                    fontSize: '14px',
                    letterSpacing: '1px',
                    textAlign: 'left',
                    cursor: 'pointer',
                    opacity: language === 'en' ? 1 : 0.6,
                    textTransform: 'uppercase',
                  }}
                >
                  English
                </button>
              </div>
            </nav>
          </div>
        </div>
      )}

      <style>{`
        @keyframes slideInLeft {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .slide-in-left {
          animation: slideInLeft 0.3s ease-out;
        }
      `}</style>

      <style>{`
        @keyframes slideInLeft {
          from {
            transform: translateX(-100%);
          }
          to {
            transform: translateX(0);
          }
        }
        .slide-in-left {
          animation: slideInLeft 0.3s ease-out;
        }
        @media (min-width: 768px) {
          .desktop-hide {
            display: none !important;
          }
          .desktop-show {
            display: flex !important;
          }
        }
        @media (max-width: 767px) {
          .desktop-hide {
            display: block !important;
          }
          .desktop-show {
            display: none !important;
          }
        }
      `}</style>
    </>
  );
}
