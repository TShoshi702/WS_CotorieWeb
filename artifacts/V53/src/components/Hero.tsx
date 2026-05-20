import { useLanguage } from '../context/LanguageContext';

interface HeroProps {
  onCtaClick: () => void;
}

export default function Hero({ onCtaClick }: HeroProps) {
  const { language } = useLanguage();

  return (
    <section style={{
      position: 'relative',
      height: '100vh',
      minHeight: '600px',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(135deg, #faf6f2 0%, #fff5f0 50%, #f5e6d9 100%)',
      overflow: 'hidden',
    }}>
      {/* Decorative watermark */}
      <div style={{
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        fontSize: '20vw',
        fontWeight: '100',
        color: '#c49a8c',
        opacity: '0.1',
        pointerEvents: 'none',
        fontStyle: 'italic',
        whiteSpace: 'nowrap',
      }}>
        COTORIE
      </div>

      {/* Content */}
      <div className="fade-in" style={{
        textAlign: 'center',
        zIndex: 1,
        padding: '0 24px',
      }}>
        <h1 style={{
          fontSize: 'clamp(32px, 8vw, 96px)',
          fontWeight: '100',
          fontStyle: 'italic',
          letterSpacing: '0.3em',
          color: '#3d2e2a',
          marginBottom: '24px',
          lineHeight: '1.2',
        }}>
          ほっぺが<br />赤くなる
        </h1>
        
        <p style={{
          fontSize: '11px',
          letterSpacing: '3px',
          color: '#3d2e2a',
          opacity: '0.7',
          marginBottom: '48px',
          textTransform: 'uppercase',
        }}>
          {language === 'zh' ? '日本情趣内衣品牌' : language === 'ja' ? '日本のランジェリーブランド' : 'Japanese Lingerie Brand'}
        </p>

        <button
          onClick={onCtaClick}
          className="btn-primary"
          style={{
            backgroundColor: '#3d2e2a',
            color: '#ffffff',
            padding: '18px 64px',
            fontSize: '11px',
            letterSpacing: '3px',
            textTransform: 'uppercase',
            transition: 'all 0.3s ease',
          }}
        >
          {language === 'zh' ? '探索系列' : language === 'ja' ? 'コレクションを見る' : 'Explore Collection'}
        </button>
      </div>

      {/* Scroll indicator */}
      <div style={{
        position: 'absolute',
        bottom: '48px',
        left: '50%',
        transform: 'translateX(-50%)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '8px',
      }}>
        <span style={{
          fontSize: '9px',
          letterSpacing: '2px',
          color: '#3d2e2a',
          opacity: '0.5',
          textTransform: 'uppercase',
        }}>
          SCROLL
        </span>
        <div style={{
          width: '1px',
          height: '40px',
          backgroundColor: '#3d2e2a',
          opacity: '0.3',
          animation: 'scrollIndicator 2s ease-in-out infinite',
        }} />
      </div>

      <style>{`
        @keyframes scrollIndicator {
          0%, 100% {
            opacity: 0.3;
            transform: scaleY(0.5);
          }
          50% {
            opacity: 0.8;
            transform: scaleY(1);
          }
        }
      `}</style>
    </section>
  );
}
