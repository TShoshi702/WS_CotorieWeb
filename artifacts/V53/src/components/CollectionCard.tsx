interface CollectionCardProps {
  title: string;
  titleJa: string;
  titleEn: string;
  description: string;
  descriptionJa: string;
  descriptionEn: string;
  image: string;
  onClick: () => void;
  language: 'zh' | 'ja' | 'en';
}

export default function CollectionCard({
  title,
  titleJa,
  titleEn,
  description,
  descriptionJa,
  descriptionEn,
  image,
  onClick,
  language,
}: CollectionCardProps) {
  return (
    <div
      onClick={onClick}
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        cursor: 'pointer',
        transition: 'opacity 0.3s ease',
        width: '100%',
        maxWidth: '100%',
      }}
      className="collection-card"
    >
      {/* Image Side - Prada 1.26 Aspect Ratio */}
      <div style={{
        position: 'relative',
        overflow: 'hidden',
        aspectRatio: '1.26',
      }} className="hover-zoom">
        <img
          src={image}
          alt={title}
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
          }}
        />
      </div>

      {/* Text Side - Prada Style Vertical Centered */}
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '48px 64px',
        backgroundColor: '#faf6f2',
      }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: '400',
          fontStyle: 'normal',
          letterSpacing: '2px',
          color: '#1a1a1a',
          marginBottom: '16px',
          textAlign: 'center',
          lineHeight: '32px',
        }}>
          {language === 'zh' ? title : language === 'ja' ? titleJa : titleEn}
        </h2>
        
        <p style={{
          fontSize: '14px',
          fontWeight: '300',
          letterSpacing: '0px',
          color: '#1a1a1a',
          opacity: '0.7',
          textAlign: 'center',
          lineHeight: '1.6',
          maxWidth: '360px',
        }}>
          {language === 'zh' ? description : language === 'ja' ? descriptionJa : descriptionEn}
        </p>

        <button
          style={{
            marginTop: '24px',
            background: 'none',
            border: 'none',
            color: '#1a1a1a',
            fontSize: '12px',
            letterSpacing: '0px',
            cursor: 'pointer',
            textDecoration: 'underline',
            textDecorationColor: 'rgba(26, 26, 26, 0.3)',
            textUnderlineOffset: '3px',
            transition: 'all 0.3s',
            lineHeight: '20px',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.textDecorationColor = '#1a1a1a';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.textDecorationColor = 'rgba(26, 26, 26, 0.3)';
          }}
        >
          {language === 'zh' ? '探索系列' : language === 'ja' ? 'シリーズを見る' : 'Explore Collection'}
        </button>
      </div>

      <style>{`
        .collection-card:hover img {
          opacity: 0.95;
        }
        @media (max-width: 768px) {
          .collection-card {
            grid-template-columns: repeat(1, 1fr) !important;
          }
        }
      `}</style>
    </div>
  );
}
