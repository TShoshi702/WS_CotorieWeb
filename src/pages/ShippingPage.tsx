import { useLanguage } from '../context/LanguageContext';

const content: Record<string, { title: string; sections: { heading: string; body: string[] }[] }> = {
  ja: {
    title: '配送・送料について',
    sections: [
      {
        heading: '1. 配送業者',
        body: ['国際輸送および日本国内の配送は、信頼できる物流パートナー（例：日本郵便、佐川急便、ヤマト運輸など）に委託して行います。'],
      },
      {
        heading: '2. 送料',
        body: ['全国一律: 0円（送料無料）', '※一部地域（離島など）は別途費用が発生する場合があります。その際は個別にご連絡いたします。'],
      },
      {
        heading: '3. ご注文から発送までの流れ',
        body: ['1. ご注文完了後、3営業日以内に国際輸送を開始します。', '2. 発送完了後草原、確認可能な追跡番号（トラッキングマネージャー）をメールにてお知らせします。', '3. 国際輸送後、日本国内でお近くの郵便局または配送会社よりお届けします。'],
      },
      {
        heading: '4. お届けまでの目安',
        body: ['発送からお届けまで: 通常 5〜10営業日', '天候や通関状況により、遅延する場合があることをご了承ください。'],
      },
      {
        heading: '5. 配送日時の指定',
        body: ['日時指定は承っておりません。（誠に申し訳ございませんが、国際輸送の特性上、日時指定はお受けできません。）', 'ご不便をおかけしますが、ご理解いただけますようお願いいたします。'],
      },
      {
        heading: '6. 税関・関税について',
        body: ['商品代金には消費税および輸入関税が含まれています。お客様が追加で関税をお支払いいただく必要はございません。'],
      },
      {
        heading: '7. 未着・遅延の場合',
        body: ['予定配達日を超過しても商品が届かない場合は、メールにてトラッキング番号ご確認の上、配送会社へお問い合わせください。', 'それでも解決しない場合は、当 cotorie1@outlook.com までご連絡ください。'],
      },
    ],
  },
  zh: {
    title: '配送与运费',
    sections: [
      {
        heading: '1. 配送业者',
        body: ['国际运输及日本国内配送将委托可信的物流合作伙伴（如：日本邮政、佐川急便、Yamato运输等）。'],
      },
      {
        heading: '2. 运费',
        body: ['全国统一: 0日元（免运费）', '※部分地区（离岛等）可能产生额外费用。届时将个别联系。'],
      },
      {
        heading: '3. 从下单到发货的流程',
        body: ['1. 下单完成后，3个工作日内开始国际运输。', '2. 发货完成后将通过邮件告知可查询的追踪号码（Tracking Number）。', '3. 国际运输后，由日本国内的邮局或配送公司送达。'],
      },
      {
        heading: '4. 送达时间参考',
        body: ['从发货到送达: 通常 5~10个工作日', '天气及清关状况可能导致延迟，敬请理解。'],
      },
      {
        heading: '5. 配送日期和时间指定',
        body: ['不接受日期和时间指定。（非常抱歉，由于国际运输的特性，无法接受日期和时间指定。）', '给您带来不便，敬请理解。'],
      },
      {
        heading: '6. 海关与关税',
        body: ['商品价格已包含消费税及进口关税。客户无需额外支付关税。'],
      },
      {
        heading: '7. 未送达或延迟的情况',
        body: ['超过预计送达日仍未收到商品时，请通过邮件确认追踪号码后联系配送公司。', '如仍无法解决，请联系 cotorie1@outlook.com。'],
      },
    ],
  },
  en: {
    title: 'Shipping & Delivery',
    sections: [
      {
        heading: '1. Shipping Carrier',
        body: ['International and domestic Japan shipping is handled by reliable logistics partners (e.g., Japan Post, Sagawa Express, Yamato Transport, etc.).'],
      },
      {
        heading: '2. Shipping Fees',
        body: ['Nationwide: ¥0 (Free Shipping)', 'Note: Some areas (remote islands, etc.) may incur additional fees. We will contact you individually in such cases.'],
      },
      {
        heading: '3. Order to Shipping Process',
        body: ['1. After order completion, international shipping begins within 3 business days.', '2. After shipping, we will email you a trackable tracking number.', '3. After international shipping, delivery will be made by your local post office or delivery company in Japan.'],
      },
      {
        heading: '4. Estimated Delivery Time',
        body: ['From shipping to delivery: Typically 5-10 business days', 'Please note that delays may occur due to weather or customs conditions.'],
      },
      {
        heading: '5. Delivery Date/Time Requests',
        body: ['We do not accept specific date or time requests. (We sincerely apologize, but due to the nature of international shipping, we cannot accommodate date/time requests.)', 'We appreciate your understanding.'],
      },
      {
        heading: '6. Customs & Duties',
        body: ['Product prices include consumption tax and import duties. You do not need to pay any additional customs duties.'],
      },
      {
        heading: '7. Non-Delivery or Delays',
        body: ['If your package has not arrived by the expected delivery date, please check the tracking number and contact the shipping company.', 'If the issue is still not resolved, please contact us at cotorie1@outlook.com.'],
      },
    ],
  },
};

export default function ShippingPage() {
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
          <div key={i} style={{ marginBottom: '36px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: '500', color: '#4a3728', marginBottom: '12px', letterSpacing: '0.5px' }}>{sec.heading}</h3>
            {sec.body.map((line, j) => (
              <p key={j} style={{ fontSize: '14px', color: '#333', lineHeight: '1.9', margin: '0 0 4px', whiteSpace: 'pre-line' }}>
                {line.includes('@') ? (
                  <a href={`mailto:${line.replace(/^.*?の場合、/, '').replace(/までご連絡ください。$/, '')}`} style={{ color: '#6b5b4e', textDecoration: 'underline' }}>{line}</a>
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
