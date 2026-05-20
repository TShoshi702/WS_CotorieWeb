import { useLanguage } from '../context/LanguageContext';

export default function AboutPage() {
  const { language } = useLanguage();

  return (
    <div style={{ backgroundColor: '#faf6f2' }}>
      {/* Hero Section */}
      <section style={{
        height: '70vh',
        minHeight: '500px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(135deg, #faf6f2 0%, #fff5f0 50%, #f5e6d9 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}>
        {/* Decorative watermark */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          fontSize: '15vw',
          fontWeight: '100',
          color: '#c49a8c',
          opacity: '0.15',
          pointerEvents: 'none',
          fontStyle: 'italic',
        }}>
          COTORIE
        </div>

        <div style={{
          textAlign: 'center',
          zIndex: 1,
          padding: '0 24px',
        }}>
          <h1 style={{
            fontSize: 'clamp(32px, 6vw, 72px)',
            fontWeight: '300',
            fontStyle: 'italic',
            letterSpacing: '0.3em',
            color: '#3d2e2a',
            marginBottom: '24px',
            lineHeight: '1.3',
          }}>
            ほっぺが<br />赤くなる
          </h1>
          
          <p style={{
            fontSize: '11px',
            letterSpacing: '0.3em',
            color: '#3d2e2a',
            opacity: '0.7',
            textTransform: 'uppercase',
          }}>
            {language === 'zh' ? '关于 COTORIE' : language === 'ja' ? 'COTORIE について' : 'About COTORIE'}
          </p>
        </div>
      </section>

      {/* Brand Story */}
      <section style={{
        padding: '120px 24px',
        maxWidth: '900px',
        margin: '0 auto',
      }}>
        <div style={{
          textAlign: 'center',
          marginBottom: '64px',
        }}>
          <p style={{
            fontSize: '13px',
            lineHeight: '2.5',
            letterSpacing: '0.15em',
            color: '#3d2e2a',
            opacity: '0.8',
          }}>
            {language === 'zh'
              ? 'COTORIE 是一个日本情趣内衣品牌，致力于展现东方女性的独特魅力。我们的设计理念融合了传统日式美学与现代性感元素，每一件作品都如同少女脸颊上的红晕，纯净而诱人。'
              : 'COTORIE は、東方女性の独自の魅力を表現することに尽力している日本のランジェリーブランドです。私たちのデザインコンセプトは、伝統的な日本の美学と現代的なセクシーさの要素を融合させ、すべての作品は乙女の頬の赤らみのように、純粋で魅力的です。'}
          </p>
        </div>

        <div style={{
          width: '60px',
          height: '1px',
          backgroundColor: '#c49a8c',
          margin: '48px auto',
        }} />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '64px',
          marginTop: '64px',
        }}>
          <div style={{ textAlign: 'center' }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '300',
              fontStyle: 'italic',
              letterSpacing: '0.2em',
              color: '#3d2e2a',
              marginBottom: '24px',
            }}>
              {language === 'zh' ? '设计理念' : 'デザイン哲学'}
            </h3>
            <p style={{
              fontSize: '12px',
              lineHeight: '2.2',
              letterSpacing: '0.1em',
              color: '#3d2e2a',
              opacity: '0.7',
            }}>
              {language === 'zh'
                ? '我们相信真正的美源于内心的自信与外在的优雅相结合。每一件 COTORIE 作品都经过精心设计，旨在唤醒女性内心深处的柔美力量。'
                : '真の美しさは内なる自信と外見の優雅さの組み合わせから生まれると信じています。COTORIE のすべての作品は、女性の内なる優しさを引き出すために丁寧にデザインされています。'}
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '300',
              fontStyle: 'italic',
              letterSpacing: '0.2em',
              color: '#3d2e2a',
              marginBottom: '24px',
            }}>
              {language === 'zh' ? '工艺品质' : 'クラフトマンシップ'}
            </h3>
            <p style={{
              fontSize: '12px',
              lineHeight: '2.2',
              letterSpacing: '0.1em',
              color: '#3d2e2a',
              opacity: '0.7',
            }}>
              {language === 'zh'
                ? '我们只选用最优质的面料，由经验丰富的工匠精心制作。每一处细节都体现了我们对完美的执着追求。'
                : '最高級の素材のみを使用し、経験豊富な職人が丁寧に作り上げています。すべてのディテールに完璧へのこだわりが込められています。'}
            </p>
          </div>

          <div style={{ textAlign: 'center' }}>
            <h3 style={{
              fontSize: '16px',
              fontWeight: '300',
              fontStyle: 'italic',
              letterSpacing: '0.2em',
              color: '#3d2e2a',
              marginBottom: '24px',
            }}>
              {language === 'zh' ? '可持续发展' : 'サステナビリティ'}
            </h3>
            <p style={{
              fontSize: '12px',
              lineHeight: '2.2',
              letterSpacing: '0.1em',
              color: '#3d2e2a',
              opacity: '0.7',
            }}>
              {language === 'zh'
                ? '我们致力于采用环保材料和可持续生产方式，为保护地球环境贡献一份力量，让美丽与责任并存。'
                : '環境に優しい素材と持続可能な生産方法を採用し、地球環境の保護に貢献することを目指しています。美しさと責任を両立させます。'}
            </p>
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section style={{
        padding: '120px 24px',
        backgroundColor: '#000000',
        color: '#ffffff',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <blockquote style={{
            fontSize: 'clamp(20px, 4vw, 32px)',
            fontWeight: '300',
            fontStyle: 'italic',
            letterSpacing: '0.2em',
            lineHeight: '1.8',
            marginBottom: '48px',
          }}>
            {language === 'zh'
              ? '"真正的美丽，是当你穿上它时，感受到的那份自信与自在。"'
              : '"真の美しさとは、それを身にまとった時に感じる自信と心地よさのこと。"'}
          </blockquote>
          
          <cite style={{
            fontSize: '11px',
            letterSpacing: '0.3em',
            opacity: '0.6',
            textTransform: 'uppercase',
            fontStyle: 'normal',
          }}>
            — COTORIE Design Studio
          </cite>
        </div>
      </section>

      {/* Image Grid */}
      <section style={{
        padding: '0',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
        }}>
          {[
            'https://images.unsplash.com/photo-1596483758379-9d2a3f4e4b6c?w=600',
            'https://images.unsplash.com/photo-1595981267035-7b14ead294f5?w=600',
            'https://images.unsplash.com/photo-1574668446843-ae7c0f6db0ab?w=600',
          ].map((src, index) => (
            <div
              key={index}
              style={{
                aspectRatio: '3/4',
                overflow: 'hidden',
              }}
            >
              <img
                src={src}
                alt=""
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transition: 'transform 0.5s ease',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'scale(1.05)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'scale(1)';
                }}
              />
            </div>
          ))}
        </div>
      </section>

      {/* Contact Section */}
      <section style={{
        padding: '96px 24px',
        textAlign: 'center',
        backgroundColor: '#faf6f2',
      }}>
        <h2 style={{
          fontSize: '24px',
          fontWeight: '300',
          fontStyle: 'italic',
          letterSpacing: '0.2em',
          color: '#3d2e2a',
          marginBottom: '32px',
        }}>
          {language === 'zh' ? '联系我们' : 'お問い合わせ'}
        </h2>
        
        <p style={{
          fontSize: '13px',
          lineHeight: '2.2',
          letterSpacing: '0.1em',
          color: '#3d2e2a',
          opacity: '0.8',
          marginBottom: '48px',
          maxWidth: '600px',
          margin: '0 auto 48px',
        }}>
          {language === 'zh'
            ? '如有任何问题或建议，欢迎随时与我们联系。我们的客服团队将在 24 小时内回复您的咨询。'
            : 'ご質問やご提案がございましたら、いつでもお気軽にお問い合わせください。カスタマーサービスチームが 24 時間以内にご返信いたします。'}
        </p>

        <a
          href="mailto:hello@cotorie.jp"
          style={{
            display: 'inline-block',
            backgroundColor: '#3d2e2a',
            color: '#ffffff',
            padding: '18px 64px',
            fontSize: '11px',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            transition: 'all 0.3s ease',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = '#000000';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = '#3d2e2a';
          }}
        >
          hello@cotorie.jp
        </a>
      </section>

      <style>{`
        @media (max-width: 768px) {
          section:nth-child(5) > div {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </div>
  );
}
