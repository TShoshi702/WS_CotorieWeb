import { useLanguage } from '../context/LanguageContext';

const content: Record<string, { title: string; sections: { heading: string; body: string[] }[] }> = {
  ja: {
    title: 'お問い合わせ',
    sections: [
      {
        heading: 'お問い合わせの前に',
        body: ['よくあるご質問は よくある質問（FAQ） ページをご覧ください。'],
      },
      {
        heading: 'ご連絡方法',
        body: ['以下のメールアドレスまでご連絡ください。'],
      },
      {
        heading: 'メールアドレス',
        body: ['cotorie1@outlook.com'],
      },
      {
        heading: '営業時間',
        body: ['平日: 10:00 〜 17:00（日本時間）', '土日・祝日: 休業（翌営業日以降のご返信となります）'],
      },
      {
        heading: 'お問い合わせの際にご記入いただきたい情報',
        body: ['お名前', '注文番号（既にご注文いただいている場合）', 'お問い合わせ内容（可能な限り詳細に）'],
      },
      {
        heading: 'ご返信まで',
        body: ['ご連絡いただいてから、2営業日以内 にご返信いたします。', '営業時間外・土日祝日にいただいたお問い合わせは、翌営業日からの対応となります。'],
      },
    ],
  },
  zh: {
    title: '联系我们',
    sections: [
      {
        heading: '联系前请确认',
        body: ['常见问题请参阅 常见问题（FAQ） 页面。'],
      },
      {
        heading: '联系方式',
        body: ['请发送邮件至以下地址。'],
      },
      {
        heading: '邮箱地址',
        body: ['cotorie1@outlook.com'],
      },
      {
        heading: '营业时间',
        body: ['工作日: 10:00 〜 17:00（日本时间）', '周末及法定节假日: 休息（次日工作日回复）'],
      },
      {
        heading: '咨询时请提供以下信息',
        body: ['姓名', '订单编号（如已下单）', '咨询内容（请尽可能详细）'],
      },
      {
        heading: '回复时间',
        body: ['将在 2个工作日内 回复您。', '非工作时间及节假日的咨询，将于下一个工作日开始处理。'],
      },
    ],
  },
  en: {
    title: 'Contact Us',
    sections: [
      {
        heading: 'Before You Contact Us',
        body: ['Please check our FAQ page for common questions.'],
      },
      {
        heading: 'How to Reach Us',
        body: ['Please contact us at the email address below.'],
      },
      {
        heading: 'Email',
        body: ['cotorie1@outlook.com'],
      },
      {
        heading: 'Business Hours',
        body: ['Weekdays: 10:00 AM – 5:00 PM (JST)', 'Weekends & Holidays: Closed (replies will be sent on the next business day)'],
      },
      {
        heading: 'Information to Include',
        body: ['Your name', 'Order number (if applicable)', 'Details of your inquiry (as specific as possible)'],
      },
      {
        heading: 'Response Time',
        body: ['We will respond within 2 business days.', 'Inquiries received outside business hours or on weekends/holidays will be handled starting the next business day.'],
      },
    ],
  },
};

export default function ContactPage() {
  const { language } = useLanguage();
  const lang = (language || 'ja') as string;
  const page = content[lang] || content.ja;

  return (
    <div style={{ backgroundColor: '#faf6f2', minHeight: '80vh' }}>
      <section style={{ padding: '80px 24px 48px', textAlign: 'center', background: 'linear-gradient(180deg, #fff5f0 0%, #faf6f2 100%)' }}>
        <h1 style={{ fontSize: '28px', fontWeight: '300', letterSpacing: '3px', color: '#2c2c2c', margin: 0 }}>{page.title}</h1>
        <div style={{ width: '40px', height: '1px', backgroundColor: '#c49a8c', margin: '20px auto 0' }} />
      </section>
      <section style={{ maxWidth: '760px', margin: '0 auto', padding: '0 24px 80px' }}>
        {page.sections.map((sec, i) => (
          <div key={i} style={{ marginBottom: '40px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '500', color: '#4a3728', marginBottom: '12px', letterSpacing: '0.5px' }}>
              {sec.heading}
            </h3>
            {sec.body.map((line, j) => (
              <p key={j} style={{ fontSize: '14px', color: '#333', lineHeight: '1.9', margin: '0 0 4px' }}>
                {line.includes('@') ? (
                  <a href={`mailto:${line}`} style={{ color: '#6b5b4e', textDecoration: 'underline' }}>{line}</a>
                ) : (
                  line
                )}
              </p>
            ))}
          </div>
        ))}
      </section>
    </div>
  );
}