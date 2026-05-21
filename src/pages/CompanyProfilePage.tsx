import { useLanguage } from '../context/LanguageContext';

interface RowData {
  label: Record<string, string>;
  value: Record<string, string>;
  isEmail?: boolean;
}

const tableData: RowData[] = [
  {
    label: { zh: '公司名称', ja: '会社名', en: 'Company Name' },
    value: {
      zh: '元狩（佛山南海）电子商务有限公司',
      ja: '元狩（佛山南海）电子商务有限公司',
      en: 'Yuanshou (Foshan Nanhai) E-Commerce Co., Ltd.',
    },
  },
  {
    label: { zh: '品牌名称', ja: 'ブランド名', en: 'Brand Name' },
    value: { zh: 'Cotorie', ja: 'Cotorie', en: 'Cotorie' },
  },
  {
    label: { zh: '成立时间', ja: '設立', en: 'Established' },
    value: { zh: '2025年', ja: '2025年', en: '2025' },
  },
  {
    label: { zh: '所在地', ja: '所在地', en: 'Address' },
    value: {
      zh: '〒528200 中国广东省佛山市南海区桂城街道南港名轩',
      ja: '〒528200 中国広東省佛山市南海区桂城街道南港名轩',
      en: '〒528200 Nangang Mingxuan, Guicheng Subdistrict, Nanhai District, Foshan City, Guangdong Province, China',
    },
  },
  {
    label: { zh: '邮箱', ja: 'メールアドレス', en: 'Email' },
    value: { zh: 'cotorie1@outlook.com', ja: 'cotorie1@outlook.com', en: 'cotorie1@outlook.com' },
    isEmail: true,
  },
  {
    label: { zh: '业务内容', ja: '事業内容', en: 'Business' },
    value: {
      zh: '内衣・家居服的企划与销售',
      ja: 'ランジェリー・ホームウェアの企画・販売',
      en: 'Planning and sales of lingerie and homewear',
    },
  },
];

const titles: Record<string, string> = {
  zh: '公司简介',
  ja: '会社概要',
  en: 'Company Profile',
};

const brandStory: Record<string, { heading: string; paragraphs: string[] }> = {
  ja: {
    heading: 'ブランドストーリー（Brand Story）',
    paragraphs: [
      'Cotorie は、20代の女性に向けた「自分らしさを楽しむ」ランジェリー＆ホームウェアブランドです。',
      '心地よさと可愛さの両立：厳選された素材と、女性らしいシルエットを追求しています。',
      '自分へのご褒美時間：普段の自分をちょっと特別に感じられる、ワクワクするデザインをお届けします。',
      'これからも、すべての女性の「自分らしい毎日」を応援します。',
    ],
  },
  zh: {
    heading: '品牌故事（Brand Story）',
    paragraphs: [
      'Cotorie 是面向20代女性、传递「享受自我」理念的内衣及家居服品牌。',
      '舒适与可爱的平衡：精选面料，追求女性化的优雅轮廓。',
      '给自己的犒赏时光：让平凡的日常变得特别，带来令人心动的设计。',
      '我们将继续支持每一位女性「活出自我」的每一天。',
    ],
  },
  en: {
    heading: 'Brand Story',
    paragraphs: [
      'Cotorie is a lingerie and homewear brand for women in their 20s, celebrating the joy of being yourself.',
      'Comfort meets charm: We pursue carefully selected materials and feminine silhouettes.',
      'A little reward for yourself: Designs that make everyday moments feel special and exciting.',
      'We will continue to support every woman in living as her true self, every single day.',
    ],
  },
};

export default function CompanyProfilePage() {
  const { language } = useLanguage();
  const lang = (language || 'ja') as string;

  const renderValue = (item: RowData) => {
    const text = item.value[lang] || item.value.ja;
    if (item.isEmail) {
      return <a href={`mailto:${text}`} style={{ color: '#6b5b4e', textDecoration: 'underline' }}>{text}</a>;
    }
    return text;
  };

  return (
    <div style={{ backgroundColor: '#faf6f2', minHeight: '80vh' }}>
      <section style={{ padding: '80px 24px 48px', textAlign: 'center', background: 'linear-gradient(180deg, #fff5f0 0%, #faf6f2 100%)' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '300', letterSpacing: '3px', color: '#2c2c2c', margin: 0 }}>{titles[lang] || titles.ja}</h1>
        <div style={{ width: '40px', height: '1px', backgroundColor: '#c49a8c', margin: '20px auto 0' }} />
      </section>

      {/* Company Table */}
      <section style={{ maxWidth: '800px', margin: '0 auto 48px', padding: '0 24px' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '14px', lineHeight: '1.8', color: '#333' }}>
          <tbody>
            {tableData.map((row, i) => (
              <tr key={i}>
                <th style={{ width: '180px', padding: '14px 12px', textAlign: 'left', verticalAlign: 'top', fontWeight: '500', fontSize: '13px', backgroundColor: '#f5ede8', border: '1px solid #e8ddd5', whiteSpace: 'nowrap' }}>
                  {row.label[lang] || row.label.ja}
                </th>
                <td style={{ padding: '14px 16px', verticalAlign: 'top', border: '1px solid #e8ddd5', backgroundColor: '#fff' }}>
                  {renderValue(row)}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* Brand Story */}
      <section style={{ maxWidth: '760px', margin: '0 auto 0', padding: '0 24px 80px' }}>
        <h3 style={{ fontSize: '15px', fontWeight: '500', color: '#4a3728', marginBottom: '16px', letterSpacing: '0.5px' }}>
          {brandStory[lang]?.heading || brandStory.ja.heading}
        </h3>
        {(brandStory[lang] || brandStory.ja).paragraphs.map((p, i) => (
          <p key={i} style={{ fontSize: '14px', color: '#333', lineHeight: '2', margin: '0 0 12px' }}>{p}</p>
        ))}
      </section>
    </div>
  );
}