import { useLanguage } from '../context/LanguageContext';

const content: Record<string, { title: string; sections: { heading: string; body: string[] }[] }> = {
  ja: {
    title: '返品・交換について',
    sections: [
      {
        heading: '1. 返品・交換の条件',
        body: ['以下の条件をすべて満たす場合に限り、返品・交換をお受けいたします。', '- 商品到着後 7日以内 にメールでご連絡いただいた場合', '- 未使用・未開封 であること', '- タグやパッケージが付属していること'],
      },
      {
        heading: '2. 返品・交換できない商品',
        body: ['以下の商品は、お客様のご都合による返品・交換はお受けできません。', '- 使用済みの商品', '- 下着・水着など、衛生上の理由から一度開封または試着された商品', '- お客様の元で汚損・破損が生じた商品'],
      },
      {
        heading: '3. お客様都合による返品・交換',
        body: ['送料: お客様のご負担とさせていただきます。', '返金方法: 商品到着確認後、指定口座へお振込み（振込手数料はお客様負担）または決済手段に応じてご返金します。'],
      },
      {
        heading: '4. 初期不良・誤送品の場合',
        body: ['送料: 当社が負担いたします。', '対応: 速やかに交換品をお送りします。在庫がない場合は、全額返金いたします。'],
      },
      {
        heading: '5. 返送先住所',
        body: ['返品をご希望の場合は、まず下記までメールにてご連絡ください。', 'お問い合わせ先: cotorie1@outlook.com', 'ご連絡いただいた後、返送先住所を個別にお知らせします。（※お客様から一方的に返送された場合、受け取れないことがあります。）'],
      },
    ],
  },
  zh: {
    title: '退换货说明',
    sections: [
      {
        heading: '1. 退换货条件',
        body: ['需同时满足以下条件，方可办理退换货：', '- 商品到货后 7天内 通过邮件联系我们', '- 未使用、未开封', '- 标签及包装完好'],
      },
      {
        heading: '2. 不可退换的商品',
        body: ['以下商品因客户个人原因不可退换：', '- 已使用的商品', '- 内衣、泳衣等因卫生原因开封或试穿过的商品', '- 在客户处产生污损或破损的商品'],
      },
      {
        heading: '3. 客户原因的退换货',
        body: ['运费: 由客户承担。', '退款方式: 确认商品到货后，汇款至指定账户（汇款手续费由客户承担）或按支付方式退款。'],
      },
      {
        heading: '4. 初期瑕疵或发错货的情况',
        body: ['运费: 由本公司承担。', '处理: 尽快发送替换商品。如无库存，全额退款。'],
      },
      {
        heading: '5. 退货地址',
        body: ['如需退货，请先通过以下邮箱联系我们。', '联系方式: cotorie1@outlook.com', '收到您的联系后，我们会单独告知退货地址。（※如客户擅自退货，可能无法接收。）'],
      },
    ],
  },
  en: {
    title: 'Returns & Exchange',
    sections: [
      {
        heading: '1. Return & Exchange Conditions',
        body: ['Returns and exchanges are accepted only when all of the following conditions are met:', '- Contact us by email within 7 days of delivery', '- Item is unused and unopened', '- Tags and packaging are intact'],
      },
      {
        heading: '2. Items That Cannot Be Returned or Exchanged',
        body: ['The following items cannot be returned or exchanged for customer reasons:', '- Used items', '- Lingerie, swimwear, etc. that have been opened or tried on for hygiene reasons', '- Items that have been soiled or damaged by the customer'],
      },
      {
        heading: '3. Returns Due to Customer Reasons',
        body: ['Shipping fee: Borne by the customer.', 'Refund method: After confirming item arrival, we will transfer to your designated account (transfer fees borne by customer) or refund according to your payment method.'],
      },
      {
        heading: '4. Initial Defects or Wrong Items',
        body: ['Shipping fee: Borne by us.', 'Resolution: We will promptly send a replacement. If out of stock, we will issue a full refund.'],
      },
      {
        heading: '5. Return Address',
        body: ['If you wish to return an item, please contact us by email first.', 'Contact: cotorie1@outlook.com', 'After we receive your message, we will provide the return address individually. (※ Items sent unilaterally without notice may not be accepted.)'],
      },
    ],
  },
};

export default function ReturnsPage() {
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
                  <a href={`mailto:${line.replace(/^.*?: /, '')}`} style={{ color: '#6b5b4e', textDecoration: 'underline' }}>{line}</a>
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
