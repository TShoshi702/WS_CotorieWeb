import { useLanguage } from '../context/LanguageContext';

const content: Record<string, { title: string; sections: { heading: string; body: string[] }[] }> = {
  ja: {
    title: 'プライバシーポリシー',
    sections: [
      {
        heading: '1. 個人情報の定義',
        body: ['個人情報とは、氏名、住所、電話番号、メールアドレス、生年月日、購入履歴など、お客様個人を識別できる情報を指します。'],
      },
      {
        heading: '2. 個人情報の収集方法',
        body: ['当社は、以下の場合に個人情報を収集することがあります。', '- 商品のご注文時', '- お問い合わせ時', '- メールマガジン登録時', '- キャンペーン応募時'],
      },
      {
        heading: '3. 個人情報の利用目的',
        body: ['お客様からお預かりした個人情報は、以下の目的で利用します。', '- ご注文の確認・連絡・商品発送のため', '- お問い合わせへの対応のため', '- 新商品・キャンペーンに関する情報提供のため（お客様が希望する場合）', '- サービス向上のための分析（個人を特定しない統計情報として）'],
      },
      {
        heading: '4. 個人情報の第三者提供',
        body: ['当社は、以下のいずれかに該当する場合を除き、お客様の個人情報を第三者に提供しません。', '- お客様の同意がある場合', '- 法令に基づく場合', '- 人の生命・財産保護のために必要であり、お客様の同意を得ることが困難な場合', '- 配送会社・決済機関など、業務遂行に必要な範囲で委託する場合（この場合、委託先も適切に管理します）'],
      },
      {
        heading: '5. 個人情報の開示・訂正・利用停止',
        body: ['お客様ご自身の個人情報の開示・訂正・利用停止を希望される場合は、下記お問い合わせ先までご連絡ください。遅滞なく対応いたします。'],
      },
      {
        heading: '6. お問い合わせ先',
        body: ['メールアドレス: cotorie1@outlook.com'],
      },
      {
        heading: '7. プライバシーポリシーの改定',
        body: ['当社は、法令の変更や運営方針に応じて、本ポリシーを改定することがあります。改定後は、当サイト上に掲載された時点から効力を生じるものとします。', '改定日: 2025年〇月〇日'],
      },
    ],
  },
  zh: {
    title: '隐私政策',
    sections: [
      {
        heading: '1. 个人信息的定义',
        body: ['个人信息指姓名、住址、电话号码、邮箱地址、出生日期、购买记录等可识别客户个人的信息。'],
      },
      {
        heading: '2. 个人信息的收集方法',
        body: ['本公司可能在以下情况下收集个人信息：', '- 商品下单时', '- 咨询时', '- 邮件杂志注册时', '- 活动报名时'],
      },
      {
        heading: '3. 个人信息的使用目的',
        body: ['从客户处获得的个人信息，将用于以下目的：', '- 确认订单、联系及商品发货', '- 回复咨询', '- 新品及活动信息通知（客户同意的情况下）', '- 为提升服务而进行的分析（仅作为不识别个人的统计信息）'],
      },
      {
        heading: '4. 个人信息的第三方提供',
        body: ['除以下任一情况外，本公司不会向第三方提供客户的个人信息：', '- 获得客户同意时', '- 基于法令时', '- 为保护人的生命财产安全而必要，且难以获得客户同意时', '- 委托配送公司、支付机构等在必要范围内执行业务时（此情况下，受托方也会妥善管理）'],
      },
      {
        heading: '5. 个人信息的披露、订正、使用停止',
        body: ['如希望披露、订正或停止使用您本人的个人信息，请通过以下联系方式联系我们。我们将及时处理。'],
      },
      {
        heading: '6. 联系方式',
        body: ['邮箱地址: cotorie1@outlook.com'],
      },
      {
        heading: '7. 隐私政策的修订',
        body: ['本公司可根据法令变更及运营方针，修订本政策。修订后将自本网站发布之时起生效。', '修订日期: 2025年〇月〇日'],
      },
    ],
  },
  en: {
    title: 'Privacy Policy',
    sections: [
      {
        heading: '1. Definition of Personal Information',
        body: ['Personal information refers to information that can identify individual customers, such as name, address, tlephone number, emal address, date of birth, and purchase history.'],
      },
      {
        heading: '2. Collection of Personal Information',
        body: ['We may collect personal information in the following cases:', '- When placing an order', '- When making an inquiry', '- When registering for the newletter', '- When applying for campaigns'],
      },
      {
        heading: '3. Purpose of Use',
        body: ['Personal information received from customers will be used for the following purposes:', '- To confirm orders, contact you, and ship products', '- To respond to inquiries', '- To provide information on new products and campaigns (only if the customer wishes)', '- To analyze for service improvement (as statistical information that does not identify individuals)'],
      },
      {
        heading: '4. Provision to Third Parties',
        body: ['Except in the following cases, we will not provide your personal information to third parties:', '- With your consent', '- Based on laws and regulations', '- When necessary for the protection of life, body, or property, and it is difficult to obtain your consent', '- When entrusting shipping companies, payment institutions, etc. within the necessary scope (in this case, the entrusted party will also be properly managed)'],
      },
      {
        heading: '5. Disclosure, Correction, and Suspension of Use',
        body: ['If you wish to disclose, correct, or suspend the use of your own personal information, please contact us at the inquiry desthown below. We will respond promptly.'],
      },
      {
        heading: '6. Contact',
        body: ['Email: cotorie1@outlook.com'],
      },
      {
        heading: '7. Revision of this Policy',
        body: ['We may revise this policy in accordance with changes in laws and regulations and operational policies. The revised policy will take effect from the time it is posted on this website.', 'Revision date: Month Day, 2025'],
      },
    ],
  },
};

export default function PrivacyPolicyPage() {
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
