import { useLanguage } from '../context/LanguageContext';

interface SctaItem {
  label: Record<string, string>;
  value: Record<string, string>;
}

const sctaData: SctaItem[] = [
  {
    label: { zh: '销售商', ja: '販売業者', en: 'Seller' },
    value: { zh: 'Cotorie', ja: 'Cotorie', en: 'Cotorie' },
  },
  {
    label: { zh: '运营负责人', ja: '運営統括責任者', en: 'Representative' },
    value: { zh: 'LiuBoNeng', ja: 'LiuBoNeng', en: 'LiuBoNeng' },
  },
  {
    label: { zh: '所在地', ja: '所在地', en: 'Address' },
    value: {
      zh: '中国广东省佛山市南海区桂城街道南港名轩',
      ja: 'Nangang Mingxuan, Guicheng Subdistrict, Nanhai District, Foshan City, Guangdong Province, China',
      en: 'Nangang Mingxuan, Guicheng Subdistrict, Nanhai District, Foshan City, Guangdong Province, China',
    },
  },
  {
    label: { zh: '电话号码', ja: '電話番号', en: 'Phone' },
    value: { zh: '+86 17688245394', ja: '+86 17688245394', en: '+86 17688245394' },
  },
  {
    label: { zh: '邮箱', ja: 'メールアドレス', en: 'Email' },
    value: { zh: 'cotorie1@outlook.com', ja: 'cotorie1@outlook.com', en: 'cotorie1@outlook.com' },
  },
  {
    label: { zh: '售价', ja: '販売価格', en: 'Price' },
    value: {
      zh: '各商品页面显示的价格（含税）。所有标价均为日元（JPY）',
      ja: '各商品ページに表示される金額（税込）といたします。表示価格はすべて日本円（JPY）となります',
      en: 'As displayed on each product page (tax included). All prices are in Japanese Yen (JPY)',
    },
  },
  {
    label: { zh: '商品以外费用', ja: '商品代金以外の必要料金', en: 'Additional Fees' },
    value: {
      zh: '另外收取运费。标价已含消费税',
      ja: '別途、送料がかかります。表示価格には消費税が含まれます',
      en: 'Separate shipping fees apply. Displayed prices include consumption tax',
    },
  },
  {
    label: { zh: '支付方式', ja: '支払方法', en: 'Payment Methods' },
    value: {
      zh: '信用卡（Visa、Mastercard、JCB、American Express）、便利店支付、PayPay',
      ja: 'クレジットカード（Visa、Mastercard、JCB、American Express）、コンビニ決済、PayPay',
      en: 'Credit Card (Visa, Mastercard, JCB, American Express), Convenience Store Payment, PayPay',
    },
  },
  {
    label: { zh: '支付时间', ja: '支払時期', en: 'Payment Timing' },
    value: {
      zh: '信用卡/PayPay：下单后即时扣款。便利店支付：下单后请在各便利店支付（支付期限为下单后3天内）',
      ja: 'クレジットカード・PayPay決済：注文完了後すぐに決済が完了します。コンビニ決済：注文後、各コンビニエンスストアにてお支払いください（お支払い期限は注文から3日以内）',
      en: 'Credit Card/PayPay: Payment is completed immediately upon order. Convenience Store: Please pay at the convenience store after ordering (deadline: within 3 days of order)',
    },
  },
  {
    label: { zh: '发货时间', ja: '商品の引渡し時期', en: 'Delivery' },
    value: {
      zh: '下单后3个工作日内发货。通常发货后5-10个工作日送达，根据配送地区和状况有所不同',
      ja: 'ご注文から3営業日以内に発送いたします。配送状況や地域によって異なりますが、通常、発送から5〜10営業日でのお届けとなります',
      en: 'Ships within 3 business days of order. Delivery typically takes 5-10 business days from shipment, depending on region and conditions',
    },
  },
  {
    label: { zh: '退换货', ja: '返品・交換について', en: 'Returns & Exchange' },
    value: {
      zh: '仅限未使用商品，到货后7天内联系方可退换。顾客原因退换货运费由顾客承担。初始瑕疵品由本公司承担退换货运费',
      ja: '未使用品に限り、商品到着後7日以内にご連絡いただいた場合に限り返品・交換をお受けいたします。ただし、お客様のご都合による返品・交換の送料はお客様のご負担とさせていただきます。初期不良品については、当社負担で返品・交換に対応いたします',
      en: 'Unused items only, within 7 days of receipt. Return shipping for customer convenience is borne by the customer. Defective items are handled at our expense',
    },
  },
  {
    label: { zh: '退货期限', ja: '返品期限', en: 'Return Period' },
    value: {
      zh: '商品到货后7天内',
      ja: '商品到着後7日以内',
      en: 'Within 7 days of receipt',
    },
  },
];

const pageTitles: Record<string, string> = {
  zh: '特定商交易法相关说明',
  ja: '特定商取引法に基づく表記',
  en: 'Specified Commercial Transactions Act',
};

export default function SctaPage() {
  const { language } = useLanguage();
  const lang = (language || 'ja') as string;

  return (
    <div style={{ backgroundColor: '#faf6f2', minHeight: '80vh' }}>
      {/* Header */}
      <section
        style={{
          padding: '80px 24px 48px',
          textAlign: 'center',
          background: 'linear-gradient(180deg, #fff5f0 0%, #faf6f2 100%)',
        }}
      >
        <h1
          style={{
            fontSize: '28px',
            fontWeight: '300',
            letterSpacing: '3px',
            color: '#2c2c2c',
            margin: 0,
          }}
        >
          {pageTitles[lang] || pageTitles.ja}
        </h1>
        <div
          style={{
            width: '40px',
            height: '1px',
            backgroundColor: '#c49a8c',
            margin: '20px auto 0',
          }}
        />
      </section>

      {/* Content */}
      <section
        style={{
          maxWidth: '800px',
          margin: '0 auto',
          padding: '0 24px 80px',
        }}
      >
        <table
          style={{
            width: '100%',
            borderCollapse: 'collapse',
            fontSize: '14px',
            lineHeight: '1.8',
            color: '#333',
          }}
        >
          <tbody>
            {sctaData.map((item, i) => (
              <tr key={i}>
                <th
                  style={{
                    width: '200px',
                    padding: '16px 12px',
                    textAlign: 'left',
                    verticalAlign: 'top',
                    fontWeight: '500',
                    fontSize: '13px',
                    backgroundColor: '#f5ede8',
                    border: '1px solid #e8ddd5',
                    whiteSpace: 'nowrap',
                  }}
                >
                  {item.label[lang] || item.label.ja}
                </th>
                <td
                  style={{
                    padding: '16px 16px',
                    verticalAlign: 'top',
                    border: '1px solid #e8ddd5',
                    backgroundColor: '#fff',
                  }}
                >
                  {item.value[lang] || item.value.ja}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
}
