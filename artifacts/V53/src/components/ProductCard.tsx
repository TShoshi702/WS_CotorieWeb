import type { Product } from '../types';

interface ProductCardProps {
  product: Product;
  onClick: () => void;
  language: 'zh' | 'ja' | 'en';
}

export default function ProductCard({ product, onClick, language }: ProductCardProps) {
  const isNew = product.isNew ?? false;
  
  return (
    <div
      onClick={onClick}
      style={{
        cursor: 'pointer',
        backgroundColor: '#f5f0eb',
        aspectRatio: '3/4',
        position: 'relative',
        overflow: 'hidden',
      }}
      className="product-card"
    >
      {/* Image Container with Watermark and Code */}
      <div style={{
        width: '100%',
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexDirection: 'column',
        gap: '10px',
        transition: 'transform 0.5s',
      }} className="pg">
        <div style={{
          fontSize: 'clamp(16px, 2vw, 32px)',
          fontStyle: 'italic',
          opacity: 0.06,
          color: '#c49a8c',
          letterSpacing: '3px',
        }} className="mark">
          cotorie
        </div>
        <div style={{
          fontSize: '10px',
          opacity: 0.08,
          color: '#3d2e2a',
          letterSpacing: '2px',
        }} className="code">
          {product.collection.toUpperCase()} {product.id.split('-')[1]}
        </div>
      </div>

      {/* Bottom Gradient Info Bar */}
      <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        width: '100%',
        padding: '28px 24px',
        background: 'linear-gradient(transparent, rgba(255,255,255,0.9))',
        color: '#3d2e2a',
      }} className="product-info">
        <h3 style={{
          fontSize: '13px',
          letterSpacing: '2px',
          marginBottom: '4px',
          fontWeight: 400,
        }}>
          {language === 'zh' ? product.name : language === 'ja' ? product.nameJa : product.nameEn}
        </h3>
        <span style={{
          fontSize: '11px',
          opacity: 0.5,
          letterSpacing: '1px',
        }}>
          {isNew 
            ? (language === 'zh' ? '2025 春夏新品' : language === 'ja' ? '2025 春夏新作' : 'Spring/Summer 2025 New')
            : (language === 'zh' ? '限定系列' : language === 'ja' ? '限定シリーズ' : 'Limited Collection')}
        </span>
      </div>

      <style>{`
        .product-card .pg:hover {
          transform: scale(1.04);
        }
      `}</style>
    </div>
  );
}
