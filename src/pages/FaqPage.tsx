import { useState } from 'react';
import { useLanguage } from '../context/LanguageContext';

interface FaqItem {
  q: Record<string, string>;
  a: Record<string, string>;
}

const faqData: FaqItem[] = [
  // 注文・支払い
  {
    q: { zh: '可以用信用卡以外的支付方式吗？', ja: 'クレジットカード以外の支払いはできますか？', en: 'Can I pay by methods other than credit card?' },
    a: { zh: '可以。支持 便利店支付 和 PayPay。', ja: 'はい。コンビニ決済 と PayPay もご利用いただけます。', en: 'Yes. Convenience store payment and PayPay are also available.' },
  },
  {
    q: { zh: '下单后可以取消吗？', ja: '注文後にキャンセルできますか？', en: 'Can I cancel after ordering?' },
    a: { zh: '发货前可以取消。请尽快发送邮件至 cotorie1@outlook.com 联系我们。', ja: '発送前であれば可能です。速やかに cotorie1@outlook.com までご連絡ください。', en: 'Yes, if before shipping. Please contact us immediately at cotorie1@outlook.com.' },
  },
  // 配送
  {
    q: { zh: '需要付运费吗？', ja: '送料はかかりますか？', en: 'Is there a shipping fee?' },
    a: { zh: '全国免运费。您只需支付商品价格。', ja: '全国送料無料です。商品代金のみでご利用いただけます。', en: 'Free shipping nationwide. You only pay the product price.' },
  },
  {
    q: { zh: '大概多久能送达？', ja: '届くまでどのくらいかかりますか？', en: 'How long does delivery take?' },
    a: { zh: '通常发货后 5~10 个工作日送达。天气或清关状况可能导致延迟。', ja: '発送から通常 5〜10 営業日 でお届けします。天候や通関状況により遅延する場合があります。', en: 'Typically 5-10 business days after shipping. Delays may occur due to weather or customs conditions.' },
  },
  {
    q: { zh: '可以指定配送日期和时间吗？', ja: '配送日時を指定できますか？', en: 'Can I specify delivery date and time?' },
    a: { zh: '非常抱歉，由于国际运输的特性，无法接受日期和时间指定。', ja: '誠に申し訳ございませんが、国際輸送のため 日時指定は承れません。', en: 'We sincerely apologize, but due to international shipping, we cannot accept date/time requests.' },
  },
  // 返品・交換
  {
    q: { zh: '尺码不合适可以换货吗？', ja: 'サイズが合わなかったら交換できますか？', en: 'Can I exchange if the size does not fit?' },
    a: { zh: '未使用、未开封、带标签且在商品到货后 7天内 联系我们，可以换货。但运费由您承担。', ja: '未使用・未開封・タグ付きで、商品到着後 7日以内 にご連絡いただければ交換可能です。ただし、送料はお客様のご負担となります。', en: 'Unused, unopened, with tags, and contact us within 7 days of delivery — exchange is possible. However, shipping is at your expense.' },
  },
  {
    q: { zh: '收到瑕疵品了，怎么办？', ja: '不良品が届きました。どうすればいいですか？', en: 'I received a defective item. What should I do?' },
    a: { zh: '非常抱歉。请于到货后 7天内 发邮件联系我们。我们将承担运费为您换货或退款。', ja: '大変申し訳ございません。到着後 7日以内 にメールでご連絡ください。当社負担で交換・返金いたします。', en: 'We are very sorry. Please contact us by email within 7 days of delivery. We will exchange or refund at our expense.' },
  },
  // サイズ
  {
    q: { zh: '不确定尺码是否合适怎么办？', ja: 'サイズが合うか不安です。', en: "I'm not sure about the size." },
    a: { zh: '各商品页面均附有 尺码指南。请与您自身的尺寸进行比较后考虑。仍有疑问的话，欢迎随时发邮件至 cotorie1@outlook.com 咨询。', ja: '各商品ページに サイズガイド を掲載しております。実寸と比較してご検討ください。それでも不安な場合は、お気軽に cotorie1@outlook.com までご相談ください。', en: 'Each product page has a size guide. Please compare with your own measurements. If you are still unsure, feel free to consult us at cotorie1@outlook.com.' },
  },
];

const pageTitles: Record<string, string> = {
  zh: '常见问题（FAQ）',
  ja: 'よくある質問（FAQ）',
  en: 'Frequently Asked Questions (FAQ)',
};

export default function FaqPage() {
  const { language } = useLanguage();
  const lang = (language || 'ja') as string;
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <div style={{ backgroundColor: '#faf6f2', minHeight: '80vh' }}>
      {/* Header */}
      <section style={{ padding: '80px 24px 48px', textAlign: 'center', background: 'linear-gradient(180deg, #fff5f0 0%, #faf6f2 100%)' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '300', letterSpacing: '3px', color: '#2c2c2c', margin: 0 }}>{pageTitles[lang] || pageTitles.ja}</h1>
        <div style={{ width: '40px', height: '1px', backgroundColor: '#c49a8c', margin: '20px auto 0' }} />
      </section>

      {/* Accordion List */}
      <section style={{ maxWidth: '760px', margin: '0 auto', padding: '48px 24px 80px' }}>
        {faqData.map((item, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              style={{
                borderBottom: '1px solid #e8ddd5',
                padding: '20px 0',
              }}
            >
              {/* Question */}
              <button
                onClick={() => toggle(i)}
                style={{
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  textAlign: 'left',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  padding: 0,
                  fontSize: '14px',
                  fontWeight: isOpen ? '500' : '400',
                  color: '#2c2c2c',
                  lineHeight: '1.7',
                }}
              >
                <span>Q. {item.q[lang] || item.q.ja}</span>
                <span style={{
                  fontSize: '18px',
                  color: '#c49a8c',
                  transform: isOpen ? 'rotate(45deg)' : 'rotate(0deg)',
                  transition: 'transform 0.2s',
                  flexShrink: 0,
                  marginLeft: '16px',
                }}>
                  +
                </span>
              </button>

              {/* Answer */}
              {isOpen && (
                <div style={{
                  marginTop: '16px',
                  fontSize: '14px',
                  color: '#555',
                  lineHeight: '1.9',
                  paddingLeft: '20px',
                  borderLeft: '2px solid #c49a8c',
                }}>
                  <strong style={{ color: '#6b5b4e' }}>A. </strong>
                  {item.a[lang]?.includes('@') ? (
                    <span>
                      {(item.a[lang] || item.a.ja).split(/(cotorie1@outlook\.com)/).map((part, j) =>
                        part === 'cotorie1@outlook.com' ? (
                          <a key={j} href="mailto:cotorie1@outlook.com" style={{ color: '#6b5b4e', textDecoration: 'underline' }}>{part}</a>
                        ) : (
                          part
                        )
                      )}
                    </span>
                  ) : (
                    item.a[lang] || item.a.ja
                  )}
                </div>
              )}
            </div>
          );
        })}

        {/* Contact footer */}
        <div style={{ marginTop: '48px', padding: '24px', backgroundColor: '#f5ede8', borderRadius: '4px', textAlign: 'center' }}>
          <p style={{ fontSize: '13px', color: '#555', margin: '0 0 8px' }}>
            {lang === 'zh' ? '问题仍未解决？' : lang === 'en' ? 'Still have questions?' : 'それでも問題が解決しない場合'}
          </p>
          <a
            href="mailto:cotorie1@outlook.com"
            style={{ fontSize: '13px', color: '#6b5b4e', textDecoration: 'underline', fontWeight: '500' }}
          >
            cotorie1@outlook.com
          </a>
        </div>
      </section>
    </div>
  );
}
