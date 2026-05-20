/**
 * WooCommerce REST API 客户端配置
 * 前端直连 WordPress/WooCommerce 后端获取商品数据
 */
const WC_BASE = import.meta.env.VITE_WP_DOMAIN || 'your-site.com';
const WC_KEY = import.meta.env.VITE_WC_CONSUMER_KEY || '';
const WC_SECRET = import.meta.env.VITE_WC_CONSUMER_SECRET || '';

const API_BASE = `https://${WC_BASE}/wp-json/wc/v3`;

/** 拼接 Basic Auth + 请求 */
export async function wcFetch<T = unknown>(
  endpoint: string,
  params: Record<string, string | number | undefined> = {},
): Promise<T> {
  const url = new URL(`${API_BASE}/${endpoint}`);

  // 默认参数
  url.searchParams.set('per_page', String(params.per_page || 50));
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined) url.searchParams.set(k, String(v));
  });

  const headers: HeadersInit = {
    'Content-Type': 'application/json',
  };

  // WooCommerce 认证：Basic Auth 或 URL 参数
  if (WC_KEY && WC_SECRET) {
    const auth = btoa(`${WC_KEY}:${WC_SECRET}`);
    headers['Authorization'] = `Basic ${auth}`;
  }

  const res = await fetch(url.toString(), { headers });
  if (!res.ok) {
    const text = await res.text();
    throw new Error(`WC API ${res.status}: ${text.slice(0, 200)}`);
  }
  return res.json();
}

/** 判断是否已配置 WooCommerce */
export function isWooCommerceConfigured(): boolean {
  return !!WC_BASE && !!WC_KEY && !!WC_SECRET;
}
