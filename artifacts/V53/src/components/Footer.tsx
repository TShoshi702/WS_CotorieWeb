

// Custom social icons as SVG components
const InstagramIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
  </svg>
);

const TwitterIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path>
  </svg>
);

const FacebookIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
  </svg>
);
import { useLanguage } from '../context/LanguageContext';

export default function Footer() {
  const { language } = useLanguage();

  const footerLinks = {
    zh: {
      customerService: '客户服务',
      shipping: '配送信息',
      returns: '退换货政策',
      sizeGuide: '尺码指南',
      faq: '常见问题',
      aboutCotorie: '关于 COTORIE',
      brandStory: '品牌故事',
      sustainability: '可持续发展',
      careers: '加入我们',
      press: '媒体中心',
      followUs: '关注我们',
      newsletter: '订阅通讯',
      subscribePlaceholder: '输入您的邮箱',
      subscribe: '订阅',
      privacy: '隐私政策',
      terms: '条款条件',
      copyright: '© 2024 COTORIE. All rights reserved.',
    },
    ja: {
      customerService: 'カスタマーサービス',
      shipping: '配送情報',
      returns: '返品ポリシー',
      sizeGuide: 'サイズガイド',
      faq: 'よくある質問',
      aboutCotorie: 'COTORIE について',
      brandStory: 'ブランドストーリー',
      sustainability: 'サステナビリティ',
      careers: '採用情報',
      press: 'メディアセンター',
      followUs: 'フォローする',
      newsletter: 'ニュースレター',
      subscribePlaceholder: 'メールアドレスを入力',
      subscribe: '購読',
      privacy: 'プライバシーポリシー',
      terms: '利用規約',
      copyright: '© 2024 COTORIE. All rights reserved.',
    },
    en: {
      customerService: 'Customer Service',
      shipping: 'Shipping Info',
      returns: 'Returns Policy',
      sizeGuide: 'Size Guide',
      faq: 'FAQ',
      aboutCotorie: 'About COTORIE',
      brandStory: 'Brand Story',
      sustainability: 'Sustainability',
      careers: 'Careers',
      press: 'Press',
      followUs: 'Follow Us',
      newsletter: 'Newsletter',
      subscribePlaceholder: 'Enter your email',
      subscribe: 'Subscribe',
      privacy: 'Privacy Policy',
      terms: 'Terms & Conditions',
      copyright: '© 2024 COTORIE. All rights reserved.',
    },
  };

  const t = footerLinks[language as keyof typeof footerLinks];

  return (
    <footer style={{
      backgroundColor: '#000000',
      color: '#ffffff',
      padding: '80px 0 40px',
    }}>
      <div className="container" style={{ padding: '0 24px' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '48px',
          marginBottom: '64px',
        }}>
          {/* Customer Service */}
          <div>
            <h4 style={{
              fontSize: '11px',
              fontWeight: '400',
              letterSpacing: '2px',
              marginBottom: '24px',
              textTransform: 'uppercase',
              color: '#ffffff',
            }}>
              {t.customerService}
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '12px' }}>
                <a href="#" style={{
                  fontSize: '12px',
                  color: '#ffffff',
                  opacity: '0.6',
                  transition: 'opacity 0.3s',
                }}>{t.shipping}</a>
              </li>
              <li style={{ marginBottom: '12px' }}>
                <a href="#" style={{
                  fontSize: '12px',
                  color: '#ffffff',
                  opacity: '0.6',
                  transition: 'opacity 0.3s',
                }}>{t.returns}</a>
              </li>
              <li style={{ marginBottom: '12px' }}>
                <a href="#" style={{
                  fontSize: '12px',
                  color: '#ffffff',
                  opacity: '0.6',
                  transition: 'opacity 0.3s',
                }}>{t.sizeGuide}</a>
              </li>
              <li style={{ marginBottom: '12px' }}>
                <a href="#" style={{
                  fontSize: '12px',
                  color: '#ffffff',
                  opacity: '0.6',
                  transition: 'opacity 0.3s',
                }}>{t.faq}</a>
              </li>
            </ul>
          </div>

          {/* About COTORIE */}
          <div>
            <h4 style={{
              fontSize: '11px',
              fontWeight: '400',
              letterSpacing: '2px',
              marginBottom: '24px',
              textTransform: 'uppercase',
              color: '#ffffff',
            }}>
              {t.aboutCotorie}
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
              <li style={{ marginBottom: '12px' }}>
                <a href="/about" style={{
                  fontSize: '12px',
                  color: '#ffffff',
                  opacity: '0.6',
                  transition: 'opacity 0.3s',
                }}>{t.brandStory}</a>
              </li>
              <li style={{ marginBottom: '12px' }}>
                <a href="#" style={{
                  fontSize: '12px',
                  color: '#ffffff',
                  opacity: '0.6',
                  transition: 'opacity 0.3s',
                }}>{t.sustainability}</a>
              </li>
              <li style={{ marginBottom: '12px' }}>
                <a href="#" style={{
                  fontSize: '12px',
                  color: '#ffffff',
                  opacity: '0.6',
                  transition: 'opacity 0.3s',
                }}>{t.careers}</a>
              </li>
              <li style={{ marginBottom: '12px' }}>
                <a href="#" style={{
                  fontSize: '12px',
                  color: '#ffffff',
                  opacity: '0.6',
                  transition: 'opacity 0.3s',
                }}>{t.press}</a>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h4 style={{
              fontSize: '11px',
              fontWeight: '400',
              letterSpacing: '2px',
              marginBottom: '24px',
              textTransform: 'uppercase',
              color: '#ffffff',
            }}>
              {t.followUs}
            </h4>
            <div style={{
              display: 'flex',
              gap: '16px',
              marginBottom: '32px',
            }}>
              <a href="#" style={{ color: '#ffffff', opacity: '0.6' }}>
                <InstagramIcon />
              </a>
              <a href="#" style={{ color: '#ffffff', opacity: '0.6' }}>
                <TwitterIcon />
              </a>
              <a href="#" style={{ color: '#ffffff', opacity: '0.6' }}>
                <FacebookIcon />
              </a>
            </div>

            {/* Newsletter */}
            <h4 style={{
              fontSize: '11px',
              fontWeight: '400',
              letterSpacing: '2px',
              marginBottom: '16px',
              textTransform: 'uppercase',
              color: '#ffffff',
            }}>
              {t.newsletter}
            </h4>
            <div style={{
              display: 'flex',
              borderBottom: '1px solid rgba(255,255,255,0.3)',
            }}>
              <input
                type="email"
                placeholder={t.subscribePlaceholder}
                style={{
                  flex: 1,
                  background: 'none',
                  border: 'none',
                  color: '#ffffff',
                  fontSize: '12px',
                  padding: '12px 0',
                  outline: 'none',
                }}
              />
              <button
                style={{
                  background: 'none',
                  border: 'none',
                  color: '#ffffff',
                  fontSize: '11px',
                  letterSpacing: '2px',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  opacity: '0.6',
                }}
              >
                {t.subscribe}
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div style={{
          borderTop: '1px solid rgba(255,255,255,0.1)',
          paddingTop: '32px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '16px',
        }}>
          <p style={{
            fontSize: '11px',
            color: '#ffffff',
            opacity: '0.4',
            letterSpacing: '1px',
          }}>
            {t.copyright}
          </p>
          <div style={{
            display: 'flex',
            gap: '24px',
          }}>
            <a href="#" style={{
              fontSize: '11px',
              color: '#ffffff',
              opacity: '0.4',
              letterSpacing: '1px',
            }}>{t.privacy}</a>
            <a href="#" style={{
              fontSize: '11px',
              color: '#ffffff',
              opacity: '0.4',
              letterSpacing: '1px',
            }}>{t.terms}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
