import { useState, useEffect, useCallback } from 'react';
import type { Product } from '../types';

const WP_DOMAIN = import.meta.env.VITE_WP_DOMAIN || 'cotorie.com';
const API_BASE = `http://${WP_DOMAIN}/wp-json/wc/store/v1`;

// ─── WC Store API 响应类型（与 REST API v3 格式不同）────────────
interface WcStoreImage {
  id: number;
  src: string;
  alt: string;
}

interface WcStoreCategory {
  id: number;
  name: string;
  slug: string;
}

interface WcStoreAttribute {
  id: number;
  name: string;
  taxonomy: string;
  terms: Array<{ id: number; name: string; slug: string }>;
}

interface WcStoreVariation {
  id: number;
  attributes: Array<{ name: string; value: string }>;
  prices: {
    price: string;
    regular_price: string;
    sale_price: string;
    currency_code: string;
  };
  stock_status: string;
}

interface WcStoreProduct {
  id: number;
  name: string;
  slug: string;
  description: string;
  short_description: string;
  on_sale: boolean;
  type: string;
  stock_status: string;
  purchasable: boolean;
  images: WcStoreImage[];
  categories: WcStoreCategory[];
  attributes: WcStoreAttribute[];
  variations: WcStoreVariation[];
  prices: {
    price: string;
    regular_price: string;
    sale_price: string;
    price_range: unknown;
    currency_code: string;
    currency_symbol: string;
  };
}

// ─── Fetch helper ────────────────────────────────────────────────────
async function storeApiFetch<T = unknown>(
  endpoint: string,
  params: Record<string, string | number | undefined> = {},
): Promise<T> {
  const url = new URL(`${API_BASE}/${endpoint}`);
  Object.entries(params).forEach(([k, v]) => {
    if (v !== undefined) url.searchParams.set(k, String(v));
  });

  const res = await fetch(url.toString());
  if (!res.ok) {
    throw new Error(`WC Store API ${res.status}: ${url}`);
  }
  return res.json();
}

// ─── Mapper ──────────────────────────────────────────────────────────
function mapWcProduct(sp: WcStoreProduct): Product {
  // 分类 slug 匹配
  const catSlugs = (sp.categories || []).map((c) => c.slug);
  const collection = catSlugs.some((s) =>
    decodeURIComponent(s).includes('东洋') || s.toLowerCase().includes('oriental'),
  )
    ? 'oriental'
    : 'modern';

  // 颜色属性（WC Store API 用 attributes.terms）
  const colorAttr = (sp.attributes || []).find(
    (a) =>
      a.name.toLowerCase().includes('color') ||
      a.name.includes('颜色') ||
      a.name.includes('カラー'),
  );
  const colors =
    (colorAttr?.terms || []).map((t) => t.name).length > 0
      ? (colorAttr?.terms || []).map((t) => t.name)
      : [];

  // 尺码属性
  const sizeAttr = (sp.attributes || []).find(
    (a) =>
      a.name.toLowerCase().includes('size') ||
      a.name.includes('尺码') ||
      a.name.includes('サイズ'),
  );
  const sizes =
    (sizeAttr?.terms || []).map((t) => t.name).length > 0
      ? (sizeAttr?.terms || []).map((t) => t.name)
      : [];

  // 图片
  const images = (sp.images || []).map((img) => img.src);

  // 价格（优先 sale_price → regular_price → price）
  const rawPrice =
    parseFloat(sp.prices?.sale_price) ||
    parseFloat(sp.prices?.regular_price) ||
    parseFloat(sp.prices?.price) ||
    0;

  // 去除 HTML 标签的描述
  const cleanDesc =
    (sp.description || sp.short_description || '')
      .replace(/<\/?[^>]+(>|$)/g, '')
      .trim() || '';

  return {
    id: String(sp.id),
    name: sp.name,
    nameJa: sp.name,
    nameEn: sp.name,
    price: Math.round(rawPrice * 100) / 100,
    collection,
    images:
      images.length > 0
        ? images
        : ['https://images.unsplash.com/photo-1596483758379-9d2a3f4e4b6c?w=800'],
    description: cleanDesc,
    descriptionJa: cleanDesc,
    descriptionEn: cleanDesc,
    colors: colors.length > 0 ? colors : ['默认'],
    sizes: sizes.length > 0 ? sizes : ['均码'],
    inStock: sp.stock_status !== 'out-of-stock' && sp.purchasable !== false,
    isNew: sp.on_sale || false,
  };
}

// ─── Hooks ───────────────────────────────────────────────────────────

export function useAllProducts(limit = 50) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const sps = await storeApiFetch<WcStoreProduct[]>('products', {
        per_page: limit,
      });
      setProducts((sps || []).map(mapWcProduct));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : '未知错误');
    } finally {
      setLoading(false);
    }
  }, [limit]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, loading, error, refetch: fetchProducts };
}

export function useProductsByCollection(collectionHandle: string, limit = 50) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = useCallback(async () => {
    if (!collectionHandle) return;
    setLoading(true);
    setError(null);
    try {
      const sps = await storeApiFetch<WcStoreProduct[]>('products', {
        category: collectionHandle,
        per_page: limit,
      });
      setProducts((sps || []).map(mapWcProduct));
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : '未知错误');
    } finally {
      setLoading(false);
    }
  }, [collectionHandle, limit]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return { products, loading, error, refetch: fetchProducts };
}

export function useProduct(slugOrId: string) {
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProduct = useCallback(async () => {
    if (!slugOrId) return;
    setLoading(true);
    setError(null);
    try {
      // Store API 不支持按 ID 获取单个商品，拉全部然后筛选
      const sps = await storeApiFetch<WcStoreProduct[]>('products', {
        per_page: 100,
      });
      const found = (sps || []).find(
        (sp) => String(sp.id) === slugOrId || sp.slug === slugOrId,
      );
      setProduct(found ? mapWcProduct(found) : null);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : '未知错误');
    } finally {
      setLoading(false);
    }
  }, [slugOrId]);

  useEffect(() => {
    fetchProduct();
  }, [fetchProduct]);

  return { product, loading, error, refetch: fetchProduct };
}
